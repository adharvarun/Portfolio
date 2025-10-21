'use client';

import Image from "next/image";
import Link from "next/link";
import * as FaIcons from "react-icons/fa";
import { motion } from "framer-motion";
import Head from "next/head";
import { FaArrowLeft } from "react-icons/fa6";

interface Link {
  _id: string;
  title: string;
  url: string;
  icon: string;
}

interface LinksClientProps {
  links: Link[];
}

export default function LinksClient({ links }: LinksClientProps) {
  return (
    <>
      <Head>
        <title>Links | Adharv Arun</title>
      </Head>
      <div className="h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="w-full max-w-md">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8 group"
            >
              <FaArrowLeft />
              Back to Portfolio
            </Link>

            <div className="text-center mb-8">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative w-17 h-17 mx-auto mb-4"
              >
                <Image
                  src="/logo.png"
                  alt="Adharv Arun"
                  fill
                  className="rounded-full object-cover"
                  priority
                />
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-2xl font-bold text-gray-900 mb-2"
              >
                Adharv Arun
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-gray-500"
              >
                AI Engineering & SDE Aspirant
              </motion.p>
            </div>

            <div className="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto pr-2 custom-scrollbar">
              {links.map((link, index) => {
                const Icon = (FaIcons as any)[link.icon];
                return (
                  <motion.div
                    key={link._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full px-6 py-4 text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-md group"
                    >
                      {Icon && <Icon className="w-5 h-5 mr-3 text-gray-600 group-hover:text-gray-900 transition-colors" />}
                      <span className="font-medium text-fluid whitespace-nowrap overflow-hidden text-ellipsis block">
                        {link.title}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #e5e7eb;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #d1d5db;
          }
          .text-fluid {
            font-size: clamp(0.75rem, 2vw, 1rem);
          }
        `}</style>
      </div>
    </>
  );
} 