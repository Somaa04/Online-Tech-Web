import { Link } from 'react-router-dom'
import { buttonClass } from '../lib/buttonClass'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-5 sm:py-24">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-plum">404</p>
      <h1 className="mt-3 font-display text-3xl sm:text-5xl">That page is not in the catalog.</h1>
      <Link to="/" className={`${buttonClass('primary')} mt-8`}>
        Back home
      </Link>
    </div>
  )
}
