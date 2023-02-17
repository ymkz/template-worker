import { createRoot } from 'react-dom/client'
import { App } from './app'

createRoot(document.querySelector('#root') as HTMLElement).render(<App />)
