import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { FaGithub, FaLink } from 'react-icons/fa';

export default async function Portfolio() {
  const projects = await client.fetch(
    `*[_type == "projects"] | order(_createdAt desc)[0...3]{
      title, image, description, link, github, tags, technologies
    }`
  );

  return (
    <section id="projects" className="max-w-6xl mx-auto mb-20 px-4">
      <span className="inline-block bg-gray-100 text-black px-4 py-1 rounded-full text-sm font-medium mb-4">Projects</span>
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-10">Explore my Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project: any, i: number) => (
          <div key={i} className="rounded-2xl bg-white p-6 shadow border border-gray-200 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags?.map((tag: string, index: number) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies?.map((tech: string, index: number) => (
                <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
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
        ))}
      </div>

      <div className="text-center mt-10">
        <Link href="/projects" className="text-blue-600 hover:text-blue-800 font-medium text-lg">
          View All Projects →
        </Link>
      </div>
    </section>
  );
}