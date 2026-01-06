"use client";
import { useState } from "react";
import Image from "next/image";

// --- HELPER: Format Rupiah ---
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export default function RepairSection({ data }) {
  const [type, setType] = useState("hemat"); // 'hemat' or 'super'
  const [modalImage, setModalImage] = useState(null);
  const [modalItem, setModalItem] = useState(null);

  // Helper WhatsApp
  const handleWhatsApp = (title) => {
    const phone = "6285195886789";
    const message = `Halo Admin THEI, saya tertarik dengan ${title}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="py-5 bg-[#0F0F0F] relative border-t border-white/5">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-50 bg-[#FFD700] opacity-5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* HEADER (samain style kayak EconomisSection) */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1 w-8 bg-[#FFD700]"></div>
          <span className="text-[#FFD700] text-xs font-bold tracking-widest uppercase">
            Quick Service
          </span>
        </div>

        <h2 className="font-[Oswald] text-3xl font-bold text-white uppercase">
          Paket Repair
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          Pilih <b>Paket Repair Hemat</b> untuk solusi perbaikan cepat dan
          efisien pada sistem utama, cocok jika Anda ingin unit segera kembali
          berfungsi tanpa biaya berlebih. Untuk hasil lebih menyeluruh,{" "}
          <b>Paket Repair Super</b> hadir dengan cakupan perbaikan lebih luas
          dan detail, memastikan performa forklift dan alat berat Anda pulih
          maksimal seperti baru.
        </p>
      </div>

      {/* --- TOGGLE SWITCH --- */}
      <div className="px-6 mb-6 flex items-center bg-black/40 border border-white/10 rounded p-1 w-full">
        <button
          onClick={() => setType("hemat")}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all rounded ${
            type === "hemat"
              ? "bg-[#FFD700] text-black shadow-lg"
              : "text-gray-500 hover:text-white"
          }`}
        >
          Paket Hemat
        </button>
        <button
          onClick={() => setType("super")}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all rounded ${
            type === "super"
              ? "bg-[#FFD700] text-black shadow-lg"
              : "text-gray-500 hover:text-white"
          }`}
        >
          Paket Super
        </button>
      </div>

      {/* --- LIST LAYOUT (INDUSTRIAL TICKET) --- */}
      <div className="px-6 flex flex-col gap-3">
        {data[type].map((item, index) => {
          // 1. Clean Title
          const shortTitle = item.title
            .replace("Paket Repair ", "")
            .replace(" Hemat", "")
            .replace(" Super", "");

          // 2. Numbering (01, 02...)
          const number = (index + 1).toString().padStart(2, "0");

          // 3. Logic Hitung Harga (Pastikan di data.js sudah ada priceNormal & pricePromo)
          // Default 0 jaga-jaga kalau data harga belum diinput
          const normal = item.priceNormal || 0;
          const promo = item.pricePromo || 0;
          const saving = normal - promo;
          const discountPercent =
            normal > 0 ? Math.round((saving / normal) * 100) : 0;

          return (
            <div
              key={item.id}
              onClick={() => setModalItem(item)}
              className="group relative flex w-full h-37.5 bg-[#1A1A1A] rounded overflow-hidden border border-white/10 hover:border-[#FFD700] transition-all cursor-pointer shadow-lg"
            >
              {/* === BAGIAN KIRI: IMAGE (45%) === */}
              <div className="relative w-[45%] h-full bg-black shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                />
                {/* Visual Hint Zoom (Icon Kaca Pembesar Kecil) */}
                <div className="absolute bottom-2 right-2 bg-black/60 p-1 rounded text-white backdrop-blur-sm">
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

              {/* === BAGIAN TENGAH: DIVIDER === */}
              <div className="w-3 h-full bg-[#0F0F0F] relative flex flex-col justify-between items-center py-2 shrink-0 border-l border-r border-white/5">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-0.75 h-1.5 bg-[#333] rounded-full"
                  ></div>
                ))}
              </div>

              {/* === BAGIAN KANAN: CONTENT & PRICE (Flex-1) === */}
              <div className="flex-1 p-3 flex flex-col justify-between relative overflow-hidden">
                {/* Watermark Number */}
                <div className="absolute right-1 top-0 text-[50px] font-[Oswald] font-bold text-white/5 pointer-events-none leading-none">
                  {number}
                </div>

                {/* --- BARIS 1: JUDUL --- */}
                <div>
                  <h3 className="font-[Oswald] text-lg font-bold text-white uppercase leading-none pr-4 truncate">
                    {shortTitle}
                  </h3>
                </div>

                {/* --- BARIS 2: HARGA CORET & BADGE DISKON --- */}
                <div className="flex items-center gap-2 mt-1">
                  {/* Harga Normal (Coret) */}
                  <span className="text-gray-500 text-[10px] line-through decoration-red-500">
                    {formatRupiah(normal)}
                  </span>

                  {/* Badge Diskon (Merah) */}
                  {discountPercent > 0 && (
                    <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>

                {/* --- BARIS 3: HARGA PROMO & HEMAT --- */}
                <div className="mt-auto">
                  {/* Harga Promo (Kuning Besar) */}
                  <div className="text-[#FFD700] font-[Oswald] text-xl font-bold leading-none">
                    {formatRupiah(promo)}
                  </div>

                  {/* Info Hemat (Hijau) */}
                  {saving > 0 && (
                    <div className="text-green-500 text-[10px] font-bold mt-1 flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Hemat {formatRupiah(saving)}
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsApp(item.title);
                    }}
                    className="w-full bg-[#FFD700] hover:bg-[#FFC107] text-black text-[10px] font-bold uppercase py-1.5 rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Ambil Paket</span>
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
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>

                {/* Arrow Icon (Top Right absolute) */}
                <div className="absolute top-2 right-2 text-gray-600 group-hover:text-[#FFD700] transition-colors">
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- MODAL IMAGE --- */}
      {modalItem && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-md p-6 animate-in fade-in duration-200"
          onClick={() => setModalItem(null)}
        >
          <div className="relative w-full max-w-md bg-thei-dark rounded border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <h3 className="text-white font-[Oswald] text-lg uppercase">
                Detail Paket Repair
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
                className="w-full bg-[#FFD700] hover:bg-[#FFC107] text-black font-bold py-3 uppercase rounded shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                Ambil Paket
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
