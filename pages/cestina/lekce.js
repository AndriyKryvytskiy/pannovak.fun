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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📚 Přehled lekcí</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {lessons.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/cestina/${lesson.slug}`}
              className="block border border-yellow-400 bg-yellow-50 rounded-xl p-5 hover:bg-yellow-100 transition shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
              <p className="text-sm text-gray-700">{lesson.intro_text}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
