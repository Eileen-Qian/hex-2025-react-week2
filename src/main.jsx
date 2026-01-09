import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/scss/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
