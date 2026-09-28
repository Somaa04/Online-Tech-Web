import { useEffect, useRef, useState } from 'react'
import { api } from '../lib/api'
import { useUi } from '../context/UiContext'
import { FloatPanel } from './Reveal'

const starter = {
  role: 'assistant',
  content: 'Ask about a course, how enrollment works, or how to earn a certificate.',
  suggestions: ['I am new to technology', 'How do certificates work?', 'How do team quotes work?'],
}

export default function ChatWidget() {
  const { chatOpen, closeChat } = useUi()
  const [messages, setMessages] = useState([starter])
  const [draft, setDraft] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const scroller = useRef(null)

  useEffect(() => {
    if (!chatOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') closeChat()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [chatOpen, closeChat])

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight })
  }, [messages, chatOpen])

  async function ask(text) {
    const message = text.trim()
    if (!message || pending) return
    setDraft('')
    setError('')
    setMessages((current) => [...current, { role: 'user', content: message }])
    setPending(true)
    try {
      const data = await api('/api/assistant', { method: 'POST', body: { message }, auth: false })
      setMessages((current) => [
        ...current,
        { role: 'assistant', content: data.reply, suggestions: data.suggestions || [] },
      ])
    } catch (err) {
      setError(err.message)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="no-print">
      <FloatPanel
        open={chatOpen}
        role="dialog"
          aria-label="Learning assistant"
          className="fixed inset-x-3 bottom-3 z-40 flex h-[min(32rem,calc(100dvh-1.5rem))] flex-col overflow-hidden rounded-3xl border border-line bg-cream shadow-2xl sm:inset-x-auto sm:right-4 sm:w-[min(24rem,calc(100vw-2rem))]"
        >
          <header className="flex items-center justify-between bg-plum px-4 py-3 text-on-inverse">
            <div>
              <p className="text-sm font-semibold">Learning assistant</p>
              <p className="text-xs text-on-inverse/75">Answers from the Online Tech catalog</p>
            </div>
            <button className="rounded-full px-2 py-1 text-sm" onClick={closeChat}>
              Close
            </button>
          </header>
          <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`rise-in ${message.role === 'user' ? 'text-right' : ''}`}>
                <p
                  className={`inline-block max-w-[90%] rounded-2xl px-3 py-2 text-left text-sm leading-6 ${
                    message.role === 'user' ? 'bg-inverse text-on-inverse' : 'bg-lilac text-ink'
                  }`}
                >
                  {message.content}
                </p>
                {index === messages.length - 1 && message.suggestions?.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-plum ring-1 ring-line"
                        onClick={() => ask(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {pending ? <p className="text-sm text-muted">Thinking…</p> : null}
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
          </div>
          <form
            className="flex gap-2 border-t border-line p-3"
            onSubmit={(event) => {
              event.preventDefault()
              ask(draft)
            }}
          >
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about a course"
              className="min-w-0 flex-1 rounded-full border border-line bg-cream px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-plum/30"
              maxLength={500}
            />
            <button className="rounded-full bg-plum px-4 text-sm font-semibold text-on-inverse" type="submit" disabled={pending}>
              Send
            </button>
          </form>
      </FloatPanel>
    </div>
  )
}
