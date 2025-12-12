'use client';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from('.hero-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
      });
    },
    { scope: containerRef }
  );

  return (
    <header
      ref={containerRef}
      className="relative h-[600px] w-full overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero.webp"
          alt="Heavy Equipment"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/50 via-transparent to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6 pb-16">
        <div className="hero-content mb-4 flex items-center gap-2">
          <div className="h-[2px] w-8 bg-[#FFD700]"></div>
          <span className="text-[#FFD700] text-sm font-bold uppercase tracking-widest">
            Heavy Equipment Expert
          </span>
        </div>

        <h1 className="hero-content font-[Oswald] text-5xl font-bold uppercase leading-[1.1] text-white">
          Unit Mati,
          <br />
          <span className="text-[#FFD700]">Proyek Rugi.</span>
        </h1>

        <p className="hero-content mt-4 text-gray-300 max-w-[90%]">
          Solusi servis alat berat cepat, presisi, dan bergaransi. Minimalkan
          downtime sekarang.
        </p>

        <div className="hero-content mt-8">
          <button className="w-full rounded bg-[#FFD700] py-4 text-center text-lg font-bold text-[#121212] uppercase hover:bg-yellow-400 transition-colors">
            Konsultasi Gratis
          </button>
        </div>
      </div>
    </header>
  );
}
