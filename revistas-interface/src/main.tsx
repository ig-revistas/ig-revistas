import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';

import './css/index.css'

import { AuthProvider } from './context/authprovider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
