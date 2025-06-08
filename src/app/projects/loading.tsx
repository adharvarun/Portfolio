'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export default function Loading() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto mb-20 px-4 mt-20"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
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
      </motion.div>
    </motion.section>
  );
} 