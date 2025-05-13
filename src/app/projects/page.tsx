'use client';

import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { FaGithub, FaLink } from 'react-icons/fa';
import ScrollAnimation from '@/components/ScrollAnimation';
import { useEffect, useState } from 'react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await client.fetch(`*[_type == "projects"] | order(_createdAt desc){title, image, description, link, github, tags, technologies, slug}`);
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="max-w-6xl mx-auto mb-20 px-4 mt-20">
      <ScrollAnimation direction="down">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-10">Explore my Projects</h1>
      </ScrollAnimation>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project: any, i: number) => (
          <ScrollAnimation key={i} direction="down" delay={0.1 * i}>
            <div className="rounded-2xl bg-white p-6 shadow border border-gray-200 hover:shadow-lg transition h-full flex flex-col">
              {project.image && (
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(project.image).url()}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.map((tag: string, index: number) => (
                  <ScrollAnimation key={index} direction="down" delay={0.05 * index}>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  </ScrollAnimation>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies?.map((tech: string, index: number) => (
                  <ScrollAnimation key={index} direction="down" delay={0.05 * index}>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  </ScrollAnimation>
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
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </section>
  );
}