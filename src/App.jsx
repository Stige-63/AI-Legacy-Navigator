import { useEffect, useState } from 'react'
import Welcome from './components/Welcome.jsx'
import Questionnaire from './components/Questionnaire.jsx'
import ProfileScreen from './components/ProfileScreen.jsx'
import PathwaysScreen from './components/PathwaysScreen.jsx'
import PlanScreen from './components/PlanScreen.jsx'
import ResultsScreen from './components/ResultsScreen.jsx'
import ProgressSteps from './components/ProgressSteps.jsx'
import { generateLegacyPlan } from './lib/generateLegacyPlan.js'
import { tryAIGeneration } from './lib/aiClient.js'
import './App.css'

const STEP_INDEX = {
  welcome: 0,
  questionnaire: 1,
  generating: 1,
  profile: 2,
  pathways: 3,
  plan: 4,
  results: 5,
}

export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [answers, setAnswers] = useState(null)
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (screen !== 'generating' || !answers) return

    let cancelled = false

    async function run() {
      const aiResult = await tryAIGeneration(answers)
      if (cancelled) return

      if (aiResult) {
        setResult({ ...aiResult, source: 'ai' })
      } else {
        setResult({ ...generateLegacyPlan(answers), source: 'demo' })
      }
      setScreen('profile')
    }

    run()
    return () => {
      cancelled = true
    }
  }, [screen, answers])

  const handleStartOver = () => {
    setAnswers(null)
    setResult(null)
    setScreen('welcome')
  }

  const sourceLabel =
    result?.source === 'demo'
      ? 'Demo Mode — generated instantly from your answers, no AI service required.'
      : ''

  return (
    <div className="app-shell">
      {screen !== 'welcome' && screen !== 'results' && (
        <div className="no-print">
          <ProgressSteps current={STEP_INDEX[screen]} />
        </div>
      )}

      <main className="app-main">
        {screen === 'welcome' && <Welcome onStart={() => setScreen('questionnaire')} />}

        {screen === 'questionnaire' && (
          <Questionnaire
            initialAnswers={answers}
            onBack={() => setScreen('welcome')}
            onComplete={(a) => {
              setAnswers(a)
              setScreen('generating')
            }}
          />
        )}

        {screen === 'generating' && (
          <section className="screen screen--generating">
            <div className="spinner" role="status" aria-live="polite">
              Building your Legacy Profile…
            </div>
          </section>
        )}

        {screen === 'profile' && result && (
          <ProfileScreen
            name={answers.name}
            profile={result.profile}
            sourceLabel={sourceLabel}
            onBack={() => setScreen('questionnaire')}
            onContinue={() => setScreen('pathways')}
          />
        )}

        {screen === 'pathways' && result && (
          <PathwaysScreen
            pathways={result.pathways}
            onBack={() => setScreen('profile')}
            onContinue={() => setScreen('plan')}
          />
        )}

        {screen === 'plan' && result && (
          <PlanScreen
            plan={result.plan}
            onBack={() => setScreen('pathways')}
            onContinue={() => setScreen('results')}
          />
        )}

        {screen === 'results' && result && (
          <ResultsScreen
            name={answers.name}
            profile={result.profile}
            pathways={result.pathways}
            plan={result.plan}
            onStartOver={handleStartOver}
          />
        )}
      </main>

      <footer className="app-footer no-print">
        <p>AI Legacy Navigator · Youth Legacy Initiative</p>
      </footer>
    </div>
  )
}
