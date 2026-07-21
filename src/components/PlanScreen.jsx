export default function PlanScreen({ plan, onBack, onContinue }) {
  const weeks = [
    { label: 'Week 1: Discover', text: plan.week1 },
    { label: 'Week 2: Learn', text: plan.week2 },
    { label: 'Week 3: Practice', text: plan.week3 },
    { label: 'Week 4: Share or Serve', text: plan.week4 },
  ]

  return (
    <section className="screen screen--plan">
      <h2>Your 30-Day Legacy Action Plan</h2>
      <p className="screen-intro">A simple, week-by-week plan you can start today.</p>

      <ol className="plan-weeks">
        {weeks.map((w) => (
          <li key={w.label} className="plan-weeks__item">
            <span className="plan-weeks__label">{w.label}</span>
            <span>{w.text}</span>
          </li>
        ))}
      </ol>

      <div className="card-stack">
        <article className="info-card info-card--accent">
          <h3>30-Day Goal</h3>
          <p>{plan.measurableGoal}</p>
        </article>
        <article className="info-card">
          <h3>Three Action Steps</h3>
          <ul>
            {plan.actionSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </article>
        <article className="info-card">
          <h3>Reflection Question</h3>
          <p>{plan.reflectionQuestion}</p>
        </article>
        <article className="info-card">
          <h3>Accountability Person</h3>
          <p>{plan.accountabilityPerson}</p>
        </article>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn--ghost" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn btn--primary" onClick={onContinue}>
          See My Full Results
        </button>
      </div>
    </section>
  )
}
