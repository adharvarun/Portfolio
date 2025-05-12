import Image from 'next/image';
import Link from 'next/link';
import * as FaIcons from "react-icons/fa";
import { client } from '@/sanity/lib/client';

const contacts = await client.fetch(`*[_type == "contact"]`);

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Image src="/logo-dark.png" alt="Adharv Arun" width={32} height={32} />
            Adharv Arun
          </div>
          <div className="text-gray-400 text-sm">AI Engineer & Software Developer</div>
          <div className="flex gap-3 mt-2">
          {contacts.map((contact: any) => {
              const Icon = (FaIcons as any)[contact.icon];
              return (
                <a
                  key={contact.name}
                  href={contact.url}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-gray-200 text-xl"
                >
                  {Icon && <Icon />}
                </a>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 text-gray-400 text-sm items-center">
          <div className="flex flex-col gap-1">
            <Link href="#about">About</Link>
            <Link href="#services">Services</Link>
            <Link href="#portfolio">Portfolio</Link>
          </div>
          <div className="flex flex-col gap-1">
            <Link href="#experience">Experience</Link>
            <Link href="#blog">Blog</Link>
            <Link href="#contact">Contact</Link>
          </div>
        </div>
        <div className="text-gray-400 text-sm text-center md:text-right">
          <div>adharvarun.10@gmail.com</div>
          <div>Dubai, UAE</div>
        </div>
      </div>
      <div className="text-center text-gray-600 text-xs mt-8">© {new Date().getFullYear()} All rights reserved • Adharv Arun</div>
    </footer>
  );
} 