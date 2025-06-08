'use client';

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">Loading Sanity Studio...</h2>
        <p className="text-gray-500 mt-2">Please wait while we prepare your content management environment</p>
      </motion.div>
    </div>
  );
} 