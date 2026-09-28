import { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'
import { PageIntro } from '../components/ui'
import { api } from '../lib/api'

const levels = ['All', 'Beginner', 'Intermediate']

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState(['All'])
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState('All')
  const [category, setCategory] = useState('All')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    api('/api/courses', { auth: false })
      .then((data) => {
        if (ignore) return
        setCourses(data.courses)
        setCategories(['All', ...new Set(data.courses.map((course) => course.category))])
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })
    return () => {
      ignore = true
    }
  }, [])

  const visible = courses.filter((course) => {
    const blob = `${course.title} ${course.summary}`.toLowerCase()
    if (query && !blob.includes(query.toLowerCase())) return false
    if (level !== 'All' && course.level !== level) return false
    if (category !== 'All' && course.category !== category) return false
    return true
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-14">
      <PageIntro eyebrow="Catalog" title="Courses">
        Search the program, filter by level, and open a course to enroll. Every course is free for individual learners.
      </PageIntro>

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search courses"
          className="w-full rounded-2xl border border-line bg-cream px-4 py-3 text-sm text-ink shadow-sm outline-none focus:ring-2 focus:ring-plum/30 sm:max-w-md"
        />
        <div className="flex flex-wrap gap-2">
          {levels.map((item) => (
            <button
              key={item}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold ${item === level ? 'bg-inverse text-on-inverse' : 'bg-cream text-ink ring-1 ring-line'}`}
              onClick={() => setLevel(item)}
            >
              {item}
            </button>
          ))}
        </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {categories.map((item) => (
            <button
              key={item}
              className={`w-full rounded-full px-2 py-1.5 text-center text-xs font-semibold sm:px-3 sm:text-sm ${item === category ? 'bg-plum text-on-inverse' : 'bg-lilac text-plum-dark'}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {error ? <p className="mt-6 text-sm text-red-700">{error}</p> : null}
      {loading ? <p className="mt-8 text-sm text-muted">Loading courses…</p> : null}
      {!loading && !visible.length ? (
        <p className="mt-8 text-sm text-muted">No courses match that search. Try another word or clear the filters.</p>
      ) : null}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((course, index) => (
          <CourseCard key={course.id} course={course} index={index} />
        ))}
      </div>
    </div>
  )
}
