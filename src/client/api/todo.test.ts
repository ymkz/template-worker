import { describe, expect, test, vi } from 'vitest'
import { createTodo, getTodoList } from './todo'

describe('getTodoList', () => {
  test('正常な値がレスポンスされること', async () => {
    // ARRANGE
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        new Promise((resolve) =>
          resolve({ result: [{ id: 'test_id', title: 'test_title' }] })
        ),
    })

    // ACT
    const actual = getTodoList()

    // ASSERT
    await expect(actual).resolves.toStrictEqual({
      result: [{ id: 'test_id', title: 'test_title' }],
    })
  })

  test('クライアントエラーの例外がスローされること', async () => {
    // ARRANGE
    global.fetch = vi.fn().mockRejectedValue(new Error())

    // ACT
    const actual = getTodoList()

    // ASSERT
    await expect(actual).rejects.toThrow('[api.todo.list] client error')
  })

  test('レスポンスが正常でないという例外がスローされること', async () => {
    // ARRANGE
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    })

    // ACT
    const actual = getTodoList()

    // ASSERT
    await expect(actual).rejects.toThrow('[api.todo.list] response not ok')
  })

  test('レスポンスボディが異常なJSONであるという例外がスローされること', async () => {
    // ARRANGE
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => new Promise((_, reject) => reject(new Error())),
    })

    // ACT
    const actual = getTodoList()

    // ASSERT
    await expect(actual).rejects.toThrow(
      '[api.todo.list] invalid json response'
    )
  })
})

describe('createTodo', () => {
  test('正常な値がレスポンスされること', async () => {
    // ARRANGE
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        new Promise((resolve) =>
          resolve({ result: { id: 'test_id', title: 'test_title' } })
        ),
    })

    // ACT
    const actual = createTodo({ title: 'test_title' })

    // ASSERT
    await expect(actual).resolves.toStrictEqual({
      result: { id: 'test_id', title: 'test_title' },
    })
  })

  test('クライアントエラーの例外がスローされること', async () => {
    // ARRANGE
    global.fetch = vi.fn().mockRejectedValue(new Error())

    // ACT
    const actual = createTodo({ title: 'test_title' })

    // ASSERT
    await expect(actual).rejects.toThrow('[api.todo.create] client error')
  })

  test('レスポンスが正常でないという例外がスローされること', async () => {
    // ARRANGE
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    })

    // ACT
    const actual = createTodo({ title: 'test_title' })

    // ASSERT
    await expect(actual).rejects.toThrow('[api.todo.create] response not ok')
  })

  test('レスポンスボディが異常なJSONであるという例外がスローされること', async () => {
    // ARRANGE
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => new Promise((_, reject) => reject(new Error())),
    })

    // ACT
    const actual = createTodo({ title: 'test_title' })

    // ASSERT
    await expect(actual).rejects.toThrow(
      '[api.todo.create] invalid json response'
    )
  })
})
