import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { TodoList } from './components/todo-list'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    </StrictMode>
  )
}
