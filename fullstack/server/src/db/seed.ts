import { client, db } from '.'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const goalsSaved = await db.insert(goals).values([
    { title: 'Wake up early', desiredWeeklyFrequency: 7 },
    { title: 'Workout', desiredWeeklyFrequency: 6 },
    { title: 'Meditate', desiredWeeklyFrequency: 7 },
  ]).returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: goalsSaved[0].id, createdAt: startOfWeek.toDate() },
    { goalId: goalsSaved[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
    { goalId: goalsSaved[1].id, createdAt: startOfWeek.add(2, 'day').toDate() },
    { goalId: goalsSaved[1].id, createdAt: startOfWeek.add(3, 'day').toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
