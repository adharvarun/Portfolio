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

type HistoryItem = {
  type: 'input' | 'output';
  content: string;
};

const PROMPT_USER = 'guest';
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

function getNeofetch(): string {
  const ascii = [
    "                           @@@@@@@                 @@@@@@@@@@@@@@@@          @@@@@@@@@@             ",
    "                          @@@@@@@@@                  %@@@@@@@@@@               @@@@                 ",
    "                         @@@@@@@@@@                   @@@@@@@@@#             @@@@                   ",
    "                         @@@@@@@@@@%                  @@@@@@@@@#            @@@                     ",
    "                        @@@@@@@@@@@@                  @@@@@@@@@#          @@@%                      ",
    "                        @@ @@@@@@@@@@                 @@@@@@@@@#        @@@@                        ",
    "                       @@   @@@@@@@@@@                @@@@@@@@@#      @@@@                          ",
    "                      @@%   %@@@@@@@@@                @@@@@@@@@#    @@@@                            ",
    "                     @@@     @@@@@@@@@@               @@@@@@@@@#  %@@@@                             ",
    "                     @@@     @@@@@@@@@@@              @@@@@@@@@# @@@@@@@                            ",
    "                    @@@       @@@@@@@@@@              @@@@@@@@@%@@@@@@@@@#                          ",
    "                    @@        %@@@@@@@@@%             @@@@@@@@@#@@@@@@@@@@@                         ",
    "                   %@%         @@@@@@@@@@             @@@@@@@@@# @@@@@@@@@@@                        ",
    "                  %@@           @@@@@@@@@@            @@@@@@@@@#  @@@@@@@@@@@                       ",
    "                  @@@@@@@@@@@@@@@@@@@@@@@@@           @@@@@@@@@#    @@@@@@@@@@%                     ",
    "                 @@@             @@@@@@@@@@           @@@@@@@@@#     @@@@@@@@@@@                    ",
    "                @@@              @@@@@@@@@@%          @@@@@@@@@#      @@@@@@@@@@@                   ",
    "                @@@               @@@@@@@@@@          @@@@@@@@@#       %@@@@@@@@@@                  ",
    "               #@@                 @@@@@@@@@@         @@@@@@@@@#        @@@@@@@@@@@%                ",
    "               @@                  %@@@@@@@@@@        @@@@@@@@@#          @@@@@@@@@@@               ",
    "              @@%                   @@@@@@@@@@@      #@@@@@@@@@@           @@@@@@@@@@@              ",
    "           *@@@@@@                #@@@@@@@@@@@@@    %@@@@@@@@@@@@%         @@@@@@@@@@@@@            ",
    "          #########               ##############%  ###############        ################          "
  ];

  const info = [
    `${PROMPT_USER}@${PROMPT_HOST}`,
    '',
    'OS: Windows 11, iOS, Android, EndeavourOS, Ubuntu (WSL)',
    'Uptime: 15 years',
    'Host: adharvsvictus',
    'Kernel: 6.15.7-arch1-1, linux',
    'IDE: VSCode',
    'Terminal: Windows Terminal & Konsole',
    '',
    'Contact:',
    '- Email: adharvarun.10@gmail.com',
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
    '  neofetch    - Show system info with custom ASCII logo',
    '  whoami      - Display the current user',
    '  about       - Show about information',
    '  links       - List social and external links',
    '  ask <query> - Ask anything about Adharv; I will answer',
    '  clear       - Clear the terminal screen (alias: cls)',
    '  home       - Return to the Homepage',
  ].join('\n');
}

export default function TerminalPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [about, setAbout] = useState<AboutDoc | null>(null);
  const [links, setLinks] = useState<LinkDoc[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    Promise.all([fetchAbout(), fetchLinks()]).then(([a, l]) => {
      setAbout(a);
      setLinks(l);
    });
    setHistory(h => h.length ? h : [
      { type: 'output', content: "Welcome to Adharv's Portfolio - Terminal Style" },
      { type: 'output', content: "Type 'help' to see list of available commands." }
    ]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const prompt = useMemo(() => `[${PROMPT_USER}@${PROMPT_HOST} ~]# `, []);

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
      case 'ask': {
        if (!arg) {
          print('Usage: ask <your question>');
          break;
        }
        const knowledge: string[] = [];
        if (about?.description) knowledge.push(about.description);
        if (about?.shortDescription) knowledge.push(about.shortDescription);
        if (about?.titles?.length) knowledge.push(`Titles: ${about.titles.join(', ')}`);
        if (about?.skills?.length) knowledge.push(`Skills: ${about.skills.join(', ')}`);
        knowledge.push('OS: Windows 11, iOS, Android, EndeavourOS, Ubuntu on WSL');
        knowledge.push('Languages: Python, JavaScript, Web, Java, C++ (basic), SQL (basic), Arduino');
        knowledge.push('Contact: adharvarun.10@gmail.com; LinkedIn: https://www.linkedin.com/in/adharv-arun');

        const answer = generateAnswer(arg, knowledge.join('\n'));
        print(answer);
        break;
      }
      default:
        print(`Command not found: ${cmd}. Type 'help' for available commands.`);
    }
  }

  return (
    <div className="fixed inset-0 bg-[#0b0b0b] text-blue-300 font-mono">
      <div className="h-full w-full">
        <div className="h-full w-full bg-[#202225] border border-blue-400/60 shadow-[0_0_0_1px_rgba(59,130,246,0.25)] flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-3" onClick={() => (document.getElementById('terminal-input') as HTMLInputElement)?.focus()}>
            {history.map((item, idx) => (
              <pre key={idx} className={item.type === 'input' ? 'text-blue-300 py-1' : 'text-blue-400 whitespace-pre-wrap py-1'}>
                {item.content}
              </pre>
            ))}
            <div className="flex items-center gap-2">
              <span className="text-blue-300 select-none">{prompt}</span>
              <input
                id="terminal-input"
                className="flex-1 bg-transparent outline-none text-blue-400 placeholder-blue-700 font-mono"
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
                  }
                }}
                autoFocus
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

function generateAnswer(question: string, context: string): string {
  const q = question.toLowerCase();
  if (q.includes('contact') || q.includes('email')) {
    return 'You can reach Adharv at adharvarun.10@gmail.com or on LinkedIn: https://www.linkedin.com/in/adharv-arun';
  }
  if (q.includes('language') || q.includes('stack') || q.includes('tech')) {
    return 'Commonly used: Python, JavaScript, HTML/CSS, basic Java & C++, SQL (basic), Arduino. Strong with Next.js and web dev.';
  }
  if (q.includes('os') || q.includes('system')) {
    return 'Uses Windows 11, iOS, Android, EndeavourOS, and Ubuntu on WSL.';
  }
  if (q.includes('experience') || q.includes('uptime')) {
    return 'Roughly 15 years of learning and building across software and AI engineering.';
  }
  const snippet = context.split('\n').filter(Boolean).slice(0, 6).join('\n');
  return `Here is some info about Adharv:\n${snippet}`;
}


