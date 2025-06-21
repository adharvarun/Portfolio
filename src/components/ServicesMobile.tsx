import { FaRobot, FaCode, FaCloud, FaChartLine } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';

const services = [
  {
    icon: <FaRobot className="w-7 h-7 text-black" />, title: 'AI Solutions', desc: 'Custom AI/ML models, computer vision, and automation for real-world impact.'
  },
  {
    icon: <FaCode className="w-7 h-7 text-black" />, title: 'Full-Stack Development', desc: 'Modern web and mobile apps using React, Next.js, Node, and more.'
  },
  {
    icon: <FaCloud className="w-7 h-7 text-black" />, title: 'Cloud & IoT', desc: 'Cloud deployments, IoT integrations, and smart device solutions.'
  },
  {
    icon: <FaChartLine className="w-7 h-7 text-black" />, title: 'Data & Analytics', desc: 'Dashboards, analytics, and data-driven insights for your business.'
  },
];

export default function ServicesMobile() {
  return (
    <section className="max-w-md mx-auto mb-12 px-4">
      <ScrollAnimation direction="down">
        <span className="inline-block bg-gray-100 text-black px-4 py-1 rounded-full text-sm font-medium mb-4">Services</span>
        <h2 className="text-2xl font-bold text-black mb-8">What I Offer</h2>
      </ScrollAnimation>
      <div className="flex flex-col gap-4">
        {services.map((service, i) => (
          <ScrollAnimation key={i} direction="down" delay={0.1 * i}>
            <div className="rounded-2xl bg-white p-4 shadow flex flex-col gap-2 border border-gray-200 hover:scale-105 transition-all duration-300 h-full">
              <div>{service.icon}</div> 
              <div className="font-semibold text-base text-black">{service.title}</div>
              <div className="text-gray-500 text-sm">{service.desc}</div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </section>
  );
} 