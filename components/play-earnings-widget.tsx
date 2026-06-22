"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DollarSign, TrendingDown, RotateCcw, TrendingUp } from 'lucide-react';
import type { EarningsData } from '@/app/api/play-earnings/route';

const REFRESH_MS = 10 * 60 * 1000;

function fmtUSD(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtMonth(yyyymm: string): string {
  const [y, m] = yyyymm.split('-');
  const date = new Date(Number(y), Number(m) - 1);
  return date.toLocaleString('en-US', { month: 'short', year: '2-digit' });
}

function timeAgo(iso: string): string {
  const diffSec = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diffSec < 60) return 'just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  return `${Math.floor(diffSec / 3600)}h ago`;
}

function MonthlySparkline({ data }: { data: EarningsData['monthlyRevenue'] }) {
  const [tooltip, setTooltip] = useState<{ idx: number } | null>(null);
  if (data.length === 0) return null;

  const maxNet = Math.max(...data.map(d => d.net), 0.01);

  return (
    <div className="mt-3">
      <p className="text-xs text-zinc-500 mb-1.5">Monthly Net (last {data.length} months)</p>
      <div className="flex items-end gap-0.5 h-10">
        {data.map((d, i) => {
          const pct = Math.max((d.net / maxNet) * 100, 2);
          const isHovered = tooltip?.idx === i;
          return (
            <div
              key={d.month}
              className="relative flex-1 flex flex-col justify-end group"
              onMouseEnter={() => setTooltip({ idx: i })}
              onMouseLeave={() => setTooltip(null)}
            >
              {isHovered && (
                <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 z-10
                  bg-zinc-700 text-white text-xs rounded px-1.5 py-0.5 whitespace-nowrap pointer-events-none">
                  {fmtMonth(d.month)}: ${fmtUSD(d.net)}
                </div>
              )}
              <div
                className={`w-full rounded-sm transition-colors ${
                  isHovered ? 'bg-[#10B981]' : 'bg-[#10B981]/50'
                }`}
                style={{ height: `${pct}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-zinc-600">{fmtMonth(data[0].month)}</span>
        <span className="text-xs text-zinc-600">{fmtMonth(data[data.length - 1].month)}</span>
      </div>
    </div>
  );
}

function AppBreakdown({ apps }: { apps: EarningsData['byApp'] }) {
  if (apps.length <= 1) return null;
  const maxGross = Math.max(...apps.map(a => a.gross), 0.01);

  return (
    <div className="mt-3 pt-3 border-t border-zinc-800">
      <p className="text-xs text-zinc-500 mb-2">By App (Gross)</p>
      <div className="space-y-1.5">
        {apps.map(app => (
          <div key={app.id}>
            <div className="flex justify-between text-xs mb-0.5">
              <span className="text-zinc-300 truncate max-w-[65%]">{app.name}</span>
              <span className="text-zinc-400">${fmtUSD(app.gross)}</span>
            </div>
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8DB7F5]/70 rounded-full"
                style={{ width: `${(app.gross / maxGross) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PlayEarningsWidget() {
  const [data, setData] = useState<EarningsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [, tick] = useState(0);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/play-earnings');
      if (!res.ok) throw new Error('fetch failed');
      setData(await res.json());
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const refreshId = setInterval(fetchData, REFRESH_MS);
    const tickId = setInterval(() => tick(n => n + 1), 60_000);
    return () => {
      clearInterval(refreshId);
      clearInterval(tickId);
    };
  }, []);

  if (loading) {
    return (
      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardContent className="p-4 animate-pulse space-y-3">
          <div className="h-3 bg-zinc-700 rounded w-32" />
          <div className="h-8 bg-zinc-700 rounded w-28 mx-auto" />
          <div className="h-3 bg-zinc-700 rounded w-20 mx-auto" />
          <div className="grid grid-cols-3 gap-3 mt-2">
            {[0, 1, 2].map(i => (
              <div key={i} className="space-y-1">
                <div className="h-2.5 bg-zinc-700 rounded w-full" />
                <div className="h-4 bg-zinc-700 rounded w-4/5" />
              </div>
            ))}
          </div>
          <div className="h-10 bg-zinc-700 rounded mt-2" />
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardContent className="p-4 text-zinc-500 text-sm">
          Revenue data unavailable
        </CardContent>
      </Card>
    );
  }

  const supportingStats = [
    {
      label: 'Gross',
      value: `$${fmtUSD(data.grossRevenue)}`,
      Icon: DollarSign,
      color: 'text-[#8DB7F5]',
    },
    {
      label: `Google (${data.googleCutPercent}%)`,
      value: `$${fmtUSD(data.googleCut)}`,
      Icon: TrendingDown,
      color: 'text-red-400',
    },
    {
      label: 'Refunds',
      value: `$${fmtUSD(data.refunds)}`,
      Icon: RotateCcw,
      color: 'text-yellow-400',
    },
  ];

  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white">
      <CardHeader className="p-4 pb-0">
        <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wide">
          App Revenue (All Time)
        </h3>
      </CardHeader>
      <CardContent className="p-4 pt-3">

        {/* Hero stat */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-1.5 mb-0.5">
            <TrendingUp className="h-4 w-4 text-[#10B981]" />
            <span className="text-2xl font-bold text-[#10B981]">
              ${fmtUSD(data.netEarnings)}
            </span>
          </div>
          <p className="text-xs text-zinc-500">Net Earnings</p>
        </div>

        {/* 3-stat row */}
        <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-zinc-800">
          {supportingStats.map(({ label, value, Icon, color }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <Icon className={`h-3.5 w-3.5 ${color}`} />
              <p className={`text-xs font-semibold ${color}`}>{value}</p>
              <p className="text-xs text-zinc-500 text-center leading-tight">{label}</p>
            </div>
          ))}
        </div>

        {/* Monthly sparkline */}
        <MonthlySparkline data={data.monthlyRevenue} />

        {/* Per-app breakdown */}
        <AppBreakdown apps={data.byApp} />

        {/* Footer */}
        <p className="text-xs text-zinc-600 mt-3">
          {data.transactionCount} sales · {data.monthsCovered} months · updated {timeAgo(data.lastUpdated)}
        </p>
      </CardContent>
    </Card>
  );
}
