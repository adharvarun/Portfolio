import Image from 'next/image';
import Link from 'next/link';
import { RiRobot2Fill } from "react-icons/ri";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center space-y-6">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src="/404.png"
            alt="404 Not Found"
            layout="fill"
            className="object-contain"
            priority
          />
        </div>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white text-lg rounded-md
            hover:bg-blue-700 transition-all hover:scale-105 shadow-md
            hover-animate-shake"
        >
          <p className="flex items-center space-x-2 justify-center">
            <RiRobot2Fill />
            <span>Reboot & Rescue the Poor Bot</span>
          </p>
        </Link>
      </div>
    </div>
  );
}