'use client';

import { useMemo, useRef, useState } from 'react';

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
  const [active, setActive] = useState('premium');
  const topRef = useRef(null);

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

  return (
    <section ref={topRef} className="mt-2">
      {/* Tab Bar (sticky biar enak di mobile) */}
      <div className="sticky top-0 z-20 bg-[#121212]/95 backdrop-blur border-b border-white/10">
        <div className="px-4 py-3 overflow-x-auto thei-scrollbar">
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
                      ? 'bg-[#FFD700] text-[#121212]'
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
