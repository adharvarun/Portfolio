'use client';

import { client } from '@/sanity/lib/client';
import ImageSlider from '@/components/ImageSlider';
import * as FaIcons from 'react-icons/fa6';
import Skills from './Skills';
import { useEffect, useState } from 'react';
import ScrollAnimation from './ScrollAnimation';
import AnimatedCounter from './AnimatedCounter';

export default function AboutMe() {
  const [about, setAbout] = useState<any>(null);
  const [contacts, setContacts] = useState<any[]>([]);
  const [repoCount, setRepoCount] = useState(0);
  const username = 'adharvarun';

  useEffect(() => {
    const fetchData = async () => {
      const aboutData = await client.fetch(`*[_type == "about"][0]{titles, description, image}`);
      const contactsData = await client.fetch(`*[_type == "contact"]`);
      setAbout(aboutData);
      setContacts(contactsData);

      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        const data = await res.json();
        setRepoCount(data["public_repos"]);
      } catch {
        setRepoCount(-1);
      }
    };

    fetchData();
  }, []);

  if (!about) return null;

  return (
    <section id="about" className="max-w-6xl mx-auto mb-20 px-4">
      <div className="hidden md:flex flex-col md:flex-row items-start gap-12">
        <ScrollAnimation direction="left" className="flex-1 w-full">
          <span className="inline-block bg-gray-100 text-black px-4 py-1 rounded-full text-sm font-medium mb-4">About Me</span>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            <div className="flex">
              {about?.titles?.map((title: string, index: number) => (
                <ScrollAnimation key={index} direction="down" delay={0.1 * index}>
                  <span className="inline-block text-sm text-gray-700 bg-gray-200 px-2 py-1 rounded-full mr-2">
                    {title}
                  </span>
                </ScrollAnimation>
              ))}
            </div>
          </h2>
          <ScrollAnimation direction="left" delay={0.2}>
            <p className="text-gray-500 max-w-md mb-6">{about?.description}</p>
          </ScrollAnimation>
          <ScrollAnimation direction="left" delay={0.3}>
            <div className="flex gap-3 mt-2">
              {contacts.map((contact: any, index: number) => {
                const Icon = (FaIcons as any)[contact.icon];
                return (
                  <ScrollAnimation key={contact.name} direction="left" delay={0.1 * index}>
                    <a
                      href={contact.url}
                      target="_blank"
                      rel="noopener"
                      className="text-black hover:text-gray-700 text-xl"
                    >
                      {Icon && <Icon />}
                    </a>
                  </ScrollAnimation>
                );
              })}
            </div>
          </ScrollAnimation>
          <Skills />
        </ScrollAnimation>
        <ScrollAnimation direction="right" className="flex flex-col items-center gap-6 w-full max-w-xs">
          <div className="relative w-full h-full mt-6 rounded-xl">
            <ImageSlider
              images={[
                { src: '/about-images/image1.jpeg', alt: 'Image 1' },
                { src: '/about-images/image2.jpeg', alt: 'Image 2' },
                { src: '/about-images/image3.jpeg', alt: 'Image 3' },
                { src: '/about-images/image4.jpeg', alt: 'Image 4' },
              ]}
            />
          </div>
          <div className="flex gap-8 mt-6">
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="text-center border border-gray-300 rounded-lg p-4 w-30 h-30 hover:scale-105 transition-all duration-300 hover:cursor-default">
                <div className="text-3xl font-bold text-black">{repoCount}</div>
                <div className="text-gray-500 text-sm mt-2">Projects</div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.3}>
              <div className="text-center border border-gray-300 rounded-lg p-4 w-30 h-30 hover:scale-105 transition-all duration-300 hover:cursor-default">
                <div className="text-3xl font-bold text-black">6+</div>
                <div className="text-gray-500 text-sm">Years <br /> Experience</div>
              </div>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center">
        <ScrollAnimation direction="left" className="w-full">
          <span className="inline-block bg-gray-100 text-black px-4 py-1 rounded-full text-sm font-medium mb-4">About Me</span>
          <ScrollAnimation direction="left" delay={0.2}>
            <p className="text-gray-500 text-center mb-6">{about?.description}</p>
          </ScrollAnimation>
          <ScrollAnimation direction="left" delay={0.3}>
            <div className="flex gap-3 justify-center mt-2">
              {contacts.map((contact: any, index: number) => {
                const Icon = (FaIcons as any)[contact.icon];
                return (
                  <ScrollAnimation key={contact.name} direction="left" delay={0.1 * index}>
                    <a
                      href={contact.url}
                      target="_blank"
                      rel="noopener"
                      className="text-black hover:text-gray-700 text-xl"
                    >
                      {Icon && <Icon />}
                    </a>
                  </ScrollAnimation>
                );
              })}
            </div>
          </ScrollAnimation>
        </ScrollAnimation>
        <ScrollAnimation direction="right" className="w-full mt-8">
          <div className="relative w-full h-full rounded-xl">
            <ImageSlider
              images={[
                { src: '/about-images/image1.jpeg', alt: 'Image 1' },
                { src: '/about-images/image2.jpeg', alt: 'Image 2' },
                { src: '/about-images/image3.jpeg', alt: 'Image 3' },
                { src: '/about-images/image4.jpeg', alt: 'Image 4' },
              ]}
            />
          </div>
          <div className="flex gap-8 justify-center mt-6">
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="text-center border border-gray-300 rounded-lg p-4 w-30 h-30 hover:scale-105 transition-all duration-300">
                  <div className="text-3xl font-bold text-black">{repoCount}</div>
                <div className="text-gray-500 text-sm mt-2">Projects</div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.3}>
              <div className="text-center border border-gray-300 rounded-lg p-4 w-30 h-30 hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold text-black">6+</div>
                <div className="text-gray-500 text-sm">Years <br /> Experience</div>
              </div>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}