import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createTodo, getTodoList } from '../api/todo'

export const useTodoListQuery = () => {
  return useQuery({
    queryKey: ['TodoList'],
    queryFn: getTodoList,
  })
}

export const useTodoCreateMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['TodoList'] })
    },
  })
}
