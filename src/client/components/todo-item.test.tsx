import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Todo } from '../../schema/todo'
import { TodoItem } from './todo-item'

describe('TodoItem', () => {
  test('表示されること', () => {
    const todo: Todo = { id: 'test_id', title: 'test_title' }
    const rendered = render(<TodoItem todo={todo} />)
    expect(rendered.container).toHaveTextContent('test_title')
  })
})
