import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Enter } from '../components/Reveal'
import { Button, Field, Notice } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import { illustrations } from '../lib/illustrations'

export default function Auth({ mode }) {
  const isRegister = mode === 'register'
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { applySession, user } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const requested = params.get('next') || '/dashboard'
  const next = requested.startsWith('/') && !requested.startsWith('//') ? requested : '/dashboard'

  useEffect(() => {
    if (user) navigate(next, { replace: true })
  }, [user, next, navigate])

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function submit(event) {
    event.preventDefault()
    setPending(true)
    setError('')
    try {
      const data = await api(isRegister ? '/api/auth/register' : '/api/auth/login', {
        method: 'POST',
        body: isRegister ? form : { email: form.email, password: form.password },
        auth: false,
      })
      applySession(data)
      navigate(next)
    } catch (err) {
      setError(err.message)
    } finally {
      setPending(false)
    }
  }

  if (user) return null

  return (
    <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-10 sm:px-5 sm:py-14 md:grid-cols-2">
      <Enter>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-plum">{isRegister ? 'Register' : 'Sign in'}</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl">
          {isRegister ? 'Create your learner account.' : 'Welcome back.'}
        </h1>
        <p className="mt-4 text-muted">
          {isRegister
            ? 'Use your account to enroll, save lesson progress, and unlock certificates.'
            : 'Pick up the courses you already started.'}
        </p>
        {!isRegister ? (
          <p className="mt-4 break-words rounded-2xl bg-lilac px-4 py-3 text-sm">
            Demo learner: <span className="font-semibold">demo@onlinetech.dev</span> · password{' '}
            <span className="font-semibold">LearnTech1!</span>
          </p>
        ) : null}
        <img src={illustrations.registration} alt="" className="mt-8 hidden w-full max-w-sm md:block" />
      </div>
      </Enter>
      <Enter delay={0.12}>
      <form className="space-y-4 rounded-3xl border border-line bg-cream p-4 shadow-sm sm:p-6" onSubmit={submit}>
        {error ? <Notice>{error}</Notice> : null}
        {isRegister ? (
          <Field label="Name" name="name" value={form.name} onChange={update} placeholder="Your name" required />
        ) : null}
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={update}
          placeholder="you@email.com"
          required
        />
        <Field
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={update}
          placeholder={isRegister ? 'Create a password' : 'Your password'}
          required
          hint={isRegister ? 'At least 8 characters.' : undefined}
        />
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}
        </Button>
        <p className="text-sm text-muted">
          {isRegister ? (
            <>
              Already registered? <Link className="font-semibold text-plum" to="/signin">Sign in</Link>
            </>
          ) : (
            <>
              New here? <Link className="font-semibold text-plum" to={`/register${next !== '/dashboard' ? `?next=${encodeURIComponent(next)}` : ''}`}>Create an account</Link>
            </>
          )}
        </p>
      </form>
      </Enter>
    </div>
  )
}
