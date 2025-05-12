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

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
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
  );
}
