'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function GallerySection() {
  const images = Array.from(
    { length: 9 },
    (_, i) => `/gallery/gallery${i + 1}.webp`
  );

  const [activeSrc, setActiveSrc] = useState(null);

  const scrollerRef = useRef(null);
  const scrollTimerRef = useRef(null);

  // tampilkan arrow hanya untuk device "desktop-like" (mouse + hover)
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

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;

    el.classList.add('is-scrolling');

    if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = window.setTimeout(() => {
      el.classList.remove('is-scrolling');
    }, 800);
  };

  const scrollByAmount = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;

    const amount = Math.max(260, Math.round(el.clientWidth * 0.7));
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });

    // munculin scrollbar sebentar
    handleScroll();
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

  // cleanup timer
  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
    };
  }, []);

  return (
    <section className="py-5 bg-thei-dark relative">
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
      </div>

      {/* CAROUSEL */}
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

        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="overflow-x-auto thei-scrollbar"
        >
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
                className="snap-center shrink-0 w-65 sm:w-70 rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_10px_24px_rgba(0,0,0,0.35)] cursor-pointer select-none outline-none focus:ring-2 focus:ring-[#FFD700]/60"
                aria-label={`Buka gallery ${idx + 1}`}
              >
                <div className="relative aspect-4/3 w-full">
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
            className="relative w-full max-w-110 rounded-2xl overflow-hidden border border-white/10 bg-[#0F0F0F] shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
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

            <div className="relative aspect-4/3 w-full">
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
