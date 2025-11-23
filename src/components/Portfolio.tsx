'use client';

import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { FaGithub, FaLink } from 'react-icons/fa6';
import ScrollAnimation from './ScrollAnimation';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';

export default function Portfolio() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await client.fetch(
        `*[_type == "projects"] | order(_createdAt desc)[0...3]{
          title, image, description, link, github, tags, technologies
        }`
      );
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="max-w-6xl mx-auto mb-20 px-4">
      <ScrollAnimation direction="down">
        <span className="inline-block bg-gray-100 text-black px-4 py-1 rounded-full text-sm font-medium mb-4">Projects</span>
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-10">Explore my Projects</h2>
      </ScrollAnimation>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project: any, i: number) => (
          <ScrollAnimation key={i} direction="down" delay={0.2 * i}>
            <div className="rounded-2xl bg-white p-6 shadow border border-gray-200 hover:shadow-lg transition h-full flex flex-col">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.map((tag: string, index: number) => (
                  <ScrollAnimation key={index} direction="down" delay={0.1 * index}>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  </ScrollAnimation>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies?.map((tech: string, index: number) => (
                  <ScrollAnimation key={index} direction="down" delay={0.1 * index}>
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

      <ScrollAnimation direction="down" delay={0.6}>
        <div className="text-center mt-10">
          <Link href="/projects" className="text-blue-600 hover:text-blue-800 font-medium text-lg flex items-center justify-center gap-2">
            View All Projects <FaArrowRight />
          </Link>
        </div>
      </ScrollAnimation>
    </section>
  );
}