"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function RentalSection({ data }) {
  const [modalItem, setModalItem] = useState(null);

  // Arrow visibility states
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Drag Refs
  const scrollerRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const dragDistance = useRef(0);

  const handleWA = (unitName) => {
    const message = `Halo THEI, saya tertarik dengan Paket Rental unit ${unitName}. Boleh minta info harga dan ketersediaan?`;
    window.open(
      `https://wa.me/6285195886789?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // Check scroll position for arrows
  const checkScrollButtons = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 2);
    setShowRightArrow(
      Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth - 2
    );
  };

  // Scroll container function
  const scrollContainer = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth / 2;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    checkScrollButtons();
  };

  // Drag Handlers
  const onMouseDown = (e) => {
    isDown.current = true;
    dragDistance.current = 0;
    scrollerRef.current.classList.add("active-dragging");
    startX.current = e.pageX - scrollerRef.current.offsetLeft;
    scrollLeftPos.current = scrollerRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown.current = false;
    scrollerRef.current.classList.remove("active-dragging");
  };

  const onMouseUp = () => {
    isDown.current = false;
    scrollerRef.current.classList.remove("active-dragging");
  };

  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Speed multiplier
    scrollerRef.current.scrollLeft = scrollLeftPos.current - walk;
    dragDistance.current = Math.abs(walk);
  };

  const handleCardClick = (item) => {
    // Hanya buka modal jika bukan sedang drag
    if (dragDistance.current < 5) {
      setModalItem(item);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => {
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, []);

  return (
    <section className="py-5 bg-[#0A0A0A] relative border-t border-white/5">
      <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#111_0px,#111_10px,#151515_10px,#151515_20px)] pointer-events-none"></div>

      <div className="relative z-10">
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
            Paket Rental menawarkan solusi sewa forklift untuk operasional
            harian, bulanan, hingga tahunan. Anda bisa langsung menggunakan unit
            tanpa investasi pembelian, sehingga kebutuhan kerja terpenuhi dengan
            lebih fleksibel dan efisien.
          </p>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <div
            className={`absolute left-0 top-0 bottom-0 z-30 flex items-center bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent px-2 transition-opacity duration-300 ${
              showLeftArrow
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <button
              onClick={() => scrollContainer("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD700] text-[#0A0A0A] shadow-lg hover:bg-white transition-colors"
              aria-label="Scroll Left"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>

          <div
            ref={scrollerRef}
            onScroll={handleScroll}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            className="flex gap-4 overflow-x-auto px-6 pb-8 thei-scrollbar snap-x md:snap-none cursor-grab active:cursor-grabbing select-none scroll-smooth"
          >
            {data.map((item) => {
              const features = item.benefits || [
                "Unit Replacement Guarantee",
                "Safety Kit (APAR, APD, Helm)",
                "Layanan Mekanik 24 Jam",
                "Free Mob & De-Mob (S&K)",
                "Laporan Time Shift Harian",
              ];

              return (
                <div
                  key={item.id}
                  className="group relative w-75 shrink-0 snap-center bg-[#1A1A1A] rounded-xl overflow-hidden border border-white/10 hover:border-[#FFD700] transition-all shadow-lg flex flex-col"
                >
                  <div
                    className="relative aspect-square w-full bg-thei-dark cursor-pointer"
                    onClick={() => handleCardClick(item)}
                  >
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
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                    />
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

                  <div className="p-5 pt-2 flex flex-col gap-3 flex-1 relative">
                    <h3 className="font-[Oswald] text-xl font-bold text-white uppercase leading-tight mt-1 line-clamp-2">
                      {item.title.replace("PAKET RENTAL ", "")}
                    </h3>
                    <div className="h-px w-full bg-white/10"></div>
                    <div className="flex flex-col gap-2">
                      {features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="mt-0.5 min-w-3.5">
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
                    <div className="mt-auto pt-4"></div>
                    <button
                      onClick={() => handleWA(item.title)}
                      className="w-full bg-[#FFD700] hover:bg-[#FFC107] text-black font-bold py-3.5 rounded uppercase text-xs tracking-wider transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-[0_4px_10px_rgba(255,215,0,0.2)]"
                    >
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

          {/* Right Arrow */}
          <div
            className={`absolute right-0 top-0 bottom-0 z-30 flex items-center justify-end bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent px-2 transition-opacity duration-300 ${
              showRightArrow
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <button
              onClick={() => scrollContainer("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD700] text-[#0A0A0A] shadow-lg hover:bg-white transition-colors"
              aria-label="Scroll Right"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {modalItem && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-md p-6 animate-in fade-in duration-200"
          onClick={() => setModalItem(null)}
        >
          <div
            className="relative w-full max-w-md bg-thei-dark rounded border border-white/10 shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
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
            </div>
            <div className="relative w-full aspect-square bg-black">
              <Image
                src={modalItem.image}
                alt="Detail Rental"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4 border-t border-white/10">
              <button
                onClick={() => handleWA(modalItem.title)}
                className="w-full bg-[#FFD700] hover:bg-[#FFC107] text-black font-bold py-3 uppercase rounded flex items-center justify-center gap-2 transition-colors"
              >
                Tanya Unit Ini
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
