'use client';

import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

type Post = {
  title: string;
  description?: string;
  link?: string;
  pubDate?: string;
  author?: string;
};

type Props = {
  posts: Post[];
};

export default function Blog({ posts }: Props) {
  return (
    <section id="blog" className="max-w-6xl mx-auto mb-20 px-4">
      <span className="inline-block bg-gray-100 text-black px-4 py-1 rounded-full text-sm font-medium mb-4">Blog</span>
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-10">Check out my Blog</h2>
      <Link href="https://blog.adharvarun.tech" target="_blank" className="bg-black text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-900 transition inline-block mb-10">Visit Blog</Link>
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">
        Latest Posts
      </h3> 
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {posts.map((post, i) => (
          <div key={i} className="rounded-2xl bg-white p-6 shadow border border-gray-200 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
            <Link href={post.link || '#'} target="_blank" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">Read More <FaArrowRight /></Link>
          </div>
        ))}
      </div>
    </section>
  );
}
