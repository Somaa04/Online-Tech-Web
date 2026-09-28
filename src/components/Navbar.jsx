import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { buttonClass } from '../lib/buttonClass'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/courses', label: 'Courses' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const itemClass = ({ isActive }) =>
    `nav-link text-sm font-semibold ${isActive ? 'nav-link-active text-plum' : 'text-ink/80 hover:text-plum'}`

  return (
    <header className="no-print sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <Link to="/" className="flex min-w-0 items-center gap-2" onClick={() => setOpen(false)}>
          <Logo className="h-9 w-9 shrink-0" />
          <span className="truncate font-display text-lg tracking-tight sm:text-xl">Online Tech</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={itemClass}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {user ? (
            <>
              <Link to="/dashboard" className={buttonClass('primary')}>
                Dashboard
              </Link>
              <button className={buttonClass('ghost')} onClick={logout}>
                Sign out
              </button>
            </>
          ) : (
            <Link to="/signin" className={buttonClass('primary')}>
              Sign in
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className={`menu-toggle shrink-0 ${open ? 'menu-toggle-open' : ''}`}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="menu-toggle-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="menu-drop border-t border-line px-4 py-4 sm:px-5 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `nav-link text-base font-semibold ${isActive ? 'nav-link-active text-plum' : 'text-ink'}`
                }
                onClick={() => {
                  setOpen(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
            {user ? (
              <>
                <Link to="/dashboard" className={buttonClass('primary', 'min-w-0 flex-1')} onClick={() => setOpen(false)}>
                  Dashboard
                </Link>
                <button
                  className={buttonClass('ghost', 'min-w-0 flex-1')}
                  onClick={() => {
                    setOpen(false)
                    logout()
                  }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/signin" className={buttonClass('primary', 'w-full')} onClick={() => setOpen(false)}>
                Sign in
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
