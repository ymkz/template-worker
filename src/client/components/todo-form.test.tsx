import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { createQueryWrapper } from '../../../test/vitest.util'
import { TodoForm } from './todo-form'

const { queryWrapper } = createQueryWrapper()

describe('TodoForm', () => {
  test('表示されること', () => {
    const rendered = render(<TodoForm />, { wrapper: queryWrapper })
    expect(rendered.container).toBeInTheDocument()
  })
})
