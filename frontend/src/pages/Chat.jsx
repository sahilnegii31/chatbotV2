import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const starter = [
  {
    role: 'assistant',
    text: 'Hello! I am Nova, your AI assistant. How can I help you today?',
  },
]

function Chat() {
  const models = ['Gemini 1.5 Pro', 'GPT-4o', 'Claude 3.5 Sonnet']
  const [selectedModel, setSelectedModel] = useState(models[0])
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false)
  const [messages, setMessages] = useState(starter)
  const [draft, setDraft] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const replyTo = async (text) => {
    try {
      const reply = await axios.post("http://localhost:3000/api/response", {
        message: text,
        role : 'user',
      })
      // Extract response string from the backend's { response: "..." } JSON
      return reply.data.response || 'No response from assistant.'
    } catch (error) {
      alert(error);
      console.error('API Error:', error)
      return (
        error.response?.data?.error 
       // 'Unable to connect to the server. Please verify the backend is running on port 3000.'
      )
    }
  }

  const send = async (event) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text || isLoading) return

    setMessages((prev) => [...prev, { role: 'user', text }])
    setDraft('')
    setIsLoading(true)

    try {
      const botResponse = await replyTo(text)
      setMessages((prev) => [...prev, { role: 'assistant', text: botResponse }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] max-w-3xl flex-col px-4 py-6">
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
        {isLoading && (
          <div className="flex justify-start">
            <p className="max-w-[85%] rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm italic text-white/60">
              Thinking…
            </p>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="relative mt-4 w-fit">
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsModelMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0b0618]/60 px-4 py-2 text-sm text-gray-300 backdrop-blur-md transition hover:border-white/20 hover:text-white"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
          <span>{selectedModel}</span>
          <span
            className={`text-xs transition-transform duration-200 ${
              isModelMenuOpen ? 'rotate-180' : ''
            }`}
          >
            ▲
          </span>
        </button>

        {/* Dropdown Menu (opens upward above input) */}
        {isModelMenuOpen && (
          <div className="absolute bottom-full left-0 z-20 mb-2 flex min-w-[180px] flex-col gap-1 rounded-2xl border border-white/10 bg-[#0b0618]/90 p-1.5 shadow-xl backdrop-blur-md">
            {models.map((model) => (
              <button
                key={model}
                type="button"
                onClick={() => {
                  setSelectedModel(model)
                  setIsModelMenuOpen(false)
                }}
                className={`rounded-xl px-3 py-2 text-left text-sm transition ${
                  selectedModel === model
                    ? 'bg-white/15 font-medium text-cyan-300'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {model}
              </button>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={send} className="mt-4 flex gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          disabled={isLoading}
          placeholder={isLoading ? 'Nova is thinking…' : 'Transmit a message…'}
          className="flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm outline-none ring-cyan-300/40 placeholder:text-white/30 focus:ring-2 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !draft.trim()}
          className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-void transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Sending…' : 'Send'}
        </button>
      </form>
    </main>
  )
}

export default Chat
