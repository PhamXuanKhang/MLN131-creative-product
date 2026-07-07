import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import MuseumShell from './MuseumShell'

// Code-split theo phòng — WorldPage kéo theo leaflet, VietnamPage kéo GSAP ScrollTrigger
const WorldPage = lazy(() => import('@/pages/WorldPage/WorldPage'))
const VietnamPage = lazy(() => import('@/pages/VietnamPage/VietnamPage'))
const QuizPage = lazy(() => import('@/pages/QuizPage/QuizPage'))

export const router = createBrowserRouter([
  {
    element: <MuseumShell />,
    children: [
      { path: '/', element: <Navigate to="/the-gioi" replace /> },
      { path: '/the-gioi', element: <WorldPage /> },
      { path: '/viet-nam', element: <VietnamPage /> },
      { path: '/trac-nghiem', element: <QuizPage /> },
      { path: '*', element: <Navigate to="/the-gioi" replace /> },
    ],
  },
])
