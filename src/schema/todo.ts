import { z } from 'zod'

export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
})
export type Todo = z.infer<typeof todoSchema>

export const todoCreateSchema = z.object({
  title: z.string().max(12).min(2),
})
export type TodoCreateInput = z.infer<typeof todoCreateSchema>
