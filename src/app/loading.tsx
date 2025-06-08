'use client';

import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loading() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-white z-50">
      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex items-center justify-center"
          >
            <Loader2 className="w-8 h-8 text-gray-800 animate-spin" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            {/* Hero Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-screen flex items-center justify-center"
            >
              <div className="text-center">
                <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse mx-auto mb-4" />
                <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-2" />
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mx-auto" />
              </div>
            </motion.section>

            {/* About Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="py-20 bg-gray-50"
            >
              <div className="max-w-6xl mx-auto px-4">
                <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="h-64 bg-gray-200 rounded animate-pulse" />
                  <div className="space-y-4">
                    <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-5/6 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Services Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="py-20"
            >
              <div className="max-w-6xl mx-auto px-4">
                <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-6 bg-white rounded-lg shadow-sm">
                      <div className="h-12 w-12 bg-gray-200 rounded animate-pulse mb-4" />
                      <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Experience Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="py-20 bg-gray-50"
            >
              <div className="max-w-6xl mx-auto px-4">
                <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-8" />
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="h-16 w-16 bg-gray-200 rounded animate-pulse" />
                      <div className="flex-1">
                        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Portfolio Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="py-20"
            >
              <div className="max-w-6xl mx-auto px-4">
                <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="rounded-lg overflow-hidden">
                      <div className="h-48 bg-gray-200 animate-pulse" />
                      <div className="p-4">
                        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Blog Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="py-20 bg-gray-50"
            >
              <div className="max-w-6xl mx-auto px-4">
                <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="h-48 bg-gray-200 rounded animate-pulse mb-4" />
                      <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Testimonial Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="py-20"
            >
              <div className="max-w-6xl mx-auto px-4">
                <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-8" />
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse mx-auto mb-4" />
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mx-auto mb-2" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mx-auto" />
                </div>
              </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="py-20 bg-gray-50"
            >
              <div className="max-w-6xl mx-auto px-4">
                <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-5/6 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="space-y-4">
                      <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                      <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                      <div className="h-32 w-full bg-gray-200 rounded animate-pulse" />
                      <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Footer */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="py-8 bg-gray-900"
            >
              <div className="max-w-6xl mx-auto px-4">
                <div className="h-6 w-48 bg-gray-700 rounded animate-pulse mx-auto" />
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 