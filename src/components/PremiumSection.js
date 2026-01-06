"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export default function PremiumSection({ data }) {
  const [activeTab, setActiveTab] = useState(data[0].category);
  const activeItems =
    data.find((cat) => cat.category === activeTab)?.items || [];
  const [modalImage, setModalImage] = useState(null);
  const containerRef = useRef(null);

  // Drag Refs
  const tabScrollerRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const dragDist = useRef(0);

  useGSAP(
    () => {
      gsap.fromTo(
        ".premium-card",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }
      );
    },
    { dependencies: [activeTab], scope: containerRef }
  );

  const handleWhatsApp = (title) => {
    const phone = "6285195886789";
    const message = `Halo Admin THEI, saya tertarik dengan paket Premium Service ${title}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Drag Handlers
  const onMouseDown = (e) => {
    isDown.current = true;
    dragDist.current = 0;
    tabScrollerRef.current.classList.add("active-dragging");
    startX.current = e.pageX - tabScrollerRef.current.offsetLeft;
    scrollLeftPos.current = tabScrollerRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown.current = false;
    tabScrollerRef.current?.classList.remove("active-dragging");
  };

  const onMouseUp = () => {
    isDown.current = false;
    tabScrollerRef.current?.classList.remove("active-dragging");
  };

  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - tabScrollerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    tabScrollerRef.current.scrollLeft = scrollLeftPos.current - walk;
    dragDist.current = Math.abs(walk);
  };

  const handleTabClick = (category) => {
    // Klik hanya jalan jika tidak sedang drag
    if (dragDist.current < 5) {
      setActiveTab(category);
    }
  };

  return (
    <section ref={containerRef} className="py-5 bg-[#0F0F0F]">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1 w-8 bg-[#FFD700]"></div>
          <span className="text-[#FFD700] text-xs font-bold tracking-widest uppercase">
            Best Seller
          </span>
        </div>
        <h2 className="font-[Oswald] text-3xl font-bold text-white uppercase">
          Paket Premium
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Premium Service adalah layanan perawatan forklift & alat berat dengan
          cakupan paling lengkap dan menyeluruh. Dirancang untuk menjaga
          performa maksimal, memastikan seluruh sistem utama tetap prima, dan
          unit selalu siap menghadapi pekerjaan berat setiap hari.
        </p>
      </div>

      <div className="sticky top-16 z-30 bg-[#0F0F0F]/95 backdrop-blur py-2 border-b border-white/10 mb-6">
        <div
          ref={tabScrollerRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          className="flex gap-3 overflow-x-auto px-6 pb-2 snap-x md:snap-none thei-scrollbar cursor-grab active:cursor-grabbing select-none"
        >
          {data.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => handleTabClick(cat.category)}
              className={`snap-start whitespace-nowrap px-6 py-2.5 rounded text-sm font-bold transition-all border uppercase tracking-wider ${
                activeTab === cat.category
                  ? "bg-[#FFD700] text-black border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.4)]"
                  : "bg-[#1E1E1E] text-gray-400 border-white/10 hover:border-white/30"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 space-y-8">
        {activeItems.map((item) => {
          const saving = item.priceNormal - item.pricePromo;
          const discountPercent = Math.round((saving / item.priceNormal) * 100);

          return (
            <div
              key={item.id}
              className="premium-card group relative bg-[#1A1A1A] rounded-xl border border-white/10 overflow-hidden hover:border-[#FFD700] transition-colors duration-300"
            >
              <div
                className="relative aspect-square w-full bg-thei-dark overflow-hidden cursor-pointer"
                onClick={() => setModalImage(item.image)}
              >
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <div className="bg-white/20 backdrop-blur border border-white/50 px-4 py-2 rounded-full flex items-center gap-2">
                    <span className="text-white text-xs font-bold uppercase">
                      ZOOM GRAFIS
                    </span>
                  </div>
                </div>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

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
                  {item.title.replace("THEI PREMIUM SERVICE ", "")}
                </h3>

                <div className="mb-4 inline-flex items-center gap-2 bg-green-900/30 border border-green-500/30 px-3 py-1.5 rounded w-full">
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

                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-start gap-1">
                    <div className="text-gray-500 text-sm font-medium line-through decoration-red-500 decoration-2">
                      {formatRupiah(item.priceNormal)}
                    </div>
                    <div className="text-[#FFD700] font-[Oswald] text-3xl font-bold leading-none">
                      {formatRupiah(item.pricePromo)}
                    </div>
                  </div>

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
                  className="mt-5 w-full bg-[#FFD700] hover:bg-[#FFC107] text-black font-bold py-3 uppercase text-sm tracking-wider rounded-sm transition-transform active:scale-95"
                >
                  Ambil Paket
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {modalImage && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setModalImage(null)}
        >
          <div className="relative w-full max-w-lg aspect-square">
            <Image
              src={modalImage}
              alt="Detail Promo"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
}
