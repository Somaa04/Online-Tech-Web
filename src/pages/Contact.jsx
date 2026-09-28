import { useState } from 'react'
import { Enter } from '../components/Reveal'
import { Field, Notice, PageIntro, Select, TextArea, Button } from '../components/ui'
import { api } from '../lib/api'
import { illustrations } from '../lib/illustrations'

const topics = ['Courses', 'Enrollment', 'Certificate', 'Teams', 'Something else']
const empty = { name: '', email: '', topic: 'Courses', message: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [pending, setPending] = useState(false)

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function submit(event) {
    event.preventDefault()
    setPending(true)
    setError('')
    try {
      await api('/api/contact', { method: 'POST', body: form, auth: false })
      setDone(true)
      setForm(empty)
    } catch (err) {
      setError(err.message)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-10 sm:px-5 sm:py-14 md:grid-cols-2">
      <Enter>
        <PageIntro eyebrow="Contact" title="Tell us what you need help with.">
          Questions about a course, a certificate, or a team enrollment come here. Messages are saved on the server.
        </PageIntro>
        <img src={illustrations.contact} alt="Person sending a message" className="mt-8 w-full max-w-sm" />
      </Enter>
      <Enter delay={0.12}>
      <form className="space-y-4 rounded-3xl border border-line bg-cream p-4 sm:p-6" onSubmit={submit}>
        {done ? <Notice tone="success">Message received. We stored it with the email you entered.</Notice> : null}
        {error ? <Notice>{error}</Notice> : null}
        <Field label="Name" name="name" value={form.name} onChange={update} placeholder="Your name" required />
        <Field label="Email" name="email" type="email" value={form.email} onChange={update} placeholder="you@email.com" required />
        <Select label="Topic" name="topic" value={form.topic} onChange={update}>
          {topics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </Select>
        <TextArea label="Message" name="message" value={form.message} onChange={update} placeholder="How can we help?" required />
        <Button type="submit" disabled={pending}>
          {pending ? 'Sending…' : 'Send message'}
        </Button>
      </form>
      </Enter>
    </div>
  )
}
