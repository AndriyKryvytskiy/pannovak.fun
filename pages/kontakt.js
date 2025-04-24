import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Kontakt() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [quote, setQuote] = useState(null)
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Odesílám...')

    const { error } = await supabase.from('messages').insert([form])
    if (error) {
      setStatus('Chyba při odesílání.')
      return
    }

    const { data } = await supabase.from('quotes').select('*').limit(10)
    if (data && data.length > 0) {
      const random = data[Math.floor(Math.random() * data.length)]
      setQuote(random.text)
    }

    setStatus('Zpráva odeslána. Děkujeme!')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Фото слева */}
        <div className="flex justify-center">
          <img
            src="/pan-novak-kontakt.png"
            alt="Pan Novák"
            className="w-full max-w-sm rounded-lg shadow-xl"
          />
        </div>

        {/* Форма справа */}
        <div>
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Napište panu Novákovi</h1>
          <p className="mb-4 text-gray-600 italic">Máte dotaz, pochvalu nebo stížnost? Novák poslouchá. Občas.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Vaše jméno"
              className="w-full p-3 border border-gray-300 rounded shadow-sm"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Váš e-mail"
              className="w-full p-3 border border-gray-300 rounded shadow-sm"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Zpráva panu Novákovi"
              className="w-full p-3 border border-gray-300 rounded shadow-sm h-32"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded shadow"
            >
              Odeslat zprávu
            </button>
          </form>

          {status && <p className="mt-4 text-sm text-gray-500">{status}</p>}

          {quote && (
            <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 rounded">
              <p className="italic text-gray-700">Pan Novák odpovídá:</p>
              <p className="font-semibold text-gray-900">„{quote}“</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
