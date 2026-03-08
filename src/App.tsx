import { useState } from 'react'
import LandingPage from './components/LandingPage'
import MapView from './components/MapView'
import './App.css'

function App() {
  const [showLanding, setShowLanding] = useState(true)

  const handleEnterApp = () => {
    setShowLanding(false)
  }

  return showLanding ? (
    <LandingPage onEnter={handleEnterApp} />
  ) : (
    <MapView />
  )
}

export default App
