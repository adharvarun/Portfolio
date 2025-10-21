"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { client } from '@/sanity/lib/client';

type AboutDoc = {
  title?: string;
  shortDescription?: string;
  description?: string;
  titles?: string[];
  skills?: string[];
};

type LinkDoc = {
  _id: string;
  title: string;
  url: string;
};

type ProjectDoc = {
  _id: string;
  title: string;
  description: string;
  link?: string;
  github?: string;
  demovideo?: string;
  tags?: string[];
  technologies?: string[];
  image?: any;
};

type HistoryItem = {
  type: 'input' | 'output';
  content: string;
  isTyping?: boolean;
};

const PROMPT_USER = 'visitor';
const PROMPT_HOST = 'adharvarun.tech';

async function fetchAbout(): Promise<AboutDoc | null> {
  const query = `*[_type == "about"][0]{
    title, shortDescription, description, titles, skills
  }`;
  try {
    return await client.fetch(query);
  } catch {
    return null;
  }
}

async function fetchLinks(): Promise<LinkDoc[]> {
  const query = `*[_type == "link"]|order(title asc){ _id, title, url }`;
  try {
    return await client.fetch(query);
  } catch {
    return [];
  }
}

async function fetchProjects(): Promise<ProjectDoc[]> {
  const query = `*[_type == "projects"] | order(_createdAt desc){
    _id, title, description, link, github, democvideo, tags, technologies, image
  }`;
  try {
    return await client.fetch(query);
  } catch {
    return [];
  }
}

function getNeofetch(): string {
  const ascii = [
    "    █████╗ ██╗  ██╗",
    "   ██╔══██╗██║ ██╔╝",
    "   ███████║█████╔╝ ",
    "   ██╔══██║██╔═██╗ ",
    "   ██║  ██║██║  ██╗",
    "   ╚═╝  ╚═╝╚═╝  ╚═╝",
  ];

  const info = [
    `${PROMPT_USER}@${PROMPT_HOST}`,
    '',
    'OS: Windows 11, iOS, Android, EndeavourOS, Ubuntu (WSL)',
    'Uptime: 15 years',
    `Host: ${PROMPT_HOST}`,
    'Kernel: 6.15.7-arch1-1, linux',
    'IDE: VSCode',
    'Terminal: Windows Terminal & Konsole',
    '',
    'Contact:',
    '- Email: mailto:adharvarun.10@gmail.com',
    '- LinkedIn: https://www.linkedin.com/in/adharv-arun',
  ];

  const leftWidth = Math.max(...ascii.map(l => l.length)) + 2;
  const rows = Math.max(ascii.length, info.length);
  const lines: string[] = [];
  for (let i = 0; i < rows; i++) {
    const left = ascii[i] ?? '';
    const right = info[i] ?? '';
    lines.push(left.padEnd(leftWidth, ' ') + right);
  }
  return lines.join('\n');
}

function helpText(): string {
  return [
    'Available commands:',
    '  help        - Show this help',
    '  neofetch    - Show personal info with ASCII logo',
    '  whoami      - Display the current user',
    '  about       - Show about information',
    '  links       - List social and external links',
    '  projects    - View my coding projects from Sanity',
    '  clear       - Clear the terminal screen (alias: cls)',
    '  home        - Return to the Homepage',
    '  matrix      - Enter the Matrix (fun easter egg)',
    '  hack        - Simulate hacking sequence',
    '  sudo        - Find out what happens',
    '',
    'Keyboard shortcuts:',
    '  Tab         - Autocomplete commands',
    '  ↑/↓         - Navigate command history',
    '  Ctrl + L    - Clear terminal',
  ].join('\n');
}

export default function TerminalPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [about, setAbout] = useState<AboutDoc | null>(null);
  const [links, setLinks] = useState<LinkDoc[]>([]);
  const [projects, setProjects] = useState<ProjectDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    Promise.all([fetchAbout(), fetchLinks(), fetchProjects()]).then(([a, l, p]) => {
      setAbout(a);
      setLinks(l);
      setProjects(p);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const welcomeSequence = async () => {
        setShowWelcome(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const welcomeText = "Welcome to Adharv's Terminal";
        await typeText(welcomeText, 50);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const helpText = "Type 'help' to see available commands or try 'matrix' for fun!";
        await typeText(helpText, 30);
      };
      
      welcomeSequence();
    }
  }, [isLoading]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const prompt = useMemo(() => `[${PROMPT_USER}@${PROMPT_HOST} ~]# `, []);

  async function typeText(text: string, speed: number = 50) {
    setHistory(h => [...h, { type: 'output', content: '', isTyping: true }]);
    
    for (let i = 0; i <= text.length; i++) {
      const currentText = text.slice(0, i);
      setHistory(h => {
        const newHistory = [...h];
        newHistory[newHistory.length - 1] = { 
          type: 'output', 
          content: currentText,
          isTyping: i < text.length
        };
        return newHistory;
      });
      
      if (i < text.length) {
        await new Promise(resolve => setTimeout(resolve, speed));
      }
    }
  }

  function print(output: string) {
    setHistory(h => [...h, { type: 'output', content: output }]);
  }

  function runCommand(raw: string) {
    const line = raw.trim();
    if (!line) return;
    setHistory(h => [...h, { type: 'input', content: prompt + line }]);
    setCommandHistory(h => [...h, line]);
    setHistoryIndex(null);

    const [cmd, ...rest] = line.split(' ');
    const arg = rest.join(' ').trim();

    switch (cmd.toLowerCase()) {
      case 'help':
        print(helpText());
        break;
      case 'clear':
      case 'cls':
        setHistory([]);
        break;
      case 'sudo':
        window.open('https://www.youtube.com/watch?v=lsySOZM2hWc', '_blank');
        break;
      case 'neofetch':
        print(getNeofetch());
        break;
      case 'whoami':
        print(PROMPT_USER);
        break;
      case 'home':
        window.location.href = "/";
        print("Returning to Homepage...")
        break;
      case 'about': {
        if (!about) {
          print('About data is not available yet.');
          break;
        }
        const lines: string[] = [];
        if (about.title) lines.push(`Title: ${about.title}`);
        if (about.shortDescription) lines.push(about.shortDescription);
        if (about.description) lines.push('', about.description);
        if (about.titles?.length) lines.push('', 'Roles:', ...about.titles.map(t => `- ${t}`));
        if (about.skills?.length) lines.push('', 'Skills:', ...about.skills.map(s => `- ${s}`));
        print(lines.join('\n'));
        break;
      }
      case 'links': {
        if (!links.length) {
          print('No links found.');
          break;
        }
        const lines = links.map(l => `- ${l.title}: ${l.url}`);
        print(lines.join('\n'));
        break;
      }
      case 'projects': {
        if (!projects.length) {
          print('No projects found.');
          break;
        }
        const lines: string[] = [];
        lines.push('My Projects:');
        lines.push('');
        projects.forEach((project, index) => {
          lines.push(`${index + 1}. ${project.title}`);
          lines.push(`   Description: ${project.description}`);
          if (project.technologies?.length) {
            lines.push(`   Technologies: ${project.technologies.join(', ')}`);
          }
          if (project.tags?.length) {
            lines.push(`   Tags: ${project.tags.join(', ')}`);
          }
          if (project.github) {
            lines.push(`   GitHub: ${project.github}`);
          }
          if (project.link) {
            lines.push(`   Live Demo: ${project.link}`);
          }
          if (project.demovideo) {
            lines.push(`   Demo Video: ${project.demovideo}`);
          }
          lines.push('');
        });
        print(lines.join('\n'));
        break;
      }
      case 'matrix': {
        const matrixLines = [
          '01001000 01100101 01101100 01101100 01101111',
          '01010111 01100101 01101100 01100011 01101111 01101101 01100101',
          '01010100 01101111',
          '01010100 01101000 01100101',
          '01001101 01100001 01110100 01110010 01101001 01111000',
          '',
          '🌊 You have entered the Matrix... 🌊',
          'Reality is just a simulation.',
          'Wake up, Neo...',
          '',
          'Type "clear" to exit the Matrix.'
        ];
        print(matrixLines.join('\n'));
        break;
      }
      case 'hack': {
        const hackLines = [
          'Initiating hack sequence...',
          'Connecting to target...',
          'Bypassing firewall...',
          'Accessing mainframe...',
          'Downloading data...',
          'Installing backdoor...',
          'Hack complete! 🎯',
          '',
          'Just kidding! 😄 This is just for fun.',
          'I\'m a legitimate developer, not a hacker!'
        ];
        print(hackLines.join('\n'));
        break;
      }
      default:
        print(`Command not found: ${cmd}. Type 'help' for available commands.`);
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-cyan-400 font-mono text-lg">Loading Terminal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="h-full w-full relative">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        <div className="h-full w-full bg-black/80 backdrop-blur-sm border border-cyan-400/30 shadow-[0_0_50px_rgba(34,211,238,0.3)] flex flex-col relative z-10">
          <div className="bg-gray-800/50 border-b border-cyan-400/30 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-2">
              <button 
                onClick={() => window.location.href = '/'}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"
                title="Go to Homepage"
              ></button>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-cyan-400 font-mono text-sm ml-4">
              {PROMPT_USER}@{PROMPT_HOST} - Terminal Portfolio
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 py-3" onClick={() => (document.getElementById('terminal-input') as HTMLInputElement)?.focus()}>
            {history.map((item, idx) => {
              const renderContent = (content: string) => {
                const parts = content.split(/(https?:\/\/[^\s]+|mailto:[^\s]+)/g);
                return parts.map((part, partIdx) => {
                  if (part.match(/^https?:\/\//)) {
                    return (
                      <a 
                        key={partIdx}
                        href={part} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-green-300 hover:text-green-200 underline decoration-green-500 hover:decoration-green-300 transition-colors"
                      >
                        {part}
                      </a>
                    );
                  } else if (part.match(/^mailto:/)) {
                    return (
                      <a 
                        key={partIdx}
                        href={part} 
                        className="text-green-300 hover:text-green-200 underline decoration-green-500 hover:decoration-green-300 transition-colors"
                      >
                        {part}
                      </a>
                    );
                  }
                  return part;
                });
              };

              return (
                <pre 
                  key={idx} 
                  className={`${
                    item.type === 'input' 
                      ? 'text-cyan-300 py-1' 
                      : 'text-green-400 whitespace-pre-wrap py-1'
                  } ${item.isTyping ? 'animate-pulse' : ''}`}
                >
                  {renderContent(item.content)}
                  {item.isTyping && <span className="animate-pulse">|</span>}
                </pre>
              );
            })}
            <div className="flex items-center gap-2">
              <span className="text-cyan-300 select-none font-mono">{prompt}</span>
              <input
                id="terminal-input"
                className="flex-1 bg-transparent outline-none text-green-400 placeholder-cyan-700 font-mono caret-cyan-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    runCommand(input);
                    setInput('');
                  } else if (e.key === 'ArrowUp') {
                    if (commandHistory.length) {
                      const nextIndex = historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                      setHistoryIndex(nextIndex);
                      setInput(commandHistory[nextIndex] ?? '');
                    }
                  } else if (e.key === 'ArrowDown') {
                    if (commandHistory.length) {
                      if (historyIndex === null) return;
                      const nextIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
                      setHistoryIndex(nextIndex);
                      setInput(commandHistory[nextIndex] ?? '');
                    }
                  } else if (e.key === 'Tab') {
                    e.preventDefault();
                    const commands = ['help', 'neofetch', 'whoami', 'about', 'links', 'projects', 'clear', 'home', 'matrix', 'hack'];
                    const matches = commands.filter(cmd => cmd.startsWith(input.toLowerCase()));
                    if (matches.length === 1) {
                      setInput(matches[0]);
                    }
                  } else if (e.ctrlKey && e.key === 'l') {
                    e.preventDefault();
                    setHistory([]);
                  }
                }}
                autoFocus
                placeholder="Type a command..."
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </div>
  );
}



