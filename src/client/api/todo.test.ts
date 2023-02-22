import { beforeAll, describe, expect, test, vi } from 'vitest'
import { createTodo, getTodoList } from './todo'

describe('getTodoList', () => {
  beforeAll(() => {
    // @ts-ignore
    global.fetch = vi.fn()
  })

  test('正常な値がレスポンスされること', async () => {
    // @ts-ignore
    fetch.mockResolvedValue({
      ok: true,
      json: () =>
        new Promise((resolve) =>
          resolve({ result: [{ id: 'test_id', title: 'test_title' }] })
        ),
    })

    await expect(getTodoList()).resolves.toStrictEqual({
      result: [{ id: 'test_id', title: 'test_title' }],
    })
  })

  test('クライアントエラーの例外がスローされること', async () => {
    // @ts-ignore
    fetch.mockRejectedValue(new Error())

    await expect(getTodoList()).rejects.toThrow('[api.todo.list] client error')
  })

  test('レスポンスが正常でないという例外がスローされること', async () => {
    // @ts-ignore
    fetch.mockResolvedValue({
      ok: false,
    })

    await expect(getTodoList()).rejects.toThrow(
      '[api.todo.list] response not ok'
    )
  })

  test('レスポンスボディが異常なJSONであるという例外がスローされること', async () => {
    // @ts-ignore
    fetch.mockResolvedValue({
      ok: true,
      json: () => new Promise((_, reject) => reject(new Error())),
    })

    await expect(getTodoList()).rejects.toThrow(
      '[api.todo.list] invalid json response'
    )
  })
})

describe('createTodo', () => {
  beforeAll(() => {
    // @ts-ignore
    global.fetch = vi.fn()
  })

  test('正常な値がレスポンスされること', async () => {
    // @ts-ignore
    fetch.mockResolvedValue({
      ok: true,
      json: () =>
        new Promise((resolve) =>
          resolve({ result: { id: 'test_id', title: 'test_title' } })
        ),
    })

    await expect(createTodo({ title: 'test_title' })).resolves.toStrictEqual({
      result: { id: 'test_id', title: 'test_title' },
    })
  })

  test('クライアントエラーの例外がスローされること', async () => {
    // @ts-ignore
    fetch.mockRejectedValue(new Error())

    await expect(createTodo({ title: 'test_title' })).rejects.toThrow(
      '[api.todo.create] client error'
    )
  })

  test('レスポンスが正常でないという例外がスローされること', async () => {
    // @ts-ignore
    fetch.mockResolvedValue({
      ok: false,
    })

    await expect(createTodo({ title: 'test_title' })).rejects.toThrow(
      '[api.todo.create] response not ok'
    )
  })

  test('レスポンスボディが異常なJSONであるという例外がスローされること', async () => {
    // @ts-ignore
    fetch.mockResolvedValue({
      ok: true,
      json: () => new Promise((_, reject) => reject(new Error())),
    })

    await expect(createTodo({ title: 'test_title' })).rejects.toThrow(
      '[api.todo.create] invalid json response'
    )
  })
})
