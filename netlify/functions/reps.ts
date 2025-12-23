import type { Context } from '@netlify/functions'
import { neon } from '@netlify/neon'
import { drizzle } from 'drizzle-orm/neon-http'
import { eq, and, sql } from 'drizzle-orm'
import { repEntries, challenges } from '../../db/schema'
import { getDayGoals } from '../../src/lib/challengeData'

// Helper to get user ID from request
async function getUserId(req: Request): Promise<string | null> {
  const userId = req.headers.get('x-user-id')
  return userId
}

// Helper to verify challenge ownership
async function verifyChallengeOwnership(
  db: ReturnType<typeof drizzle>,
  challengeId: string,
  userId: string
): Promise<boolean> {
  const [challenge] = await db
    .select()
    .from(challenges)
    .where(and(eq(challenges.id, challengeId), eq(challenges.userId, userId)))
    .limit(1)

  return !!challenge
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

  const url = new URL(req.url)

  if (req.method === 'GET') {
    // Get rep entries for a specific day
    const challengeId = url.searchParams.get('challengeId')
    const dayNumber = parseInt(url.searchParams.get('dayNumber') || '0')

    if (!challengeId || !dayNumber) {
      return new Response(JSON.stringify({ error: 'Missing challengeId or dayNumber' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Verify ownership
    if (!(await verifyChallengeOwnership(db, challengeId, userId))) {
      return new Response(JSON.stringify({ error: 'Challenge not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Get all rep entries for the day
    const entries = await db
      .select()
      .from(repEntries)
      .where(and(eq(repEntries.challengeId, challengeId), eq(repEntries.dayNumber, dayNumber)))
      .orderBy(repEntries.recordedAt)

    // Get goals for this day
    const dayGoals = getDayGoals(dayNumber)

    // Calculate totals per exercise
    const totals: Record<string, number> = {}
    for (const entry of entries) {
      totals[entry.exerciseType] = (totals[entry.exerciseType] || 0) + entry.reps
    }

    // Calculate progress
    const progress =
      dayGoals?.exercises.map((exercise) => ({
        exerciseType: exercise.type,
        target: exercise.reps,
        completed: totals[exercise.type] || 0,
        percentage: Math.min(100, ((totals[exercise.type] || 0) / exercise.reps) * 100),
        isComplete: (totals[exercise.type] || 0) >= exercise.reps,
      })) || []

    return new Response(
      JSON.stringify({
        dayNumber,
        entries,
        goals: dayGoals?.exercises || [],
        totals,
        progress,
        isComplete: progress.length > 0 && progress.every((p) => p.isComplete),
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  }

  if (req.method === 'POST') {
    // Add a new rep entry
    const body = await req.json()
    const { challengeId, dayNumber, exerciseType, reps } = body

    if (!challengeId || !dayNumber || !exerciseType || !reps || reps < 1) {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (dayNumber < 1 || dayNumber > 30) {
      return new Response(JSON.stringify({ error: 'Day must be between 1 and 30' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Verify ownership
    if (!(await verifyChallengeOwnership(db, challengeId, userId))) {
      return new Response(JSON.stringify({ error: 'Challenge not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Insert the rep entry
    const [entry] = await db
      .insert(repEntries)
      .values({
        challengeId,
        dayNumber,
        exerciseType,
        reps,
      })
      .returning()

    return new Response(JSON.stringify({ entry }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (req.method === 'DELETE') {
    // Delete a rep entry
    const entryId = url.searchParams.get('id')

    if (!entryId) {
      return new Response(JSON.stringify({ error: 'Missing entry id' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Get the entry and verify ownership through challenge
    const [entry] = await db.select().from(repEntries).where(eq(repEntries.id, entryId)).limit(1)

    if (!entry) {
      return new Response(JSON.stringify({ error: 'Entry not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (!(await verifyChallengeOwnership(db, entry.challengeId, userId))) {
      return new Response(JSON.stringify({ error: 'Entry not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    await db.delete(repEntries).where(eq(repEntries.id, entryId))

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const config = {
  path: '/api/reps',
}
