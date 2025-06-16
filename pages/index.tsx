'use client'

import { useState } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'أهلاً بك! كيف يمكنني مساعدتك؟' }])
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    if (!input.trim()) return
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    })

    const data = await res.json()
    setMessages([...newMessages, { role: 'assistant', content: data.message }])
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4" style={{
      backgroundImage: 'url("/bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="w-full max-w-2xl space-y-4 bg-black/80 rounded-2xl p-6 shadow-xl">
        <div className="space-y-2 h-[400px] overflow-y-auto">
          {messages.map((m, i) => (
            <p key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
              <strong>{m.role === 'user' ? 'أنت' : 'الذكاء'}:</strong> {m.content}
            </p>
          ))}
        </div>
        <div className="flex">
          <input
            className="flex-1 p-2 rounded-l-xl bg-white text-black"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="اكتب سؤالك..."
          />
          <button onClick={sendMessage} className="bg-red-600 p-2 rounded-r-xl">إرسال</button>
        </div>
      </div>
    </main>
  )
}
