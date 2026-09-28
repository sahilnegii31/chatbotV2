import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

/**
 * Combined login / signup page. Same galaxy chrome as the rest of
 * the site. Forms are ready to POST to your auth API — they currently
 * just navigate into chat so you can keep building the UI.
 */
function Auth({ mode }) {
  const isLogin = mode === 'login'
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (!form.email || !form.password || (!isLogin && !form.name)) {
      setError('Please fill in every field before launching.')
      return
    }

    // TODO: replace with your real auth request (JWT / session / OAuth).
    // Example: await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(form) })
    navigate('/chat')
  }

  return (
    <main className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] max-w-md items-center px-5 py-16">
      <div className="w-full rounded-3xl border border-white/10 bg-[#0b0618]/80 p-8 shadow-[0_0_80px_rgba(124,92,255,0.18)] backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">
          {isLogin ? 'Welcome back' : 'Join the crew'}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold">
          {isLogin ? 'Log in to NovaChat' : 'Create your account'}
        </h1>
        <p className="mt-2 text-sm text-white/60">
          {isLogin
            ? 'Pick up the conversation where you left it.'
            : 'A few details and you can start talking among the stars.'}
        </p>

        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          {!isLogin && (
            <label className="block text-sm">
              <span className="mb-1.5 block text-white/70">Name</span>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                autoComplete="name"
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 outline-none ring-cyan-300/40 placeholder:text-white/30 focus:ring-2"
                placeholder="Ada Lovelace"
              />
            </label>
          )}

          <label className="block text-sm">
            <span className="mb-1.5 block text-white/70">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              autoComplete="email"
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 outline-none ring-cyan-300/40 placeholder:text-white/30 focus:ring-2"
              placeholder="you@orbit.io"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1.5 block text-white/70">Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 outline-none ring-cyan-300/40 placeholder:text-white/30 focus:ring-2"
              placeholder="••••••••"
            />
          </label>

          {error && <p className="text-sm text-rose-300">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 py-3 text-sm font-semibold text-void"
          >
            {isLogin ? 'Log in' : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/55">
          {isLogin ? (
            <>
              New here?{' '}
              <Link to="/signup" className="text-cyan-200 underline-offset-4 hover:underline">
                Create an account
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link to="/login" className="text-cyan-200 underline-offset-4 hover:underline">
                Log in
              </Link>
            </>
          )}
        </p>
      </div>
    </main>
  )
}

export default Auth
