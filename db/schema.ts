import {
  pgTable,
  text,
  integer,
  timestamp,
  uuid,
  date,
  boolean,
  index,
} from 'drizzle-orm/pg-core'

// Challenges table - tracks a user's 30-day challenge
export const challenges = pgTable(
  'challenges',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull(), // References neon_auth.users.id
    startDate: date('start_date').notNull(),
    isActive: boolean('is_active').notNull().default(true),
    completedAt: timestamp('completed_at'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => [index('challenges_user_id_idx').on(table.userId)]
)

// Rep entries - individual exercise log entries
export const repEntries = pgTable(
  'rep_entries',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    challengeId: uuid('challenge_id')
      .notNull()
      .references(() => challenges.id, { onDelete: 'cascade' }),
    dayNumber: integer('day_number').notNull(), // 1-30
    exerciseType: text('exercise_type').notNull(), // 'squats' | 'pushups' | 'situps'
    reps: integer('reps').notNull(),
    recordedAt: timestamp('recorded_at').notNull().defaultNow(),
  },
  (table) => [
    index('rep_entries_challenge_day_idx').on(table.challengeId, table.dayNumber),
  ]
)

// Types for use in the application
export type Challenge = typeof challenges.$inferSelect
export type NewChallenge = typeof challenges.$inferInsert
export type RepEntry = typeof repEntries.$inferSelect
export type NewRepEntry = typeof repEntries.$inferInsert
