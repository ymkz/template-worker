import { useQuery } from '@tanstack/react-query'
import { getTodoList } from '../api/todo'
import { TodoForm } from './todo-form'

export const TodoList = () => {
  const todoListQuery = useQuery({
    queryKey: ['TodoList'],
    queryFn: getTodoList,
  })

  return (
    <>
      <h1>TodoList</h1>
      <TodoForm />
      <ul>
        {todoListQuery.data?.result.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  )
}
