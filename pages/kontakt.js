import Image from 'next/image'
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

    const { data } = await supabase
      .from('quotes')
      .select('*')
      .order('id', { ascending: false })
      .limit(10)

    if (data && data.length > 0) {
      const random = data[Math.floor(Math.random() * data.length)]
      setQuote(random.text)
    }

    setStatus('Zpráva odeslána. Děkujeme!')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* Фото слева */}
      <div className="md:w-1/2 flex justify-center items-start">
        <img
          src="/pan-novak-kontakt.png"
          alt="Pan Novák"
          className="w-80 rounded shadow-md"
        />
      </div>

      {/* Контент справа */}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">Kontaktujte pana Nováka</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Vaše jméno"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Váš e-mail"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Zpráva panu Novákovi"
            className="w-full p-2 border rounded h-32"
            required
          ></textarea>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Odeslat
          </button>
        </form>

        {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}

        {quote && (
          <div className="mt-6 p-4 bg-yellow-100 rounded text-center italic">
            <p>Pan Novák odpovídá:</p>
            <p>„{quote}“</p>
          </div>
        )}
      </div>
    </div>
  )
}
