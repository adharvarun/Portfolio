import Image from 'next/image';
import Link from 'next/link';
import * as FaIcons from "react-icons/fa6";
import { client } from '@/sanity/lib/client';
import ChatButton from "@/components/ChatBot";
import TerminalButton from './TerminalButton';

const contacts = await client.fetch(`*[_type == "contact"]`);

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4 relative">
      <div className="hidden md:block max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
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
            <div><Link href="mailto:adharvarun.10@gmail.com">adharvarun.10@gmail.com</Link></div>
            <div>Based in <a href='https://www.google.com/maps/place/Dubai/@25.0762789,54.8971546,10z/data=!3m1!4b1!4m6!3m5!1s0x3e5f43496ad9c645:0xbde66e5084295162!8m2!3d25.2048493!4d55.2707828!16zL20vMDFmMDhy?entry=ttu&g_ep=EgoyMDI1MDYwNC4wIKXMDSoASAFQAw%3D%3D' target='_blank'>Dubai, UAE</a></div>
            <div>25.2048°N 55.2708°E</div>
          </div>
        </div>
        <div className="text-center text-gray-600 text-xs mt-8">Made with ❤️ by Adharv Arun &middot; {new Date().getFullYear()}</div>
      </div>

      <div className="md:hidden flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Image src="/logo-dark.png" alt="Adharv Arun" width={32} height={32} />
            Adharv Arun
          </div>
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
        <div className="text-center text-gray-600 text-xs">Made with ❤️ by Adharv Arun &middot; {new Date().getFullYear()}</div>
      </div>

      <ChatButton />
      <TerminalButton />
    </footer>
  );
}