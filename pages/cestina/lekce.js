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
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [sections, setSections] = useState([]);

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

  const handleSelectLesson = async (lesson) => {
    setSelectedLesson(lesson);
    const { data: sectionsData } = await supabase
      .from('sections')
      .select('*')
      .eq('lesson_id', lesson.id)
      .order('order');
    setSections(sectionsData);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📚 Přehled lekcí</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => handleSelectLesson(lesson)}
              className="w-full text-left border border-yellow-400 bg-yellow-50 rounded-xl p-5 hover:bg-yellow-100 transition shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
              <p className="text-sm text-gray-700">{lesson.intro_text}</p>
            </button>
          ))}
        </div>

        {selectedLesson && (
          <div className="bg-gray-50 border-t pt-6">
            <h2 className="text-2xl font-bold mb-4">🧾 Náhled: {selectedLesson.title}</h2>
            <div className="space-y-4">
              {sections.map((section) => (
                <div key={section.id} className="p-4 border rounded bg-white shadow">
                  <h3 className="font-semibold mb-2 capitalize">{section.section_type}</h3>
                  <pre className="whitespace-pre-wrap text-sm text-gray-800">{section.content}</pre>
                </div>
              ))}
              <div className="mt-6">
                <Link
                  href={`/cestina/${selectedLesson.slug}`}
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                >
                  📖 Otevřít celou lekci
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
