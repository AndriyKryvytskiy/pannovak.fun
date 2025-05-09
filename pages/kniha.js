// pages/kniha.js

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function KnihaPage() {
  const [chapters, setChapters] = useState([]);
  const [activeChapter, setActiveChapter] = useState(null);
  const [language, setLanguage] = useState('uk'); // uk by default
  const [showTranslation, setShowTranslation] = useState(true);
  const [openParts, setOpenParts] = useState({});

  useEffect(() => {
    const fetchChapters = async () => {
      const { data, error } = await supabase
        .from('book_chapters')
        .select('id, chapter_title, content_cz, content_uk, content_ru, book_parts (title)')
        .order('order');
      if (!error) {
        setChapters(data);
        if (data.length > 0) {
          setActiveChapter(data[0]);
        }
      }
    };
    fetchChapters();
  }, []);

  const getParagraphs = (text) => {
    if (!text) return null;
    return text
      .split(/\n{2,}/)
      .map((p, i) => (
        <p key={i} className="mb-4 whitespace-pre-line">
          {p.trim()}
        </p>
      ));
  };

  const groupedChapters = chapters.reduce((acc, ch) => {
    const part = ch.book_parts?.title || 'Bez části';
    if (!acc[part]) acc[part] = [];
    acc[part].push(ch);
    return acc;
  }, {});

  const togglePart = (partTitle) => {
    setOpenParts((prev) => ({
      ...prev,
      [partTitle]: !prev[partTitle],
    }));
  };

  const renderContent = () => {
    if (!activeChapter) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">🇨🇿 Český originál</h2>
          {getParagraphs(activeChapter.content_cz)}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {language === 'uk' ? '🇺🇦 Український переклад' : '🇷🇺 Русский перевод'}
            </h2>
            <div className="flex items-center gap-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border p-1 rounded"
              >
                <option value="uk">Українська</option>
                <option value="ru">Русский</option>
              </select>
              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className="text-sm bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
              >
                {showTranslation ? '🙈 Skrýt překlad' : '👀 Zobrazit překlad'}
              </button>
            </div>
          </div>
          {showTranslation && (
            language === 'uk'
              ? getParagraphs(activeChapter.content_uk)
              : getParagraphs(activeChapter.content_ru || 'Переклад недоступний.')
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-gray-100 p-4 border-r h-screen overflow-y-auto">
        <h1 className="text-xl font-bold mb-4">📖 Změst</h1>
        {Object.entries(groupedChapters).map(([partTitle, partChapters]) => (
          <div key={partTitle} className="mb-4">
            <button
              onClick={() => togglePart(partTitle)}
              className="flex items-center w-full text-left font-semibold text-gray-700 hover:bg-gray-200 p-2 rounded"
            >
              <span className="mr-2">📘</span>
              <span className="flex-1">{partTitle}</span>
              <span>{openParts[partTitle] ? '▲' : '▼'}</span>
            </button>
            {openParts[partTitle] && (
              <div className="pl-4 mt-1">
                {partChapters.map((ch, index) => (
                  <div
                    key={ch.id}
                    className={`cursor-pointer p-2 rounded hover:bg-gray-200 ${activeChapter?.id === ch.id ? 'bg-gray-300' : ''}`}
                    onClick={() => setActiveChapter(ch)}
                  >
                    <p className="text-sm">
                      <span className="text-gray-500 mr-1">{index + 1}.</span>
                      {ch.chapter_title}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        {renderContent()}
      </div>
    </div>
  );
}
