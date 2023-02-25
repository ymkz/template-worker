import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { createQueryWrapper } from '../../../test/vitest.util'
import * as apiTodoModule from '../api/todo'
import { useTodoCreateMutation, useTodoListQuery } from './todo'

const { queryWrapper } = createQueryWrapper()

describe('useTodoListQuery', () => {
  const spyGetTodoList = vi.spyOn(apiTodoModule, 'getTodoList')

  beforeEach(() => {
    spyGetTodoList.mockReset()
  })

  test('getTodoListのレスポンスがdataに入っていること', async () => {
    // ARRANGE
    spyGetTodoList.mockResolvedValue({
      result: [
        {
          id: 'test_id',
          title: 'test_title',
        },
      ],
    })
    const { result } = renderHook(useTodoListQuery, {
      wrapper: queryWrapper,
    })

    // ACT
    await waitFor(() => expect(spyGetTodoList).toHaveBeenCalled())
    await waitFor(() => result.current.isSuccess)

    // ASSERT
    expect(result.current.isSuccess).toBe(true)
    expect(result.current.data).toStrictEqual({
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
  const spyCreateTodo = vi.spyOn(apiTodoModule, 'createTodo')

  beforeEach(() => {
    spyCreateTodo.mockReset()
  })

  test('createTodoのレスポンスがdataに入っていること', async () => {
    // ARRANGE
    spyCreateTodo.mockResolvedValue({
      result: {
        id: 'test_id',
        title: 'test_title',
      },
    })
    const { result } = renderHook(useTodoCreateMutation, {
      wrapper: queryWrapper,
    })

    // ACT
    act(() => {
      result.current.mutate({
        title: 'test_title',
      })
    })
    await waitFor(() => expect(spyCreateTodo).toHaveBeenCalled())
    await waitFor(() => result.current.isSuccess)

    // ASSERT
    expect(result.current.isSuccess).toBe(true)
    expect(result.current.data).toStrictEqual({
      result: {
        id: 'test_id',
        title: 'test_title',
      },
    })
  })
})
