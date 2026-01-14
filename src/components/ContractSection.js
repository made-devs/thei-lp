"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { contractData } from "../data/contractData";

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export default function ContractSection() {
  const [modalItem, setModalItem] = useState(null);
  const data = contractData;

  // Arrow visibility states
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Drag Refs
  const scrollerRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const dragDistance = useRef(0);

  const handleWA = (title) => {
    let message = "";
    if (title.includes("3 BULAN")) {
      message = `Halo THEI, saya tertarik dengan Contract Service 3 Bulan Package. Mohon info lebih detail dan proposalnya. Terima kasih!`;
    } else if (title.includes("6 BULAN")) {
      message = `Halo THEI, saya tertarik dengan Contract Service 6 Bulan Package. Mohon info lebih detail dan proposalnya. Terima kasih!`;
    } else if (title.includes("12 BULAN")) {
      message = `Halo THEI, saya tertarik dengan Contract Service 12 Bulan Package. Mohon info lebih detail dan proposalnya. Terima kasih!`;
    } else if (title.includes("MULTIPLE")) {
      message = `Halo THEI, saya tertarik dengan Multiple Unit Discount untuk lebih dari 1 unit forklift. Mohon info lebih detail tentang diskon dan benefit yang tersedia. Terima kasih!`;
    } else {
      message = `Halo THEI, saya tertarik untuk diskusi mengenai ${title}. Bisa dikirimkan proposal penawarannya?`;
    }

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
    scrollerRef.current?.classList.remove("active-dragging");
  };

  const onMouseUp = () => {
    isDown.current = false;
    scrollerRef.current?.classList.remove("active-dragging");
  };

  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollerRef.current.scrollLeft = scrollLeftPos.current - walk;
    dragDistance.current = Math.abs(walk);
  };

  const handleCardClick = (item) => {
    // Hanya buka modal jika user tidak sedang drag
    if (dragDistance.current < 5) {
      setModalItem(item);
    }
  };

  const getButtonText = (title) => {
    return "Tanya Detail";
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => {
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, []);

  return (
    <section className="py-5 bg-[#0F0F0F] relative border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-50 bg-[#FFD700] opacity-5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="px-6 mb-8 text-center">
        <span className="text-[#FFD700] text-xs font-bold tracking-[0.2em] uppercase mb-2 block">
          Long Term Maintenance
        </span>
        <h2 className="font-[Oswald] text-3xl font-bold text-white uppercase leading-tight">
          Contract Service
        </h2>
        <p className="text-gray-400 text-xs mt-2 max-w-xs mx-auto">
          Contract Service adalah layanan perawatan alat berat berbasis kontrak
          waktu dan jam kerja, di mana unit diservis rutin dan terjadwal agar
          kondisinya tetap terjaga dan siap digunakan.
        </p>
      </div>

      <div className="relative">
        {/* Left Arrow */}
        <div
          className={`absolute left-0 top-0 bottom-0 z-30 flex items-center bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent px-2 transition-opacity duration-300 ${
            showLeftArrow
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => scrollContainer("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD700] text-[#0F0F0F] shadow-lg hover:bg-white transition-colors"
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
          className="flex gap-5 overflow-x-auto px-6 pb-10 thei-scrollbar snap-x md:snap-none items-stretch cursor-grab active:cursor-grabbing select-none scroll-smooth"
        >
          {data.map((item) => {
            const normal = item.price?.original || 0;
            const promo = item.price?.discounted || 0;
            const saving = normal - promo;
            const discountPercent =
              normal > 0 ? Math.round((saving / normal) * 100) : 0;

            return (
              <div
                key={item.id}
                className="group relative w-70 shrink-0 snap-center flex flex-col bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#FFD700]/20 hover:border-[#FFD700] transition-all shadow-lg hover:shadow-[0_0_30px_rgba(255,215,0,0.1)]"
              >
                <div
                  className="relative aspect-square w-full bg-black cursor-pointer overflow-hidden"
                  onClick={() => handleCardClick(item)}
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/60 p-2 rounded-full text-white backdrop-blur-sm border border-white/10 group-hover:bg-[#FFD700] group-hover:text-black transition-colors">
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

                <div className="p-5 pt-2 flex flex-col flex-1 relative">
                  <h3 className="font-[Oswald] text-lg font-bold text-white uppercase leading-tight mb-3">
                    {item.title}
                  </h3>

                  <div className="text-gray-400 text-[10px] mb-4 font-medium border-b border-white/10 pb-3">
                    {item.subtitle}
                  </div>

                  <ul className="space-y-2 mb-6 max-h-20 overflow-y-auto">
                    {item.benefits &&
                      item.benefits.map((benefit, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-300 text-[11px]"
                        >
                          <span className="text-[#FFD700]">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                  </ul>

                  {/* Khusus Multiple Unit Discount tampilkan note, bukan harga */}
                  {item.id === 4 ? (
                    <div className="mt-auto bg-thei-dark p-3 rounded border border-white/5 text-[11px] text-yellow-400 font-semibold text-center">
                      {item.note}
                    </div>
                  ) : (
                    <div className="mt-auto bg-thei-dark p-3 rounded border border-white/5 group-hover:border-[#FFD700]/30 transition-colors">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-500 text-[10px] line-through decoration-red-500">
                          {formatRupiah(item.price?.original || 0)}
                        </span>
                        {item.price?.original > 0 &&
                          item.price?.discounted > 0 && (
                            <span className="text-red-500 text-[10px] font-bold bg-red-500/10 px-1.5 rounded">
                              Save{" "}
                              {Math.round(
                                ((item.price.original - item.price.discounted) /
                                  item.price.original) *
                                  100
                              )}
                              %
                            </span>
                          )}
                      </div>
                      <div className="text-[#FFD700] font-[Oswald] text-2xl font-bold leading-none">
                        {formatRupiah(item.price?.discounted || 0)}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => handleWA(item.title)}
                    className="w-full mt-3 bg-[#FFD700] text-black font-bold py-3 uppercase text-xs tracking-wider rounded transition-transform active:scale-95 shadow-lg hover:bg-[#FFC107] flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span>{getButtonText(item.title)}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <div
          className={`absolute right-0 top-0 bottom-0 z-30 flex items-center justify-end bg-gradient-to-l from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent px-2 transition-opacity duration-300 ${
            showRightArrow
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => scrollContainer("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD700] text-[#0F0F0F] shadow-lg hover:bg-white transition-colors"
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

      {modalItem && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-md p-6"
          onClick={() => setModalItem(null)}
        >
          <div
            className="relative w-full max-w-md bg-thei-dark rounded border border-white/10 shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <h3 className="text-white font-[Oswald] text-lg uppercase">
                Detail Kontrak
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
                src={modalItem.imageSrc}
                alt="Detail Contract"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4 border-t border-white/10">
              <button
                onClick={() => handleWA(modalItem.title)}
                className="w-full bg-[#FFD700] hover:bg-[#FFC107] text-black font-bold py-3 uppercase rounded shadow-lg flex items-center justify-center gap-2 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>Konsultasi via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
