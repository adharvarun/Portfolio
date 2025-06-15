'use client';

import { client } from '@/sanity/lib/client';
import ScrollAnimation from './ScrollAnimation';
import { useEffect, useState } from 'react';

export default function Experience() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      const data = await client.fetch(`
        *[_type == "experience"]{
          title,
          company,
          startYear,
          endYear,
          description
        }
      `);
      setExperiences(data);
    };
    fetchExperiences();
  }, []);

  const nowExperiences = experiences.filter((exp: any) => exp.endYear === 'Now');
  const regularExperiences = experiences.filter((exp: any) => exp.endYear !== 'Now');

  regularExperiences.sort((a, b) => {
    const endYearA = parseInt(a.endYear);
    const endYearB = parseInt(b.endYear);
    return endYearA - endYearB;
  });

  const sortedExperiences = [...regularExperiences, ...nowExperiences];
  sortedExperiences.reverse();

  return (
    <section id="experience" className="max-w-6xl mx-auto mb-20 px-4">
      <ScrollAnimation direction="down">
        <span className="inline-block bg-gray-100 text-black px-4 py-1 rounded-full text-sm font-medium mb-4">Experience</span>
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-10">A Yearly snapshot of my creative growth</h2>
      </ScrollAnimation>

      <div className="hidden md:block">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            {sortedExperiences.map((exp: any, i: number) => (
              <ScrollAnimation key={i} direction="down" delay={0.1 * i}>
                <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-gray-200 last:border-b-0">
                  <div>
                    <div className="font-semibold text-lg text-black">{exp.title} at {exp.company}</div>
                    <div className="text-gray-500 text-sm max-w-xl">{exp.description}</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-700 md:text-right min-w-[120px]">
                    {exp.startYear} - {exp.endYear === 'Now' ? 'Present' : exp.endYear}
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>  
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex flex-col gap-8">
          <div className="flex-1">
            {sortedExperiences.map((exp: any, i: number) => (
              <ScrollAnimation key={i} direction="down" delay={0.1 * i}>
                <div className="py-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex-1">
                    <div className="font-semibold text-lg text-black">{exp.title} at {exp.company}</div>
                    <div className="text-gray-500 text-sm">{exp.description}</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-700 mt-2">
                    {exp.startYear} - {exp.endYear === 'Now' ? 'Present' : exp.endYear}
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>  
        </div>
      </div>
    </section>  
  );
}
