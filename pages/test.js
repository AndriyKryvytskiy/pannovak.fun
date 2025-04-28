import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export default function TestPage() {
  return (
    <main className="min-h-screen bg-white p-10">
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          components={{}}
          remarkPlugins={[]}
        >
          {`### Vážený pane Nováku,

obracím se na Vás v záležitosti, která vyžaduje jistou míru osobní angažovanosti.`}
        </ReactMarkdown>
      </div>
    </main>
  );
}
