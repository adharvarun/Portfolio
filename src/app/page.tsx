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

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isReturning = sessionStorage.getItem('returningFromProjects');
    if (isReturning) {
      setIsLoading(true);
      sessionStorage.removeItem('returningFromProjects');
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen">
      <Hero />
      <AboutMe />
      <Services />
      <Experience />
      <Portfolio />
      <Blog />
      <Testimonial />
      <ResumeSection />
      <ContactCTA />
      <Footer />
    </main>
  );
}
