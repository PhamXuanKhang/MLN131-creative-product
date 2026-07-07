import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import '@/styles/tokens.css'
import '@/styles/global.css'
import { router } from '@/museum/router'
import { initSounds } from '@/shared/AudioManager/audioManager'

initSounds()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
