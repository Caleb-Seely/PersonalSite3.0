import PlacesPage from '@/components/places'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Places | Caleb Seely',
  description: 'Discover the special places that have shaped my journey - from Steens Mountain to Southeast Asia.',
  openGraph: {
    title: 'Places | Caleb Seely',
    description: 'Discover the special places that have shaped my journey.',
    images: ['/img/Places.webp'],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <PlacesPage />
    </main>
  )
}
