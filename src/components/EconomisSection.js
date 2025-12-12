'use client';
import { useState } from 'react';
import Image from 'next/image';

// --- HELPER: Format Rupiah ---
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export default function EconomisSection({ data }) {
  // Mengubah state untuk menyimpan seluruh object item, bukan hanya image url
  const [modalItem, setModalItem] = useState(null);

  // Helper WhatsApp
  const handleWhatsApp = (title) => {
    const phone = '6285195886789';
    const message = `Halo Admin THEI, saya tertarik dengan ${title}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-12 bg-[#121212] relative">
      {/* HEADER */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1 w-8 bg-[#FFD700]"></div>
          <span className="text-[#FFD700] text-xs font-bold tracking-widest uppercase">
            Budget Friendly
          </span>
        </div>
        <h2 className="font-[Oswald] text-3xl font-bold text-white uppercase">
          Paket Economis
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Solusi servis berkualitas dengan harga miring.
        </p>
      </div>

      {/* CARD GRID (2 KOLOM) */}
      <div className="px-6">
        <div className="grid grid-cols-2 gap-4">
          {data.map((item) => {
            // 1. Clean Title
            const shortTitle = item.title
              .replace('PAKET SERVICE ', '')
              .replace(' HEMAT', '');

            // 2. Logic Hitung Harga (Default 0 jika data belum ada)
            const normal = item.priceNormal || 0;
            const promo = item.pricePromo || 0;
            const saving = normal - promo;
            const discountPercent =
              normal > 0 ? Math.round((saving / normal) * 100) : 0;

            return (
              <div
                key={item.id}
                className="group bg-[#1A1A1A] border border-white/10 rounded-lg overflow-hidden flex flex-col hover:border-[#FFD700] transition-all shadow-lg"
              >
                {/* === IMAGE AREA (ASPECT SQUARE) === */}
                <div
                  className="relative aspect-square w-full bg-black cursor-pointer overflow-hidden"
                  onClick={() => setModalItem(item)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Zoom Hint (Pojok Kanan Bawah) */}
                  <div className="absolute bottom-2 right-2 bg-black/60 p-1 rounded text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-3 h-3"
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

                {/* === CONTENT AREA === */}
                <div className="p-3 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      {/* Kapasitas Badge */}
                      <span className="inline-block bg-[#FFD700]/10 text-[#FFD700] text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#FFD700]/20">
                        {item.capacity}
                      </span>

                      {/* Badge Diskon (Dipindahkan ke sini) */}
                      {discountPercent > 0 && (
                        <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                          Hemat {discountPercent}%
                        </span>
                      )}
                    </div>

                    {/* Judul */}
                    <h4 className="font-[Oswald] text-white text-sm font-bold leading-tight uppercase line-clamp-2 min-h-[2.5em]">
                      {shortTitle}
                    </h4>
                  </div>

                  {/* Pricing Block */}
                  <div className="mt-3">
                    {/* Harga Coret */}
                    <div className="text-gray-500 text-[10px] line-through decoration-red-500">
                      {formatRupiah(normal)}
                    </div>

                    {/* Harga Promo */}
                    <div className="text-[#FFD700] font-[Oswald] text-lg font-bold leading-none mt-0.5">
                      {formatRupiah(promo)}
                    </div>

                    {/* Info Hemat Kecil */}
                    {saving > 0 && (
                      <div className="text-green-500 text-[9px] font-bold mt-1">
                        Hemat {formatRupiah(saving)}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleWhatsApp(item.title)}
                    className="mt-3 w-full bg-[#FFD700] text-black text-[10px] font-bold py-2 rounded transition-colors uppercase flex items-center justify-center gap-1 hover:bg-[#FFC107]"
                  >
                    <span>Ambil Paket</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* === MODAL IMAGE === */}
      {modalItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-6 animate-in fade-in duration-200"
          onClick={() => setModalItem(null)}
        >
          <div className="relative w-full max-w-md bg-[#121212] rounded border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <h3 className="text-white font-[Oswald] text-lg uppercase">
                Detail Paket Hemat
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
            <div className="relative w-full aspect-square bg-black">
              <Image
                src={modalItem.image}
                alt="Detail"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4 border-t border-white/10">
              <button
                onClick={() => handleWhatsApp(modalItem.title)}
                className="w-full bg-[#FFD700] text-black font-bold py-3 uppercase rounded shadow-lg hover:bg-[#FFC107] transition-colors"
              >
                Ambil Paket
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
