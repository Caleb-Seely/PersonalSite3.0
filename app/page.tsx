import HeroLayout from '@/components/hero-layout';
import Image from 'next/image';

export default function Home() {
  return (
    <div className=" min-h-screen w-fill  ">
            {/* Hero Image Section */}
      <div className="absolute inset-0 w-full h-screen z-10">
      <Image
        src="/img/hero-1920.webp" // Default large image
        alt="Landscape Hero"
        fill
        className="object-cover"
        priority
        unoptimized={true} 
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 1920px"
        />
      </div>

      {/* Rest of the Page Content */}
      <HeroLayout />
    </div>
  );
}
