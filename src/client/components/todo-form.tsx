import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createTodo } from '../api/todo'

export const TodoForm = () => {
  const [title, setTitle] = useState<string>('')

  const queryClient = useQueryClient()

  const todoCreateMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: async () => {
      setTitle('')
      await queryClient.invalidateQueries({ queryKey: ['TodoList'] })
    },
  })

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.currentTarget.value)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    todoCreateMutation.mutate({ title })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={handleChange} />
      <button type="submit">submit</button>
    </form>
  )
}
