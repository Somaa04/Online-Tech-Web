import { courses } from './seed.js'

const facts = [
  {
    id: 'about',
    keys: ['what is', 'online tech', 'about', 'who are', 'program'],
    text: 'Online Tech is a learning program for practical technology skills. Individuals enroll in courses for free. Teams can request a quote if they want a group enrollment.',
  },
  {
    id: 'enroll',
    keys: ['enroll', 'enrol', 'sign up', 'register', 'join', 'account', 'login', 'sign in'],
    text: 'Create an account, open a course, and choose Enroll. Lessons stay on your dashboard. You can mark each lesson complete and come back later. A demo account is available on the sign-in page.',
  },
  {
    id: 'certificate',
    keys: ['certificate', 'certification', 'diploma', 'completion'],
    text: 'Finish every lesson in a course to unlock a certificate of completion. Open it from your dashboard, then print it or save it as a PDF from the browser.',
  },
  {
    id: 'quote',
    keys: ['quote', 'pricing', 'price', 'cost', 'team', 'company', 'invoice'],
    text: 'Individual courses are free to enroll in. For a team, use Request a quote and tell us your organization, team size, and the course you care about. The request is saved and confirmed on screen.',
  },
  {
    id: 'progress',
    keys: ['progress', 'lesson', 'dashboard', 'resume', 'continue'],
    text: 'Your dashboard lists every course you have joined and how many lessons are done. Open a course to mark a lesson complete or revisit one you already finished.',
  },
  {
    id: 'security',
    keys: ['password', 'phishing', 'privacy', 'safe'],
    text: 'Security Basics covers password managers, multi-factor authentication, phishing, and what to do if an account looks compromised. AI Tools for Work covers what you should not paste into an assistant.',
  },
]

function words(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2)
}

function score(message, keys) {
  const haystack = message.toLowerCase()
  return keys.reduce((total, key) => (haystack.includes(key) ? total + key.length : total), 0)
}

export function answerQuestion(message) {
  const text = String(message || '').trim()
  const lowered = text.toLowerCase()

  if (!text) {
    return {
      reply: 'Ask me about a course, enrollment, certificates, or team quotes.',
      suggestions: ['Which course should I start with?', 'How do certificates work?', 'How do team quotes work?'],
    }
  }

  if (/^(hi|hello|hey|good morning|good afternoon)\b/.test(lowered)) {
    return {
      reply:
        'Hello. I can help you pick a course, explain how enrollment and certificates work, or point you to the team quote form.',
      suggestions: ['I am new to technology', 'Show me web courses', 'How do I get a certificate?'],
    }
  }

  const fact = facts
    .map((item) => ({ item, score: score(lowered, item.keys) }))
    .sort((a, b) => b.score - a.score)[0]

  const courseHits = courses
    .map((course) => {
      const blob = [course.title, course.summary, course.category, course.level, ...course.lessons.map((lesson) => lesson.title)].join(' ')
      const overlap = words(text).filter((word) => blob.toLowerCase().includes(word)).length
      return { course, overlap }
    })
    .filter((hit) => hit.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 2)

  const parts = []
  if (fact && fact.score > 0) parts.push(fact.item.text)

  if (/new|start|beginner|first|where/.test(lowered) && courseHits.length === 0) {
    parts.push(
      'If you are just starting, take Technology Fundamentals, then Practical Digital Skills. Web Foundations is the right next step if you want to build pages.',
    )
  }

  if (courseHits.length) {
    const lines = courseHits.map(
      ({ course }) =>
        `${course.title} (${course.level}, ${course.hours} hours) — ${course.summary}`,
    )
    parts.push(lines.join(' '))
  }

  if (!parts.length) {
    return {
      reply:
        'I can help with the catalog, enrollment, progress, certificates, and team quotes. Try naming a topic such as security, data, web, or AI.',
      suggestions: courses.slice(0, 3).map((course) => course.title),
    }
  }

  return {
    reply: parts.join(' '),
    suggestions: courseHits.length
      ? courseHits.map((hit) => hit.course.title)
      : ['Browse all courses', 'How does progress work?', 'Request a team quote'],
  }
}
