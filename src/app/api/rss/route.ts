import { NextResponse } from 'next/server'

export async function GET() {
  const external = 'https://blog.adharvarun.tech/api/rss'
  try {
    const res = await fetch(external)
    if (!res.ok) {
      return NextResponse.json({ error: 'upstream_error', status: res.status }, { status: 502 })
    }
    const xml = await res.text()
    return new Response(xml, {
      status: 200,
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    })
  } catch (err: any) {
    console.error('[api/rss] fetch failed', err?.code || err?.message || err)
    return NextResponse.json({ error: 'fetch_failed' }, { status: 502 })
  }
}
