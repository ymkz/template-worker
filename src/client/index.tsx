import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TodoList } from './components/todo-list'

const queryClient = new QueryClient()

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    </StrictMode>
  )
}

createRoot(document.querySelector('#root') as HTMLElement).render(<App />)
