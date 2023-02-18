import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import type { UnstableDevWorker } from 'wrangler'
import { unstable_dev } from 'wrangler'

/**
 * @see https://developers.cloudflare.com/workers/wrangler/api/#unstable_dev
 */
describe('Worker', () => {
  let worker: UnstableDevWorker

  beforeAll(async () => {
    worker = await unstable_dev('src/server/index.ts', {
      experimental: { disableExperimentalWarning: true },
    })
  })

  afterAll(async () => {
    await worker.stop()
  })

  test('GET /api/todo/list should return todos by 200', async () => {
    const response = await worker.fetch('/api/todo/list')
    expect(response.status).toBe(200)

    const responseBody = await response.json()
    expect(responseBody).toStrictEqual({ result: [] })
  })

  test('POST /api/todo/create should create todo by 200', async () => {
    const response = await worker.fetch('/api/todo/create', {
      method: 'POST',
      body: JSON.stringify({ title: 'TODO' }),
    })
    expect(response.status).toBe(200)

    const responseBody = await response.json()
    expect(responseBody).toStrictEqual({
      result: {
        id: expect.anything() as string,
        title: 'TODO',
      },
    })
  })
})
