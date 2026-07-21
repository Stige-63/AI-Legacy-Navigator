import Disclaimer from './Disclaimer.jsx'

export default function Welcome({ onStart }) {
  return (
    <section className="screen screen--welcome">
      <p className="eyebrow">Youth Legacy Initiative</p>
      <h1>AI Legacy Navigator</h1>
      <p className="tagline">
        Discover your strengths. Explore your possibilities. Build your legacy.
      </p>
      <p className="welcome-copy">
        Answer a few quick questions about your interests, strengths, and goals. You'll get a
        personalized reflection, three possible pathways, and a simple 30-day action plan you can
        start today.
      </p>
      <button className="btn btn--primary" onClick={onStart}>
        Start
      </button>
      <Disclaimer />
      <p className="privacy-note">
        This is an educational tool for reflection. Please don't enter your last name, address,
        school name, or other personal details.
      </p>
    </section>
  )
}
