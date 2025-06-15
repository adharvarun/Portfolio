'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { motion } from 'framer-motion';

export default function Hero() {
  const [about, setAbout] = useState<any>(null);
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (!about?.titles) return;
    if (index === about.titles.length) return;

    if (subIndex === about.titles[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 800);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % about.titles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, about]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(`*[_type == "about"][0]{title, description, shortDescription, image, titles, skills}`);
      setAbout(data);
    };
    fetchData();
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto mt-16 mb-20 px-4 gap-8">
      <motion.div 
        className="h-[15rem] flex items-center overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-[clamp(2.5rem,8vw,6rem)] leading-[1.05] font-bold text-black">
          {about?.titles ? `${about.titles[index].substring(0, subIndex)}${subIndex < about.titles[index].length ? '|' : ''}` : 'Loading...'}
        </h1>
      </motion.div>
      <motion.div 
        className="flex flex-col items-center bg-white rounded-2xl shadow p-6 w-full max-w-xs"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <div className="w-32 h-32 rounded-xl overflow-hidden mb-4 transition-transform duration-300 hover:scale-105 shadow-sm hover:shadow-md">
          <Image
            src="/profile.jpg"
            alt="Adharv Arun - AI Engineer and Software Developer"
            width={128}
            height={128}
            className="object-cover w-full h-full"
            priority
            loading="eager"
            quality={90}
          />
        </div>
        <div className="text-center text-gray-600 max-h-[10rem] overflow-y-auto">
          <p className="text-lg font-semibold mb-2">Hey There 👋! I&apos;m Adharv</p>
          {about?.shortDescription ? (
            <p>{about.shortDescription}</p>
          ) : (
            <p>Loading...</p>
          )}          
        </div>
      </motion.div>
    </section>
  );
}