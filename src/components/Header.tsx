import Image from 'next/image';
import Link from 'next/link';
import { FaLink } from 'react-icons/fa6';

export default function Header() {
  return (
    <header className="sticky top-4 z-30 w-full flex justify-center">
      <nav className="bg-white rounded-2xl shadow flex items-center justify-between w-[95vw] max-w-6xl px-8 py-4 text-black">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Image src="/logo.png" alt="Adharv Arun" width={32} height={32} />
        </div>

        <ul className="hidden md:flex gap-8 text-black font-medium text-base">
          <li><Link href="#about">About</Link></li>
          <li><Link href="#services">Services</Link></li>
          <li><Link href="#projects">Projects</Link></li>
          <li><Link href="#experience">Experience</Link></li>
          <li><Link href="#blog">Blog</Link></li>
          <li><Link href="#contact">Contact</Link></li>
        </ul>
        <div>
          <Link href="/links" className="hidden md:flex items-center gap-2 rounded-full text-lg">
            <FaLink />
          </Link>
        </div>
      </nav>
    </header>
  );
} 