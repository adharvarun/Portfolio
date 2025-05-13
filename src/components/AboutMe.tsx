import { client } from '@/sanity/lib/client';
import ImageSlider from '@/components/ImageSlider';
import * as FaIcons from 'react-icons/fa';
import Skills from './Skills';

export default async function AboutMe() {
  const username = 'adharvarun';
  const about = await client.fetch(`*[_type == "about"][0]{titles, description, image}`);
  const contacts = await client.fetch(`*[_type == "contact"]`);

  let repoCount = 0;
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await res.json();
    repoCount = Array.isArray(data) ? data.length : 0;
  } catch {
    repoCount = -1;
  }

  return (
    <section id="about" className="max-w-6xl mx-auto mb-20 px-4 flex flex-col md:flex-row items-start gap-12">
      <div className="flex-1 w-full">
        <span className="inline-block bg-gray-100 text-black px-4 py-1 rounded-full text-sm font-medium mb-4">About Me</span>
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
          <div className="flex">
            {about?.titles?.map((title: string, index: number) => (
              <span key={index} className="inline-block text-sm text-gray-700 bg-gray-200 px-2 py-1 rounded-full mr-2">
                {title}
              </span>
            ))}
          </div>
        </h2>
        <p className="text-gray-500 max-w-md mb-6">{about?.description}</p>
        <div className="flex gap-3 mt-2">
          {contacts.map((contact: any) => {
              const Icon = (FaIcons as any)[contact.icon];
              return (
                <a
                  key={contact.name}
                  href={contact.url}
                  target="_blank"
                  rel="noopener"
                  className="text-black hover:text-gray-700 text-xl"
                >
                  {Icon && <Icon />}
                </a>
              );
            })}
          </div>
          <Skills />
      </div>
      <div className="flex flex-col items-center gap-6 w-full max-w-xs">
        <div className="relative w-full h-full mt-6 rounded-xl">
          <ImageSlider
            images={[
              { src: '/about-images/image1.jpeg', alt: 'Image 1' },
              { src: '/about-images/image2.jpeg', alt: 'Image 2' },
              { src: '/about-images/image3.jpeg', alt: 'Image 3' },
            ]}
          />
        </div>
        <div className="flex gap-8 mt-6">
          <div className="text-center border border-gray-300 rounded-lg p-4 w-30 h-30">
            <div className="text-3xl font-bold text-black">{repoCount}</div>
            <div className="text-gray-500 text-sm mt-2">Projects</div>
          </div>
          <div className="text-center border border-gray-300 rounded-lg p-4 w-30 h-30">
            <div className="text-3xl font-bold text-black">6+</div>
            <div className="text-gray-500 text-sm">Years <br /> Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}