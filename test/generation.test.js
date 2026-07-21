import test from 'node:test'
import assert from 'node:assert/strict'
import { generateLegacyPlan } from '../src/lib/generateLegacyPlan.js'
import handler, { normalizePlan } from '../api/generate.js'

test('demo output is grammatical and does not duplicate week labels', () => {
  const result = generateLegacyPlan({
    name: 'Keisha', interest1: 'chess', interest2: 'cooking', interest3: 'robotics',
    strengths: 'patient and curious', challenge: 'speaking up in groups',
    communityProblem: 'no free tutoring nearby', goal: 'become an engineer',
    admiredName: 'my grandmother', admiredWhy: 'she taught herself everything',
  })

  assert.match(result.profile.valuesThemes, /because she taught herself everything/)
  assert.match(result.profile.legacyDirection, /around becoming an engineer/)
  assert.doesNotMatch(result.plan.week1, /^(?:Week|Discover:)/i)
  assert.doesNotMatch(result.plan.week4, /^(?:Week|Share or Serve:)/i)
})

test('live output normalization strips repeated week labels', () => {
  const plan = normalizePlan({
    week1: 'Week 1 — Discover: Explore robotics.',
    week2: 'Learn: Practice daily.',
    week3: 'Practice: Build a prototype.',
    week4: 'Share or Serve: Show a mentor.',
  })
  assert.deepEqual(plan, {
    week1: 'Explore robotics.', week2: 'Practice daily.',
    week3: 'Build a prototype.', week4: 'Show a mentor.',
  })
})

test('API handler sends GPT-5.6 Sol request and accepts a successful response', async () => {
  const originalKey = process.env.OPENAI_API_KEY
  const originalFetch = global.fetch
  process.env.OPENAI_API_KEY = 'test-key'
  let requestBody
  global.fetch = async (_url, options) => {
    requestBody = JSON.parse(options.body)
    return {
      ok: true,
      json: async () => ({ output_text: JSON.stringify({
        profile: { strengthSummary: 'a', interestThemes: 'b', valuesThemes: 'c', legacyDirection: 'd', encouragingStatement: 'e' },
        pathways: [],
        plan: { week1: 'Discover: Explore.', week2: 'Learn: Study.', week3: 'Practice: Build.', week4: 'Share or Serve: Present.' },
      }) }),
    }
  }
  const req = { method: 'POST', body: { name: 'Keisha' } }
  const result = {}
  const res = {
    status(code) { result.status = code; return this },
    json(body) { result.body = body; return this },
  }

  try {
    await handler(req, res)
    assert.equal(result.status, 200)
    assert.equal(requestBody.model, 'gpt-5.6-sol')
    assert.deepEqual(requestBody.reasoning, { effort: 'none' })
    assert.equal(result.body.plan.week1, 'Explore.')
  } finally {
    global.fetch = originalFetch
    if (originalKey === undefined) delete process.env.OPENAI_API_KEY
    else process.env.OPENAI_API_KEY = originalKey
  }
})
