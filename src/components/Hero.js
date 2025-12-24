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
    const message = `Halo THEI, saya ingin klaim Promo 100JT dan konsultasi service alat berat. Bisa dibantu?`;
    window.open(
      `https://wa.me/6285195886789?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <header
      ref={containerRef}
      className="relative min-h-200 w-full overflow-hidden flex items-end pb-12"
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
        <div className="absolute inset-0 bg-linear-to-t from-thei-dark via-transparent to-black/20"></div>
      </div>

      <div className="relative z-10 w-full px-6">
        {/* Logo Centered */}
        <div className="hero-content flex justify-center my-6">
          <Image
            src="/logo.webp"
            alt="THEI Logo"
            width={150}
            height={150}
            className="object-contain"
            priority
          />
        </div>

        {/* Authority Badge */}
        <div className="hero-content mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD700] bg-[#FFD700] px-4 py-2 md:px-5 md:py-2.5 shadow-[0_8px_22px_rgba(0,0,0,0.35)]">
            <span className="text-thei-dark text-xs font-extrabold uppercase tracking-[0.14em] drop-shadow-[0_1px_0_rgba(255,255,255,0.35)] max-[400px]:text-[10px] max-[400px]:tracking-widest">
              Pertama & Satu-Satunya di Indonesia
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="hero-content font-[Oswald] text-4xl md:text-6xl font-bold uppercase leading-tight text-white max-w-4xl">
          Service Alat Berat Dengan Pengerjaan Terlengkap & <br />
          <span className="text-[#FFD700]">Termurah Mulai Dari 1 Jutaan</span>
        </h1>

        <p className="hero-content mt-4 text-gray-200 max-w-lg text-sm md:text-base">
          Solusi pemeliharaan alat berat dengan tim teknisi profesional dan
          berpengalaman. Minimalkan downtime, maksimalkan profit proyek Anda
          sekarang.
        </p>

        {/* Promo Cards Grid */}
        <div className="hero-content mt-8 grid grid-cols-1 gap-3 max-w-2xl">
          <div className="border-l-2 border-[#FFD700] bg-white/5 p-4 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-wider text-[#FFD700]">
              Exclusive Offer
            </p>
            <p className="font-bold text-white uppercase">
              10 Promo Gratis Senilai 100JT
            </p>

            {/* Promo Graphic (below the "10 Promo Gratis" card text) */}
            <div className="mt-3">
              <Image
                src="/promo.webp"
                alt="Grafis Promo"
                width={800}
                height={450}
                className="w-full h-auto rounded-md border border-white/10"
                priority={false}
              />
            </div>
          </div>

          <div className="border-l-2 border-[#FFD700] bg-white/5 p-4 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-wider text-[#FFD700]">
              Corporate Bonus
            </p>
            <p className="font-bold text-white uppercase">
              Bonus Service Mobil s/d 250JT
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="hero-content mt-10">
          <button
            onClick={handleWhatsApp}
            className="group relative w-full  overflow-hidden rounded bg-[#FFD700] px-10 py-4 text-lg font-black text-thei-dark uppercase transition-all hover:bg-[#FFC107] active:scale-95 max-[400px]:px-6 max-[400px]:py-3 max-[400px]:text-base"
          >
            <span className="relative z-10 flex items-center justify-center gap-3 max-[400px]:gap-2">
              Klaim Promo Sekarang
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1 max-[400px]:w-4 max-[400px]:h-4"
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
