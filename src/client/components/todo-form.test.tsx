import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { createQueryWrapper } from '../../../test/vitest.util'
import { TodoForm } from './todo-form'

const { queryWrapper } = createQueryWrapper()

describe('TodoForm', () => {
  test('表示されること', () => {
    // ARRANGE
    render(<TodoForm />, { wrapper: queryWrapper })

    // ACT
    const textInput = screen.getByRole('textbox')
    const submitButton = screen.getByRole('button')

    // ASSERT
    expect(textInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })
})
