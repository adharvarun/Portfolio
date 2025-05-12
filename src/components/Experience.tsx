import { client } from '@/sanity/lib/client';

export default async function Experience() {
  const experiences = await client.fetch(`*[_type == "experience"] | order(date desc){title, company, date, description}`);
  return (
    <section id="experience" className="max-w-6xl mx-auto mb-20 px-4">
      <span className="inline-block bg-gray-100 text-black px-4 py-1 rounded-full text-sm font-medium mb-4">Experience</span>
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-10">A Yearly snapshot of my creative growth</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {experiences.map((exp: any, i: number) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-gray-200 last:border-b-0">
              <div>
                <div className="font-semibold text-lg text-black">{exp.title} at {exp.company}</div>
                <div className="text-gray-500 text-sm max-w-xl">{exp.description}</div>
              </div>
              <div className="text-2xl font-bold text-gray-700 md:text-right min-w-[120px]">{exp.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>  
  );
} 