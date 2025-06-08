import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import LinksClient from "./LinksClient";

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
  return <LinksClient links={links} />;
} 