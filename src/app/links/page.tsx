import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import * as FaIcons from "react-icons/fa";

async function getLinks() {
  return client.fetch(
    groq`*[_type == "link"] | order(_createdAt asc) {
      _id,
      title,
      url,
      icon
    }`
  );
}

export default async function LinksPage() {
  const links = await getLinks();

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-200/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-300/50">
          <div className="text-center mb-8">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src="/logo.png"
                alt="Adharv Arun"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-black mb-2">Adharv Arun</h1>
            <p className="text-gray-500">Full Stack Developer</p>
          </div>

          <div className="space-y-4">
            {links.map((link: any) => {
              const Icon = (FaIcons as any)[link.icon];
              return (
                <Link
                  key={link._id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-6 py-3 text-white bg-gray-500/50 hover:bg-gray-600/50 rounded-xl transition-all duration-200 border border-gray-300/50 hover:border-gray-200/50"
                >
                  {Icon && <Icon className="w-5 h-5 mr-3" />}
                  <span>{link.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 