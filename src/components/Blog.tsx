'use client';

import Link from 'next/link';

export default function Blog() {
  return (
    <section id="projects" className="max-w-6xl mx-auto mb-20 px-4">
      <span className="inline-block bg-gray-100 text-black px-4 py-1 rounded-full text-sm font-medium mb-4">Blog</span>
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-10">Check out my Blog</h2>
      <Link href="https://blog.adharvarun.tech" target="_blank" className="bg-black text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-900 transition">Visit Blog</Link>
    </section>
  );
} 