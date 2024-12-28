import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import RouterProvider from './router/RouterContext.tsx'
import MusicPlayerProvider from './utils/MusicPlayer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MusicPlayerProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </MusicPlayerProvider>
  </StrictMode>,
)
