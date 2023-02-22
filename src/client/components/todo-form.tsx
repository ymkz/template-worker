import { useState } from 'react'
import { useTodoCreateMutation } from '../hooks/todo'

export const TodoForm = () => {
  const [title, setTitle] = useState<string>('')

  const todoCreateMutation = useTodoCreateMutation()

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
