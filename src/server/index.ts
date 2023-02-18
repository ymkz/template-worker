import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import type { Todo } from '../schema/todo'
import { todoCreateSchema } from '../schema/todo'

const app = new Hono()

const todos: Todo[] = []

const todoList = app.get('/api/todo/list', (ctx) => {
  return ctx.jsonT<{ result: Todo[] }>({
    result: todos,
  })
})

const todoCreate = app.post(
  '/api/todo/create',
  zValidator('json', todoCreateSchema),
  (ctx) => {
    const { title } = ctx.req.valid('json')
    const id = Date.now().toString()
    const todo: Todo = { id, title }
    todos.push(todo)
    return ctx.jsonT<{ result: Todo }>({
      result: todo,
    })
  }
)

app.get('*', serveStatic())

export type AppType = typeof todoList | typeof todoCreate

export default app
