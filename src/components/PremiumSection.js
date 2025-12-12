'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// --- UTILITY: Format Rupiah ---
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export default function PremiumSection({ data }) {
  const [activeTab, setActiveTab] = useState(data[0].category);
  const activeItems =
    data.find((cat) => cat.category === activeTab)?.items || [];

  // State untuk Pop Up Image
  const [modalImage, setModalImage] = useState(null);

  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.premium-card',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
    },
    { dependencies: [activeTab], scope: containerRef }
  );

  // Helper WhatsApp
  const handleWhatsApp = (title) => {
    const phone = '6285195886789';
    const message = `Halo Admin THEI, saya tertarik dengan paket Premium Service ${title}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section ref={containerRef} className="py-14 bg-[#0F0F0F]">
      {/* HEADER SECTION */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1 w-8 bg-[#FFD700]"></div>
          <span className="text-[#FFD700] text-xs font-bold tracking-widest uppercase">
            Best Seller
          </span>
        </div>
        <h2 className="font-[Oswald] text-3xl font-bold text-white uppercase leading-none">
          Premium <br /> Service
        </h2>
      </div>

      {/* TAB NAVIGATION */}
      <div className="sticky top-16 z-30 bg-[#0F0F0F]/95 backdrop-blur py-2 border-b border-white/10 mb-6">
        <div className="flex gap-3 overflow-x-auto px-6 pb-2 scrollbar-hide snap-x">
          {data.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(cat.category)}
              className={`snap-start whitespace-nowrap px-6 py-2.5 rounded text-sm font-bold transition-all border uppercase tracking-wider ${
                activeTab === cat.category
                  ? 'bg-[#FFD700] text-black border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.4)]'
                  : 'bg-[#1E1E1E] text-gray-400 border-white/10 hover:border-white/30'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </div>

      {/* CARD GRID */}
      <div className="px-6 space-y-8">
        {activeItems.map((item) => {
          // --- LOGIC HITUNG-HITUNGAN ---
          const saving = item.priceNormal - item.pricePromo;
          const discountPercent = Math.round((saving / item.priceNormal) * 100);

          return (
            <div
              key={item.id}
              className="premium-card group relative bg-[#1A1A1A] rounded-xl border border-white/10 overflow-hidden hover:border-[#FFD700] transition-colors duration-300"
            >
              {/* --- 1. IMAGE AREA (BADGE DIHAPUS DARI SINI) --- */}
              <div
                className="relative aspect-square w-full bg-[#121212] overflow-hidden cursor-pointer group-image"
                onClick={() => setModalImage(item.image)}
              >
                {/* Visual Cue Zoom (Desktop Hover) */}
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <div className="bg-white/20 backdrop-blur border border-white/50 px-4 py-2 rounded-full flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                    <span className="text-white text-xs font-bold">
                      ZOOM GRAFIS
                    </span>
                  </div>
                </div>
                {/* Mobile Hint Zoom */}
                <div className="absolute bottom-2 right-2 z-10 bg-black/60 rounded px-2 py-1 flex items-center gap-1 md:hidden">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* --- 2. INFO CONTENT --- */}
              <div className="p-5 relative">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest border border-gray-700 px-2 py-0.5 rounded">
                    {activeTab}
                  </span>
                  <span className="text-[#FFD700] text-xs font-bold bg-[#FFD700]/10 px-2 py-0.5 rounded">
                    {item.capacity}
                  </span>
                </div>

                <h3 className="font-[Oswald] text-2xl font-bold text-white uppercase leading-tight mb-3">
                  {item.title.replace('THEI PREMIUM SERVICE ', '')}
                </h3>

                {/* Info Hemat Uang */}
                <div className="mb-4 inline-flex items-center gap-2 bg-green-900/30 border border-green-500/30 px-3 py-1.5 rounded w-full">
                  <div className="bg-green-500 rounded-full p-0.5">
                    <svg
                      className="w-3 h-3 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-green-400 text-xs font-bold uppercase">
                    Hemat {formatRupiah(saving)}
                  </span>
                </div>

                {item.features && (
                  <ul className="mb-4 space-y-1">
                    {item.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-gray-400 text-xs"
                      >
                        <svg
                          className="w-3 h-3 text-[#FFD700] shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="h-px w-full bg-white/10 my-4"></div>

                {/* --- 3. PRICING AREA & DISCOUNT BADGE --- */}
                <div className="flex items-center justify-between">
                  {/* Kiri: Harga */}
                  <div className="flex flex-col items-start gap-1">
                    <div className="text-gray-500 text-sm font-medium line-through decoration-red-500 decoration-2">
                      {formatRupiah(item.priceNormal)}
                    </div>
                    <div className="text-[#FFD700] font-[Oswald] text-3xl font-bold leading-none">
                      {formatRupiah(item.pricePromo)}
                    </div>
                    {/* PPN Note di bawah */}
                    <div className="text-[10px] text-gray-400 mt-1">
                      *Harga sudah termasuk PPN
                    </div>
                  </div>

                  {/* Kanan: Badge Diskon Baru */}
                  {discountPercent > 0 && (
                    <div className="flex flex-col items-center justify-center bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg">
                      <span className="font-[Oswald] text-2xl font-bold leading-none tracking-tighter">
                        {discountPercent}%
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider">
                        OFF
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleWhatsApp(item.title)}
                  className="mt-5 w-full bg-[#FFD700] hover:bg-[#FFC107] text-black font-bold py-3 uppercase text-sm tracking-wider rounded-sm transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,215,0,0.2)]"
                >
                  Ambil Paket
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- MODAL IMAGE --- */}
      {modalImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setModalImage(null)}
        >
          <div className="relative w-full max-w-lg aspect-square">
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#FFD700]"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Image
              src={modalImage}
              alt="Detail Promo"
              fill
              className="object-contain rounded-lg shadow-2xl bg-[#121212]"
            />
          </div>
        </div>
      )}
    </section>
  );
}
