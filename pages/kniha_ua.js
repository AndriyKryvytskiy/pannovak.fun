// pages/kniha_ua.js

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function KnihaUaPage() {
  const [chapters, setChapters] = useState([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('book_chapters')
        .select('chapter_title, content_uk')
        .order('order');
      if (!error) setChapters(data);
    };
    fetchData();
  }, []);

  const chapter = chapters[activeChapterIndex];

  return (
    <main className="min-h-screen bg-white text-gray-900 p-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">📖 Книга українською</h1>

        {chapter && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{chapter.chapter_title}</h2>
            {chapter.content_uk
              .split(/\n{2,}/)
              .map((p, i) => (
                <p key={i} className="mb-4 whitespace-pre-line leading-relaxed">{p.trim()}</p>
              ))}
          </div>
        )}

        <div className="flex justify-between">
          <button
            disabled={activeChapterIndex === 0}
            onClick={() => setActiveChapterIndex(i => Math.max(i - 1, 0))}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            ⬅️ Попередня
          </button>

          <button
            disabled={activeChapterIndex === chapters.length - 1}
            onClick={() => setActiveChapterIndex(i => Math.min(i + 1, chapters.length - 1))}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
          >
            Наступна ➡️
          </button>
        </div>
      </div>
    </main>
  );
}
