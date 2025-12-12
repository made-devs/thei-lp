import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex h-16 items-center justify-center px-5 bg-gradient-to-b from-black/90 to-transparent">
      <Image
        src="/logo.webp"
        alt="THEI Logo"
        width={120}
        height={40}
        className="object-contain"
      />
    </nav>
  );
}
