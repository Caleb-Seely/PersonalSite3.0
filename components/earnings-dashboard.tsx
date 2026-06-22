"use client";
import React, { useEffect, useState, useCallback } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { RotateCcw } from 'lucide-react';
import type { EarningsData } from '@/app/api/play-earnings/route';

const BLUE = '#8DB7F5';
const GREEN = '#10B981';
const RED = '#f87171';

// ─── Formatters ────────────────────────────────────────────────────────────────

function fmtUSD(n: number) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtMonth(yyyymm: string): string {
  if (!yyyymm) return '';
  // Accept "YYYY-MM" or "YYYY-MM-DD" (take first 7 chars)
  const part = yyyymm.substring(0, 7);
  if (!/^\d{4}-\d{2}$/.test(part)) return yyyymm;
  const [y, m] = part.split('-').map(Number);
  const d = new Date(y, m - 1, 1);
  if (isNaN(d.getTime())) return yyyymm;
  return d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

function fmtDay(yyyymmdd: string): string {
  if (!yyyymmdd || !/^\d{4}-\d{2}-\d{2}$/.test(yyyymmdd)) return yyyymmdd;
  const [y, m, d] = yyyymmdd.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleString('en-US', { month: 'short', day: 'numeric' });
}

function timeAgo(iso: string) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  return `${Math.floor(s / 3600)}h ago`;
}

// ─── Device name mapping ────────────────────────────────────────────────────────

const DEVICE_NAMES: Record<string, string> = {
  // ── Pixel 9 series ──────────────────────────────────────────────────────────
  tokay: 'Pixel 9a', niko: 'Pixel 9', tegu: 'Pixel 9 Pro',
  komodo: 'Pixel 9 Pro Fold', caiman: 'Pixel 9 Pro XL',
  // ── Pixel 8 series ──────────────────────────────────────────────────────────
  akita: 'Pixel 8a', shiba: 'Pixel 8', husky: 'Pixel 8 Pro', felix: 'Pixel Fold (2023)',
  // ── Pixel 7 series ──────────────────────────────────────────────────────────
  lynx: 'Pixel 7a', panther: 'Pixel 7', cheetah: 'Pixel 7 Pro',
  // ── Pixel 6 series ──────────────────────────────────────────────────────────
  bluejay: 'Pixel 6a', oriole: 'Pixel 6', raven: 'Pixel 6 Pro',
  // ── Pixel 5 series ──────────────────────────────────────────────────────────
  slider: 'Pixel 5a', redfin: 'Pixel 5',
  // ── Pixel 4 series ──────────────────────────────────────────────────────────
  bramble: 'Pixel 4a (5G)', sunfish: 'Pixel 4a', flame: 'Pixel 4 XL', coral: 'Pixel 4',
  // ── Pixel 3 series ──────────────────────────────────────────────────────────
  bonito: 'Pixel 3a XL', sargo: 'Pixel 3a', crosshatch: 'Pixel 3 XL', blueline: 'Pixel 3',
  // ── Pixel 1-2 series ────────────────────────────────────────────────────────
  taimen: 'Pixel 2 XL', walleye: 'Pixel 2', marlin: 'Pixel XL', sailfish: 'Pixel (1st Gen)',
  // ── Pixel accessories ───────────────────────────────────────────────────────
  tangorpro: 'Pixel Tablet', blazer: 'Pixel Tablet',
  // ── Samsung Galaxy S24 series ───────────────────────────────────────────────
  e1q: 'Samsung Galaxy S24', e1s: 'Samsung Galaxy S24 (Intl)',
  e2q: 'Samsung Galaxy S24+', e3q: 'Samsung Galaxy S24 Ultra',
  // ── Samsung Galaxy S23 series ───────────────────────────────────────────────
  dm1q: 'Samsung Galaxy S23', dm2q: 'Samsung Galaxy S23+',
  dm3q: 'Samsung Galaxy S23 Ultra', dm1xq: 'Samsung Galaxy S23 FE',
  // ── Samsung Galaxy S22 series ───────────────────────────────────────────────
  r0q: 'Samsung Galaxy S22', r1q: 'Samsung Galaxy S22+',
  b0q: 'Samsung Galaxy S22 Ultra', r0s: 'Samsung Galaxy S22 (Intl)',
  // ── Samsung Galaxy S21 series ───────────────────────────────────────────────
  o1q: 'Samsung Galaxy S21', o3q: 'Samsung Galaxy S21+',
  p3q: 'Samsung Galaxy S21 Ultra', r8s: 'Samsung Galaxy S21 FE',
  q7q: 'Samsung Galaxy S21 FE 5G',
  // ── Samsung Galaxy S20 series ───────────────────────────────────────────────
  x1q: 'Samsung Galaxy S20', y2q: 'Samsung Galaxy S20+',
  z3q: 'Samsung Galaxy S20 Ultra',
  // ── Samsung Galaxy A series ──────────────────────────────────────────────────
  pa1q: 'Samsung Galaxy A55', pa3q: 'Samsung Galaxy A35',
  a33x: 'Samsung Galaxy A33', a53x: 'Samsung Galaxy A53',
  a54x: 'Samsung Galaxy A54', a23x: 'Samsung Galaxy A23',
  // ── Samsung Galaxy M series ──────────────────────────────────────────────────
  m3q: 'Samsung Galaxy M34', m33x: 'Samsung Galaxy M33',
  m53x: 'Samsung Galaxy M53',
  // ── Samsung Galaxy Z series ──────────────────────────────────────────────────
  q4q: 'Samsung Galaxy Z Fold4', gts8p: 'Samsung Galaxy Tab S8+',
  // ── OnePlus ─────────────────────────────────────────────────────────────────
  kebab: 'OnePlus 8T', instantnoodle: 'OnePlus 8 Pro',
  lemonade: 'OnePlus 9', lemonadep: 'OnePlus 9 Pro',
  salami: 'OnePlus 11', // ── Motorola ──────────────────────────────────────────
  berlin: 'Motorola Edge 30 Pro', rhodep: 'Motorola Edge 40 Pro',
};

function prettifyDevice(raw: string): string {
  if (!raw || raw === 'Unknown') return 'Unknown';
  const key = raw.toLowerCase().trim();
  if (DEVICE_NAMES[key]) return DEVICE_NAMES[key];
  // Samsung SM-XXXX model codes
  if (/^sm-/i.test(raw)) return `Samsung ${raw.toUpperCase()}`;
  // Capitalize words, replace underscores/hyphens with spaces
  return raw.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ─── Country code → full name ─────────────────────────────────────────────────

let regionNames: Intl.DisplayNames | null = null;
function getCountryName(code: string): string {
  if (!code || code === 'Unknown') return code;
  try {
    regionNames ??= new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
}

// ─── Tooltip components ───────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-xs space-y-1 shadow-xl">
      <p className="text-zinc-300 font-semibold mb-1">{label}</p>
      {payload.map((p: { name: string; value: number; color: string }) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {fmtUSD(p.value)}</p>
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function HardwareTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-xs space-y-1 shadow-xl max-w-56">
      <p className="text-zinc-300 font-semibold mb-1 break-words">{label}</p>
      {payload.map((p: { name: string; value: number; color: string }) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value.toLocaleString()}</p>
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CountryTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const fullName = getCountryName(label);
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-xs space-y-1 shadow-xl">
      <p className="text-zinc-300 font-semibold mb-1">{fullName} {label !== fullName ? `(${label})` : ''}</p>
      {payload.map((p: { name: string; value: number; color: string }) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {fmtUSD(p.value)}</p>
      ))}
    </div>
  );
}

// ─── Inline stat (used inside the summary panel) ─────────────────────────────

function InlineStat({ label, value, color = 'text-white', sub }: {
  label: string; value: string; color?: string; sub?: string;
}) {
  return (
    <div>
      <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-base font-semibold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-zinc-600 mt-0.5">{sub}</p>}
    </div>
  );
}

// ─── Month-over-month stat ────────────────────────────────────────────────────

function MoMStat({ label, value, delta, fmt, invertColor = false }: {
  label: string; value: string; delta: number | null; fmt: 'usd' | 'count'; invertColor?: boolean;
}) {
  const fmtDelta = (d: number) =>
    fmt === 'usd'
      ? `${d >= 0 ? '+' : '−'}${fmtUSD(Math.abs(d))}`
      : `${d >= 0 ? '+' : '−'}${Math.abs(d)}`;

  const positive = delta !== null && delta > 0;
  const negative = delta !== null && delta < 0;
  const good = invertColor ? negative : positive;
  const bad = invertColor ? positive : negative;
  const deltaColor = good ? 'text-[#10B981]' : bad ? 'text-red-400' : 'text-zinc-500';
  const arrow = good ? '▲' : bad ? '▼' : '';

  return (
    <div className="bg-zinc-800/50 rounded-xl border border-zinc-700/40 p-4">
      <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
      {delta !== null && delta !== 0 ? (
        <p className={`text-xs font-medium mt-1.5 ${deltaColor}`}>{arrow} {fmtDelta(delta)}</p>
      ) : (
        <p className="text-xs text-zinc-600 mt-1.5">no change</p>
      )}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

type Granularity = 'monthly' | 'daily';

export default function EarningsDashboard() {
  const [data, setData] = useState<EarningsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(false);
  const [granularity, setGranularity] = useState<Granularity>('monthly');
  const [, tick] = useState(0);

  const fetchData = useCallback(async (refresh = false) => {
    try {
      const res = await fetch(refresh ? '/api/play-earnings?refresh=true' : '/api/play-earnings');
      if (!res.ok) throw new Error('fetch failed');
      setData(await res.json());
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const id = setInterval(() => tick(n => n + 1), 60_000);
    return () => clearInterval(id);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-500 animate-pulse">Loading earnings data…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-500">Failed to load earnings data.</p>
      </div>
    );
  }

  // ── Time series chart data ──
  const isMonthly = granularity === 'monthly';
  const timeSeriesData = isMonthly
    ? data.allMonthlyData.map(d => ({
        label: fmtMonth(d.month),
        Gross: d.gross, Net: d.net, Refunds: d.refunds,
      }))
    : data.allDailyData.map(d => ({
        label: d.day,   // keep raw for formatter logic; displayed via tickFormatter
        Gross: d.gross, Net: d.net, Refunds: d.refunds,
      }));

  // Show ~8 labels max; for daily, only label the 1st of each month
  const xTickFormatter = isMonthly
    ? (val: string, idx: number) => {
        const step = Math.max(1, Math.floor(timeSeriesData.length / 8));
        return idx % step === 0 ? val : '';
      }
    : (val: string) => {
        return val.endsWith('-01') ? fmtMonth(val) : '';
      };

  // ── Hardware ──
  const hardwareData = [...data.byHardware]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map(h => ({
      name: prettifyDevice(h.hardware).replace(/^Samsung /, ''),
      Sales: h.count,
      Refunds: h.refundCount,
    }));

  // ── Countries ──
  const countryData = data.byCountry.slice(0, 10).map(c => ({
    name: c.country,     // raw code — tooltip resolves to full name
    Gross: c.gross,
    Refunds: c.refunds,
  }));

  const netDownloads = data.transactionCount - data.refundCount;

  // ── Month-over-month ──
  const lastTwo = data.allMonthlyData.slice(-2);
  const currMonth = lastTwo[lastTwo.length - 1] ?? null;
  const prevMonth = lastTwo.length >= 2 ? lastTwo[lastTwo.length - 2] : null;

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 py-8 sm:py-10 max-w-5xl mx-auto pb-16">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">App Revenue</h1>
          <p className="text-xs text-zinc-500 mt-1">
            {data.monthsCovered} months · USD only · updated {timeAgo(data.lastUpdated)}
          </p>
        </div>
        <button
          onClick={() => { setSyncing(true); fetchData(true); }}
          disabled={syncing}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white
            border border-zinc-700 hover:border-zinc-500 rounded-lg px-3 py-2
            transition-colors disabled:opacity-50"
        >
          <RotateCcw className={`h-3.5 w-3.5 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing…' : 'Sync'}
        </button>
      </div>

      {/* Summary panel */}
      <div className="bg-zinc-900 border border-zinc-800/60 rounded-xl p-6 mb-6">
        {/* Hero */}
        <div className="mb-5">
          <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Net Earnings</p>
          <p className="text-4xl font-bold text-[#10B981]">{fmtUSD(data.netEarnings)}</p>
          <p className="text-xs text-zinc-600 mt-1">{data.monthsCovered} months of data</p>
        </div>
        {/* Stats grid */}
        <div className="border-t border-zinc-800 pt-5 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
          <InlineStat label="Gross Revenue" value={fmtUSD(data.grossRevenue)} color="text-[#8DB7F5]" />
          <InlineStat
            label="Google's Cut"
            value={fmtUSD(data.googleCut)}
            color="text-red-400"
            sub={`${data.googleCutPercent}% of gross`}
          />
          <InlineStat label="Refunds" value={fmtUSD(data.refunds)} color="text-yellow-400" />
          <InlineStat label="Purchases" value={data.transactionCount.toLocaleString()} />
          <InlineStat label="Net Downloads" value={netDownloads.toLocaleString()} color="text-[#10B981]" />
          <InlineStat
            label="Refund Count"
            value={data.refundCount.toLocaleString()}
            sub={`${data.transactionCount > 0 ? ((data.refundCount / data.transactionCount) * 100).toFixed(1) : 0}% rate`}
          />
        </div>
      </div>

      {/* Month-over-month */}
      {currMonth && (
        <div className="bg-zinc-900 border border-zinc-800/60 rounded-xl p-5 mb-6">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-sm font-semibold text-zinc-300">{fmtMonth(currMonth.month)}</h2>
            {prevMonth && (
              <span className="text-xs text-zinc-500">vs {fmtMonth(prevMonth.month)}</span>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <MoMStat label="Net Earnings" value={fmtUSD(currMonth.net)} delta={prevMonth ? currMonth.net - prevMonth.net : null} fmt="usd" />
            <MoMStat label="Gross Revenue" value={fmtUSD(currMonth.gross)} delta={prevMonth ? currMonth.gross - prevMonth.gross : null} fmt="usd" />
            <MoMStat label="Purchases" value={String(currMonth.count)} delta={prevMonth ? currMonth.count - prevMonth.count : null} fmt="count" />
            <MoMStat label="Refunds" value={fmtUSD(currMonth.refunds)} delta={prevMonth ? currMonth.refunds - prevMonth.refunds : null} fmt="usd" invertColor />
            <MoMStat label="Refund Count" value={String(currMonth.refundCount)} delta={prevMonth ? currMonth.refundCount - prevMonth.refundCount : null} fmt="count" invertColor />
          </div>
        </div>
      )}

      {/* Time series */}
      <div className="bg-zinc-900 border border-zinc-800/60 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-zinc-300">Revenue Over Time</h2>
          <div className="flex gap-1 text-xs">
            {(['monthly', 'daily'] as Granularity[]).map(g => (
              <button
                key={g}
                onClick={() => setGranularity(g)}
                className={`px-2.5 py-1 rounded-md transition-colors capitalize ${
                  granularity === g
                    ? 'bg-zinc-700 text-white'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={timeSeriesData} margin={{ top: 4, right: 8, left: 8, bottom: 40 }}>
            <defs>
              <linearGradient id="grossGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={BLUE} stopOpacity={0.25} />
                <stop offset="95%" stopColor={BLUE} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={GREEN} stopOpacity={0.35} />
                <stop offset="95%" stopColor={GREEN} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis
              dataKey="label"
              tickFormatter={xTickFormatter}
              tick={{ fill: '#71717a', fontSize: 10, dy: 4 }}
              angle={-40}
              textAnchor="end"
              interval={0}
              axisLine={false}
              tickLine={false}
              height={50}
            />
            <YAxis
              tickFormatter={v => `$${v}`}
              tick={{ fill: '#71717a', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={52}
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              formatter={(value) => <span style={{ color: '#a1a1aa' }}>{value}</span>}
            />
            <Area type="monotone" dataKey="Gross" stroke={BLUE} strokeWidth={1.5} fill="url(#grossGrad)" dot={false} />
            <Area type="monotone" dataKey="Net" stroke={GREEN} strokeWidth={2} fill="url(#netGrad)" dot={false} />
            <Area type="monotone" dataKey="Refunds" stroke={RED} strokeWidth={1.5} fill="none" dot={false} strokeDasharray="4 2" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Device + Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        <div className="bg-zinc-900 border border-zinc-800/60 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-zinc-300 mb-4">
            By Device <span className="text-zinc-600 font-normal text-xs ml-1">sales count</span>
          </h2>
          {hardwareData.length === 0 ? (
            <p className="text-zinc-600 text-sm">No device data</p>
          ) : (
            <ResponsiveContainer width="100%" height={Math.max(hardwareData.length * 40, 200)}>
              <BarChart data={hardwareData} layout="vertical" margin={{ top: 0, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                <XAxis type="number" allowDecimals={false} tick={{ fill: '#71717a', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#a1a1aa', fontSize: 10 }} axisLine={false} tickLine={false} width={130} />
                <Tooltip content={<HardwareTooltip />} />
                <Bar dataKey="Sales" fill={BLUE} radius={[0, 3, 3, 0]} barSize={10} />
                <Bar dataKey="Refunds" fill={RED} radius={[0, 3, 3, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-zinc-900 border border-zinc-800/60 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-zinc-300 mb-4">
            By Country <span className="text-zinc-600 font-normal text-xs ml-1">gross revenue</span>
          </h2>
          {countryData.length === 0 ? (
            <p className="text-zinc-600 text-sm">No country data</p>
          ) : (
            <ResponsiveContainer width="100%" height={Math.max(countryData.length * 40, 200)}>
              <BarChart data={countryData} layout="vertical" margin={{ top: 0, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                <XAxis type="number" tickFormatter={v => `$${v}`} tick={{ fill: '#71717a', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tickFormatter={(code: string) => getCountryName(code)}
                  tick={{ fill: '#a1a1aa', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  width={120}
                />
                <Tooltip content={<CountryTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} formatter={(v) => <span style={{ color: '#a1a1aa' }}>{v}</span>} />
                <Bar dataKey="Gross" fill={GREEN} radius={[0, 3, 3, 0]} barSize={13} />
                <Bar dataKey="Refunds" fill={RED} radius={[0, 3, 3, 0]} barSize={13} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>

    </div>
  );
}
