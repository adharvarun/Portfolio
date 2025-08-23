import Image from 'next/image';
import Link from 'next/link';
import { FaLink } from 'react-icons/fa6';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      className="sticky top-4 z-30 w-full flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.nav
        className="bg-white rounded-2xl shadow flex items-center justify-between w-[95vw] max-w-6xl px-8 py-4 text-black"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center gap-2 font-bold text-xl">
          <Link href="/">
            <Image src="/logo.png" alt="Adharv Arun" width={32} height={32} />
          </Link>
        </div>

        <motion.ul
          className="hidden md:flex gap-8 text-black font-medium text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <li><Link href="/#about">About</Link></li>
          <li><Link href="/#services">Services</Link></li>
          <li><Link href="/#projects">Projects</Link></li>
          <li><Link href="/#experience">Experience</Link></li>
          <li><Link href="/#blog">Blog</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link href="/links" className="flex items-center gap-2 rounded-full text-lg">
            <FaLink />
          </Link>
        </motion.div>
      </motion.nav>
    </motion.header>
  );
}