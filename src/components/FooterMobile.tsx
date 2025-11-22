import * as FaIcons from 'react-icons/fa6';

export default function FooterMobile() {
  const contacts = [
    { name: 'GitHub', url: 'https://github.com/adharvarun', icon: 'FaGithub' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/adharvarun', icon: 'FaLinkedin' },
    { name: 'Twitter', url: 'https://twitter.com/adharvarun', icon: 'FaTwitter' },
    { name: 'Mail', url: 'mailto:adharvarun@gmail.com', icon: 'FaEnvelope' },
  ];

  return (
    <footer className="w-full mx-auto px-4 py-6 flex flex-col items-center gap-4 border-t border-gray-900 mt-8 bg-black">
      <div className="flex gap-4 mb-2">
        {contacts.map((contact) => {
          const Icon = (FaIcons as any)[contact.icon];
          return (
            <a
              key={contact.name}
              href={contact.url}
              target="_blank"
              rel="noopener"
              className="text-white hover:text-gray-300 text-xl"
            >
              {Icon && <Icon />}
            </a>
          );
        })}
      </div>
      <div className="text-xs text-gray-300">&copy; {new Date().getFullYear()} Adharv Arun. All rights reserved.</div>
    </footer>
  );
} 