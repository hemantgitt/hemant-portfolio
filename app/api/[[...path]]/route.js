import { NextResponse } from 'next/server'

// Simple health-check API. Extend or remove as you wish.
async function handleRoute(request, { params }) {
  const { path = [] } = await params
  const route = `/${path.join('/')}`

  if (route === '/' || route === '/health') {
    return NextResponse.json({ status: 'ok', service: 'hemant-portfolio' })
  }

  return NextResponse.json({ error: `Route ${route} not found` }, { status: 404 })
}

export const GET = handleRoute
export const POST = handleRoute
