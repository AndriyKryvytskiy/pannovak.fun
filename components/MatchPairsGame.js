import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MatchPairsGame() {
  const [topic, setTopic] = useState('');
  const [availableTopics, setAvailableTopics] = useState([]);
  const [pairs, setPairs] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedQ, setSelectedQ] = useState(null);
  const [selectedA, setSelectedA] = useState(null);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    async function fetchTopics() {
      const { data, error } = await supabase
        .from('pair_games')
        .select('topic');

      if (error) {
        console.error('Chyba při načítání témat:', error);
      } else {
        const uniqueTopics = [...new Set(data.map(d => d.topic))].sort();
        setAvailableTopics(uniqueTopics);
        if (!topic && uniqueTopics.length > 0) {
          setTopic(uniqueTopics[0]);
        }
      }
    }
    fetchTopics();
  }, []);

  useEffect(() => {
    async function fetchPairs() {
      if (!topic) return;
      const { data, error } = await supabase
        .from('pair_games')
        .select('*')
        .eq('topic', topic);

      if (error) {
        console.error('Chyba při načítání dat:', error);
      } else {
        setPairs(data);
        setShuffledAnswers(shuffle(data));
        setMatched([]);
        setSelectedQ(null);
        setSelectedA(null);
      }
    }
    fetchPairs();
  }, [topic]);

  const handleQClick = (id) => setSelectedQ(id);

  const handleAClick = (id) => {
    setSelectedA(id);
    if (selectedQ === id) {
      setMatched([...matched, id]);
      setSelectedQ(null);
      setSelectedA(null);
    } else {
      setTimeout(() => {
        setSelectedQ(null);
        setSelectedA(null);
      }, 800);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-center">Spoj oficiální frázi a Jak to slyší pan Novák</h2>

      <div className="text-center">
        <label className="mr-2 font-semibold">Zvolte téma:</label>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 shadow"
        >
          {availableTopics.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="mb-2 font-semibold">Oficiální fráze</h3>
          {pairs.map(pair => (
            <div
              key={pair.id}
              className={`p-2 mb-2 rounded cursor-pointer border ${selectedQ === pair.id ? 'bg-yellow-200' : matched.includes(pair.id) ? 'bg-green-200' : 'bg-white'}`}
              onClick={() => handleQClick(pair.id)}
            >
              {pair.question}
            </div>
          ))}
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Jak to slyší pan Novák</h3>
          {shuffledAnswers.map(pair => (
            <div
              key={pair.id}
              className={`p-2 mb-2 rounded cursor-pointer border ${selectedA === pair.id ? 'bg-yellow-200' : matched.includes(pair.id) ? 'bg-green-200' : 'bg-white'}`}
              onClick={() => handleAClick(pair.id)}
            >
              {pair.answer}
            </div>
          ))}
        </div>
      </div>

      {matched.length === pairs.length && pairs.length > 0 && (
        <div className="mt-4 p-4 bg-green-100 rounded shadow text-center">
          🎉 Všechny páry spojeny! Pan Novák by byl hrdý.
        </div>
      )}

      <div className="text-center mt-6">
        <a href="/hry" className="inline-block px-6 py-2 bg-gray-300 text-gray-800 rounded-xl shadow hover:bg-gray-400 transition">
          ⬅️ Zpět na herní portál
        </a>
      </div>
    </div>
  );
}
