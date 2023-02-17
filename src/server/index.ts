import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { z } from 'zod'

type Todo = {
  id: string
  title: string
}

const app = new Hono()

const todos: Todo[] = []

const todoList = app.get('/api/todo/list', (ctx) => {
  return ctx.jsonT<{ todos: Todo[] }>({ todos: todos })
})

const todoCreate = app.post(
  '/api/todo/create',
  zValidator(
    'json',
    z.object({
      title: z.string(),
    })
  ),
  (ctx) => {
    const { title } = ctx.req.valid('json')
    const todo: Todo = {
      id: Date.now().toString(),
      title,
    }
    todos.push(todo)
    return ctx.jsonT<{ result: Todo }>({ result: todo })
  }
)

app.get('*', serveStatic())

export type AppType = typeof todoList | typeof todoCreate

export default app
