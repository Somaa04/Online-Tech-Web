import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Reveal } from '../components/Reveal'
import { PageIntro } from '../components/ui'
import { buttonClass } from '../lib/buttonClass'
import { api } from '../lib/api'

export default function Dashboard() {
  const { user } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    api('/api/me/enrollments')
      .then((data) => {
        if (!ignore) setEnrollments(data.enrollments)
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })
    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-14">
      <PageIntro eyebrow="Dashboard" title={`Hello, ${user?.name?.split(' ')[0] || 'learner'}.`}>
        Continue a course, or open a certificate once every lesson is marked complete.
      </PageIntro>
      {error ? <p className="mt-6 text-sm text-red-700">{error}</p> : null}
      {loading ? <p className="mt-8 text-sm text-muted">Loading your courses…</p> : null}
      {!loading && !enrollments.length ? (
        <div className="mt-8 rounded-3xl bg-lilac p-6">
          <p className="text-lg font-semibold">You have not enrolled yet.</p>
          <Link to="/courses" className={`${buttonClass('primary')} mt-4`}>
            Browse courses
          </Link>
        </div>
      ) : null}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {enrollments.map((enrollment, index) => (
          <Reveal key={enrollment.id} delay={index * 0.08}>
          <article className="rounded-3xl border border-line bg-cream p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">{enrollment.course.category}</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl">{enrollment.course.title}</h2>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-lilac">
              <div className="progress-fill h-full bg-plum" style={{ width: `${enrollment.progress}%` }} />
            </div>
            <p className="mt-2 text-sm text-muted">{enrollment.progress}% complete</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to={`/courses/${enrollment.course.slug}`} className={buttonClass('primary')}>
                {enrollment.complete ? 'Review course' : 'Continue'}
              </Link>
              {enrollment.complete ? (
                <Link to={`/certificate/${enrollment.course.id}`} className={buttonClass('gold')}>
                  Certificate
                </Link>
              ) : null}
            </div>
          </article>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
