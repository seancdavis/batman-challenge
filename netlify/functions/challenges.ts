import type { Context } from '@netlify/functions'
import { neon } from '@netlify/neon'
import { drizzle } from 'drizzle-orm/neon-http'
import { eq, and, desc, sql } from 'drizzle-orm'
import { challenges, repEntries } from '../../db/schema'
import { getDayGoals } from '../../src/lib/challengeData'

// Helper to get user ID from request (via Neon Auth session cookie)
async function getUserId(req: Request): Promise<string | null> {
  // Neon Auth stores the user ID in a session - we can verify via the auth endpoint
  // For now, we'll get it from a header set by the frontend
  const userId = req.headers.get('x-user-id')
  return userId
}

// Calculate which days are complete for a challenge
async function getCompletedDays(
  db: ReturnType<typeof drizzle>,
  challengeId: string
): Promise<number[]> {
  // Get all rep entries grouped by day
  const entries = await db
    .select({
      dayNumber: repEntries.dayNumber,
      exerciseType: repEntries.exerciseType,
      totalReps: sql<number>`sum(${repEntries.reps})`.as('total_reps'),
    })
    .from(repEntries)
    .where(eq(repEntries.challengeId, challengeId))
    .groupBy(repEntries.dayNumber, repEntries.exerciseType)

  // Group by day and check if all exercises are complete
  const dayProgress: Record<number, Record<string, number>> = {}
  for (const entry of entries) {
    if (!dayProgress[entry.dayNumber]) {
      dayProgress[entry.dayNumber] = {}
    }
    dayProgress[entry.dayNumber][entry.exerciseType] = entry.totalReps
  }

  const completedDays: number[] = []
  for (const [dayStr, exerciseTotals] of Object.entries(dayProgress)) {
    const dayNumber = parseInt(dayStr)
    const dayGoals = getDayGoals(dayNumber)
    if (!dayGoals) continue

    const isComplete = dayGoals.exercises.every(
      (exercise) => (exerciseTotals[exercise.type] || 0) >= exercise.reps
    )
    if (isComplete) {
      completedDays.push(dayNumber)
    }
  }

  return completedDays.sort((a, b) => a - b)
}

export default async (req: Request, context: Context) => {
  const sqlClient = neon()
  const db = drizzle(sqlClient)

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

    const challenge = result[0] || null
    let completedDays: number[] = []

    if (challenge) {
      completedDays = await getCompletedDays(db, challenge.id)
    }

    return new Response(JSON.stringify({ challenge, completedDays }), {
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

    return new Response(JSON.stringify({ challenge: newChallenge, completedDays: [] }), {
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
