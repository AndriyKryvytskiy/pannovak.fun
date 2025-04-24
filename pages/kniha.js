import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react'

export default function Kniha() {
  const [chapters, setChapters] = useState([])

  useEffect(() => {
    supabase
      .from('chapters')
      .select('*')
      .then(({ data }) => setChapters(data))
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kapitoly</h1>
      <ul className="list-disc pl-5">
        {chapters.map((c) => (
          <li key={c.id}>{c.title}</li>
        ))}
      </ul>
    </div>
  )
}
