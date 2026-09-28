import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Notice } from '../components/ui'
import { buttonClass } from '../lib/buttonClass'
import { api } from '../lib/api'

export default function Certificate() {
  const { courseId } = useParams()
  const [certificate, setCertificate] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    api(`/api/me/certificates/${courseId}`)
      .then((data) => {
        if (!ignore) setCertificate(data.certificate)
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })
    return () => {
      ignore = true
    }
  }, [courseId])

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-5 sm:py-16">
        <Notice>{error}</Notice>
        <Link to="/dashboard" className={`${buttonClass('primary')} mt-4`}>
          Back to dashboard
        </Link>
      </div>
    )
  }

  if (!certificate) return <p className="px-5 py-16 text-sm text-muted">Preparing certificate…</p>

  const date = new Date(certificate.completedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-5 sm:py-14">
      <div className="no-print mb-6 flex justify-end">
        <button className={buttonClass('dark')} onClick={() => window.print()}>
          Print or save PDF
        </button>
      </div>
      <article className="rise-in rounded-[2rem] border-8 border-double border-plum bg-cream px-4 py-8 text-center shadow-sm sm:border-[12px] sm:px-8 sm:py-12 md:px-16">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-plum">Online Tech</p>
        <h1 className="mt-4 font-display text-3xl sm:text-5xl">Certificate of completion</h1>
        <p className="mt-6 text-muted">This certifies that</p>
        <p className="mt-2 font-display text-3xl text-plum-dark sm:text-4xl">{certificate.learnerName}</p>
        <p className="mt-6 text-muted">has completed</p>
        <p className="mt-2 font-display text-2xl sm:text-3xl">{certificate.courseTitle}</p>
        <p className="mt-4 text-sm text-muted">{certificate.hours} hours · {date}</p>
        <p className="mt-8 text-xs uppercase tracking-[0.16em] text-muted">Certificate {certificate.id}</p>
      </article>
    </div>
  )
}
