import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoal } from '../../functions/create-goal'
import { getWeekPendingGoals } from '../../functions/get-week-pending-goals'

export const getPendingGoals: FastifyPluginAsyncZod = async (app, _opts) => {
  app.get('/pending-goals', async () => {
    const { pendingGoals } = await getWeekPendingGoals()
    return { pendingGoals }
  })
}
