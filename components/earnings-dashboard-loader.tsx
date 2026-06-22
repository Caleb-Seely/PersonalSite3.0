"use client";
import dynamic from 'next/dynamic';

const EarningsDashboard = dynamic(() => import('./earnings-dashboard'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p className="text-zinc-500 animate-pulse">Loading earnings data…</p>
    </div>
  ),
});

export default function EarningsDashboardLoader() {
  return <EarningsDashboard />;
}
