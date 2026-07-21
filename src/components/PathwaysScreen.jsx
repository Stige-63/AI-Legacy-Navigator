export default function PathwaysScreen({ pathways, onBack, onContinue }) {
  return (
    <section className="screen screen--pathways">
      <h2>Your Pathway Recommendations</h2>
      <p className="screen-intro">
        Three realistic directions worth exploring. None of these are locked in — you can mix,
        change your mind, or try more than one.
      </p>

      <div className="card-stack">
        {pathways.map((p) => (
          <article key={p.key} className={p.recommended ? 'pathway-card pathway-card--recommended' : 'pathway-card'}>
            {p.recommended && <span className="pathway-card__badge">Matches your interest</span>}
            <h3>{p.title}</h3>
            <p className="pathway-card__why">{p.whyItFits}</p>
            <dl className="pathway-card__details">
              <div>
                <dt>First step</dt>
                <dd>{p.firstStep}</dd>
              </div>
              <div>
                <dt>Skill to develop</dt>
                <dd>{p.skillToDevelop}</dd>
              </div>
              <div>
                <dt>Talk to</dt>
                <dd>{p.trustedAdult}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn--ghost" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn btn--primary" onClick={onContinue}>
          See My 30-Day Plan
        </button>
      </div>
    </section>
  )
}
