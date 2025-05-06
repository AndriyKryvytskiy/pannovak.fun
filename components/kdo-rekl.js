'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function KdoReklGame() {
  const [quote, setQuote] = useState(null)
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)

  const fetchQuote = async () => {
    setSelected(null)
    setResult(null)

    const { data, error } = await supabase
      .from('quotes_citat')
      .select('*')

    if (error) {
      console.error('Chyba při načítání citátu:', error)
      return
    }

    if (data && data.length > 0) {
      const random = data[Math.floor(Math.random() * data.length)]
      setQuote(random)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  if (!quote) return <p className="text-center p-6">Načítám citát...</p>

  let options = []
  try {
    options = Array.isArray(quote.options)
      ? quote.options
      : JSON.parse(quote.options)
  } catch (e) {
    options = []
  }

  const handleAnswer = (author) => {
    setSelected(author)
    setResult(author === quote.correct_author)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto text-center space-y-6">
      <h2 className="text-2xl font-bold">🗣️ Čí je to citát?</h2>

      <blockquote className="italic text-lg bg-gray-100 p-4 rounded shadow">
        „{quote.quote}“
      </blockquote>

      <div className="grid gap-4">
        {options.map((author, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(author)}
            disabled={!!selected}
            className={`px-4 py-2 border rounded text-lg transition
              ${
                selected
                  ? author === quote.correct_author
                    ? 'bg-green-200'
                    : author === selected
                    ? 'bg-red-200'
                    : 'bg-white'
                  : 'hover:bg-gray-100'
              }`}
          >
            {author}
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-6 text-lg">
          {result ? '✅ Správně!' : (
            <>
              ❌ Špatně. Správná odpověď: <strong>{quote.correct_author}</strong>
            </>
          )}
          <div className="mt-4">
            <button
              onClick={fetchQuote}
              className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
            >
              Další citát
            </button>
          </div>
        </div>
      )}

      <div className="text-center mt-8">
        <a href="/hry" className="inline-block px-6 py-2 bg-gray-300 text-gray-800 rounded-xl shadow hover:bg-gray-400 transition">
          ⬅️ Zpět na herní portál
        </a>
      </div>
    </div>
  )
}
