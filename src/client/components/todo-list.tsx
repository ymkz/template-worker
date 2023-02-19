import { useQuery } from '@tanstack/react-query'
import { getTodoList } from '../api/todo'
import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'

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
          <TodoItem todo={todo} />
        ))}
      </ul>
    </>
  )
}
