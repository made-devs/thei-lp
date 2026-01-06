"use client";

export default function TopNavigation() {
  return (
    // Hapus 'absolute', 'top-0', dll. Ganti dengan layout statis
    <nav className="w-full px-6 py-8 flex items-center justify-between border-t border-white/5 bg-thei-dark">
      {/* Brand / Logo Kiri */}
      <div className="flex flex-col">
        <span className="font-[Oswald] font-bold text-xl text-white tracking-wider leading-none">
          THEI
        </span>
        <span className="text-[9px] text-gray-400 mt-0.5 tracking-widest uppercase">
          TJM Heavy Equipment <br /> Indonesia
        </span>
      </div>

      {/* Button ke Web Utama */}
      <a
        href="https://www.tjmheavyequipment.co.id"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10 hover:border-[#FFD700]/30 transition-all"
      >
        <span className="text-[10px] font-bold uppercase tracking-wide text-white group-hover:text-[#FFD700] transition-colors">
          Web Utama
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400 group-hover:text-[#FFD700] transition-colors"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </nav>
  );
}
