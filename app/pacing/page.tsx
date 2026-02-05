import RunningTimesDisplay from '@/components/running-times-display'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pacing | Caleb Seely',
  description: 'Explore my running times across various distances from 100m to marathon. Track and cross country athlete.',
  openGraph: {
    title: 'Pacing | Caleb Seely',
    description: 'Explore my running times across various distances.',
    images: ['/img/Hayward_Banner.webp'],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <RunningTimesDisplay />
    </main>
  )
}
