import { fetchRSS } from '@/components/fetchRSS';
import HomeClient from './HomeClient';

export default async function HomeServer() {
  const posts = await fetchRSS();
  return <HomeClient posts={posts} />;
}