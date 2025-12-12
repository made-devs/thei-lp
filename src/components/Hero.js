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

  // Helper WhatsApp
  const handleWhatsApp = () => {
    const message = `Halo THEI, saya ingin berkonsultasi gratis mengenai layanan servis alat berat. Bisa dibantu?`;
    window.open(
      `https://wa.me/6285195886789?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

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
          <button
            onClick={handleWhatsApp}
            className="w-full rounded bg-[#FFD700] py-4 text-center text-lg font-bold text-[#121212] uppercase hover:bg-[#FFC107] transition-colors active:scale-95 flex items-center justify-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            Konsultasi Gratis
          </button>
        </div>
      </div>
    </header>
  );
}
