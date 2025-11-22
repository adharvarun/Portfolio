import { client } from '@/sanity/lib/client';
import ImageSlider from '@/components/ImageSlider';
import * as FaIcons from 'react-icons/fa6';
import Skills from './Skills';
import { useEffect, useState } from 'react';
import ScrollAnimation from './ScrollAnimation';

export default function AboutMeMobile() {
  const [about, setAbout] = useState<any>(null);
  const [contacts, setContacts] = useState<any[]>([]);
  const [repoCount, setRepoCount] = useState(0);
  const [skillsOpen, setSkillsOpen] = useState(false);
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
    <section id="about-mobile" className="flex flex-col items-center px-4 py-8 gap-8 w-full max-w-md mx-auto">
      <ScrollAnimation direction="down">
        <span className="inline-block bg-gray-100 text-black px-4 py-1 rounded-full text-sm font-medium mb-4">About Me</span>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.2}>
        <p className="text-gray-500 text-center mb-4">{about?.description}</p>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.3}>
        <div className="flex gap-3 justify-center mb-4">
          {contacts.map((contact: any, index: number) => {
            const Icon = (FaIcons as any)[contact.icon];
            return (
              <a
                key={contact.name}
                href={contact.url}
                target="_blank"
                rel="noopener"
                className="text-black hover:text-gray-700 text-2xl"
              >
                {Icon && <Icon />}
              </a>
            );
          })}
        </div>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.4}>
        <div className="w-full max-w-xs mx-auto mb-4">
          <ImageSlider
            images={[
              { src: '/about-images/image1.jpeg', alt: 'Image 1' },
              { src: '/about-images/image2.jpeg', alt: 'Image 2' },
              { src: '/about-images/image3.jpeg', alt: 'Image 3' },
              { src: '/about-images/image4.jpeg', alt: 'Image 4' },
            ]}
          />
        </div>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.5}>
        <div className="flex gap-8 justify-center mt-2">
          <div className="text-center border border-gray-300 rounded-lg p-4 w-28 h-28 hover:scale-105 transition-all duration-300">
            <div className="text-2xl font-bold text-black">{repoCount}</div>
            <div className="text-gray-500 text-xs mt-2">Projects</div>
          </div>
          <div className="text-center border border-gray-300 rounded-lg p-4 w-28 h-28 hover:scale-105 transition-all duration-300">
            <div className="text-2xl font-bold text-black">6+</div>
            <div className="text-gray-500 text-xs">Years <br /> Experience</div>
          </div>
        </div>
      </ScrollAnimation>
      <div className="w-full max-w-xs mx-auto">
        <button
          className="w-full bg-gray-200 text-black font-semibold py-2 rounded-lg mt-4 mb-2 transition-colors hover:bg-gray-300"
          onClick={() => setSkillsOpen((open) => !open)}
        >
          {skillsOpen ? 'Hide Skills' : 'Show Skills'}
        </button>
        <div>
          {skillsOpen && <Skills />}
        </div>
      </div>
    </section>
  );
} 