'use client';
import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function FooterCTA() {
  const [visible, setVisible] = useState(false);
  const footerRef = useRef(null);
  const buttonRef = useRef(null);

  // Monitor scroll untuk show/hide
  useGSAP(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        // Gue turunin dikit thresholdnya biar lebih cepet muncul
        if (!visible) setVisible(true);
      } else {
        if (visible) setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  // Animasi transisi & pulse
  useGSAP(() => {
    if (visible) {
      gsap.to(footerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.4)',
      });

      // Efek denyut glow pada tombol
      gsap.to(buttonRef.current, {
        boxShadow: '0 0 25px rgba(255, 215, 0, 0.6)',
        repeat: -1,
        yoyo: true,
        duration: 1.2,
      });
    } else {
      gsap.to(footerRef.current, {
        y: '100%', // Turun sepenuhnya ke bawah layar
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [visible]);

  const handleWhatsApp = () => {
    const message = `Halo THEI, saya ingin klaim Promo 100JT dan Bonus Servis Mobil 250JT. Mohon info lengkapnya.`;
    window.open(
      `https://wa.me/6285195886789?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    // Container utama ditambahkan bg-blur dan styling
    <div
      ref={footerRef}
      style={{ opacity: 0, transform: 'translateY(100%)' }}
      className="fixed bottom-0 left-1/2 z-[60] w-full max-w-[480px] -translate-x-1/2 p-4 pt-3 pb-3 rounded-t-3xl bg-[#000000]/20 backdrop-blur-sm border-t border-white/10 shadow-[0_-10px_20px_rgba(0,0,0,0.3)]"
    >
      {/* Floating Label Promo */}
      {/* <div className="mb-3 flex justify-center relative -top-2">
        <span className="animate-bounce rounded-full bg-[#FF0000] px-4 py-1 text-[11px] font-black text-white shadow-md uppercase tracking-wider border border-white/20">
          🔥 Promo 100JT & Bonus 250JT Menanti!
        </span>
      </div> */}

      <button
        ref={buttonRef}
        onClick={handleWhatsApp}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#FFD700] py-4 text-lg font-black text-[#121212] shadow-lg active:scale-95 transition-transform"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
        </svg>
        KLAIM PROMO SEKARANG
      </button>
    </div>
  );
}
