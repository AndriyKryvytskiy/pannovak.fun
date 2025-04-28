import ReactMarkdown from 'react-markdown';

export default function TestPage() {
  const text = `### Vážený pane Nováku,

obracím se na Vás v záležitosti, která vyžaduje jistou míru osobní angažovanosti.`;

  return (
    <main className="min-h-screen bg-white p-10">
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>
          {text}
        </ReactMarkdown>
      </div>
    </main>
  );
}
