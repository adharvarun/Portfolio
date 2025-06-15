'use client';

import { client } from '@/sanity/lib/client';
import { SiJavascript, SiTypescript, SiHtml5, SiCss3, SiPhp, SiAstro, SiNuxtdotjs, SiSvelte, SiTailwindcss, SiReact, SiSass, SiExpress, SiFastify, SiPrisma, SiAppwrite, SiVuedotjs, SiNodedotjs, SiArduino } from 'react-icons/si';
import { FaCode } from 'react-icons/fa';
import { Plus } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';
import { useEffect, useState } from 'react';

const iconMap: Record<string, any> = {
  'javascript': SiJavascript,
  'typescript': SiTypescript,
  'html': SiHtml5,
  'html5': SiHtml5,
  'css': SiCss3,
  'php': SiPhp,
  'astro': SiAstro,
  'nuxt': SiNuxtdotjs,
  'nuxtjs': SiNuxtdotjs,
  'svelte': SiSvelte,
  'tailwind css': SiTailwindcss,
  'tailwindcss': SiTailwindcss,
  'vue': SiVuedotjs,
  'vuejs': SiVuedotjs,
  'react': SiReact,
  'sass': SiSass,
  'express': SiExpress,
  'fastify': SiFastify,
  'node.js': SiNodedotjs,
  'nodejs': SiNodedotjs,
  'node': SiNodedotjs,
  'prisma': SiPrisma,
  'appwrite': SiAppwrite,
  'arduino': SiArduino,
};

function getIcon(skill: string) {
  const key = skill.toLowerCase().replace(/\s+/g, '');
  return (
    iconMap[skill.toLowerCase()] ||
    iconMap[key] ||
    FaCode
  );
}

export default function Skills() {
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const about = await client.fetch(`*[_type == "about"][0]{skills}`);
      setSkills(about?.skills || []);
    };
    fetchSkills();
  }, []);

  return (
    <section className="max-w-6xl mt-10">
      <ScrollAnimation direction="down">
        <span className="inline-block text-gray-700 bg-gray-200 font-bold px-4 py-1 rounded-full text-sm mb-4 mr-2">Skills</span>
      </ScrollAnimation>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => {
          const Icon = getIcon(skill);
          return (
            <ScrollAnimation key={i} direction="down" delay={0.05 * i}>
              <span
                className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded-lg font-medium text-base shadow hover:scale-105 transition-transform duration-150 hover:cursor-pointer"
              >
                <Icon className="w-3 h-3" />
                {skill}
              </span>
            </ScrollAnimation>
          );
        })}
        <ScrollAnimation direction="down" delay={0.05 * skills.length}>
          <span
            className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded-lg font-medium text-base shadow hover:scale-105 transition-transform duration-150 hover:cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            And More
          </span>
        </ScrollAnimation>
      </div>
    </section>
  );
} 