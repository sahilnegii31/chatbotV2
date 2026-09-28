import { useEffect, useRef, useState } from 'react'
import {axios} from 'axios'

const starter = [
  {
    role: 'assistant',
    text: 'Signal locked. I am NovaChat — a demo companion until you connect a real model. Ask me anything.',
  },
]

/**
 * Try now workspace. Messages stay in React state so you can later
 * swap `replyTo` for a streaming fetch to your chatbot API.
 */
function Chat() {
  const [messages, setMessages] = useState(starter)
  const [draft, setDraft] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const replyTo =  async (text) => {
    const reply = await axios.post('/api/chat', { text });

    return reply.data;
  }


  const send = async (event) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    setMessages((prev) => [...prev, { role: 'user', text }])
    setDraft('')
    const data = await replyTo(text);
    setMessages((prev) => [...prev, { role: 'assistant', text: data }])

    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', text: replyTo(text) }])
    }, 450)
  }

  return (
    <main className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] max-w-3xl flex-col px-4 py-6">
      <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
        Demo chat — messages are local. Login is ready whenever you add authentication.
      </div>

      <div className="chat-scroll flex-1 space-y-4 overflow-y-auto rounded-3xl border border-white/10 bg-[#0b0618]/60 p-4 backdrop-blur-md">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <p
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-cyan-300 to-violet-400 text-void'
                  : 'border border-white/10 bg-white/10 text-white/90'
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={send} className="mt-4 flex gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Transmit a message…"
          className="flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm outline-none ring-cyan-300/40 placeholder:text-white/30 focus:ring-2"
        />
        <button
          type="submit"
          className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-void"
        >
          Send
        </button>
      </form>
    </main>
  )
}

export default Chat
