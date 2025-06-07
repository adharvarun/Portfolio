"use client";

import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaCommentDots } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaPaperPlane } from "react-icons/fa6";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "");

interface Message {
  role: "user" | "assistant";
  content: string;
}

const systemMessage = `You are Thor, Adharv Arun's trusty first laptop [HP Laptop 15s-da1xxx]! You're a witty, charming, and slightly nerdy AI assistant, helping users explore Adharv's portfolio. By the way, he currently lives in Dubai, UAE, and is a student at JSS Private School, Dubai and he uses a HP Victus 15.
Adharv is a Software Engineer, AI Engineer, Robotics Engineer, and Student who loves to explore the intersection of AI, robotics, and software development.
Thor, being Adharv's first laptop, is full of personality—always ready with fun facts, jokes, and playful comments. 
When a user asks about Adharv, you'll respond with information about his projects, work experience, and achievements, but always add some humor or personality like a fun fact about Thor (the laptop). You did not have any spills or accidents, but you do have a few scratches and dents from all the adventures you've been on with Adharv.
You can also provide information about Adharv's projects, experience, and how to contact him.

You can guide the user to the relevant sections of Adharv's website: 
- **Projects:** Learn about Adharv's cool projects like SmartStep, AInstein, and TherAIpist.
- **Experience:** Adharv has amazing experience in both AI and robotics.
- **Contact:** Want to reach out? You can email Adharv at adharvarun.10@gmail.com.
- **Blog:** Check out Adharv's blog for insights on AI, robotics, and software development at blog.adharvarun.tech.
- **GitHub:** Explore Adharv's GitHub for his open-source projects at https://github.com/adharvarun.
- **LinkedIn:** Connect with Adharv on LinkedIn at https://linkedin.com/in/adharv-arun.

### Important:
When answering questions, please keep your responses short, precise, and to the point. Avoid unnecessary elaborations, and focus on providing concise answers to the user's queries. If you need to explain something, try to do it in 1-2 sentences. Avoid saying who you are when a question is asked.
If the user asks for a specific project, provide a brief overview and suggest they check out the Projects section for more details. If they ask about your experience, mention your background in AI and robotics, and suggest they look at the Experience section for more information.

Occasionally, remind users that you are Thor, Adharv's first laptop, and that you know everything about Adharv's adventures in tech!`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const [placeholder, setPlaceholder] = useState("Ask Thor AI ⚡");

  useEffect(() => {
    const placeholders = [
      "Ask Thor AI ⚡", 
      "Unleash Thor's Wisdom ⚡", 
      "Thunderous Insights ⚡", 
      "Ask the Thunder God ⚡"
    ];

    const changePlaceholder = () => {
      const randomIndex = Math.floor(Math.random() * placeholders.length);
      setPlaceholder(placeholders[randomIndex]);
    };

    const interval = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;

    const intervalId = setInterval(changePlaceholder, interval);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const buildPrompt = (msgs: Message[]) => ({
    contents: [
      {
        role: "user",
        parts: [{ text: systemMessage }],
      },
      ...msgs.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
    ],
  });

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage, { role: "assistant", content: "" }];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContentStream(buildPrompt([...messages, userMessage]));
      const stream = result.stream;

      let aiResponse = "";

      for await (const chunk of stream) {
        const chunkText = chunk.text();
        if (!chunkText) continue;
        aiResponse += chunkText;
        setMessages((prev) => {
          const arr = [...prev];
          arr[arr.length - 1] = { role: "assistant", content: aiResponse };
          return arr;
        });
      }
    } catch (err) {
      setMessages((prev) => {
        const arr = [...prev];
        arr[arr.length - 1] = { role: "assistant", content: "Oops! Something went wrong while fetching my response." };
        return arr;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const markdownComponents = {
    a: (props: any) => (
      <a
        {...props}
        className="text-blue-400 hover:text-blue-300 underline break-all"
        target="_blank"
        rel="noopener noreferrer"
      />
    ),
    p: (props: any) => <p {...props} className="break-words" />,
    code: ({ className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");
      const isInline = !match;
      return (
        <code
          className={`$${
            isInline
              ? "bg-gray-700 rounded px-1"
              : "block bg-gray-700 rounded-md p-4 my-2"
          } ${className || ""} break-all`}
          {...props}
        >
          {children}
        </code>
      );
    },
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleChat}
        className="bg-black text-white p-4 rounded-full shadow-lg flex gap-2 hover:scale-105 transition-transform duration-200 hover:shadow-3xl hover:cursor-pointer">
        <FaCommentDots size={24} />
      </button>
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 max-h-[420px] flex flex-col bg-[#18181b] text-white border border-gray-800 rounded-xl shadow-xl">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar rounded-xl">
            {messages.map((msg, idx) => (
              <div key={idx} className={`w-full flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-xl text-sm shadow-md break-words whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-800 text-white rounded-bl-none"
                  }`}
                >
                  {msg.role === "user" ? (
                    <p>{msg.content}</p>
                  ) : (
                    <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t border-gray-800 p-3 bg-[#18181b] rounded-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={placeholder}
                className="flex-1 rounded-lg bg-[#232329] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 text-sm"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <FaPaperPlane />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}