import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export default async function AboutMe() {
  const about = await client.fetch(`*[_type == "about"][0]{titles, description}`);
  return (
    <section id="about" className="max-w-6xl mx-auto mb-20 px-4 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 w-full">
        <span className="inline-block bg-gray-100 text-black px-4 py-1 rounded-full text-sm font-medium mb-4">About Me</span>
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
          <div className='flex'>
            {about?.titles?.map((title: string, index: number) => (
              <span key={index} className="inline-block text-sm text-gray-700 bg-gray-200 px-2 py-1 rounded-full mr-2">
                {title}
              </span>            
            ))} 
          </div>
        </h2>
        <p className="text-gray-500 max-w-md">{about?.description}</p>
      </div>
      <div className="flex flex-col items-center gap-6 w-full max-w-xs">
        <div className="flex gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-black">+10</div>
            <div className="text-gray-500 text-sm">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black">+6</div>
            <div className="text-gray-500 text-sm">Years Exp</div>
          </div>
        </div>
        {about?.image && (
          <div className="w-32 h-32 rounded-xl overflow-hidden">
            <Image src={urlFor(about.image).width(128).height(128).url()} alt="Adharv Arun" width={128} height={128} className="object-cover w-full h-full" />
          </div>
        )}
      </div>
    </section>
  );
} 