import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import ScrollAnimation from './ScrollAnimation';

export default function ExperienceMobile() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      const data = await client.fetch(`*[_type == 'experience'] | order(startYear desc){title, company, description, startYear, endYear}`);
      setExperiences(data);
    };
    fetchExperiences();
  }, []);

  return (
    <section id="experience-mobile" className="max-w-md mx-auto mb-12 px-4">
      <ScrollAnimation direction="down">
        <span className="inline-block bg-gray-100 text-black px-4 py-1 rounded-full text-sm font-medium mb-4">Experience</span>
        <h2 className="text-2xl font-bold text-black mb-8">My Journey</h2>
      </ScrollAnimation>
      <div className="flex flex-col gap-4">
        {experiences.map((exp, i) => (
          <ScrollAnimation key={i} direction="down" delay={0.1 * i}>
            <div className="flex flex-col border-b border-gray-200 pb-4 last:border-b-0">
              <div className="font-semibold text-base text-black mb-1">{exp.title} at {exp.company}</div>
              <div className="text-gray-500 text-sm mb-1">{exp.description}</div>
              <div className="text-lg font-bold text-gray-700 min-w-[120px] pt-2">{exp.startYear} - {exp.endYear === 'Now' ? 'Present' : exp.endYear}</div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </section>
  );
} 