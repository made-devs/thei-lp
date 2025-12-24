'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import PremiumSection from './PremiumSection';
import EconomisSection from './EconomisSection';
import RepairSection from './RepairSection';
import RentalSection from './RentalSection';
import ContractSection from './ContractSection';

export default function SectionsTabs({
  premiumServices,
  economisServices,
  repairServices,
  rentalServices,
  contractServices,
}) {
  const [active, setActive] = useState('economis');
  const topRef = useRef(null);

  const scrollerRef = useRef(null);
  const scrollTimerRef = useRef(null);

  const tabs = useMemo(
    () => [
      { id: 'economis', label: 'Ekonomis' },
      { id: 'repair', label: 'Repair' },
      { id: 'premium', label: 'Premium' },
      { id: 'rental', label: 'Rental' },
      { id: 'contract', label: 'Kontrak' },
    ],
    []
  );

  const handleTab = (id) => {
    setActive(id);
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;

    el.classList.add('is-scrolling');

    if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = window.setTimeout(() => {
      el.classList.remove('is-scrolling');
    }, 800);
  };

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
    };
  }, []);

  return (
    <section ref={topRef} className="mt-2">
      {/* Heading / Wording */}
      <div className="px-4 pt-6 pb-4">
        <div className="mx-auto max-w-5xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#FFD700]/40 bg-[#FFD700]/10 px-4 py-2 text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.18em] text-[#FFD700]">
            Paket Service
          </p>

          <h2 className="mt-4 font-[Oswald] text-2xl sm:text-3xl md:text-4xl font-bold uppercase leading-tight text-white">
            Paket Service Alat Berat Terlengkap{' '}
            <span className="text-[#FFD700]">
              dan Dapatkan Bonus yang Tak Terhingga
            </span>
          </h2>

          <div className="mt-4 flex justify-center">
            <span className="h-0.5 w-24 rounded-full bg-[#FFD700] shadow-[0_0_16px_rgba(255,215,0,0.35)]" />
          </div>
        </div>
      </div>

      {/* Tab Bar (sticky biar enak di mobile) */}
      <div className="sticky top-0 z-20 bg-thei-dark/95 backdrop-blur border-b border-white/10">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="px-4 py-3 overflow-x-auto thei-scrollbar"
        >
          <div className="inline-flex gap-2">
            {tabs.map((t) => {
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTab(t.id)}
                  aria-pressed={isActive}
                  className={[
                    'whitespace-nowrap rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition',
                    isActive
                      ? 'bg-[#FFD700] text-thei-dark'
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10',
                  ].join(' ')}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="pt-4">
        {active === 'economis' && <EconomisSection data={economisServices} />}
        {active === 'repair' && <RepairSection data={repairServices} />}
        {active === 'premium' && <PremiumSection data={premiumServices} />}
        {active === 'rental' && <RentalSection data={rentalServices} />}
        {active === 'contract' && <ContractSection data={contractServices} />}
      </div>
    </section>
  );
}
