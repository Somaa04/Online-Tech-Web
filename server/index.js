import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import express from 'express'
import jwt from 'jsonwebtoken'
import { answerQuestion } from './assistant.js'
import { courses, summarizeCourse } from './seed.js'
import { publicUser, withDb } from './store.js'

const PORT = Number(process.env.PORT) || 4000
const dataDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data')

function readSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET
  fs.mkdirSync(dataDir, { recursive: true })
  const secretPath = path.join(dataDir, 'jwt.secret')
  if (fs.existsSync(secretPath)) return fs.readFileSync(secretPath, 'utf8').trim()
  const secret = crypto.randomBytes(32).toString('hex')
  fs.writeFileSync(secretPath, secret)
  return secret
}

const secret = readSecret()
const app = express()

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  }),
)
app.use(express.json({ limit: '32kb' }))

const hits = new Map()

function tooMany(key, max, windowMs) {
  const now = Date.now()
  const recent = (hits.get(key) || []).filter((stamp) => now - stamp < windowMs)
  recent.push(now)
  hits.set(key, recent)
  return recent.length > max
}

function clientKey(req, name) {
  return `${name}:${req.ip}`
}

function requireText(value, { min, max, label }) {
  const text = String(value ?? '').trim()
  if (text.length < min || text.length > max) {
    return `${label} must be between ${min} and ${max} characters.`
  }
  return { text }
}

function requireEmail(value) {
  const text = String(value ?? '').trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) || text.length > 120) {
    return { error: 'Enter a valid email address.' }
  }
  return { text }
}

function courseById(id) {
  return courses.find((course) => course.id === id)
}

function presentEnrollment(enrollment) {
  const course = courseById(enrollment.courseId)
  if (!course) return null
  const total = course.lessons.length
  const completed = enrollment.completedLessonIds.filter((id) =>
    course.lessons.some((lesson) => lesson.id === id),
  ).length
  return {
    id: enrollment.id,
    course: summarizeCourse(course),
    completedLessonIds: enrollment.completedLessonIds,
    progress: Math.round((completed / total) * 100),
    complete: completed === total,
    enrolledAt: enrollment.enrolledAt,
    completedAt: enrollment.completedAt,
  }
}

function signToken(user) {
  return jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' })
}

async function requireUser(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!token) {
    res.status(401).json({ error: 'Sign in to continue.' })
    return
  }
  try {
    const payload = jwt.verify(token, secret)
    const user = await withDb(async (db) => db.users.find((item) => item.id === payload.sub) || null)
    if (!user) {
      res.status(401).json({ error: 'Sign in to continue.' })
      return
    }
    req.user = user
    next()
  } catch {
    res.status(401).json({ error: 'Your session expired. Sign in again.' })
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/stats', async (_req, res) => {
  const counts = await withDb(async (db) => ({
    courses: courses.length,
    lessons: courses.reduce((sum, course) => sum + course.lessons.length, 0),
    hours: courses.reduce((sum, course) => sum + course.hours, 0),
    learners: db.users.length,
  }))
  res.json(counts)
})

app.get('/api/courses', (req, res) => {
  const q = String(req.query.q || '').trim().toLowerCase()
  const level = String(req.query.level || '').trim()
  const category = String(req.query.category || '').trim()
  const list = courses.filter((course) => {
    const blob = `${course.title} ${course.summary} ${course.description}`.toLowerCase()
    if (q && !blob.includes(q)) return false
    if (level && course.level !== level) return false
    if (category && course.category !== category) return false
    return true
  })
  res.json({ courses: list.map(summarizeCourse) })
})

app.get('/api/courses/:id', (req, res) => {
  const course = courseById(req.params.id)
  if (!course) {
    res.status(404).json({ error: 'Course not found.' })
    return
  }
  res.json({ course })
})

app.post('/api/auth/register', async (req, res) => {
  if (tooMany(clientKey(req, 'auth'), 20, 15 * 60 * 1000)) {
    res.status(429).json({ error: 'Too many attempts. Wait a few minutes and try again.' })
    return
  }
  const name = requireText(req.body?.name, { min: 2, max: 80, label: 'Name' })
  if (name.error || typeof name === 'string') {
    res.status(400).json({ error: name.error || name })
    return
  }
  const email = requireEmail(req.body?.email)
  if (email.error) {
    res.status(400).json({ error: email.error })
    return
  }
  const password = String(req.body?.password ?? '')
  if (password.length < 8 || password.length > 72) {
    res.status(400).json({ error: 'Password must be 8 to 72 characters.' })
    return
  }
  try {
    const user = await withDb(async (db) => {
      if (db.users.some((item) => item.email === email.text)) {
        const error = new Error('An account with that email already exists.')
        error.status = 409
        throw error
      }
      const created = {
        id: crypto.randomUUID(),
        name: name.text,
        email: email.text,
        passwordHash: await bcrypt.hash(password, 10),
        createdAt: new Date().toISOString(),
      }
      db.users.push(created)
      return created
    })
    res.status(201).json({ token: signToken(user), user: publicUser(user) })
  } catch (error) {
    res.status(error.status || 500).json({ error: error.status ? error.message : 'Could not create the account.' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  if (tooMany(clientKey(req, 'auth'), 20, 15 * 60 * 1000)) {
    res.status(429).json({ error: 'Too many attempts. Wait a few minutes and try again.' })
    return
  }
  const email = requireEmail(req.body?.email)
  const password = String(req.body?.password ?? '')
  if (email.error || !password) {
    res.status(400).json({ error: 'Enter your email and password.' })
    return
  }
  const user = await withDb(async (db) => db.users.find((item) => item.email === email.text) || null)
  const matches = user ? await bcrypt.compare(password, user.passwordHash) : false
  if (!matches) {
    res.status(401).json({ error: 'Email or password is incorrect.' })
    return
  }
  res.json({ token: signToken(user), user: publicUser(user) })
})

app.get('/api/auth/me', requireUser, (req, res) => {
  res.json({ user: publicUser(req.user) })
})

app.get('/api/me/enrollments', requireUser, async (req, res) => {
  const enrollments = await withDb(async (db) =>
    db.enrollments
      .filter((item) => item.userId === req.user.id)
      .map(presentEnrollment)
      .filter(Boolean),
  )
  res.json({ enrollments })
})

app.post('/api/me/enrollments', requireUser, async (req, res) => {
  const course = courseById(req.body?.courseId)
  if (!course) {
    res.status(404).json({ error: 'Course not found.' })
    return
  }
  const enrollment = await withDb(async (db) => {
    const existing = db.enrollments.find(
      (item) => item.userId === req.user.id && item.courseId === course.id,
    )
    if (existing) return existing
    const created = {
      id: crypto.randomUUID(),
      userId: req.user.id,
      courseId: course.id,
      completedLessonIds: [],
      enrolledAt: new Date().toISOString(),
      completedAt: null,
    }
    db.enrollments.push(created)
    return created
  })
  res.status(201).json({ enrollment: presentEnrollment(enrollment) })
})

app.patch('/api/me/enrollments/:courseId/lessons/:lessonId', requireUser, async (req, res) => {
  const course = courseById(req.params.courseId)
  const lesson = course?.lessons.find((item) => item.id === req.params.lessonId)
  if (!lesson) {
    res.status(404).json({ error: 'Lesson not found.' })
    return
  }
  const complete = Boolean(req.body?.complete)
  try {
    const enrollment = await withDb(async (db) => {
      const current = db.enrollments.find(
        (item) => item.userId === req.user.id && item.courseId === course.id,
      )
      if (!current) {
        const error = new Error('Enroll in this course before marking lessons.')
        error.status = 404
        throw error
      }
      const ids = new Set(current.completedLessonIds)
      if (complete) ids.add(lesson.id)
      else ids.delete(lesson.id)
      current.completedLessonIds = course.lessons.map((item) => item.id).filter((id) => ids.has(id))
      current.completedAt =
        current.completedLessonIds.length === course.lessons.length ? current.completedAt || new Date().toISOString() : null
      return current
    })
    res.json({ enrollment: presentEnrollment(enrollment) })
  } catch (error) {
    res.status(error.status || 500).json({ error: error.status ? error.message : 'Could not update the lesson.' })
  }
})

app.get('/api/me/certificates/:courseId', requireUser, async (req, res) => {
  const course = courseById(req.params.courseId)
  if (!course) {
    res.status(404).json({ error: 'Course not found.' })
    return
  }
  const enrollment = await withDb(
    async (db) =>
      db.enrollments.find((item) => item.userId === req.user.id && item.courseId === course.id) || null,
  )
  const presented = enrollment ? presentEnrollment(enrollment) : null
  if (!presented?.complete) {
    res.status(403).json({ error: 'Complete every lesson to unlock this certificate.' })
    return
  }
  res.json({
    certificate: {
      id: `OT-${course.id.slice(0, 4).toUpperCase()}-${req.user.id.slice(-4).toUpperCase()}`,
      learnerName: req.user.name,
      courseTitle: course.title,
      hours: course.hours,
      completedAt: enrollment.completedAt,
    },
  })
})

app.post('/api/quotes', async (req, res) => {
  if (tooMany(clientKey(req, 'quote'), 10, 60 * 60 * 1000)) {
    res.status(429).json({ error: 'Too many quote requests. Try again later.' })
    return
  }
  const name = requireText(req.body?.name, { min: 2, max: 80, label: 'Name' })
  const organization = requireText(req.body?.organization, { min: 2, max: 120, label: 'Organization' })
  const message = requireText(req.body?.message, { min: 10, max: 1000, label: 'Message' })
  const email = requireEmail(req.body?.email)
  const teamSize = String(req.body?.teamSize ?? '').trim()
  const courseId = String(req.body?.courseId ?? '').trim()
  const sizes = ['1-10', '11-50', '51-200', '200+']
  const fieldError = [name, organization, message].find((item) => typeof item === 'string')
  if (fieldError || email.error || !sizes.includes(teamSize)) {
    res.status(400).json({ error: fieldError || email.error || 'Choose a team size.' })
    return
  }
  if (courseId && !courseById(courseId)) {
    res.status(400).json({ error: 'Choose a course from the list.' })
    return
  }
  const quote = await withDb(async (db) => {
    const created = {
      id: crypto.randomUUID(),
      name: name.text,
      email: email.text,
      organization: organization.text,
      teamSize,
      courseId: courseId || null,
      message: message.text,
      createdAt: new Date().toISOString(),
    }
    db.quotes.push(created)
    return created
  })
  res.status(201).json({ id: quote.id })
})

app.post('/api/contact', async (req, res) => {
  if (tooMany(clientKey(req, 'contact'), 10, 60 * 60 * 1000)) {
    res.status(429).json({ error: 'Too many messages. Try again later.' })
    return
  }
  const name = requireText(req.body?.name, { min: 2, max: 80, label: 'Name' })
  const message = requireText(req.body?.message, { min: 10, max: 1000, label: 'Message' })
  const email = requireEmail(req.body?.email)
  const topics = ['Courses', 'Enrollment', 'Certificate', 'Teams', 'Something else']
  const topic = String(req.body?.topic ?? '').trim()
  const fieldError = [name, message].find((item) => typeof item === 'string')
  if (fieldError || email.error || !topics.includes(topic)) {
    res.status(400).json({ error: fieldError || email.error || 'Choose a topic.' })
    return
  }
  const saved = await withDb(async (db) => {
    const created = {
      id: crypto.randomUUID(),
      name: name.text,
      email: email.text,
      topic,
      message: message.text,
      createdAt: new Date().toISOString(),
    }
    db.messages.push(created)
    return created
  })
  res.status(201).json({ id: saved.id })
})

app.post('/api/assistant', (req, res) => {
  if (tooMany(clientKey(req, 'assistant'), 40, 10 * 60 * 1000)) {
    res.status(429).json({ error: 'The assistant is busy. Try again in a few minutes.' })
    return
  }
  const message = String(req.body?.message ?? '').trim()
  if (!message || message.length > 500) {
    res.status(400).json({ error: 'Ask a question in 500 characters or fewer.' })
    return
  }
  res.json(answerQuestion(message))
})

const dist = path.resolve('dist')
if (fs.existsSync(dist)) {
  app.use(express.static(dist))
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      next()
      return
    }
    if (req.path.startsWith('/api')) {
      next()
      return
    }
    res.sendFile(path.join(dist, 'index.html'))
  })
}

app.use((error, _req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    res.status(400).json({ error: 'Request body must be JSON.' })
    return
  }
  next(error)
})

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'That API route does not exist.' })
})

app.listen(PORT, () => {
  console.log(`Online Tech API listening on http://localhost:${PORT}`)
})
