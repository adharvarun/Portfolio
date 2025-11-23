import Link from 'next/link';
import { FaTerminal } from 'react-icons/fa6';

export default function TerminalButton() {
  return (
        <Link
          href="/terminal"
          className="fixed z-1 bottom-24 right-4 bg-black text-white rounded-full p-4 shadow-lg flex items-center justify-center hover:bg-gray-800 focus:outline-none"
          aria-label="Terminal"
        >
          <FaTerminal className="w-5 h-5" />
        </Link>
      )}  