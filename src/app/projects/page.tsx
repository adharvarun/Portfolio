'use client';

import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { FaGithub, FaLink } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Loading from './loading';
import ReturnLoading from './returnLoading';
import { useNavigationState } from '@/hooks/useNavigationState';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { ArrowLeft } from 'lucide-react';

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isReturning = useNavigationState();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(`*[_type == "projects"] | order(_createdAt desc){title, image, description, link, github, tags, technologies, slug}`);
        setProjects(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const renderContent = () => (
    <>
      <Head>
        <title>Projects | Adharv Arun</title>
      </Head>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto mb-20 px-4 mt-20"
      >
        <motion.div variants={itemVariants}>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeft />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-10">Explore my Projects</h1>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project: any, i: number) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="rounded-2xl bg-white p-6 shadow border border-gray-200 hover:shadow-lg transition h-full flex flex-col"
            >
              {project.image && (
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(project.image).url()}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority={i < 3}
                  />
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.map((tag: string, index: number) => (
                  <motion.span
                    key={index}
                    variants={itemVariants}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies?.map((tech: string, index: number) => (
                  <motion.span
                    key={index}
                    variants={itemVariants}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              <div className="flex gap-4 mt-auto">
                {project.link && (
                  <Link 
                    href={project.link}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <FaLink />
                  </Link>
                )}
                {project.github && (
                  <Link 
                    href={project.github}
                    target="_blank"
                    className="text-gray-600 hover:text-gray-800 font-medium"
                  >
                    <FaGithub />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </>
  );

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        isReturning ? <ReturnLoading /> : <Loading />
      ) : (
        renderContent()
      )}
    </AnimatePresence>
  );
}