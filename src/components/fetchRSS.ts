import Parser from 'rss-parser';
const parser = new Parser();

export async function fetchRSS() {
  const url = 'https://blog.adharvarun.tech/api/rss';   
  const res = await fetch(url);
  const xmlData = await res.text();
  const feed = await parser.parseString(xmlData);

  return feed.items.slice(0, 3).map(item => ({
    title: item.title,
    description: item.contentSnippet || item.description,
    link: item.link,
    pubDate: item.pubDate,
    author: item.creator || item.author
  }));
}