import { useState } from 'react'

const AGE_RANGES = [
  '6th–7th grade',
  '8th–9th grade',
  '10th–11th grade',
  '12th grade',
]

const PATHWAYS = [
  { value: 'education', label: 'Education' },
  { value: 'career', label: 'Career' },
  { value: 'entrepreneurship', label: 'Entrepreneurship' },
  { value: 'service', label: 'Service' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'unsure', label: "Not sure yet — that's okay!" },
]

const EMPTY = {
  name: '',
  ageRange: '',
  interest1: '',
  interest2: '',
  interest3: '',
  strengths: '',
  challenge: '',
  communityProblem: '',
  goal: '',
  pathwayPreference: '',
  admiredName: '',
  admiredWhy: '',
}

export default function Questionnaire({ initialAnswers, onComplete, onBack }) {
  const [answers, setAnswers] = useState(initialAnswers || EMPTY)

  const update = (field) => (e) => setAnswers((a) => ({ ...a, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onComplete(answers)
  }

  return (
    <section className="screen screen--questionnaire">
      <h2>Tell us a bit about you</h2>
      <p className="screen-intro">
        Keep it short and honest. Please don't include your last name, address, school name, or
        phone number.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          <span>First name or preferred name</span>
          <input
            type="text"
            required
            maxLength={40}
            value={answers.name}
            onChange={update('name')}
            placeholder="e.g. Jordan"
          />
        </label>

        <label className="field">
          <span>Age range / grade range</span>
          <select required value={answers.ageRange} onChange={update('ageRange')}>
            <option value="" disabled>
              Select one
            </option>
            {AGE_RANGES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="field-group">
          <legend>Three interests</legend>
          <input
            type="text"
            required
            maxLength={40}
            value={answers.interest1}
            onChange={update('interest1')}
            placeholder="Interest #1 (e.g. basketball)"
          />
          <input
            type="text"
            required
            maxLength={40}
            value={answers.interest2}
            onChange={update('interest2')}
            placeholder="Interest #2 (e.g. video editing)"
          />
          <input
            type="text"
            required
            maxLength={40}
            value={answers.interest3}
            onChange={update('interest3')}
            placeholder="Interest #3 (e.g. helping younger kids)"
          />
        </fieldset>

        <label className="field">
          <span>Skills or strengths</span>
          <input
            type="text"
            required
            maxLength={80}
            value={answers.strengths}
            onChange={update('strengths')}
            placeholder="e.g. creative, good listener, organized"
          />
        </label>

        <label className="field">
          <span>A challenge you want to overcome</span>
          <input
            type="text"
            required
            maxLength={80}
            value={answers.challenge}
            onChange={update('challenge')}
            placeholder="e.g. staying focused, public speaking"
          />
        </label>

        <label className="field">
          <span>A problem you care about at school, home, or in your community</span>
          <input
            type="text"
            required
            maxLength={100}
            value={answers.communityProblem}
            onChange={update('communityProblem')}
            placeholder="e.g. kids not having safe places to hang out"
          />
        </label>

        <label className="field">
          <span>A future goal</span>
          <input
            type="text"
            required
            maxLength={100}
            value={answers.goal}
            onChange={update('goal')}
            placeholder="e.g. start my own business someday"
          />
        </label>

        <label className="field">
          <span>Which pathway sounds most interesting right now?</span>
          <select required value={answers.pathwayPreference} onChange={update('pathwayPreference')}>
            <option value="" disabled>
              Select one
            </option>
            {PATHWAYS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="field-group">
          <legend>One person you admire, and why (first name or role only)</legend>
          <input
            type="text"
            required
            maxLength={40}
            value={answers.admiredName}
            onChange={update('admiredName')}
            placeholder="e.g. my coach, Aunt Renee, Serena Williams"
          />
          <input
            type="text"
            required
            maxLength={100}
            value={answers.admiredWhy}
            onChange={update('admiredWhy')}
            placeholder="Why you admire them"
          />
        </fieldset>

        <div className="form-actions">
          <button type="button" className="btn btn--ghost" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="btn btn--primary">
            See My Legacy Profile
          </button>
        </div>
      </form>
    </section>
  )
}
