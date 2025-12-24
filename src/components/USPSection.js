'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function USPSection() {
  const images = Array.from({ length: 10 }, (_, i) => `/usp/usp${i + 1}.webp`);
  const [activeSrc, setActiveSrc] = useState(null);

  const scrollerRef = useRef(null);

  // Tampilkan arrow hanya untuk device "desktop-like" (mouse + hover)
  const [showArrows, setShowArrows] = useState(false);
  useEffect(() => {
    const mq =
      typeof window !== 'undefined'
        ? window.matchMedia('(hover: hover) and (pointer: fine)')
        : null;

    if (!mq) return;

    const update = () => setShowArrows(Boolean(mq.matches));
    update();

    if (mq.addEventListener) mq.addEventListener('change', update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update);
      else mq.removeListener(update);
    };
  }, []);

  const scrollByAmount = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;

    // geser ~1 card
    const amount = Math.max(240, Math.round(el.clientWidth * 0.65));
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });

    // munculin scrollbar sebentar (kalau kamu pakai is-scrolling)
    el.classList.add('is-scrolling');
    window.clearTimeout(el.__theiScrollTimer);
    el.__theiScrollTimer = window.setTimeout(() => {
      el.classList.remove('is-scrolling');
    }, 800);
  };

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
      {/* HEADER (konsisten) */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1 w-8 bg-[#FFD700]"></div>
          <span className="text-[#FFD700] text-xs font-bold tracking-widest uppercase">
            Unique Selling Points
          </span>
        </div>

        <h2 className="font-[Oswald] text-3xl font-bold text-white uppercase">
          Kenapa Pilih THEI
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          Keunggulan yang bikin service lebih aman, cepat, dan terukur.
        </p>
      </div>

      {/* USP Carousel (aspect 4:5) */}
      <div className="relative px-6">
        {/* Arrow (desktop) */}
        {showArrows && (
          <>
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              aria-label="Geser ke kiri"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 grid place-items-center h-9 w-9 rounded-full bg-black/55 border border-white/15 text-white hover:bg-black/70"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              aria-label="Geser ke kanan"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 grid place-items-center h-9 w-9 rounded-full bg-black/55 border border-white/15 text-white hover:bg-black/70"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}

        <div ref={scrollerRef} className="overflow-x-auto thei-scrollbar">
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
                className="snap-center shrink-0 w-55 sm:w-60 rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_10px_24px_rgba(0,0,0,0.35)] cursor-pointer select-none outline-none focus:ring-2 focus:ring-[#FFD700]/60"
                aria-label={`Buka USP ${idx + 1}`}
              >
                <div className="relative aspect-4/5 w-full">
                  <Image
                    src={src}
                    alt={`USP ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 480px) 220px, 240px"
                    priority={idx < 2}
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-[#FFD700]/10" />
                </div>

                <figcaption className="px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-white uppercase">
                      USP #{String(idx + 1).padStart(2, '0')}
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
      </div>

      {/* MODAL */}
      {activeSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-6"
          onClick={() => setActiveSrc(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-105 rounded-2xl overflow-hidden border border-white/10 bg-[#0F0F0F] shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
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

            <div className="relative aspect-4/5 w-full">
              <Image
                src={activeSrc}
                alt="USP Preview"
                fill
                className="object-contain bg-black"
                sizes="(max-width: 480px) 92vw, 420px"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
