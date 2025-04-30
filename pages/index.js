import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
        Vítejte na stránkách pana Nováka
      </h1>

      <p className="text-lg md:text-xl text-center max-w-xl mb-8">
        Čeština, humor a život v jedné knize. Interaktivní průvodce světem jazykových zvláštností a absurdní reality.
      </p>

      <div className="flex gap-4 flex-wrap justify-center mb-8">
        <a href="/kniha" className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition">
          📖 Číst knihu (pouze pro PC)
        </a>
        <a href="/oprojektu" className="px-6 py-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-2xl shadow hover:bg-gray-200 transition">
          📚 O projektu
        </a>
        <a href="/kontakt" className="px-6 py-3 bg-green-600 text-white rounded-2xl shadow hover:bg-green-700 transition">
          ✉️ Kontakt
        </a>
        <a href="/hangman" className="px-6 py-3 bg-purple-600 text-white rounded-2xl shadow hover:bg-purple-700 transition">
          🎯 Věšák (substantiva)
        </a>
        <a href="/od-autoru" className="px-6 py-3 bg-pink-600 text-white rounded-2xl shadow hover:bg-pink-700 transition">
          ✍️ Od autorů
        </a>
        <a href="/podekovani" className="px-6 py-3 bg-indigo-600 text-white rounded-2xl shadow hover:bg-indigo-700 transition">
          🙏 Poděkování
        </a>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <a href="/kniha_cz" className="px-5 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition">
          🇨🇿 Kniha česky
        </a>
        <a href="/kniha_ua" className="px-5 py-2 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 transition">
          🇺🇦 Книга українською
        </a>
      </div>
    </main>
  );
}
