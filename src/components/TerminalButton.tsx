import Link from 'next/link';
import { FaTerminal } from 'react-icons/fa';

export default function TerminalButton() {
  return (
        <Link
          href="/terminal"
          className="fixed z-50 bottom-24 right-4 bg-black text-white p-4 rounded-full shadow-lg flex gap-2 hover:scale-105 transition-transform duration-200 hover:shadow-3xl hover:cursor-pointer focus:outline-none"
          aria-label="Terminal"
        >
          <FaTerminal className="w-5 h-5" />
        </Link>
      )}