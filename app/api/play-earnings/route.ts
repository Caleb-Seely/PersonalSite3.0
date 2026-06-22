import { NextRequest, NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';
import { parse } from 'csv-parse/sync';
import AdmZip from 'adm-zip';

const CACHE_TTL_MS = 15 * 60 * 1000;

export interface MonthlyRevenue {
  month: string;
  net: number;
}

export interface MonthlyDetail {
  month: string;   // "YYYY-MM"
  gross: number;
  refunds: number;
  googleCut: number;
  net: number;
  count: number;
  refundCount: number;
}

export interface DailyDetail {
  day: string;     // "YYYY-MM-DD"
  gross: number;
  refunds: number;
  googleCut: number;
  net: number;
  count: number;
  refundCount: number;
}

export interface AppRevenue {
  id: string;
  name: string;
  gross: number;
}

export interface HardwareRevenue {
  hardware: string;
  gross: number;
  refunds: number;
  count: number;
  refundCount: number;
}

export interface CountryRevenue {
  country: string;
  gross: number;
  refunds: number;
  count: number;
}

export interface EarningsData {
  grossRevenue: number;
  googleCut: number;
  googleCutPercent: number;
  refunds: number;
  netEarnings: number;
  currency: string;
  lastUpdated: string;
  monthsCovered: number;
  transactionCount: number;
  refundCount: number;
  monthlyRevenue: MonthlyRevenue[];
  byApp: AppRevenue[];
  allMonthlyData: MonthlyDetail[];
  allDailyData: DailyDetail[];
  byHardware: HardwareRevenue[];
  byCountry: CountryRevenue[];
}

let cache: { data: EarningsData; exp: number } | null = null;

function getStorage(): Storage {
  const keyBase64 = process.env.GCS_SERVICE_ACCOUNT_KEY;
  if (!keyBase64) throw new Error('GCS_SERVICE_ACCOUNT_KEY env var not set');
  const credentials = JSON.parse(Buffer.from(keyBase64, 'base64').toString('utf-8'));
  return new Storage({ credentials });
}

function round2(n: number): number { return Math.round(n * 100) / 100; }
function round1(n: number): number { return Math.round(n * 10) / 10; }

// Normalise any date string Google Play might export to { day: "YYYY-MM-DD", month: "YYYY-MM" }
function normaliseDate(raw: string): { day: string | null; month: string | null } {
  const s = raw.trim();
  if (!s) return { day: null, month: null };

  // YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    return { day: s, month: s.substring(0, 7) };
  }
  // MM/DD/YYYY or M/D/YYYY
  const mdy = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (mdy) {
    const day = `${mdy[3]}-${mdy[1].padStart(2, '0')}-${mdy[2].padStart(2, '0')}`;
    return { day, month: day.substring(0, 7) };
  }
  // Fall back to Date.parse
  const d = new Date(s);
  if (!isNaN(d.getTime())) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return { day: `${y}-${m}-${dd}`, month: `${y}-${m}` };
  }
  return { day: null, month: null };
}

type DateMap = Map<string, { gross: number; refunds: number; googleCut: number; net: number; count: number; refundCount: number }>;

function bumpDateMap(map: DateMap, key: string, field: 'gross' | 'refunds' | 'googleCut' | 'net', amount: number, bumpCount = false) {
  const e = map.get(key) ?? { gross: 0, refunds: 0, googleCut: 0, net: 0, count: 0, refundCount: 0 };
  e[field] += amount;
  e.net += field === 'refunds' || field === 'googleCut' ? -amount : amount;
  if (bumpCount) e.count++;
  map.set(key, e);
}

async function fetchEarningsFromGCS(): Promise<EarningsData> {
  const storage = getStorage();
  const bucketName = process.env.GCS_BUCKET_NAME ?? 'pubsite_prod_7577545462602520818';
  const bucket = storage.bucket(bucketName);

  const [files] = await bucket.getFiles({ prefix: 'earnings/' });
  const zipFiles = files.filter(f => f.name.endsWith('.zip'));

  let grossRevenue = 0;
  let googleFeesTotal = 0;
  let googleFeeRefunds = 0;
  let chargeRefunds = 0;
  let transactionCount = 0;
  let refundCount = 0;

  const monthMap: DateMap = new Map();
  const dayMap: DateMap = new Map();
  const appGross = new Map<string, { name: string; gross: number }>();
  const hardwareMap = new Map<string, { gross: number; refunds: number; count: number; refundCount: number }>();
  const countryMap = new Map<string, { gross: number; refunds: number; count: number }>();

  for (const file of zipFiles) {
    try {
      const [buffer] = await file.download();
      const zip = new AdmZip(buffer as Buffer);

      for (const entry of zip.getEntries()) {
        if (!entry.entryName.toLowerCase().endsWith('.csv')) continue;

        const csvText = entry.getData().toString('utf-8');
        const records = parse(csvText, {
          columns: true,
          skip_empty_lines: true,
          bom: true,
          relax_column_count: true,
        }) as Record<string, string>[];

        if (records.length > 0) {
          console.log('[play-earnings] CSV columns:', Object.keys(records[0]).join(' | '));
        }

        for (const row of records) {
          const saleCurrency = (row['Currency of Sale'] ?? row['Merchant Currency'] ?? '').trim();
          if (saleCurrency !== 'USD') continue;

          const rawAmt = (row['Amount (Merchant Currency)'] ?? '0').replace(/,/g, '');
          const amount = parseFloat(rawAmt);
          if (isNaN(amount)) continue;

          const txType = (row['Transaction Type'] ?? '').toLowerCase().trim();
          const { day, month } = normaliseDate(row['Transaction Date'] ?? '');
          const hardware = (row['Hardware'] ?? 'Unknown').trim() || 'Unknown';
          const country = (row['Buyer Country'] ?? 'Unknown').trim() || 'Unknown';

          if (txType === 'charge') {
            grossRevenue += amount;
            transactionCount++;

            if (month) bumpDateMap(monthMap, month, 'gross', amount, true);
            if (day) bumpDateMap(dayMap, day, 'gross', amount, true);

            const appId = (row['Product Id'] ?? row['Product id'] ?? '').trim();
            const appName = (row['Product Title'] ?? row['Product title'] ?? appId).trim();
            if (appId) {
              const ex = appGross.get(appId);
              ex ? (ex.gross += amount) : appGross.set(appId, { name: appName || appId, gross: amount });
            }

            const hw = hardwareMap.get(hardware) ?? { gross: 0, refunds: 0, count: 0, refundCount: 0 };
            hw.gross += amount; hw.count++; hardwareMap.set(hardware, hw);
            const co = countryMap.get(country) ?? { gross: 0, refunds: 0, count: 0 };
            co.gross += amount; co.count++; countryMap.set(country, co);

          } else if (txType === 'google fee') {
            googleFeesTotal += amount;
            if (month) bumpDateMap(monthMap, month, 'googleCut', Math.abs(amount));
            if (day) bumpDateMap(dayMap, day, 'googleCut', Math.abs(amount));

          } else if (txType === 'google fee refund') {
            googleFeeRefunds += amount;

          } else if (txType === 'charge refund' || txType === 'refund') {
            chargeRefunds += amount;
            refundCount++;

            if (month) {
              bumpDateMap(monthMap, month, 'refunds', Math.abs(amount));
              const me = monthMap.get(month)!;
              me.refundCount++;
              monthMap.set(month, me);
            }
            if (day) {
              bumpDateMap(dayMap, day, 'refunds', Math.abs(amount));
              const de = dayMap.get(day)!;
              de.refundCount++;
              dayMap.set(day, de);
            }

            const hw = hardwareMap.get(hardware) ?? { gross: 0, refunds: 0, count: 0, refundCount: 0 };
            hw.refunds += Math.abs(amount); hw.refundCount++; hardwareMap.set(hardware, hw);
            const co = countryMap.get(country) ?? { gross: 0, refunds: 0, count: 0 };
            co.refunds += Math.abs(amount); countryMap.set(country, co);
          }
        }
      }
    } catch (err) {
      console.error(`[play-earnings] Skipping ${file.name}:`, err);
    }
  }

  const googleCut = round2(Math.abs(googleFeesTotal) - googleFeeRefunds);
  const refunds = round2(Math.abs(chargeRefunds));
  const gross = round2(grossRevenue);
  const googleCutPercent = gross > 0 ? round1((googleCut / gross) * 100) : 0;

  const sortedMonths = Array.from(monthMap.keys()).sort();
  const sortedDays = Array.from(dayMap.keys()).sort();

  const monthlyRevenue: MonthlyRevenue[] = sortedMonths.slice(-12).map(m => ({
    month: m,
    net: round2(monthMap.get(m)!.net),
  }));

  const allMonthlyData: MonthlyDetail[] = sortedMonths.map(m => {
    const e = monthMap.get(m)!;
    return { month: m, gross: round2(e.gross), refunds: round2(e.refunds), googleCut: round2(e.googleCut), net: round2(e.net), count: e.count, refundCount: e.refundCount };
  });

  const allDailyData: DailyDetail[] = sortedDays.map(d => {
    const e = dayMap.get(d)!;
    return { day: d, gross: round2(e.gross), refunds: round2(e.refunds), googleCut: round2(e.googleCut), net: round2(e.net), count: e.count, refundCount: e.refundCount };
  });

  const byApp: AppRevenue[] = Array.from(appGross.entries())
    .map(([id, { name, gross: g }]) => ({ id, name, gross: round2(g) }))
    .sort((a, b) => b.gross - a.gross);

  const byHardware: HardwareRevenue[] = Array.from(hardwareMap.entries())
    .map(([hardware, v]) => ({ hardware, gross: round2(v.gross), refunds: round2(v.refunds), count: v.count, refundCount: v.refundCount }))
    .sort((a, b) => b.gross - a.gross);

  const byCountry: CountryRevenue[] = Array.from(countryMap.entries())
    .map(([country, v]) => ({ country, gross: round2(v.gross), refunds: round2(v.refunds), count: v.count }))
    .sort((a, b) => b.gross - a.gross)
    .slice(0, 20);

  return {
    grossRevenue: gross,
    googleCut,
    googleCutPercent,
    refunds,
    netEarnings: round2(gross - googleCut - refunds),
    currency: 'USD',
    lastUpdated: new Date().toISOString(),
    monthsCovered: sortedMonths.length,
    transactionCount,
    refundCount,
    monthlyRevenue,
    byApp,
    allMonthlyData,
    allDailyData,
    byHardware,
    byCountry,
  };
}

export async function GET(request: NextRequest) {
  const forceRefresh = request.nextUrl.searchParams.get('refresh') === 'true';
  const responseHeaders = {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=60',
  };

  try {
    if (!forceRefresh && cache && cache.exp > Date.now()) {
      return NextResponse.json(cache.data, { headers: responseHeaders });
    }
    const data = await fetchEarningsFromGCS();
    cache = { data, exp: Date.now() + CACHE_TTL_MS };
    return NextResponse.json(data, { headers: responseHeaders });
  } catch (error) {
    console.error('[play-earnings] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch earnings data' },
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
