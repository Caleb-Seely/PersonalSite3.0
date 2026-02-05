import ProjectsPage from '@/components/projects'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Caleb Seely',
  description: 'Browse my software development portfolio including web apps, mobile apps, compilers, and more.',
  openGraph: {
    title: 'Projects | Caleb Seely',
    description: 'Browse my software development portfolio.',
    images: ['/img/Projects.webp'],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <ProjectsPage />
    </main>
  )
}
