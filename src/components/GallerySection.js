'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function GallerySection() {
  const images = Array.from(
    { length: 10 },
    (_, i) => `/gallery/gallery${i + 1}.webp`
  );

  const [activeSrc, setActiveSrc] = useState(null);

  // ESC to close
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setActiveSrc(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // lock scroll when modal open
  useEffect(() => {
    if (!activeSrc) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [activeSrc]);

  return (
    <section className="py-5 bg-[#121212] relative">
      {/* HEADER (samain style kayak section lain) */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1 w-8 bg-[#FFD700]"></div>
          <span className="text-[#FFD700] text-xs font-bold tracking-widest uppercase">
            Gallery Pengerjaan
          </span>
        </div>

        <h2 className="font-[Oswald] text-3xl font-bold text-white uppercase">
          Dokumentasi Project
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          Contoh hasil kerja tim teknisi THEI di lapangan.
        </p>
      </div>

      {/* CAROUSEL */}
      <div className="px-6 overflow-x-auto thei-scrollbar">
        <div className="flex gap-3 snap-x snap-mandatory pb-2 pr-6">
          {images.map((src, idx) => (
            <figure
              key={src}
              role="button"
              tabIndex={0}
              onClick={() => setActiveSrc(src)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveSrc(src);
              }}
              className="snap-center shrink-0 w-[260px] sm:w-[280px] rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_10px_24px_rgba(0,0,0,0.35)] cursor-pointer select-none outline-none focus:ring-2 focus:ring-[#FFD700]/60"
              aria-label={`Buka gallery ${idx + 1}`}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 480px) 260px, 280px"
                  priority={idx < 2}
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-[#FFD700]/10" />
              </div>

              <figcaption className="px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-white uppercase">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FFD700]">
                    THEI
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* MODAL (sama gaya kayak USP) */}
      {activeSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-6"
          onClick={() => setActiveSrc(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-[440px] rounded-2xl overflow-hidden border border-white/10 bg-[#0F0F0F] shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveSrc(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/50 text-white border border-white/15 px-3 py-2 text-xs font-extrabold uppercase tracking-wider hover:bg-black/70"
              aria-label="Tutup"
            >
              Tutup
            </button>

            <div className="relative aspect-[4/3] w-full">
              <Image
                src={activeSrc}
                alt="Gallery Preview"
                fill
                className="object-contain bg-black"
                sizes="(max-width: 480px) 92vw, 440px"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
