import { hc } from 'hono/client'
import type { AppType } from '../server'

const client = hc<AppType>('http://localhost:3000')

const run = async () => {
  const res = await client.hello.$post({ json: { name: 'JohnDoe' } })
  const data = await res.json()
  console.log(data)
}

run().catch((err) => {
  console.error(err)
})
