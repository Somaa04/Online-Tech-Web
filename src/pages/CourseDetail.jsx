import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Notice } from '../components/ui'
import { buttonClass } from '../lib/buttonClass'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import { illustration } from '../lib/illustrations'

export default function CourseDetail() {
  const { slug } = useParams()
  const { user } = useAuth()
  const [course, setCourse] = useState(null)
  const [enrollment, setEnrollment] = useState(null)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  useEffect(() => {
    let ignore = false
    setCourse(null)
    setEnrollment(null)
    setError('')
    api(`/api/courses/${slug}`, { auth: false })
      .then((data) => {
        if (!ignore) setCourse(data.course)
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })
    return () => {
      ignore = true
    }
  }, [slug])

  useEffect(() => {
    if (!user || !course) return undefined
    let ignore = false
    api('/api/me/enrollments')
      .then((data) => {
        if (ignore) return
        setEnrollment(data.enrollments.find((item) => item.course.id === course.id) || null)
      })
      .catch(() => {
        if (!ignore) setEnrollment(null)
      })
    return () => {
      ignore = true
    }
  }, [user, course])

  async function enroll() {
    setPending(true)
    setError('')
    try {
      const data = await api('/api/me/enrollments', { method: 'POST', body: { courseId: course.id } })
      setEnrollment(data.enrollment)
    } catch (err) {
      setError(err.message)
    } finally {
      setPending(false)
    }
  }

  async function toggleLesson(lessonId, complete) {
    setError('')
    try {
      const data = await api(`/api/me/enrollments/${course.id}/lessons/${lessonId}`, {
        method: 'PATCH',
        body: { complete },
      })
      setEnrollment(data.enrollment)
    } catch (err) {
      setError(err.message)
    }
  }

  if (error && !course) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <Notice>{error}</Notice>
      </div>
    )
  }

  if (!course) return <p className="mx-auto max-w-6xl px-5 py-16 text-sm text-muted">Loading course…</p>

  const done = new Set(enrollment?.completedLessonIds || [])

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-5 sm:py-14 lg:grid-cols-[1.3fr_0.7fr]">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-plum">
          {course.category} · {course.level}
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl">{course.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{course.description}</p>
        <img src={illustration(course.image)} alt="" className="mt-8 w-full max-w-md" />

        <h2 className="mt-10 font-display text-3xl">Lessons</h2>
        <ol className="mt-4 space-y-3">
          {course.lessons.map((lesson, index) => {
            const complete = done.has(lesson.id)
            return (
              <li
                key={lesson.id}
                className="rise-in rounded-3xl border border-line bg-cream p-4"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between sm:gap-4">
                  <div>
                    <p className="text-xs font-semibold text-muted">
                      Lesson {index + 1} · {lesson.minutes} min
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">{lesson.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{lesson.body}</p>
                  </div>
                  {enrollment ? (
                    <button
                      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        complete ? 'bg-inverse text-on-inverse' : 'bg-cream text-ink ring-1 ring-line'
                      }`}
                      aria-pressed={complete}
                      onClick={() => toggleLesson(lesson.id, !complete)}
                    >
                      {complete ? 'Completed' : 'Mark complete'}
                    </button>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      <aside className="order-first h-max rounded-3xl border border-line bg-cream p-5 sm:p-6 lg:sticky lg:top-24 lg:order-none">
        <p className="font-display text-3xl">Free to enroll</p>
        <p className="mt-2 text-sm text-muted">
          {course.lessons.length} lessons · {course.hours} hours · {course.level}
        </p>
        {enrollment ? (
          <div className="mt-5">
            <div className="h-2 overflow-hidden rounded-full bg-lilac">
              <div className="progress-fill h-full bg-plum" style={{ width: `${enrollment.progress}%` }} />
            </div>
            <p className="mt-2 text-sm font-semibold">{enrollment.progress}% complete</p>
            {enrollment.complete ? (
              <Link to={`/certificate/${course.id}`} className={`${buttonClass('gold')} mt-4 w-full`}>
                View certificate
              </Link>
            ) : null}
          </div>
        ) : user ? (
          <button className={`${buttonClass('primary')} mt-5 w-full`} onClick={enroll} disabled={pending}>
            {pending ? 'Enrolling…' : 'Enroll for free'}
          </button>
        ) : (
          <Link to={`/register?next=/courses/${course.slug}`} className={`${buttonClass('primary')} mt-5 w-full`}>
            Create an account to enroll
          </Link>
        )}
        <Link to={`/quote?course=${course.id}`} className={`${buttonClass('ghost')} mt-3 w-full`}>
          Request a team quote
        </Link>
        {error ? (
          <div className="mt-4">
            <Notice>{error}</Notice>
          </div>
        ) : null}
        <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted">You will be able to</h2>
        <ul className="mt-3 space-y-2 text-sm leading-6">
          {course.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
