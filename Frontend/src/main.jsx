import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import StoreProvider from './StoreProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <StoreProvider />
  </StrictMode>,
)
