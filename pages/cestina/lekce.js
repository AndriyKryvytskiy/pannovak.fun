// pages/cestina/lekce.js
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LekceList() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const { data } = await supabase
        .from('lessons')
        .select('*')
        .order('order');

      setLessons(data);
    };

    fetchLessons();
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📚 Přehled lekcí</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="w-full border border-yellow-400 bg-yellow-50 rounded-xl p-5 hover:bg-yellow-100 transition shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
              <p className="text-sm text-gray-700 mb-4">{lesson.intro_text}</p>
              <p className="text-gray-600 italic text-sm mb-4">{lesson.preview_text}</p>
              <Link
                href={`/cestina/${lesson.slug}`}
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              >
                📖 Otevřít lekci
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
