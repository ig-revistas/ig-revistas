import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './css/Login.css'
import App from './App'
import { AuthProvider } from './context/authprovider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
