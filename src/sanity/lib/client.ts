import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-13',
  useCdn: process.env.NODE_ENV === 'production',
})

// Wrap the client's `fetch` to avoid uncaught runtime errors when Sanity is unreachable.
// This prevents the app from crashing with DNS/network failures (ENOTFOUND) and
// returns `null` so callers can handle missing data gracefully.
const _origFetch = client.fetch.bind(client)
client.fetch = async (query: any, params?: any) => {
  try {
    return await _origFetch(query, params)
  } catch (err: any) {
    // Helpful log for local debugging — contains error code (ENOTFOUND) and digest if present.
    // Keep the message concise so logs are useful in CI / hosting environments.
    console.error('[Sanity] fetch failed:', err?.code || err?.message || err)
    return null
  }
}

export default client
