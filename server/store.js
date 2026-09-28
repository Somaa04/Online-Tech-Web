import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import bcrypt from 'bcryptjs'

const dataDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data')
const dbPath = path.join(dataDir, 'db.json')

const DEMO_EMAIL = 'demo@onlinetech.dev'

function emptyDb() {
  return { users: [], enrollments: [], quotes: [], messages: [] }
}

let chain = Promise.resolve()

async function load() {
  try {
    return JSON.parse(await fs.readFile(dbPath, 'utf8'))
  } catch {
    return emptyDb()
  }
}

async function ensureDemo(db) {
  if (db.users.some((user) => user.email === DEMO_EMAIL)) return
  db.users.push({
    id: 'user_demo',
    name: 'Demo Learner',
    email: DEMO_EMAIL,
    passwordHash: await bcrypt.hash('LearnTech1!', 10),
    createdAt: new Date().toISOString(),
  })
  db.enrollments.push({
    id: 'enr_demo',
    userId: 'user_demo',
    courseId: 'technology-fundamentals',
    completedLessonIds: ['tf-1', 'tf-2'],
    enrolledAt: new Date().toISOString(),
    completedAt: null,
  })
}

export function withDb(mutator) {
  const run = chain.then(async () => {
    await fs.mkdir(dataDir, { recursive: true })
    const db = await load()
    await ensureDemo(db)
    const result = await mutator(db)
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2))
    return result
  })
  chain = run.then(
    () => {},
    () => {},
  )
  return run
}

export function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  }
}
