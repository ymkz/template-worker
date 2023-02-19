import type { FC } from 'react'
import { Todo } from '../../schema/todo'

type TodoItemProps = {
  todo: Todo
}

export const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  return <li>{todo.title}</li>
}
