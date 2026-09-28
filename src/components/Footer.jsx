import { Link } from 'react-router-dom'
import Logo from './Logo'

const links = [
  { to: '/courses', label: 'Courses' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/quote', label: 'Team quote' },
  { to: '/signin', label: 'Sign in' },
  { to: '/register', label: 'Create account' },
  { to: '/dashboard', label: 'Dashboard' },
]

export default function Footer() {
  return (
    <footer className="no-print mt-16 border-t border-on-inverse/10 bg-inverse text-on-inverse">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-5 sm:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0 md:max-w-sm">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="font-display text-lg tracking-tight">Online Tech</span>
            </Link>
            <p className="mt-2 text-sm leading-6 text-on-inverse/55">
              Practical courses, saved progress, and a certificate when you finish.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 md:max-w-xl md:justify-end">
            {links.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-on-inverse/70 transition hover:text-on-inverse"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-on-inverse/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-on-inverse/40 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p>© {new Date().getFullYear()} Online Tech</p>
          <a
            href="https://github.com/Somaa04/Online-Tech-Web"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-on-inverse"
          >
            Source repository
          </a>
        </div>
      </div>
    </footer>
  )
}
