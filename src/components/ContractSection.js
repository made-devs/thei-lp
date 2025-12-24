'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export default function ContractSection({ data }) {
  const [modalItem, setModalItem] = useState(null);

  // Drag Refs
  const scrollerRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const dragDistance = useRef(0);

  const handleWA = (title) => {
    const message = `Halo THEI, saya tertarik untuk diskusi mengenai ${title}. Bisa dikirimkan proposal penawarannya?`;
    window.open(
      `https://wa.me/6285195886789?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  // Drag Handlers
  const onMouseDown = (e) => {
    isDown.current = true;
    dragDistance.current = 0;
    scrollerRef.current.classList.add('active-dragging');
    startX.current = e.pageX - scrollerRef.current.offsetLeft;
    scrollLeftPos.current = scrollerRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown.current = false;
    scrollerRef.current?.classList.remove('active-dragging');
  };

  const onMouseUp = () => {
    isDown.current = false;
    scrollerRef.current?.classList.remove('active-dragging');
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

  return (
    <section className="py-5 bg-[#0F0F0F] relative border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-[#FFD700] opacity-5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="px-6 mb-8 text-center">
        <span className="text-[#FFD700] text-xs font-bold tracking-[0.2em] uppercase mb-2 block">
          Long Term Maintenance
        </span>
        <h2 className="font-[Oswald] text-3xl font-bold text-white uppercase leading-tight">
          Contract Service
        </h2>
        <p className="text-gray-400 text-xs mt-2 max-w-xs mx-auto">
          Jaminan performa unit jangka panjang dengan biaya lebih hemat &
          terencana.
        </p>
      </div>

      <div
        ref={scrollerRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        className="flex gap-5 overflow-x-auto px-6 pb-10 thei-scrollbar snap-x md:snap-none items-stretch cursor-grab active:cursor-grabbing select-none"
      >
        {data.map((item) => {
          const normal = item.priceNormal || 0;
          const promo = item.pricePromo || 0;
          const saving = normal - promo;
          const discountPercent =
            normal > 0 ? Math.round((saving / normal) * 100) : 0;
          const duration = item.title.match(/(\d+)\s*BULAN/i)?.[1] || 'PKG';

          return (
            <div
              key={item.id}
              className="group relative w-[280px] shrink-0 snap-center flex flex-col bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#FFD700]/20 hover:border-[#FFD700] transition-all shadow-lg hover:shadow-[0_0_30px_rgba(255,215,0,0.1)]"
            >
              <div
                className="relative aspect-square w-full bg-black cursor-pointer overflow-hidden"
                onClick={() => handleCardClick(item)}
              >
                <Image
                  src={item.image}
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
                  {duration} Bulan Package
                </h3>

                <div className="text-gray-400 text-[10px] mb-4 font-medium border-b border-white/10 pb-3">
                  {duration === '3' && 'Service 250 HM (Max 3x Kunjungan)'}
                  {duration === '6' && 'Service 500 HM (Max 6x Kunjungan)'}
                  {duration === '12' && 'Service 1000 HM (Max 12x Kunjungan)'}
                </div>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-gray-300 text-[11px]">
                    <span className="text-[#FFD700]">✓</span>
                    <span>Promo Gratis Senilai 20 Juta</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300 text-[11px]">
                    <span className="text-[#FFD700]">✓</span>
                    <span>
                      {duration === '3' ? '20' : duration === '6' ? '20' : '34'}{' '}
                      Titik Inspeksi Engine
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300 text-[11px]">
                    <span className="text-[#FFD700]">✓</span>
                    <span>Laporan Digital Mingguan & Bulanan</span>
                  </li>
                </ul>

                <div className="mt-auto bg-[#121212] p-3 rounded border border-white/5 group-hover:border-[#FFD700]/30 transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-500 text-[10px] line-through decoration-red-500">
                      {formatRupiah(normal)}
                    </span>
                    {discountPercent > 0 && (
                      <span className="text-red-500 text-[10px] font-bold bg-red-500/10 px-1.5 rounded">
                        Save {discountPercent}%
                      </span>
                    )}
                  </div>
                  <div className="text-[#FFD700] font-[Oswald] text-2xl font-bold leading-none">
                    {formatRupiah(promo)}
                  </div>
                </div>

                <button
                  onClick={() => handleWA(item.title)}
                  className="w-full mt-3 bg-[#FFD700] text-black font-bold py-3 uppercase text-xs tracking-wider rounded transition-transform active:scale-95 shadow-lg hover:bg-[#FFC107] flex items-center justify-center gap-2"
                >
                  <span>Ajukan Kontrak</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {modalItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-6"
          onClick={() => setModalItem(null)}
        >
          <div
            className="relative w-full max-w-md bg-[#121212] rounded border border-white/10 shadow-2xl flex flex-col max-h-[90vh]"
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
                src={modalItem.image}
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
                Konsultasi Kontrak Ini
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
