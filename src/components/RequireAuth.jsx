import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RequireAuth({ children }) {
  const { user, ready } = useAuth()
  const location = useLocation()

  if (!ready) return <p className="px-5 py-16 text-sm text-muted">Checking your session…</p>
  if (!user) return <Navigate to={`/signin?next=${encodeURIComponent(location.pathname)}`} replace />
  return children
}
