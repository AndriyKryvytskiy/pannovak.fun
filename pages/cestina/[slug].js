// pages/cestina/[slug].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LekceDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [lesson, setLesson] = useState(null);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (!slug) return;

    const fetchLesson = async () => {
      const { data: lessonData } = await supabase
        .from('lessons')
        .select('*')
        .eq('slug', slug)
        .single();

      setLesson(lessonData);

      const { data: sectionData } = await supabase
        .from('sections')
        .select('*')
        .eq('lesson_id', lessonData.id)
        .order('order');

      setSections(sectionData);
    };

    fetchLesson();
  }, [slug]);

  return (
    <main className="min-h-screen bg-white text-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/cestina/lekce" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Zpět na přehled lekcí
        </Link>

        {lesson && (
          <>
            <h1 className="text-3xl font-bold mb-4">📘 {lesson.title}</h1>
            <p className="text-gray-700 mb-6">{lesson.intro_text}</p>

            <div className="space-y-8">
              {sections.map((section) => (
                <div key={section.id} className="p-4 border rounded bg-white shadow">
                  <h3 className="font-semibold mb-2 capitalize text-gray-600">{section.section_type}</h3>
                  <ReactMarkdown
                    className="prose prose-sm max-w-none text-gray-800"
                    remarkPlugins={[remarkGfm]}
                    components={{
                      table: (props) => <table className="border border-gray-400 w-full" {...props} />,
                      thead: (props) => <thead className="bg-gray-100" {...props} />,
                      th: (props) => <th className="border border-gray-400 px-2 py-1 text-left" {...props} />,
                      td: (props) => <td className="border border-gray-300 px-2 py-1" {...props} />
                    }}
                  >
                    {section.content.replace(/\n/g, '\n')}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
