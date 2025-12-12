"use client";
import { useState } from "react";
import Image from "next/image";

export default function RepairSection({ data }) {
  const [type, setType] = useState("hemat"); // 'hemat' or 'super'
  const [modalImage, setModalImage] = useState(null);

  return (
    <section className="py-12 bg-[#181818] border-t border-white/5 relative">
      {/* HEADER AREA */}
      <div className="px-6 mb-8">
        <h2 className="font-[Oswald] text-3xl font-bold text-white uppercase">
          Repair Service
        </h2>

        {/* --- TOGGLE SWITCH (Industrial Style) --- */}
        <div className="mt-4 flex items-center bg-black/40 border border-white/10 rounded p-1 w-full">
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
      </div>

      {/* --- LIST LAYOUT (INDUSTRIAL TICKET) --- */}
      <div className="px-6 flex flex-col gap-3">
        {data[type].map((item, index) => {
          // Clean Title
          const shortTitle = item.title
            .replace("Paket Repair ", "")
            .replace(" Hemat", "")
            .replace(" Super", "");

          // Menentukan urutan nomor biar keren (01, 02, dst)
          const number = (index + 1).toString().padStart(2, "0");

          return (
            <div
              key={item.id}
              onClick={() => setModalImage(item.image)}
              className="group relative flex w-full h-[150px] bg-[#252525] rounded overflow-hidden border border-white/5 hover:border-[#FFD700] transition-all cursor-pointer shadow-lg"
            >
              {/* 1. IMAGE AREA (KIRI) */}
              <div className="relative w-[35%] h-full bg-black aspect-square">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 rounded"
                />
                {/* Overlay Kuning Tipis saat hover */}
                <div className="absolute inset-0 bg-[#FFD700]/0 group-hover:bg-[#FFD700]/10 transition-colors"></div>
              </div>

              {/* 2. DECORATION (GARIS SOBEKAN/DIVIDER) */}
              <div className="w-[10px] h-full bg-[#181818] relative flex flex-col justify-between items-center py-1">
                {/* Motif gerigi/jahitan */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[2px] h-[8px] bg-[#333] rounded-full"
                  ></div>
                ))}
              </div>

              {/* 3. CONTENT AREA (KANAN) */}
              <div className="flex-1 p-3 flex flex-col justify-center relative">
                {/* Background Number (Watermark) */}
                <div className="absolute right-2 top-0 text-[40px] font-[Oswald] font-bold text-white/5 pointer-events-none">
                  {number}
                </div>

                {/* Title */}
                <h3 className="font-[Oswald] text-lg font-bold text-white uppercase leading-none pr-6">
                  {shortTitle}
                </h3>

                {/* Subtext / Action */}
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded text-black uppercase ${
                      type === "hemat" ? "bg-gray-400" : "bg-[#FFD700]"
                    }`}
                  >
                    {type}
                  </span>
                  <span className="text-[10px] text-[#FFD700] group-hover:underline decoration-[#FFD700]">
                    Lihat Detail &rarr;
                  </span>
                </div>

                {/* Icon Panah Pojok Kanan */}
                <div className="absolute top-3 right-3 text-gray-600 group-hover:text-[#FFD700] transition-colors">
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- MODAL IMAGE --- */}
      {modalImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-6 animate-in fade-in duration-200"
          onClick={() => setModalImage(null)}
        >
          <div className="relative w-full max-w-md bg-[#121212] rounded border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header Modal */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <h3 className="text-white font-[Oswald] text-lg uppercase">
                Detail Paket
              </h3>
              <button
                onClick={() => setModalImage(null)}
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

            {/* Image Container (Scrollable if needed) */}
            <div className="relative w-full aspect-square bg-black">
              <Image
                src={modalImage}
                alt="Detail"
                fill
                className="object-contain"
              />
            </div>

            {/* Footer Modal CTA */}
            <div className="p-4 border-t border-white/10">
              <button className="w-full bg-[#FFD700] hover:bg-[#FFC107] text-black font-bold py-3 uppercase rounded shadow-lg flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                Konsultasi Via WA
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
