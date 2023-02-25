import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { createQueryWrapper } from '../../../test/vitest.util'
import { Todo } from '../../schema/todo'
import { TodoItem } from './todo-item'

const { queryWrapper } = createQueryWrapper()

describe('TodoItem', () => {
  test('表示されること', () => {
    // ARRANGE
    const todo: Todo = { id: 'test_id', title: 'test_title' }

    // ACT
    render(<TodoItem todo={todo} />, { wrapper: queryWrapper })
    const item = screen.getByRole('listitem')

    // ASSERT
    expect(item).toBeInTheDocument()
  })
})
