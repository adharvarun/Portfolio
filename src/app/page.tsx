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
import TerminalButton from '@/components/TerminalButton'
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState<null | boolean>(null);
  const router = useRouter();

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
        <Blog />
        <Testimonial />
        <ContactCTA />
        <Footer />
      </main>
      <TerminalButton />
    </>
  );
}
