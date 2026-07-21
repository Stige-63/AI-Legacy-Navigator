// Vercel serverless function. Keeps the OpenAI API key server-side only —
// it is never sent to or embedded in the frontend bundle.
// If OPENAI_API_KEY is not configured, the app automatically uses Demo Mode
// (see src/lib/generateLegacyPlan.js), so this endpoint is optional.

const SYSTEM_PROMPT = `You are a supportive, youth-safe planning assistant for "AI Legacy Navigator," a program of the Youth Legacy Initiative. You help youth in grades 6-12 turn a short self-reflection questionnaire into an encouraging, action-oriented plan.

Rules:
- Never diagnose, give clinical/mental-health interpretations, or use clinical labels.
- Never guarantee outcomes ("you will become...", "you are destined to...").
- Use supportive, nonjudgmental, age-appropriate language.
- Encourage the user to talk with a parent, guardian, educator, counselor, or mentor about major decisions.
- Do not ask for or reference last names, addresses, school names, or other sensitive personal information.
- Write complete, grammatical sentences. Rephrase fragments from the questionnaire so they fit naturally in each sentence.
- Do not repeat field labels inside values. In particular, week1 through week4 must not begin with "Week", "Discover:", "Learn:", "Practice:", or "Share or Serve:".
- Respond with ONLY valid JSON matching exactly this shape, no extra commentary:
{
  "profile": { "strengthSummary": string, "interestThemes": string, "valuesThemes": string, "legacyDirection": string, "encouragingStatement": string },
  "pathways": [ { "title": string, "whyItFits": string, "firstStep": string, "skillToDevelop": string, "trustedAdult": string, "recommended": boolean } ] (exactly 3 items: one education/skill-building, one career/entrepreneurship, one community service/leadership),
  "plan": { "week1": string, "week2": string, "week3": string, "week4": string, "measurableGoal": string, "actionSteps": [string, string, string], "reflectionQuestion": string, "accountabilityPerson": string }
}`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    res.status(501).json({ error: 'not_configured' })
    return
  }

  try {
    const answers = req.body || {}
    const userPrompt = `Youth questionnaire answers (JSON): ${JSON.stringify(answers)}\n\nGenerate the Legacy Profile, three pathways, and 30-day action plan as specified.`

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-5.6-sol',
        reasoning: { effort: 'none' },
        instructions: SYSTEM_PROMPT,
        input: userPrompt,
        text: {
          format: {
            type: 'json_schema',
            name: 'legacy_plan',
            strict: true,
            schema: {
              type: 'object',
              additionalProperties: false,
              required: ['profile', 'pathways', 'plan'],
              properties: {
                profile: {
                  type: 'object', additionalProperties: false,
                  required: ['strengthSummary', 'interestThemes', 'valuesThemes', 'legacyDirection', 'encouragingStatement'],
                  properties: Object.fromEntries(['strengthSummary', 'interestThemes', 'valuesThemes', 'legacyDirection', 'encouragingStatement'].map((key) => [key, { type: 'string' }])),
                },
                pathways: {
                  type: 'array', minItems: 3, maxItems: 3,
                  items: {
                    type: 'object', additionalProperties: false,
                    required: ['title', 'whyItFits', 'firstStep', 'skillToDevelop', 'trustedAdult', 'recommended'],
                    properties: {
                      title: { type: 'string' }, whyItFits: { type: 'string' }, firstStep: { type: 'string' },
                      skillToDevelop: { type: 'string' }, trustedAdult: { type: 'string' }, recommended: { type: 'boolean' },
                    },
                  },
                },
                plan: {
                  type: 'object', additionalProperties: false,
                  required: ['week1', 'week2', 'week3', 'week4', 'measurableGoal', 'actionSteps', 'reflectionQuestion', 'accountabilityPerson'],
                  properties: {
                    week1: { type: 'string' }, week2: { type: 'string' }, week3: { type: 'string' }, week4: { type: 'string' },
                    measurableGoal: { type: 'string' }, reflectionQuestion: { type: 'string' }, accountabilityPerson: { type: 'string' },
                    actionSteps: { type: 'array', minItems: 3, maxItems: 3, items: { type: 'string' } },
                  },
                },
              },
            },
          },
        },
      }),
    })

    if (!response.ok) {
      res.status(502).json({ error: 'upstream_error' })
      return
    }

    const data = await response.json()
    const content = data.output_text
    const parsed = JSON.parse(content)

    if (!parsed.profile || !parsed.pathways || !parsed.plan) {
      res.status(502).json({ error: 'malformed_response' })
      return
    }

    parsed.plan = normalizePlan(parsed.plan)
    res.status(200).json(parsed)
  } catch (error) {
    console.error('OpenAI generation failed:', error instanceof Error ? error.message : error)
    res.status(502).json({ error: 'generation_failed' })
  }
}

export function normalizePlan(plan) {
  const prefixes = {
    week1: /^(?:Week\s*1\s*[-:—]?\s*)?(?:Discover\s*:\s*)?/i,
    week2: /^(?:Week\s*2\s*[-:—]?\s*)?(?:Learn\s*:\s*)?/i,
    week3: /^(?:Week\s*3\s*[-:—]?\s*)?(?:Practice\s*:\s*)?/i,
    week4: /^(?:Week\s*4\s*[-:—]?\s*)?(?:Share\s+or\s+Serve\s*:\s*)?/i,
  }
  return Object.fromEntries(Object.entries(plan).map(([key, value]) => [
    key,
    prefixes[key] && typeof value === 'string' ? value.replace(prefixes[key], '').trim() : value,
  ]))
}
