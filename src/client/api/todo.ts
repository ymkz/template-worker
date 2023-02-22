import { hc } from 'hono/client'
import type { TodoCreateInput } from '../../schema/todo'
import type { AppType } from '../../server'

const client = hc<AppType>('')

export const getTodoList = async () => {
  const response = await client.api.todo.list.$get().catch((err) => {
    throw new Error('[api.todo.list] client error', { cause: err })
  })

  if (!response.ok) {
    throw new Error('[api.todo.list] response not ok')
  }

  const json = await response.json().catch((err) => {
    throw new Error('[api.todo.list] invalid json response', { cause: err })
  })

  return json
}

export const createTodo = async (input: TodoCreateInput) => {
  const response = await client.api.todo.create
    .$post({ json: { title: input.title } })
    .catch((err) => {
      throw new Error('[api.todo.create] client error', { cause: err })
    })

  if (!response.ok) {
    throw new Error('[api.todo.create] response not ok')
  }

  const json = await response.json().catch((err) => {
    throw new Error('[api.todo.create] invalid json response', { cause: err })
  })

  return json
}
