import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { PageIntro } from '../components/ui'
import { buttonClass } from '../lib/buttonClass'
import { illustrations } from '../lib/illustrations'

const values = [
  {
    title: 'Plain language',
    body: 'Lessons assume you are capable and busy, not that you already speak in acronyms.',
  },
  {
    title: 'Finishable',
    body: 'Each course is a handful of lessons. Progress is saved, and a certificate waits at the end.',
  },
  {
    title: 'Useful on Monday',
    body: 'The point is a workflow you can repeat at school or at work, not a pile of definitions.',
  },
]

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-14">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <PageIntro eyebrow="About" title="An online program for core technology skills.">
          Online Tech started as a single landing page about learning the fundamentals. It is now a catalog you can enroll in, with progress, a learning assistant, and a certificate when you finish.
        </PageIntro>
        <Reveal>
          <img src={illustrations.about} alt="Team collaborating around a laptop" className="float-y w-full max-w-md justify-self-center" />
        </Reveal>
      </div>
      <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((value, index) => (
          <Reveal key={value.title} delay={index * 0.08}>
          <article className="h-full rounded-3xl bg-lilac p-6 transition duration-300 hover:-translate-y-1">
            <h2 className="font-display text-2xl">{value.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{value.body}</p>
          </article>
          </Reveal>
        ))}
      </div>
      <div className="mt-14 grid items-center gap-8 rounded-3xl bg-inverse px-6 py-10 text-on-inverse md:grid-cols-[1.2fr_0.8fr] md:px-10">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl">Learning with a team?</h2>
          <p className="mt-3 text-on-inverse/75">
            Individuals enroll for free. Organizations can request a quote and tell us which course the group should start with.
          </p>
          <Link to="/contact" className={`${buttonClass('gold')} mt-6`}>
            Talk to the team
          </Link>
        </div>
        <img src={illustrations.connection} alt="" className="float-y w-full max-w-xs justify-self-center" />
      </div>
    </div>
  )
}
