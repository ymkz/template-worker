import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()

const route = app.post(
  '/hello',
  zValidator('json', z.object({ name: z.string() })),
  (ctx) => {
    const { name } = ctx.req.valid('json')
    return ctx.jsonT({ greeting: `Hello, ${name}!` })
  }
)

export type AppType = typeof route

export default app
