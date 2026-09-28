import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import { Enter, Reveal } from '../components/Reveal'
import HeroIllustration from '../components/HeroIllustration'
import TypingIllustration from '../components/TypingIllustration'
import { buttonClass } from '../lib/buttonClass'
import { useUi } from '../context/UiContext'
import { api } from '../lib/api'
import { illustrations } from '../lib/illustrations'

const skills = [
  {
    title: 'Future-ready tech skills',
    body: 'Develop the confidence to use technology in your studies, workplace, and everyday life.',
  },
  {
    title: 'Practical digital skills',
    body: 'Learn tools and techniques you can apply the same week, not a pile of theory.',
  },
  {
    title: 'Confident with technology',
    body: 'Practice on short lessons and keep a record of what you have finished.',
  },
]

const pillars = [
  {
    title: 'About the program',
    body: 'A sequence of courses that introduces core technology skills for today’s digital work.',
    to: '/about',
    image: illustrations.about,
  },
  {
    title: 'Stay connected',
    body: 'Ask the learning assistant, or send the team a message when you want a human reply.',
    to: '/contact',
    image: illustrations.connection,
  },
  {
    title: 'Certificate',
    body: 'Finish every lesson in a course and download a certificate of completion.',
    to: '/courses',
    image: illustrations.certificate,
  },
]

export default function Home() {
  const { openChat } = useUi()
  const [courses, setCourses] = useState([])
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    Promise.all([api('/api/courses', { auth: false }), api('/api/stats', { auth: false })])
      .then(([courseData, statsData]) => {
        if (ignore) return
        setCourses(courseData.courses.slice(0, 3))
        setStats(statsData)
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })
    return () => {
      ignore = true
    }
  }, [])

  return (
    <div>
      <section className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-5 sm:py-16 md:grid-cols-2 md:py-24">
        <div className="hero-glow" aria-hidden="true" />
        <Enter className="relative z-10" delay={0.05}>
          <p className="inline-flex rounded-full bg-lilac px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-plum-dark">
            Online learning program
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Technology fundamentals, taught in plain language.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
            Build a solid foundation in essential digital skills, then keep going. Enroll, track each lesson, and earn a certificate when you finish.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/courses" className={buttonClass('dark', 'w-full sm:w-auto')}>
              Browse courses
            </Link>
            <Link to="/quote" className={buttonClass('ghost', 'w-full sm:w-auto')}>
              Request a quote
            </Link>
          </div>
        </Enter>
        <HeroIllustration className="relative z-10 w-full max-w-lg justify-self-center" />
      </section>

      <section className="border-y border-line bg-cream">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-5">
          {[
            [stats ? String(stats.courses) : '—', 'Courses you can start today'],
            [stats ? String(stats.lessons) : '—', 'Short lessons with a clear outcome'],
            [stats ? `${stats.hours}h` : '—', 'Guided practice across the catalog'],
          ].map(([value, label], index) => (
            <Reveal key={label} delay={index * 0.08}>
              <p className="font-display text-4xl text-plum">{value}</p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-plum text-on-inverse">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                Practical technology skills, made simple.
              </h2>
              <p className="mt-4 text-on-inverse/80">A solid start to your tech journey, then a path you can actually finish.</p>
              <TypingIllustration className="mx-auto mt-8 block w-full max-w-sm md:mx-0" />
            </div>
            <div className="space-y-5">
              {skills.map((skill, index) => (
                <Reveal key={skill.title} delay={index * 0.1}>
                  <div className="border-l-2 border-on-inverse/40 pl-5">
                    <h3 className="text-lg font-semibold">{skill.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-on-inverse/80">{skill.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-plum">Catalog</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Start with a course</h2>
          </div>
          <Link to="/courses" className="text-sm font-semibold text-plum">
            See the full catalog
          </Link>
        </div>
        {error ? <p className="mt-6 text-sm text-red-700">{error}</p> : null}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-8 sm:px-5 md:grid-cols-2">
        <Reveal>
          <img src={illustrations.chatbot} alt="Chat assistant illustration" className="float-y w-full max-w-md justify-self-center" />
        </Reveal>
        <Reveal delay={0.12}>
          <div>
          <h2 className="font-display text-3xl sm:text-4xl">A learning assistant that knows this catalog.</h2>
          <p className="mt-4 text-muted">
            Ask which course to take, how certificates work, or what a team quote includes. It answers from Online Tech’s own courses, not a generic script.
          </p>
          <button className={`${buttonClass('primary')} mt-6`} onClick={openChat}>
            Open the assistant
          </button>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-12 sm:grid-cols-2 sm:px-5 lg:grid-cols-3">
        {pillars.map((pillar, index) => (
          <Reveal key={pillar.title} delay={index * 0.08}>
          <Link to={pillar.to} className="block rounded-3xl bg-lilac p-6 text-center transition duration-300 hover:-translate-y-1.5 hover:shadow-lg">
            <img src={pillar.image} alt="" className="mx-auto h-20 w-auto" />
            <h3 className="mt-4 font-display text-2xl">{pillar.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{pillar.body}</p>
          </Link>
          </Reveal>
        ))}
      </section>
    </div>
  )
}
