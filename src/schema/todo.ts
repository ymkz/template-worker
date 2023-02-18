import { z } from 'zod'

export type Todo = {
  id: string
  title: string
}

export const todoCreateSchema = z.object({
  title: z.string().max(12).min(2),
})
export type TodoCreateSchema = z.infer<typeof todoCreateSchema>
