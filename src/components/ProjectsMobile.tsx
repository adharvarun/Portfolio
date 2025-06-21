import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { FaGithub, FaLink } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsMobile() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await client.fetch(
        `*[_type == "projects"] | order(_createdAt desc){title, image, description, link, github, tags, technologies}`
      );
      setProjects(data);
    };
    fetchProjects(); 
  }, []);

  return (
    <section id="projects-mobile" className="max-w-md mx-auto mb-12 px-4 mt-10">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
      >
        <ArrowLeft />
        Back to Home
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold text-black mb-10">Explore my Projects</h1>
      <ScrollAnimation direction="down">
        <span className="inline-block bg-gray-100 text-black px-4 py-1 rounded-full text-sm font-medium mb-4">All Projects</span>
        <h2 className="text-2xl font-bold text-black mb-8">Projects</h2>
      </ScrollAnimation>
      <div className="flex flex-col gap-6">
        {projects.map((project, i) => (
          <ScrollAnimation key={i} direction="down" delay={0.1 * i}>
            <div className="rounded-2xl bg-white p-4 shadow border border-gray-200 flex flex-col gap-2">
              {project.image && (
                <div className="relative w-full aspect-[4/3] mb-2 rounded-lg overflow-hidden">
                  <img
                    src={urlFor(project.image).url()}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <h3 className="text-lg font-bold mb-1">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.tags?.map((tag, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">{tag}</span>
                ))}
              </div>
              <div className="flex gap-2">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener" className="text-black hover:text-gray-700 text-xl"><FaGithub /></a>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener" className="text-black hover:text-gray-700 text-xl"><FaLink /></a>
                )}
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </section>
  );
} 