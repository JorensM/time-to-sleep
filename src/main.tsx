import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import RouterProvider from './router/RouterContext.tsx'
import MusicPlayerProvider from './utils/MusicPlayer.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import ToastProvider from './components/ToastProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ToastProvider>
        <MusicPlayerProvider>
          <RouterProvider>
            <App />
          </RouterProvider>
        </MusicPlayerProvider>
      </ToastProvider>
    </ErrorBoundary>
  </StrictMode>,
)
