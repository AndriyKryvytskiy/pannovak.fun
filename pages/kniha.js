import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Kniha() {
  const [chapters, setChapters] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchChapters = async () => {
      const { data, error } = await supabase.from('chapters').select('*')

      if (error) {
        console.error('Supabase error:', error)
        setError('Nepodařilo se načíst kapitoly.')
      } else {
        setChapters(data ?? [])
      }
    }

    fetchChapters()
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">📖 Kapitoly</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {chapters.length === 0 ? (
        <p>Žádné kapitoly zatím nejsou.</p>
      ) : (
        <ul className="space-y-4">
          {chapters.map((c) => (
            <li key={c.id} className="border border-gray-200 p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{c.title}</h2>
              <p className="text-gray-700 whitespace-pre-line">{c.content}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
