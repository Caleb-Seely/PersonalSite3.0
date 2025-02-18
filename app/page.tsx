import HeroLayout from '@/components/hero-layout';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Hero Image Section */}
      <div className="fixed inset-0">
        <Image 
          src="/img/hero.webp" 
          alt="Landscape Hero" 
          fill
          className="object-cover"
          priority
          quality={75}
          sizes="100vw"
        />
      </div>

      {/* Rest of the Page Content */}
      <div className="relative">
        <HeroLayout />
      </div>
    </main>
  );
}
