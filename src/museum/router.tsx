import { createBrowserRouter, Navigate } from 'react-router-dom'
import MuseumShell from './MuseumShell'
import WorldPage from '@/pages/WorldPage/WorldPage'
import VietnamPage from '@/pages/VietnamPage/VietnamPage'
import QuizPlaceholderPage from '@/pages/QuizPlaceholderPage/QuizPlaceholderPage'

export const router = createBrowserRouter([
  {
    element: <MuseumShell />,
    children: [
      { path: '/', element: <Navigate to="/the-gioi" replace /> },
      { path: '/the-gioi', element: <WorldPage /> },
      { path: '/viet-nam', element: <VietnamPage /> },
      { path: '/trac-nghiem', element: <QuizPlaceholderPage /> },
      { path: '*', element: <Navigate to="/the-gioi" replace /> },
    ],
  },
])
