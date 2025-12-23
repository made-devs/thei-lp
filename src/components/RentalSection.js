'use client';
import { useState } from 'react'; // Import useState
import Image from 'next/image';

export default function RentalSection({ data }) {
  // State untuk Modal Pop-up
  const [modalImage, setModalImage] = useState(null);
  const [modalItem, setModalItem] = useState(null);

  // Fungsi Direct ke WA
  const handleWA = (unitName) => {
    const message = `Halo THEI, saya tertarik dengan Paket Rental unit ${unitName}. Boleh minta info harga dan ketersediaan?`;
    window.open(
      `https://wa.me/6285195886789?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <section className="py-5 bg-[#0A0A0A] relative border-t border-white/5">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#111_0px,#111_10px,#151515_10px,#151515_20px)] pointer-events-none"></div>

      <div className="relative z-10">
        {/* HEADER */}
        <div className="px-6 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-8 bg-[#FFD700]"></div>
            <span className="text-[#FFD700] text-xs font-bold tracking-widest uppercase">
              Heavy Equipment Rental
            </span>
          </div>
          <h2 className="font-[Oswald] text-3xl font-bold text-white uppercase leading-none">
            Sewa Unit Ready
          </h2>
          <p className="text-gray-400 text-sm mt-2 ">
            Unit tahun muda, maintenance rutin, layanan mekanik 24 jam.
          </p>
        </div>

        {/* --- CARD CAROUSEL --- */}
        <div className="flex gap-4 overflow-x-auto px-6 pb-8 scrollbar-hide snap-x">
          {data.map((item) => {
            // Ambil Kapasitas dari judul (misal: "3 TON") untuk Badge
            const tonase = item.title.match(/(\d+)\s*TON/i)?.[0] || 'UNIT';

            // List Benefit Default
            const features = item.benefits || [
              'Unit Replacement Guarantee',
              'Safety Kit (APAR, APD, Helm)',
              'Layanan Mekanik 24 Jam',
              'Free Mob & De-Mob (S&K)',
              'Laporan Time Shift Harian',
            ];

            return (
              <div
                key={item.id}
                className="group relative w-[300px] shrink-0 snap-center bg-[#1A1A1A] rounded-xl overflow-hidden border border-white/10 hover:border-[#FFD700] transition-all shadow-lg flex flex-col"
              >
                {/* 1. IMAGE AREA (CLICKABLE) */}
                <div
                  className="relative aspect-square w-full bg-[#121212] cursor-pointer"
                  onClick={() => setModalItem(item)} // Trigger Modal dengan full item
                >
                  {/* Badge Status (Kanan Atas) */}
                  <div className="absolute top-3 right-3 z-20 pointer-events-none">
                    <div className="bg-black/60 backdrop-blur border border-green-500/50 text-white text-[10px] font-bold px-2 py-1 rounded full flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      READY
                    </div>
                  </div>

                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Visual Hint Zoom (Icon Kaca Pembesar) */}
                  <div className="absolute bottom-3 right-3 bg-black/60 p-1.5 rounded text-white backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* 2. CONTENT AREA */}
                <div className="p-5 pt-2 flex flex-col gap-3 flex-1 relative">
                  {/* Judul Unit */}
                  <h3 className="font-[Oswald] text-xl font-bold text-white uppercase leading-tight mt-1 line-clamp-2">
                    {item.title.replace('PAKET RENTAL ', '')}
                  </h3>

                  {/* Garis Pemisah */}
                  <div className="h-px w-full bg-white/10"></div>

                  {/* Benefit Checklist */}
                  <div className="flex flex-col gap-2">
                    {features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="mt-0.5 min-w-[14px]">
                          <svg
                            className="w-3.5 h-3.5 text-[#FFD700]"
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
                        <span className="text-gray-400 text-[11px] leading-tight font-medium">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Spacer */}
                  <div className="mt-auto pt-4"></div>

                  {/* 3. CTA BUTTON (WA) */}
                  <button
                    onClick={() => handleWA(item.title)}
                    className="w-full bg-[#FFD700] hover:bg-[#FFC107] text-black font-bold py-3.5 rounded uppercase text-xs tracking-wider transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-[0_4px_10px_rgba(255,215,0,0.2)]"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                    </svg>
                    Sewa Sekarang (WA)
                  </button>

                  <div className="text-center">
                    <span className="text-[9px] text-gray-500">
                      *S&K Berlaku | Kontrak Harian/Bulanan
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- MODAL IMAGE (POP UP) --- */}
      {modalItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-6 animate-in fade-in duration-200"
          onClick={() => setModalItem(null)}
        >
          <div className="relative w-full max-w-md bg-[#121212] rounded border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header Modal */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <h3 className="text-white font-[Oswald] text-lg uppercase">
                Detail Unit
              </h3>
              <button
                onClick={() => setModalItem(null)}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Image Container */}
            <div className="relative w-full aspect-square bg-black">
              <Image
                src={modalItem.image}
                alt="Detail Rental"
                fill
                className="object-contain"
              />
            </div>

            {/* Footer Modal CTA */}
            <div className="p-4 border-t border-white/10">
              <button
                onClick={() => handleWA(modalItem.title)}
                className="w-full bg-[#FFD700] hover:bg-[#FFC107] text-black font-bold py-3 uppercase rounded shadow-lg flex items-center justify-center gap-2 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                Tanya Unit Ini
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
