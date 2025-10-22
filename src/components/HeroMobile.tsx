import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroMobile() {
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
    <section className="flex flex-col items-center justify-center px-4 py-8 gap-4 w-full max-w-md mx-auto">
      <motion.div 
        className="h-24 flex items-center overflow-hidden"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold text-black text-center">
          {about?.titles ? `${about.titles[index].substring(0, subIndex)}${subIndex < about.titles[index].length ? '|' : ''}` : 'Loading...'}
        </h1>
      </motion.div>
      <motion.div 
        className="flex flex-col items-center bg-white rounded-2xl shadow p-4 w-full max-w-xs"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <div className="w-24 h-24 rounded-xl overflow-hidden mb-2 transition-transform duration-300 hover:scale-105 shadow-sm hover:shadow-md">
          <Image
            src="/profile1.jpg"
            alt="Adharv Arun - AI Engineer and Software Developer"
            width={96}
            height={96}
            className="object-cover w-full h-full"
            priority
            loading="eager"
            quality={90}
          />
        </div>
        <div className="text-center text-gray-600 max-h-32 overflow-y-auto">
          <p className="text-base font-semibold mb-1">Hey There 👋! I&apos;m Adharv</p>
          {about?.shortDescription ? (
            <p className="text-sm">{about.shortDescription}</p>
          ) : (
            <p>Loading...</p>
          )}          
        </div>
      </motion.div>
    </section>
  );
} 