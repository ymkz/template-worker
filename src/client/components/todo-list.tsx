import { useTodoListQuery } from '../hooks/todo'
import { TodoItem } from './todo-item'

export const TodoList = () => {
  const todoListQuery = useTodoListQuery()

  return (
    <ul>
      {todoListQuery.data?.result.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
