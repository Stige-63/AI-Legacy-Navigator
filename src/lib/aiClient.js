// Tries the protected /api/generate serverless endpoint (live AI generation).
// Returns null on any failure so the caller can fall back to Demo Mode —
// there is no local dev server for /api routes, so this fails fast and
// silently during `npm run dev`, which is expected.

export async function tryAIGeneration(answers) {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    })

    if (!response.ok) return null

    const data = await response.json()
    if (!data.profile || !data.pathways || !data.plan) return null

    return data
  } catch {
    return null
  }
}
