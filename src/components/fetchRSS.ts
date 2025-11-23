export type RSSPost = {
  title: string;
  description?: string;
  link?: string;
  pubDate?: string;
  author?: string;
};

export async function fetchRSS(): Promise<RSSPost[]> {
  try {
    const url = "https://blog.adharvarun.tech/api/rss";
    const res = await fetch(url);
    const xmlText = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, "application/xml");

    const items = Array.from(doc.querySelectorAll("item"))
      .slice(0, 3)
      .map((item) => ({
        title: item.querySelector("title")?.textContent || "",
        description:
          item.querySelector("content\\:encoded")?.textContent ||
          item.querySelector("description")?.textContent ||
          "",
        link: item.querySelector("link")?.textContent || undefined,
        pubDate: item.querySelector("pubDate")?.textContent || undefined,
        author:
          item.querySelector("dc\\:creator")?.textContent ||
          item.querySelector("author")?.textContent ||
          undefined,
      }));

    return items;
  } catch (e) {
    console.error("fetchRSS failed:", e);
    return [];
  }
}