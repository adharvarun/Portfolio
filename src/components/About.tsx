import Image from 'next/image';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import ScrollAnimation from './ScrollAnimation';

export default function About() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollAnimation direction="left">
            <div className="space-y-8">
              <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700">
                <Image
                  src="/profile.jpg"
                  alt="Adharv Arun"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <ScrollAnimation delay={0.2}>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">10+</h3>
                    <p className="text-gray-600 dark:text-gray-400">Projects</p>
                  </div>
                </ScrollAnimation>
                <ScrollAnimation delay={0.3}>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">6+</h3>
                    <p className="text-gray-600 dark:text-gray-400">Years Experience</p>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="right">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Hi 👋, I'm Adharv
                </h1>
                <h2 className="text-xl text-gray-600 dark:text-gray-400">
                  AI Engineer, Software Engineer, Student at JSS Private School
                </h2>
              </div>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I'm a software engineer and AI enthusiast with 6+ years of experience building innovative solutions in AI, robotics, and full-stack development. I love turning ideas into real-world impact through code, design, and intelligent systems.
              </p>

              <ScrollAnimation delay={0.2}>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Skills & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'JavaScript', 'React', 'Next.js', 'AI/ML', 'Robotics', 'Full Stack'].map((skill, index) => (
                      <ScrollAnimation key={skill} delay={0.1 * index}>
                        <span
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      </ScrollAnimation>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation delay={0.3}>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/adharvarun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/adharv-arun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="mailto:adharvarun.10@gmail.com"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <FaEnvelope className="w-6 h-6" />
                  </a>
                </div>
              </ScrollAnimation>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
} 