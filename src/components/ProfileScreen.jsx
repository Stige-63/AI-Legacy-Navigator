export default function ProfileScreen({ name, profile, onBack, onContinue, sourceLabel }) {
  return (
    <section className="screen screen--profile">
      <h2>Your AI Legacy Profile</h2>
      <p className="screen-intro">
        A reflection based on what {name} shared today — not a fixed label, just a starting
        point. {sourceLabel}
      </p>

      <div className="card-stack">
        <article className="info-card">
          <h3>Strength Summary</h3>
          <p>{profile.strengthSummary}</p>
        </article>
        <article className="info-card">
          <h3>Interest Themes</h3>
          <p>{profile.interestThemes}</p>
        </article>
        <article className="info-card">
          <h3>Values &amp; Motivation Themes</h3>
          <p>{profile.valuesThemes}</p>
        </article>
        <article className="info-card info-card--accent">
          <h3>Possible Legacy Direction</h3>
          <p>{profile.legacyDirection}</p>
        </article>
      </div>

      <p className="encouraging-statement">{profile.encouragingStatement}</p>

      <div className="form-actions">
        <button type="button" className="btn btn--ghost" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn btn--primary" onClick={onContinue}>
          See My Pathways
        </button>
      </div>
    </section>
  )
}
