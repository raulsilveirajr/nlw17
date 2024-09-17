import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalCompletion } from '../../functions/create-goal-completion'

export const createCompletionsRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { goalId } = request.body
      const result = await createGoalCompletion({
        goalId,
      })

      return result
    }
  )
}
