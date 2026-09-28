import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const links = [
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How it works' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const onChat = location.pathname === '/chat'

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05010d]/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-violet-500 text-sm font-bold text-void">
            N
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            NovaChat
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/chat"
            className="text-sm text-white/70 transition hover:text-white"
          >
            Chat
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {!onChat && (
            <Link
              to="/chat"
              className="hidden rounded-full border border-cyan-300/40 px-4 py-2 text-sm text-cyan-200 transition hover:border-cyan-200 hover:bg-cyan-300/10 sm:inline-flex"
            >
              Try now
            </Link>
          )}
          <NavLink
            to="/login"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-void transition hover:bg-cyan-100"
          >
            Login
          </NavLink>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className="block h-0.5 w-4 bg-white" />
              <span className="block h-0.5 w-4 bg-white" />
              <span className="block h-0.5 w-4 bg-white" />
            </div>
          </button>
        </div>
      </nav>

      {open && (
        <div className="space-y-3 border-t border-white/10 px-5 py-4 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-white/80"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link to="/chat" className="block text-white/80" onClick={() => setOpen(false)}>
            Chat
          </Link>
          <Link to="/signup" className="block text-white/80" onClick={() => setOpen(false)}>
            Sign up
          </Link>
        </div>
      )}
    </header>
  )
}

export default Navbar
