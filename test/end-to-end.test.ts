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

  // test('GET /api/todo/list should return todos by 200', async () => {
  test('Todoのリストがレスポンスされること', async () => {
    const response = await worker.fetch('/api/todo/list')
    expect(response.status).toBe(200)

    const responseBody = await response.json()
    expect(responseBody).toStrictEqual({ result: [] })
  })

  test('Todoを作成できること', async () => {
    const response = await worker.fetch('/api/todo/create', {
      method: 'POST',
      body: JSON.stringify({ title: 'test_title' }),
    })
    expect(response.status).toBe(200)

    const responseBody = await response.json()
    expect(responseBody).toStrictEqual({
      result: {
        id: expect.anything() as string,
        title: 'test_title',
      },
    })
  })

  test('Todoの作成時にタイトルの文字数の下限でエラーがレスポンスされること', async () => {
    const response = await worker.fetch('/api/todo/create', {
      method: 'POST',
      body: JSON.stringify({ title: 'x' }),
    })
    expect(response.status).toBe(400)

    const responseBody = await response.json()
    expect(responseBody).toHaveProperty('error')
  })

  test('Todoの作成時にタイトルの文字数の上限でエラーがレスポンスされること', async () => {
    const response = await worker.fetch('/api/todo/create', {
      method: 'POST',
      body: JSON.stringify({ title: 'abcdefghijklmn' }),
    })
    expect(response.status).toBe(400)

    const responseBody = await response.json()
    expect(responseBody).toHaveProperty('error')
  })
})
