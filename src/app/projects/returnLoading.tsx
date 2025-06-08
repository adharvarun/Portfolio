'use client';

import { motion } from 'framer-motion';

export default function ReturnLoading() {
  return (
    <section className="max-w-6xl mx-auto mb-20 px-4 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl bg-white p-6 shadow border border-gray-200 h-full"
          >
            <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse mb-4" />
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-4" />
            <div className="flex flex-wrap gap-2 mb-4">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
            <div className="flex gap-4">
              <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 