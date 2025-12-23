import type { Context } from '@netlify/functions'
import { neon } from '@netlify/neon'
import { drizzle } from 'drizzle-orm/neon-http'
import { eq, and, desc } from 'drizzle-orm'
import { challenges } from '../../db/schema'

// Helper to get user ID from request (via Neon Auth session cookie)
async function getUserId(req: Request): Promise<string | null> {
  // Neon Auth stores the user ID in a session - we can verify via the auth endpoint
  // For now, we'll get it from a header set by the frontend
  const userId = req.headers.get('x-user-id')
  return userId
}

export default async (req: Request, context: Context) => {
  const sql = neon()
  const db = drizzle(sql)

  const userId = await getUserId(req)
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (req.method === 'GET') {
    // Get user's active challenge
    const result = await db
      .select()
      .from(challenges)
      .where(and(eq(challenges.userId, userId), eq(challenges.isActive, true)))
      .orderBy(desc(challenges.createdAt))
      .limit(1)

    return new Response(JSON.stringify({ challenge: result[0] || null }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (req.method === 'POST') {
    // Start a new challenge
    const body = await req.json()
    const startDate = body.startDate || new Date().toISOString().split('T')[0]

    // Deactivate any existing active challenges
    await db
      .update(challenges)
      .set({ isActive: false })
      .where(and(eq(challenges.userId, userId), eq(challenges.isActive, true)))

    // Create new challenge
    const [newChallenge] = await db
      .insert(challenges)
      .values({
        userId,
        startDate,
        isActive: true,
      })
      .returning()

    return new Response(JSON.stringify({ challenge: newChallenge }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const config = {
  path: '/api/challenges',
}
