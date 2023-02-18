import { hc } from 'hono/client'
import type { TodoCreateSchema } from '../../schema/todo'
import type { AppType } from '../../server'

export const client = hc<AppType>('')

export const getTodoList = async () => {
  const response = await client.api.todo.list.$get()
  const json = await response.json()
  return json
}

export const createTodo = async (input: TodoCreateSchema) => {
  const response = await client.api.todo.create.$post({
    json: {
      title: input.title,
    },
  })
  const json = await response.json()
  return json
}
