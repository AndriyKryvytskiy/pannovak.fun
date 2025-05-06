import Link from 'next/link';

export default function HryIndex() {
  return (
    <main className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center p-6">
      {/* Заголовок */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        🎮 Herní portál pana Nováka
      </h1>

      <p className="text-lg md:text-xl text-center max-w-xl mb-8">
        Zahrajte si jazykové a ironické mini-hry inspirované světem pána Nováka.
      </p>

      {/* Раздел: Výběr her */}
      <div className="w-full text-center my-8">
        <div className="flex items-center justify-center mb-4">
          <span className="text-2xl mr-2">🧠</span>
          <h2 className="text-2xl font-semibold">Vyberte si hru</h2>
        </div>
        <hr className="border-t border-gray-300 w-64 mx-auto mb-6" />

        <div className="flex gap-4 flex-wrap justify-center">
          <a href="/hry/spoj" className="px-6 py-3 bg-yellow-400 text-white rounded-2xl shadow hover:bg-yellow-500 transition">
            🧩 Spoj otázku a odpověď
          </a>
          <a href="/hry/memory" className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition">
            🧠 Ironické memory
          </a>
          <a href="/hry/kdorekl" className="px-6 py-3 bg-green-600 text-white rounded-2xl shadow hover:bg-green-700 transition">
            🕵️‍♂️ Kdo to řekl: Novák, Kafka nebo Čapek?
          </a>
          <div className="px-6 py-3 bg-gray-200 text-gray-600 rounded-2xl shadow italic">
            📦 Další hry připravujeme...
          </div>
        </div>
      </div>

      {/* Návrat */}
      <div className="flex gap-4 flex-wrap justify-center mt-8">
        <a href="/" className="px-6 py-3 bg-gray-300 text-gray-800 rounded-2xl shadow hover:bg-gray-400 transition">
          ⬅️ Zpět na hlavní stránku
        </a>
      </div>
    </main>
  );
}
