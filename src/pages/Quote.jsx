import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Field, Notice, Select, TextArea } from '../components/ui'
import { api } from '../lib/api'

const empty = { name: '', email: '', organization: '', teamSize: '1-10', courseId: '', message: '' }

const steps = [
  'Tell us about your team and the course you have in mind.',
  'We review the request and reply to the work email you enter.',
  'Your group gets a start date and a clear enrollment plan.',
]

export default function Quote() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [courses, setCourses] = useState([])
  const [form, setForm] = useState({ ...empty, courseId: params.get('course') || '' })
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    let ignore = false
    api('/api/courses', { auth: false })
      .then((data) => {
        if (!ignore) setCourses(data.courses)
      })
      .catch(() => {
        if (!ignore) setCourses([])
      })
    return () => {
      ignore = true
    }
  }, [])

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function goBack() {
    if (window.history.length > 1) navigate(-1)
    else navigate('/')
  }

  async function submit(event) {
    event.preventDefault()
    setPending(true)
    setError('')
    try {
      await api('/api/quotes', { method: 'POST', body: form, auth: false })
      setDone(true)
      setForm(empty)
    } catch (err) {
      setError(err.message)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-5 sm:py-10 md:py-14">
      <button
        type="button"
        onClick={goBack}
        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold text-ink transition hover:bg-lilac hover:text-plum"
      >
        <span aria-hidden="true">←</span>
        Back
      </button>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-plum">Teams</p>
          <h1 className="mt-3 font-display text-3xl leading-tight sm:text-4xl md:text-5xl">Request a quote</h1>
          <p className="mt-4 max-w-md text-lg leading-8 text-muted">
            Individual courses are free. This page is for organizations that want Online Tech for a group.
          </p>
          <ol className="mt-8 space-y-4">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-plum text-sm font-semibold text-on-inverse">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-6 text-muted">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-3xl border border-line bg-cream p-4 shadow-sm sm:p-6 md:p-8">
          {done ? (
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-plum">Received</p>
              <h2 className="font-display text-3xl">Your request is saved.</h2>
              <Notice tone="success">We will reply to the work email you entered.</Notice>
              <Button type="button" onClick={goBack}>
                Back
              </Button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={submit}>
              <div>
                <h2 className="font-display text-3xl">Tell us about the group</h2>
                <p className="mt-2 text-sm text-muted">Fields marked required need an answer before the request can be sent.</p>
              </div>
              {error ? <Notice>{error}</Notice> : null}
              <Field label="Name" name="name" value={form.name} onChange={update} placeholder="Your name" required />
              <Field label="Work email" name="email" type="email" value={form.email} onChange={update} placeholder="you@company.com" required />
              <Field label="Organization" name="organization" value={form.organization} onChange={update} placeholder="School or company" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <Select label="Team size" name="teamSize" value={form.teamSize} onChange={update}>
                  <option>1-10</option>
                  <option>11-50</option>
                  <option>51-200</option>
                  <option>200+</option>
                </Select>
                <Select label="Course of interest" name="courseId" value={form.courseId} onChange={update}>
                  <option value="">Not sure yet</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </Select>
              </div>
              <TextArea
                label="What do you need?"
                name="message"
                value={form.message}
                onChange={update}
                required
                placeholder="Who the learners are, and when you want to start."
              />
              <Button type="submit" disabled={pending}>
                {pending ? 'Sending…' : 'Submit request'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
