import {
  act,
  renderHook,
  RenderHookResult,
  waitFor,
} from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { createQueryWrapper } from '../../../test/vitest.util'
import { useTodoCreateMutation, useTodoListQuery } from './todo'

const { queryWrapper } = createQueryWrapper()

vi.mock('../api/todo', () => {
  return {
    getTodoList: vi.fn().mockResolvedValue({
      result: [
        {
          id: 'test_id',
          title: 'test_title',
        },
      ],
    }),
    createTodo: vi.fn().mockResolvedValue({
      result: {
        id: 'test_id',
        title: 'test_title',
      },
    }),
  }
})

describe('useTodoListQuery', () => {
  let hook: RenderHookResult<ReturnType<typeof useTodoListQuery>, void>

  beforeEach(() => {
    hook = renderHook(useTodoListQuery, {
      wrapper: queryWrapper,
    })
  })

  test('getTodoListのレスポンスがdataに入っていること', async () => {
    await waitFor(() => hook.result.current.isSuccess)

    expect(hook.result.current.isSuccess).toBe(true)
    expect(hook.result.current.data).toStrictEqual({
      result: [
        {
          id: 'test_id',
          title: 'test_title',
        },
      ],
    })
  })
})

describe('useTodoCreateMutation', () => {
  let hook: RenderHookResult<ReturnType<typeof useTodoCreateMutation>, void>

  beforeEach(() => {
    hook = renderHook(useTodoCreateMutation, {
      wrapper: queryWrapper,
    })
  })

  test('createTodoのレスポンスがdataに入っていること', async () => {
    act(() => {
      hook.result.current.mutate({
        title: 'test_title',
      })
    })

    await waitFor(() => hook.result.current.isSuccess)

    expect(hook.result.current.isSuccess).toBe(true)
    expect(hook.result.current.data).toStrictEqual({
      result: {
        id: 'test_id',
        title: 'test_title',
      },
    })
  })
})
