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
      .order('RANDOM()')
      .limit(1)

    if (error) {
      console.error('Chyba při načítání citátu:', error)
      return
    }

    if (data && data[0]) {
      setQuote(data[0])
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  const handleAnswer = (option) => {
    setSelected(option)
    setResult(option === quote.correct_author)
  }

  if (!quote) return <p className="text-center p-6">Načítám citát...</p>

  return (
    <div className="p-4 space-y-6 max-w-2xl mx-auto text-center">
      <h2 className="text-xl font-bold mb-2">🗣️ Čí je to citát?</h2>
      <p className="italic text-lg">„{quote.quote}“</p>

      <div className="grid gap-4 mt-4">
        {quote.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(option)}
            className={`p-2 border rounded shadow text-lg transition
              ${selected
                ? option === quote.correct_author
                  ? 'bg-green-200'
                  : option === selected
                  ? 'bg-red-200'
                  : 'bg-white'
                : 'hover:bg-gray-100'}
            `}
            disabled={!!selected}
          >
            {option}
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
