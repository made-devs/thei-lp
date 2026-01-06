"use client";

import {
  premiumServices,
  economisServices,
  repairServices,
  rentalServices,
  contractServices,
} from "../data/data";

// Import Components
import Hero from "../components/Hero";
import USPSection from "../components/USPSection";
import GallerySection from "../components/GallerySection";
import FooterCTA from "../components/FooterCTA";
import SectionsTabs from "../components/SectionsTabs";
import TopNavigation from "@/components/TopNavigation";

export default function LandingPage() {
  return (
    // Outer Wrapper (Desktop Background)
    <div className="flex min-h-screen w-full justify-center bg-[#050505]">
      {/* Mobile Container Locked */}
      <div className="relative w-full max-w-120 bg-thei-dark min-h-screen flex flex-col shadow-2xl overflow-hidden pb-24">
        <Hero />

        <USPSection />

        <GallerySection />

        <SectionsTabs
          premiumServices={premiumServices}
          economisServices={economisServices}
          repairServices={repairServices}
          rentalServices={rentalServices}
          contractServices={contractServices}
        />
        <TopNavigation />

        <FooterCTA />
      </div>
    </div>
  );
}
