'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient';

export default function TestSupabase() {
  const [quote, setQuote] = useState(null)

  useEffect(() => {
    async function load() {
      console.log('🟡 Test načítání...')
      const { data, error } = await supabase
        .from('quotes_citat')
        .select('*')
        .limit(1)

      console.log('📦 DATA:', data)
      console.log('⚠️ ERROR:', error)

      if (data && data[0]) {
        setQuote(data[0])
      }
    }

    load()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">🧪 Test Supabase</h1>
      {quote ? (
        <div className="bg-gray-100 p-4 rounded shadow">
          <p><strong>Citát:</strong> {quote.quote}</p>
          <p><strong>Autor:</strong> {quote.correct_author}</p>
          <p><strong>Options:</strong> {JSON.stringify(quote.options)}</p>
        </div>
      ) : (
        <p>Načítám...</p>
      )}
    </div>
  )
}
