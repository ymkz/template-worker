import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TodoForm } from './components/todo-form'
import { TodoList } from './components/todo-list'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <h1>TodoList</h1>
        <TodoForm />
        <TodoList />
      </QueryClientProvider>
    </StrictMode>
  )
}

createRoot(document.querySelector('#root') as HTMLElement).render(<App />)
