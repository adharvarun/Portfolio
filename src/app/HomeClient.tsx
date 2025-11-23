'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import Services from '@/components/Services';
import Experience from '@/components/Experience';
import Portfolio from '@/components/Portfolio';
import Testimonial from '@/components/Quote';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';
import Blog from '@/components/Blog';
import ResumeSection from '@/components/ResumeSection';
import Loading from './loading';
import HeroMobile from '@/components/HeroMobile';
import AboutMeMobile from '@/components/AboutMeMobile';
import ServicesMobile from '@/components/ServicesMobile';
import ExperienceMobile from '@/components/ExperienceMobile';
import QuoteMobile from '@/components/QuoteMobile';
import FooterMobile from '@/components/FooterMobile';
import ChatBot from '@/components/ChatBot';
import BackToTopMobile from '@/components/BackToTopMobile';
import { useRouter } from 'next/navigation';

type Post = {
  title: string;
  description?: string;
  link?: string;
  pubDate?: string;
  author?: string;
};

export default function HomeClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState<null | boolean>(null);
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const isReturning = sessionStorage.getItem('returningFromProjects');
    if (isReturning) {
      setIsLoading(true);
      sessionStorage.removeItem('returningFromProjects');
      setTimeout(() => setIsLoading(false), 1000);
    }
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Fetch RSS on the client to avoid server-side XML parsing errors during prerender
    const fetchClientRSS = async () => {
      try {
        const url = '/api/rss';
        const res = await fetch(url);
        if (!res.ok) return;
        const xmlText = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlText, 'text/xml');
        const items = Array.from(doc.querySelectorAll('item')).slice(0, 3).map((item) => ({
          title: item.querySelector('title')?.textContent || '',
          description: item.querySelector('content\\:encoded')?.textContent || item.querySelector('description')?.textContent || '',
          link: item.querySelector('link')?.textContent || undefined,
          pubDate: item.querySelector('pubDate')?.textContent || undefined,
          author: item.querySelector('dc\\:creator')?.textContent || item.querySelector('author')?.textContent || undefined,
        }));
        setPosts(items);
      } catch (e: any) {
        // fail silently — blog section will simply show no posts
        console.error('Client RSS fetch failed', e?.message || e);
      }
    };

    fetchClientRSS();
  }, []);

  if (isLoading || isMobile === null) {
    return <Loading />;
  }

  if (isMobile) {
    return (
      <div className="flex flex-col items-center w-full">
        <HeroMobile />
        <AboutMeMobile />
        <ServicesMobile />
        <ExperienceMobile />
        <div className="w-full max-w-md px-4 mb-8">
          <button
            className="w-full bg-black text-white font-semibold py-3 rounded-lg shadow hover:bg-gray-800 transition-colors"
            onClick={() => router.push('/projects')}
          >
            See my Projects
          </button>
        </div>
        <QuoteMobile />
        <FooterMobile />
        <BackToTopMobile />
        <ChatBot />
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen">
        <Hero />
        <AboutMe />
        <Services />
        <Experience />
        <ResumeSection />
        <Portfolio />
        <Blog posts={posts} />
        <Testimonial />
        <ContactCTA />
        <Footer />
      </main>
    </>
  );
}
