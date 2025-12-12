export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-5 bg-gradient-to-b from-black/90 to-transparent">
      <div className="font-[Oswald] text-2xl font-bold text-white tracking-tighter">
        THEI<span className="text-[#FFD700]">.</span>
      </div>
      <button className="text-[#FFD700]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </nav>
  );
}
