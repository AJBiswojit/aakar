import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import { App } from './App.jsx'

/**
 * AAKAR — entry point
 *
 * Global styles are imported before App so the design system, element defaults
 * and reveal utilities sit underneath the component layer in the cascade.
 */
const container = document.getElementById('root')

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
