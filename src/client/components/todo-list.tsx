import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createTodo, getTodoList } from '../api/todo'

export const TodoList = () => {
  const [title, setTitle] = useState<string>('')

  const queryClient = useQueryClient()

  const todoListQuery = useQuery({
    queryKey: ['TodoList'],
    queryFn: getTodoList,
  })

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
    <section>
      <h1>TodoList</h1>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={handleChange} />
        <button type="submit">submit</button>
      </form>
      <ul>
        {todoListQuery.data?.todos.map((todo) => (
          <li>{todo.title}</li>
        ))}
      </ul>
    </section>
  )
}
