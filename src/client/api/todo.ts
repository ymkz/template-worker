import { hc } from 'hono/client'
import type { AppType } from '../../server'

export const client = hc<AppType>('')

export const getTodoList = async () => {
  const response = await client.api.todo.$get()
  const json = await response.json()
  return json
}

export const createTodo = async (input: { title: string }) => {
  const response = await client.api.todo.create.$post({
    json: {
      title: input.title,
    },
  })
  const json = await response.json()
  return json
}
