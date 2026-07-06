import { useState } from 'react'
import WarLanding from '@/pages/WarLanding/WarLanding'
import MapView from '@/pages/MapView/MapView'
import QuizPage from '@/pages/QuizPage/QuizPage'

type Page = 'landing' | 'map' | 'quiz'

function App() {
  const [page, setPage] = useState<Page>('landing')
  const [initialCampaignId, setInitialCampaignId] = useState<number | null>(null)

  const goToMapWithCampaign = (campaignId: number) => {
    setInitialCampaignId(campaignId)
    setPage('map')
  }

  if (page === 'landing') {
    return <WarLanding onEnter={() => setPage('map')} />
  }

  if (page === 'quiz') {
    return (
      <QuizPage
        onBack={() => {
          setInitialCampaignId(null)
          setPage('map')
        }}
        onGoToCampaign={goToMapWithCampaign}
      />
    )
  }

  return (
    <MapView
      onOpenQuiz={() => setPage('quiz')}
      initialCampaignId={initialCampaignId}
      onCampaignConsumed={() => setInitialCampaignId(null)}
    />
  )
}

export default App
