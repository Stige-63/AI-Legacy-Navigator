// Demo Mode generator: produces a structured Legacy Profile, three pathways,
// and a 30-day action plan directly from the questionnaire answers.
// No external API calls, no storage — everything is derived in the browser.

const fallback = (value, alt) => {
  const trimmed = (value || '').trim()
  return trimmed.length > 0 ? trimmed : alt
}

const lowerFirst = (value) => value.charAt(0).toLowerCase() + value.slice(1)

const asGerundGoal = (value) => {
  const goal = lowerFirst(value.trim())
  const replacements = [
    [/^become\b/i, 'becoming'],
    [/^build\b/i, 'building'],
    [/^create\b/i, 'creating'],
    [/^develop\b/i, 'developing'],
    [/^help\b/i, 'helping'],
    [/^improve\b/i, 'improving'],
    [/^learn\b/i, 'learning'],
    [/^make\b/i, 'making'],
    [/^start\b/i, 'starting'],
  ]
  const match = replacements.find(([pattern]) => pattern.test(goal))
  return match ? goal.replace(match[0], match[1]) : goal
}

const asCommunityIssue = (value) => {
  const issue = lowerFirst(value.trim())
  if (/^no\s+/i.test(issue)) return issue.replace(/^no\s+/i, 'the lack of ')
  return issue
}

const PATHWAY_LABELS = {
  education: 'education',
  career: 'career/entrepreneurship',
  entrepreneurship: 'career/entrepreneurship',
  service: 'community service/leadership',
  leadership: 'community service/leadership',
  unsure: null,
}

export function generateLegacyPlan(answers) {
  const name = fallback(answers.name, 'you')
  const interests = [answers.interest1, answers.interest2, answers.interest3]
    .map((i) => fallback(i, '').trim())
    .filter(Boolean)
  const interestList = interests.length > 0 ? interests : ['exploring new things']
  const strengths = fallback(answers.strengths, 'curiosity and determination')
  const challenge = fallback(answers.challenge, 'staying consistent when things get hard')
  const communityProblem = asCommunityIssue(fallback(
    answers.communityProblem,
    'making their school or community a better place'
  ))
  const goal = asGerundGoal(fallback(answers.goal, 'growing into the person they want to become'))
  const admiredName = fallback(answers.admiredName, 'someone they look up to')
  const admiredWhy = fallback(answers.admiredWhy, 'the example they set')
  const preferredPathway = PATHWAY_LABELS[answers.pathwayPreference] || null

  const profile = buildProfile({ name, interestList, strengths, challenge, communityProblem, goal, admiredName, admiredWhy })
  const pathways = buildPathways({ interestList, strengths, challenge, communityProblem, goal, preferredPathway })
  const plan = buildPlan({ interestList, strengths, goal, communityProblem, pathways, admiredName })

  return { profile, pathways, plan }
}

function buildProfile({ name, interestList, strengths, challenge, communityProblem, goal, admiredName, admiredWhy }) {
  return {
    strengthSummary: `${name}, you describe your strengths as ${strengths}. Even while working on ${challenge}, you're showing self-awareness and grit — both are real strengths worth building on.`,
    interestThemes: `Your curiosity in ${listToText(interestList)} points to a mind that likes to explore, create, and figure things out. Those interests are a natural starting point for your legacy.`,
    valuesThemes: `You care about ${communityProblem}. Admiring ${admiredName} because ${lowerFirst(admiredWhy)} shows what you value in a role model — and hints at the kind of impact you'd like to have yourself.`,
    legacyDirection: `Putting it together, your legacy direction is forming around ${goal}, shaped by your interests and the strengths you already bring.`,
    encouragingStatement: `This is just a starting point, ${name} — a reflection based on what you shared today, not a fixed label. You get to keep shaping it as you learn and grow.`,
  }
}

function listToText(items) {
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
}

function buildPathways({ interestList, strengths, challenge, communityProblem, goal, preferredPathway }) {
  const primaryInterest = interestList[0]
  const secondaryInterest = interestList[1] || interestList[0]

  const pathways = [
    {
      key: 'education',
      title: 'Education & Skill-Building Pathway',
      whyItFits: `Your interest in ${primaryInterest} and your goal to ${goal} both point toward learning more through classes, workshops, or practice. Your strengths (${strengths}) will help you pick this up quickly.`,
      firstStep: `Look up one class, workshop, book, or free online course related to ${primaryInterest} and try the first lesson this week.`,
      skillToDevelop: 'focused practice and asking good questions',
      trustedAdult: 'a teacher, school counselor, or academic mentor',
    },
    {
      key: 'career',
      title: 'Career & Entrepreneurship Pathway',
      whyItFits: `Combining your interest in ${secondaryInterest} with the strength of ${strengths}, you could explore careers in this space or try a small project of your own centered on ${goal}.`,
      firstStep: `Talk with someone who works in a field connected to ${secondaryInterest}, or sketch one simple idea for a project you could try this month.`,
      skillToDevelop: 'communication and basic planning',
      trustedAdult: 'a parent, guardian, or local business or career mentor',
    },
    {
      key: 'service',
      title: 'Community Service & Leadership Pathway',
      whyItFits: `You mentioned caring about ${communityProblem}. Taking on a service or leadership role lets you turn that care into action, while also working on ${challenge}.`,
      firstStep: `Find one club, volunteer opportunity, or small project connected to ${communityProblem} and ask how you can get involved.`,
      skillToDevelop: 'teamwork and leadership communication',
      trustedAdult: 'a youth program facilitator, coach, or community leader',
    },
  ]

  return pathways.map((p) => ({ ...p, recommended: preferredPathway === PATHWAY_LABELS[p.key] || (p.key === 'career' && preferredPathway === 'career/entrepreneurship') || (p.key === 'service' && preferredPathway === 'community service/leadership') }))
}

function buildPlan({ interestList, goal, communityProblem, pathways, admiredName }) {
  const topSkill = pathways[0].skillToDevelop
  const primaryInterest = interestList[0]

  return {
    week1: `Spend time exploring ${listToText(interestList)} more deeply — journal about them, research online, or talk with someone who knows about them.`,
    week2: `Choose one skill to build, such as ${topSkill}, and practice it a little each day.`,
    week3: `Apply what you're learning through one small, real project connected to ${goal}.`,
    week4: `Share what you made or learned with someone, or use it to help address ${communityProblem}.`,
    measurableGoal: `By day 30, complete one concrete project, action, or milestone connected to ${goal}.`,
    actionSteps: [
      `Spend 15–20 minutes a few times this week exploring ${primaryInterest}.`,
      `Ask one trusted adult for advice or feedback related to your goal.`,
      `Write down or share one thing you accomplished each week.`,
    ],
    reflectionQuestion: `What did you learn about yourself while working toward "${goal}" this month?`,
    accountabilityPerson: `${admiredName}, or another trusted adult, mentor, or friend who can check in with you weekly.`,
  }
}
