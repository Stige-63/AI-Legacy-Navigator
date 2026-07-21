const STEPS = ['Welcome', 'Discover', 'Profile', 'Pathways', 'Plan', 'Results']

export default function ProgressSteps({ current }) {
  return (
    <ol className="progress-steps" aria-label="Progress">
      {STEPS.map((label, i) => (
        <li
          key={label}
          className={
            i === current ? 'progress-steps__item is-current' : i < current ? 'progress-steps__item is-done' : 'progress-steps__item'
          }
        >
          <span className="progress-steps__dot" aria-hidden="true" />
          <span className="progress-steps__label">{label}</span>
        </li>
      ))}
    </ol>
  )
}
