import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'
import { illustration } from '../lib/illustrations'

export default function CourseCard({ course, index = 0 }) {
  return (
    <Reveal className="h-full" delay={Math.min(index, 6) * 0.07}>
      <article className="course-card group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-cream transition duration-300 hover:-translate-y-1 hover:border-plum/25 hover:shadow-[0_18px_40px_-28px_rgba(84,47,134,0.45)]">
        <Link to={`/courses/${course.slug}`} className="flex h-full flex-col outline-none">
          <div className="relative flex h-40 items-center justify-center overflow-hidden bg-[linear-gradient(160deg,var(--color-lilac)_0%,var(--color-cream)_70%)]">
            <div className="absolute inset-x-0 bottom-0 h-px bg-line" />
            <img
              src={illustration(course.image)}
              alt=""
              className="h-28 w-auto transition duration-300 group-hover:scale-[1.03] sm:h-32"
            />
          </div>

          <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              <span className="text-plum">{course.level}</span>
              <span aria-hidden="true" className="text-line">
                ·
              </span>
              <span>{course.category}</span>
            </div>

            <h2 className="mt-3 font-display text-[1.45rem] leading-snug tracking-tight text-ink transition-colors group-hover:text-plum-dark">
              {course.title}
            </h2>

            <p className="mt-2 flex-1 text-sm leading-6 text-muted">{course.summary}</p>

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
              <p className="text-xs text-muted">
                <span className="font-semibold text-ink">{course.lessonCount}</span> lessons
                <span className="mx-2 text-line" aria-hidden="true">
                  |
                </span>
                <span className="font-semibold text-ink">{course.hours}</span> hours
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-plum transition group-hover:gap-2.5 group-hover:text-plum-dark">
                View course
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </Link>
      </article>
    </Reveal>
  )
}
