'use client';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from('.hero-content', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      });
    },
    { scope: containerRef }
  );

  const handleWhatsApp = () => {
    const message = `Halo THEI, saya ingin klaim Promo 100JT dan konsultasi servis alat berat. Bisa dibantu?`;
    window.open(
      `https://wa.me/6285195886789?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <header
      ref={containerRef}
      className="relative h-[800px] w-full overflow-hidden flex items-end pb-12"
    >
      {/* Background Section */}
      <div className="absolute inset-0">
        <Image
          src="/hero.webp"
          alt="Heavy Equipment Service"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/20"></div>
      </div>

      <div className="relative z-10 w-full px-6">
        {/* Authority Badge */}
        <div className="hero-content mb-4 inline-flex items-center gap-2 border border-[#FFD700]/30 bg-[#FFD700]/10 px-3 py-1 rounded-full">
          <span className="text-[#FFD700] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
            Pertama & Satu-Satunya di Indonesia
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-content font-[Oswald] text-4xl md:text-6xl font-bold uppercase leading-tight text-white max-w-4xl">
          Pengerjaan Terlengkap <br />
          <span className="text-[#FFD700]">Termurah Mulai 1 Jutaan</span>
        </h1>

        <p className="hero-content mt-4 text-gray-300 max-w-lg text-sm md:text-base">
          Solusi pemeliharaan alat berat dengan standar pabrikan. Minimalkan
          downtime, maksimalkan profit proyek Anda sekarang.
        </p>

        {/* Promo Cards Grid */}
        <div className="hero-content mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
          <div className="border-l-2 border-[#FFD700] bg-white/5 p-4 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-wider text-[#FFD700]">
              Exclusive Offer
            </p>
            <p className="font-bold text-white uppercase">
              10 Promo Gratis Senilai 100JT
            </p>
          </div>
          <div className="border-l-2 border-[#FFD700] bg-white/5 p-4 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-wider text-[#FFD700]">
              Corporate Bonus
            </p>
            <p className="font-bold text-white uppercase">
              Bonus Servis Mobil s/d 250JT
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="hero-content mt-10">
          <button
            onClick={handleWhatsApp}
            className="group relative w-full sm:w-auto overflow-hidden rounded bg-[#FFD700] px-10 py-4 text-lg font-black text-[#121212] uppercase transition-all hover:bg-[#FFC107] active:scale-95"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Klaim Promo Sekarang
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
