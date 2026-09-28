import welcomeImage from '../assets/pic3 (2).svg'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { buttonClass } from '../lib/buttonClass'

const notes = [
  { title: 'Free to start', body: 'Individual courses are open to enroll.' },
  { title: 'Progress saved', body: 'Pick up a lesson where you left it.' },
  { title: 'A certificate', body: 'Finish a course and keep the record.' },
]

export default function Welcome({ onEnter }) {
  return (
    <div className="welcome-screen relative flex min-h-screen flex-col bg-paper text-ink">
      <div className="flex justify-end px-4 py-4 sm:px-6">
        <ThemeToggle />
      </div>

      <div className="mx-auto grid w-full max-w-5xl flex-1 items-center gap-8 px-4 pb-12 sm:px-6 md:grid-cols-2 md:pb-16">
        <div className="rise-in mx-auto max-w-md text-center md:mx-0 md:text-left">
          <div className="flex items-center justify-center gap-2.5 md:justify-start">
            <Logo className="h-10 w-10" />
            <span className="font-display text-xl tracking-tight">Online Tech</span>
          </div>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-plum">Welcome</p>
          <h1 className="mt-3 font-display text-4xl leading-[1.08] sm:text-5xl">Good to see you.</h1>
          <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
            This is a calm place to learn practical technology skills. Start a short course, keep your progress, and earn a certificate when you finish.
          </p>
          <ul className="mt-6 space-y-3 text-left">
            {notes.map((note) => (
              <li key={note.title} className="rounded-2xl bg-lilac px-4 py-3">
                <p className="text-sm font-semibold">{note.title}</p>
                <p className="mt-0.5 text-sm text-muted">{note.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center">
            <button type="button" className={buttonClass('primary')} onClick={onEnter}>
              Continue
            </button>
          </div>
        </div>

        <img
          src={welcomeImage}
          alt="Person welcoming you to an online lesson"
          className="mx-auto w-full max-w-sm"
        />
      </div>
    </div>
  )
}
