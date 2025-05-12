import { FaRobot, FaCode, FaCloud, FaChartLine } from 'react-icons/fa';

const services = [
  {
    icon: <FaRobot className="w-7 h-7 text-black" />,
    title: 'AI Solutions',
    desc: 'Custom AI/ML models, computer vision, and automation for real-world impact.'
  },
  {
    icon: <FaCode className="w-7 h-7 text-black" />,
    title: 'Full-Stack Development',
    desc: 'Modern web and mobile apps using React, Next.js, Node, and more.'
  },
  {
    icon: <FaCloud className="w-7 h-7 text-black" />,
    title: 'Cloud & IoT',
    desc: 'Cloud deployments, IoT integrations, and smart device solutions.'
  },
  {
    icon: <FaChartLine className="w-7 h-7 text-black" />,
    title: 'Data & Analytics',
    desc: 'Dashboards, analytics, and data-driven insights for your business.'
  },
];

export default function Services() {
  return (
    <section id="services" className="max-w-6xl mx-auto mb-20 px-4">
      <span className="inline-block bg-gray-100 text-black px-4 py-1 rounded-full text-sm font-medium mb-4">Services</span>
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-10">A Comprehensive look at what I offer and how I deliver</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, i) => (
          <div key={i} className={`rounded-2xl bg-white p-6 shadow flex flex-col gap-4 border border-gray-200 hover:scale-105 transition-all duration-300`}>
            <div>{service.icon}</div> 
            <div className="font-semibold text-lg text-black">{service.title}</div>
            <div className="text-gray-500 text-sm">{service.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 