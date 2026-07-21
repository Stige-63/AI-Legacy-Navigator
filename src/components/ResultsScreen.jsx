import { useState } from 'react'
import { formatSummary } from '../lib/formatSummary.js'
import Disclaimer from './Disclaimer.jsx'

export default function ResultsScreen({ name, profile, pathways, plan, onStartOver }) {
  const [copied, setCopied] = useState(false)
  const summary = formatSummary({ name, profile, pathways, plan })

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handlePrint = () => window.print()

  return (
    <section className="screen screen--results">
      <div className="results-actions no-print">
        <button type="button" className="btn btn--primary" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy Results'}
        </button>
        <button type="button" className="btn btn--secondary" onClick={handlePrint}>
          Print / Save as PDF
        </button>
        <button type="button" className="btn btn--ghost" onClick={onStartOver}>
          Start Over
        </button>
      </div>

      <div className="results-sheet">
        <header className="results-sheet__header">
          <p className="eyebrow">Youth Legacy Initiative</p>
          <h1>AI Legacy Navigator</h1>
          <p className="results-sheet__name">Results for {name}</p>
        </header>

        <section>
          <h2>Legacy Profile</h2>
          <p>
            <strong>Strength Summary:</strong> {profile.strengthSummary}
          </p>
          <p>
            <strong>Interest Themes:</strong> {profile.interestThemes}
          </p>
          <p>
            <strong>Values &amp; Motivation Themes:</strong> {profile.valuesThemes}
          </p>
          <p>
            <strong>Possible Legacy Direction:</strong> {profile.legacyDirection}
          </p>
          <p className="encouraging-statement">{profile.encouragingStatement}</p>
        </section>

        <section>
          <h2>Pathway Recommendations</h2>
          {pathways.map((p) => (
            <div key={p.key} className="results-sheet__pathway">
              <h3>{p.title}</h3>
              <p>{p.whyItFits}</p>
              <p>
                <strong>First step:</strong> {p.firstStep}
              </p>
              <p>
                <strong>Skill to develop:</strong> {p.skillToDevelop}
              </p>
              <p>
                <strong>Talk to:</strong> {p.trustedAdult}
              </p>
            </div>
          ))}
        </section>

        <section>
          <h2>30-Day Legacy Action Plan</h2>
          <p>
            <strong>Week 1 — Discover:</strong> {plan.week1}
          </p>
          <p>
            <strong>Week 2 — Learn:</strong> {plan.week2}
          </p>
          <p>
            <strong>Week 3 — Practice:</strong> {plan.week3}
          </p>
          <p>
            <strong>Week 4 — Share or Serve:</strong> {plan.week4}
          </p>
          <p>
            <strong>30-Day Goal:</strong> {plan.measurableGoal}
          </p>
          <p>
            <strong>Action Steps:</strong>
          </p>
          <ul>
            {plan.actionSteps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <p>
            <strong>Reflection Question:</strong> {plan.reflectionQuestion}
          </p>
          <p>
            <strong>Accountability Person:</strong> {plan.accountabilityPerson}
          </p>
        </section>

        <Disclaimer compact />
      </div>
    </section>
  )
}
