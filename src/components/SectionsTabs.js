"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PremiumSection from "./PremiumSection";
import EconomisSection from "./EconomisSection";
import RepairSection from "./RepairSection";
import RentalSection from "./RentalSection";
import ContractSection from "./ContractSection";

export default function SectionsTabs({
  premiumServices,
  economisServices,
  repairServices,
  rentalServices,
  contractServices,
}) {
  const [active, setActive] = useState("economis");

  // State untuk visibilitas panah
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const topRef = useRef(null);
  const scrollerRef = useRef(null);
  const scrollTimerRef = useRef(null);

  // Drag states
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const dragDistance = useRef(0);

  const tabs = useMemo(
    () => [
      { id: "economis", label: "Ekonomis" },
      { id: "repair", label: "Repair" },
      { id: "premium", label: "Premium" },
      { id: "rental", label: "Rental" },
      { id: "contract", label: "Kontrak" },
    ],
    []
  );

  // Fungsi utilitas untuk cek posisi scroll
  const checkScrollButtons = () => {
    const el = scrollerRef.current;
    if (!el) return;

    // Toleransi 2px untuk memastikan akurasi di berbagai layar
    setShowLeftArrow(el.scrollLeft > 2);
    setShowRightArrow(
      Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth - 2
    );
  };

  const handleTab = (id) => {
    // Cegah ganti tab jika user sebenarnya sedang men-drag
    if (dragDistance.current > 5) return;

    setActive(id);
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleScroll = () => {
    checkScrollButtons(); // Cek panah setiap kali scroll
    const el = scrollerRef.current;
    if (!el) return;
    el.classList.add("is-scrolling");
    if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = window.setTimeout(() => {
      el.classList.remove("is-scrolling");
    }, 800);
  };

  // Fungsi untuk tombol panah
  const scrollContainer = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth / 2; // Scroll setengah layar
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Mouse Drag Handlers
  const onMouseDown = (e) => {
    isDown.current = true;
    dragDistance.current = 0;
    scrollerRef.current.classList.add("active-drag");
    startX.current = e.pageX - scrollerRef.current.offsetLeft;
    scrollLeftPos.current = scrollerRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown.current = false;
    scrollerRef.current.classList.remove("active-drag");
  };

  const onMouseUp = () => {
    isDown.current = false;
    scrollerRef.current.classList.remove("active-drag");
  };

  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Speed multiplier
    scrollerRef.current.scrollLeft = scrollLeftPos.current - walk;
    dragDistance.current = Math.abs(walk);
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => {
      window.removeEventListener("resize", checkScrollButtons);
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
    };
  }, []);

  return (
    <section ref={topRef} className="mt-2">
      <div className="px-4 pt-6 pb-4">
        <div className="mx-auto max-w-5xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#FFD700]/40 bg-[#FFD700]/10 px-4 py-2 text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.18em] text-[#FFD700]">
            Paket Service
          </p>
          <h2 className="mt-4 font-[Oswald] text-2xl sm:text-3xl md:text-4xl font-bold uppercase leading-tight text-white">
            Paket Service 19 Alat Berat Terlengkap & Termurah{" "}
            <span className="text-[#FFD700]">
              dapatkan promo dan bonus segila ini!
            </span>
          </h2>
          <div className="mt-4 flex justify-center">
            <span className="h-0.5 w-24 rounded-full bg-[#FFD700] shadow-[0_0_16px_rgba(255,215,0,0.35)]" />
          </div>
        </div>
      </div>

      <div className="top-0 z-20 bg-thei-dark/95 backdrop-blur border-b border-white/10 relative group">
        {/* Tombol Panah Kiri (Muncul jika bisa scroll kiri) */}
        <div
          className={`absolute left-0 top-0 bottom-0 z-30 flex items-center bg-linear-to-r from-thei-dark to-transparent px-2 transition-opacity duration-300 ${
            showLeftArrow
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => scrollContainer("left")}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700] text-thei-dark shadow-lg hover:bg-white transition-colors"
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

        {/* Scroll Container */}
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          className="px-4 py-3 overflow-x-auto thei-scrollbar cursor-grab active:cursor-grabbing select-none scroll-smooth" // Tambahkan scroll-smooth
        >
          <div className="inline-flex gap-2 px-6">
            {" "}
            {/* Tambah px-6 agar item ujung tidak tertutup panah */}
            {tabs.map((t) => {
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTab(t.id)}
                  aria-pressed={isActive}
                  className={[
                    "whitespace-nowrap rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition pointer-events-auto",
                    isActive
                      ? "bg-[#FFD700] text-thei-dark"
                      : "bg-white/5 text-white hover:bg-white/10 border border-white/10",
                  ].join(" ")}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tombol Panah Kanan (Muncul jika bisa scroll kanan) */}
        <div
          className={`absolute right-0 top-0 bottom-0 z-30 flex items-center justify-end bg-linear-to-l from-thei-dark to-transparent px-2 transition-opacity duration-300 ${
            showRightArrow
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => scrollContainer("right")}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700] text-thei-dark shadow-lg hover:bg-white transition-colors"
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

      <div className="pt-4">
        {active === "economis" && <EconomisSection data={economisServices} />}
        {active === "repair" && <RepairSection data={repairServices} />}
        {active === "premium" && <PremiumSection data={premiumServices} />}
        {active === "rental" && <RentalSection data={rentalServices} />}
        {active === "contract" && <ContractSection data={contractServices} />}
      </div>
    </section>
  );
}
