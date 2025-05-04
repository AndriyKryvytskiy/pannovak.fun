// pages/cestina/index.js
import Link from 'next/link';

export default function CestinaPortal() {
  return (
    <main className="min-h-screen bg-yellow-50 text-gray-900 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          🧠 Čeština od pana Nováka
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Jazykový koutek plný ironie, gramatiky a hospodských moudrostí.
        </p>

        <div className="border-l-4 border-yellow-500 bg-yellow-100 p-4 mb-8 text-left">
          <p className="italic">
            „Gramatika je jako pivo – hořká na začátku, ale když ji pochopíš, nechceš už nic jiného.“
          </p>
          <p className="mt-2 text-right">– pan Novák</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/cestina/lekce" className="block bg-white border border-yellow-400 rounded-2xl p-6 shadow hover:shadow-md hover:bg-yellow-100 transition">
            <h2 className="text-xl font-semibold mb-2">📚 Přehled lekcí</h2>
            <p>Základní i pokročilé lekce češtiny s humorem.</p>
          </Link>

          <button disabled className="block bg-white border border-gray-300 rounded-2xl p-6 shadow text-gray-400 cursor-not-allowed">
            <h2 className="text-xl font-semibold mb-2">📝 Novákův seznam</h2>
            <p>Připravujeme seznam frází, výrazů a komentářů.</p>
          </button>

          <button disabled className="block bg-white border border-gray-300 rounded-2xl p-6 shadow text-gray-400 cursor-not-allowed">
            <h2 className="text-xl font-semibold mb-2">🎯 Kvízová zóna</h2>
            <p>Interaktivní testy a minihry brzy!</p>
          </button>
        </div>
      </div>
    </main>
  );
}
