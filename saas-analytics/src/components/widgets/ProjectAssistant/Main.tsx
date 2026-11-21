'use client'

import { useEffect, useRef, useState } from 'react'
import { Bot, MessageCircle, Send, X } from 'lucide-react'
import './Main.css'

type Message = {
  role: 'user' | 'model'
  text: string
}

const suggestedQuestions = [
  'What is this project about?',
  'Explain the technology stack.',
  'How does authentication work?',
  'Explain MRR and ARR.',
  'Summarize the dashboard metrics.',
]

export default function ProjectAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const messageEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const sendMessage = async (rawMessage: string) => {
    const message = rawMessage.trim()
    if (!message || isLoading) return

    const history = messages
    setMessages((current) => [...current, { role: 'user', text: message }])
    setInput('')
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history }),
      })
      const result = await response.json() as { answer?: string; error?: string }

      if (!response.ok || !result.answer) {
        setError(result.error || 'The assistant could not answer. Please try again.')
        return
      }

      setMessages((current) => [...current, { role: 'model', text: result.answer! }])
    } catch {
      setError('Unable to reach the assistant. Check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="project-assistant">
      {isOpen && (
        <section className="project-assistant-panel" aria-label="Project Information Assistant">
          <header className="project-assistant-header">
            <div className="project-assistant-heading">
              <span className="project-assistant-avatar"><Bot size={20} /></span>
              <div>
                <h2>Analytics Assistant</h2>
                <p>Project help and SaaS concepts</p>
              </div>
            </div>
            <button type="button" className="project-assistant-close" onClick={() => setIsOpen(false)} aria-label="Close assistant">
              <X size={18} />
            </button>
          </header>

          <div className="project-assistant-messages" aria-live="polite">
            {messages.length === 0 ? (
              <div className="project-assistant-welcome">
                <p>Ask about this project or SaaS analytics. I’ll distinguish verified project details from general guidance.</p>
                <div className="project-assistant-suggestions">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      disabled={isLoading}
                      onClick={() => { void sendMessage(question) }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`project-assistant-message ${message.role}`}>
                {message.text}
              </div>
            ))}
            {isLoading && <div className="project-assistant-message model typing">Thinking…</div>}
            {error && <p className="project-assistant-error" role="alert">{error}</p>}
            <div ref={messageEndRef} />
          </div>

          <form className="project-assistant-form" onSubmit={(event) => { event.preventDefault(); void sendMessage(input) }}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question…"
              aria-label="Ask the assistant a question"
              maxLength={2000}
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()} aria-label="Send message">
              <Send size={17} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="project-assistant-trigger"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close analytics assistant' : 'Open analytics assistant'}
      >
        {isOpen ? <X size={21} /> : <MessageCircle size={21} />}
      </button>
    </div>
  )
}
