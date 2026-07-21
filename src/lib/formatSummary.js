export function formatSummary({ name, profile, pathways, plan }) {
  const lines = []
  lines.push('AI LEGACY NAVIGATOR — Results')
  lines.push(`Youth Legacy Initiative | ${name}`)
  lines.push('')
  lines.push('LEGACY PROFILE')
  lines.push(`Strength Summary: ${profile.strengthSummary}`)
  lines.push(`Interest Themes: ${profile.interestThemes}`)
  lines.push(`Values & Motivation Themes: ${profile.valuesThemes}`)
  lines.push(`Possible Legacy Direction: ${profile.legacyDirection}`)
  lines.push(profile.encouragingStatement)
  lines.push('')
  lines.push('PATHWAY RECOMMENDATIONS')
  pathways.forEach((p, i) => {
    lines.push(`${i + 1}. ${p.title}`)
    lines.push(`   Why it fits: ${p.whyItFits}`)
    lines.push(`   First step: ${p.firstStep}`)
    lines.push(`   Skill to develop: ${p.skillToDevelop}`)
    lines.push(`   Talk to: ${p.trustedAdult}`)
  })
  lines.push('')
  lines.push('30-DAY LEGACY ACTION PLAN')
  lines.push(`Week 1 — Discover: ${plan.week1}`)
  lines.push(`Week 2 — Learn: ${plan.week2}`)
  lines.push(`Week 3 — Practice: ${plan.week3}`)
  lines.push(`Week 4 — Share or Serve: ${plan.week4}`)
  lines.push(`30-Day Goal: ${plan.measurableGoal}`)
  lines.push('Action Steps:')
  plan.actionSteps.forEach((s) => lines.push(`  - ${s}`))
  lines.push(`Reflection Question: ${plan.reflectionQuestion}`)
  lines.push(`Accountability Person: ${plan.accountabilityPerson}`)
  lines.push('')
  lines.push(
    'AI Legacy Navigator provides educational guidance and reflection prompts. It does not replace advice from parents, educators, counselors, healthcare professionals, or other qualified adults.'
  )

  return lines.join('\n')
}
