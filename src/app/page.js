'use client';

import { useRef } from 'react';
import {
  premiumServices,
  economisServices,
  repairServices,
  rentalServices,
  contractServices,
} from '../data/data'; // Import data yang tadi kita buat

// Import Components
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PainPoints from '../components/PainPoints';
import PremiumSection from '../components/PremiumSection';
import RepairSection from '../components/RepairSection';
import EconomisSection from '../components/EconomisSection';
import RentalContractSection from '../components/ContractSection';
import FooterCTA from '../components/FooterCTA';
import RentalSection from '../components/RentalSection';
import ContractSection from '../components/ContractSection';

export default function LandingPage() {
  return (
    // Outer Wrapper (Desktop Background)
    <div className="flex min-h-screen w-full justify-center bg-[#050505]">
      {/* Mobile Container Locked */}
      <div className="relative w-full max-w-[480px] bg-[#121212] min-h-screen flex flex-col shadow-2xl overflow-hidden pb-24">
        <Navbar />

        <Hero />

        {/* Section: Premium Services (Horizontal Tabs) */}
        <PremiumSection data={premiumServices} />

        {/* Section: Economis (Grid List) */}
        <EconomisSection data={economisServices} />

        {/* Section: Repair Services (Toggle Switch) */}
        <RepairSection data={repairServices} />

        <RentalSection data={rentalServices} />

        <ContractSection data={contractServices} />

        <FooterCTA />
      </div>
    </div>
  );
}
