import { Link } from 'react-router-dom'
// import EarthScene from '../components/EarthScene.jsx'
import Footer from '../components/Footer.jsx'

const features = [
  {
    title: 'Stellar conversations',
    body: 'Ask anything — from late-night homework to deep-space ideas. Replies stay clear, calm, and actually useful.',
  },
  {
    title: 'Orbit-fast answers',
    body: 'The UI is built to feel instant: streaming-ready layout, keyboard-first chat, and no clutter around your words.',
  },
  {
    title: 'Mission memory',
    body: 'Keep threads in one place so you can pick up a thought days later without scrolling a black hole of history.',
  },
  {
    title: 'Ready for real auth',
    body: 'Login and signup screens are already here. Plug in your API when you add authentication on the backend.',
  },
]

const steps = [
  {
    n: '01',
    title: 'Create your account',
    body: 'Open signup, add your email, and you are in. The form is frontend-only today so you can wire it to your auth later.',
  },
  {
    n: '02',
    title: 'Launch a chat',
    body: 'Hit Try now. You land in a dark, starry workspace with a composer at the bottom — the same place a real model will talk.',
  },
  {
    n: '03',
    title: 'Talk across the stars',
    body: 'Send a message. For now the assistant echoes a local demo reply so you can feel the flow before the backend exists.',
  },
]

function Home() {
  return (
    <main className="relative z-10">
      <section className="mx-auto grid min-h-[calc(100svh-72px)] max-w-6xl items-center gap-12 px-5 py-12 lg:grid-cols-2 lg:py-8">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-cyan-200">
            AI companion · deep space
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Talk to a chatbot born in the
            <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              {' '}
              milky way
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            NovaChat is a universe-themed space to ask questions, draft ideas, and
            explore answers while Earth turns quietly beside you.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/chat"
              className="cta-glow rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 px-7 py-3 text-sm font-semibold text-void"
            >
              Try now
            </Link>
            <a
              href="#how-it-works"
              className="rounded-full border border-white/20 px-7 py-3 text-sm text-white/80 transition hover:border-white/50"
            >
              How it works
            </a>
          </div>
        </div>

      </section>

      <section id="features" className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-10 max-w-full  text-center flex flex-col justify-center">
          <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight sm:text-4xl">
            Features from this side of the galaxy
          </h2>
          <p className="mt-3 text-white/65">
            Everything you need on the surface of a chatbot product — designed
            so you can drop in authentication and a model later.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition hover:border-cyan-300/30 hover:bg-white/[0.07]"
            >
              <h3 className="font-display text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-full px-5 pb-24">
        <div className='text-2xl md:text-6xl flex flex-col text-center'>
          <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 max-w-xl text-xl md:text-2xl text-white/65">
            Three quiet steps. No dashboards in the way — just orbit, sign in, and speak.
          </p>
        </div>
        <ol className="mt-10 grid gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.n}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-violet-500/10 to-transparent p-6"
            >
              <span className="font-display text-4xl font-semibold text-cyan-200/80">{step.n}</span>
              <h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <Footer />
    </main>
  )
}

export default Home
