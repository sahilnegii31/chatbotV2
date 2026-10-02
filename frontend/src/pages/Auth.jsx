import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Auth({ mode }) {
  const isLogin = mode === 'login'
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const username = form.username.trim()
    const password = form.password

    if (!username || !password) {
      setError('Please provide both username and password.')
      return
    }

    setIsSubmitting(true)
    try {
      const endpoint = `http://localhost:3000/api/auth/${isLogin ? 'login' : 'register'}`
      const response = await axios.post(endpoint, {
        username,
        pass: password,
      })

      if (isLogin) {
        if (response.data?.token) {
          localStorage.setItem('token', response.data.token)
        }
        navigate('/chat')
      } else {
        // On successful registration, automatically log in the user
        try {
          const loginRes = await axios.post('http://localhost:3000/api/auth/login', {
            username,
            pass: password,
          })
          if (loginRes.data?.token) {
            localStorage.setItem('token', loginRes.data.token)
          }
          navigate('/chat')
        } catch {
          navigate('/login')
        }
      }
    } catch (err) {
      console.error('Auth error:', err)
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Unable to connect to auth server. Please check if the backend is running.'
      )
    } finally {
      setIsSubmitting(false)
    }
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
          <label className="block text-sm">
            <span className="mb-1.5 block text-white/70">Username</span>
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={onChange}
              autoComplete="username"
              required
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 outline-none ring-cyan-300/40 placeholder:text-white/30 focus:ring-2"
              placeholder="e.g. sahil_dev"
            />
          </label>

          {!isLogin && (
            <label className="block text-sm">
              <span className="mb-1.5 block text-white/70">Email (Optional)</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                autoComplete="email"
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 outline-none ring-cyan-300/40 placeholder:text-white/30 focus:ring-2"
                placeholder="abc@gmail.com"
              />
            </label>
          )}

          <label className="block text-sm">
            <span className="mb-1.5 block text-white/70">Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              required
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 outline-none ring-cyan-300/40 placeholder:text-white/30 focus:ring-2"
              placeholder="••••••••"
            />
          </label>

          {error && <p className="text-sm text-rose-300">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 py-3 text-sm font-semibold text-void transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? isLogin
                ? 'Logging in…'
                : 'Creating account…'
              : isLogin
              ? 'Log in'
              : 'Sign up'}
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
