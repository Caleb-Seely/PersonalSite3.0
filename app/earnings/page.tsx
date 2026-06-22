import EarningsDashboardLoader from '@/components/earnings-dashboard-loader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Earnings | Caleb Seely',
  robots: { index: false, follow: false },
};

export default function EarningsPage() {
  return (
    <main className="min-h-screen bg-black">
      <EarningsDashboardLoader />
    </main>
  );
}
