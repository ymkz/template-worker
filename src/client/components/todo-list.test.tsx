import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { createQueryWrapper } from '../../../test/vitest.util'
import { TodoList } from './todo-list'

const { queryClient, queryWrapper } = createQueryWrapper()

queryClient.setQueryData(['TodoList'], () => {
  return {
    result: [
      {
        id: 'test_id_1',
        title: 'test_title_1',
      },
      {
        id: 'test_id_2',
        title: 'test_title_2',
      },
    ],
  }
})

describe('TodoList', () => {
  test('表示されること', () => {
    const rendered = render(<TodoList />, { wrapper: queryWrapper })
    expect(rendered.container).toBeInTheDocument()
  })
})
