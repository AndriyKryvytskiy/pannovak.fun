import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import ReactMarkdown from 'react-markdown';

// Создание клиента Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function KnihaCzPage() {
  const [chapters, setChapters] = useState([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('book_chapters')
        .select('chapter_title, content_ua')
        .order('order');
      if (error) {
        console.error('Supabase fetch error:', error);
      } else {
        console.log('Supabase fetch success:', data);
        setChapters(data);
      }
    };
    fetchData();
  }, []);

  const chapter = chapters[activeChapterIndex];

  return (
    <main className="min-h-screen bg-white text-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">📘 Kniha česky</h1>

        {chapter && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">{chapter.chapter_title}</h2>
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>
                {chapter.content_cz || ''}
              </ReactMarkdown>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            disabled={activeChapterIndex === 0}
            onClick={() => setActiveChapterIndex(i => Math.max(i - 1, 0))}
            className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            ⬅️ Předchozí
          </button>

          <button
            disabled={activeChapterIndex === chapters.length - 1}
            onClick={() => setActiveChapterIndex(i => Math.min(i + 1, chapters.length - 1))}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Další ➡️
          </button>
        </div>
      </div>
    </main>
  );
}
