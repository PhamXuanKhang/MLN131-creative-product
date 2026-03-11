import { useState } from 'react'
import WarLanding from './components/WarLanding'
import MapView from './components/MapView'
import QuizPage from './components/QuizPage'
import './App.css'

type Page = 'landing' | 'map' | 'quiz'

function App() {
  const [page, setPage] = useState<Page>('landing')

  if (page === 'landing') {
    return <WarLanding onEnter={() => setPage('map')} />
  }

  if (page === 'quiz') {
    return <QuizPage onBack={() => setPage('map')} />
  }

  return <MapView onOpenQuiz={() => setPage('quiz')} />
}

export default App
