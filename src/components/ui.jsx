import { useId } from 'react'
import { buttonClass } from '../lib/buttonClass'

export function Button({ variant = 'primary', className = '', children, ...props }) {
  return (
    <button className={buttonClass(variant, className)} {...props}>
      {children}
    </button>
  )
}

const controlClass =
  'w-full rounded-2xl border border-line bg-cream px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none focus:border-plum focus:ring-2 focus:ring-plum/30'

export function Field({ label, hint, ...props }) {
  const autoId = useId()
  const id = props.id || autoId
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
      </label>
      <input id={id} className={controlClass} {...props} />
      {hint ? <p className="text-xs text-muted">{hint}</p> : null}
    </div>
  )
}

export function TextArea({ label, ...props }) {
  const autoId = useId()
  const id = props.id || autoId
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
      </label>
      <textarea id={id} className={`${controlClass} min-h-28 resize-y`} {...props} />
    </div>
  )
}

export function Select({ label, children, ...props }) {
  const autoId = useId()
  const id = props.id || autoId
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
      </label>
      <select id={id} className={controlClass} {...props}>
        {children}
      </select>
    </div>
  )
}

export function Notice({ tone = 'error', children }) {
  const tones = {
    error: 'bg-red-50 text-red-800 ring-red-200',
    success: 'bg-emerald-50 text-emerald-900 ring-emerald-200',
  }
  return <p className={`rounded-2xl px-4 py-3 text-sm ring-1 ${tones[tone]}`}>{children}</p>
}

export function PageIntro({ eyebrow, title, children }) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-plum">{eyebrow}</p>
      ) : null}
      <h1 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl md:text-5xl">{title}</h1>
      {children ? <p className="mt-4 text-lg text-muted">{children}</p> : null}
    </div>
  )
}
