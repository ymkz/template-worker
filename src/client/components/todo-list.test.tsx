import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { createQueryWrapper } from '../../../test/vitest.util'
import * as todoHooks from '../hooks/todo'
import { TodoList } from './todo-list'

const { queryWrapper } = createQueryWrapper()

describe('TodoList', () => {
  const spyUseTodoListQuery = vi.spyOn(todoHooks, 'useTodoListQuery')

  beforeEach(() => {
    spyUseTodoListQuery.mockReset()
  })

  test('表示されること', () => {
    // ARRANGE
    // @ts-ignore
    spyUseTodoListQuery.mockReturnValue({
      data: {
        result: [],
      },
    })

    // ACT
    render(<TodoList />, { wrapper: queryWrapper })
    const list = screen.getByRole('list')

    // ASSERT
    expect(list).toBeInTheDocument()
  })

  test('resultの中身が表示されること', () => {
    // ARRANGE
    // @ts-ignore
    spyUseTodoListQuery.mockReturnValue({
      data: {
        result: [
          { id: 'test_id_1', title: 'test_title_1' },
          { id: 'test_id_2', title: 'test_title_2' },
        ],
      },
    })

    // ACT
    render(<TodoList />, { wrapper: queryWrapper })
    const test1 = screen.getByText('test_title_1')
    const test2 = screen.getByText('test_title_2')

    // ASSERT
    expect(test1).toHaveTextContent('test_title_1')
    expect(test2).toHaveTextContent('test_title_2')
  })

  test.todo('error時のテスト')
  test.todo('loading時のテスト')
})
