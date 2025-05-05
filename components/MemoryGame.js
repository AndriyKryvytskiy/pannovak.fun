'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const shuffleCards = (cards) => {
  return [...cards].sort(() => Math.random() - 0.5);
};

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novakComment, setNovakComment] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase
        .from('idioms_memory_cards')
        .select('*');

      if (error) {
        console.error('Chyba při načítání karet:', error.message);
      } else {
        setCards(shuffleCards(data));
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleClick = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    ) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const firstCard = cards[first];
      const secondCard = cards[second];

      if (
        firstCard.pair_id === secondCard.pair_id &&
        firstCard.type !== secondCard.type
      ) {
        setMatched([...matched, first, second]);
        setNovakComment('Tohle by zvládl i Tomáš!');
        setTimeout(() => setNovakComment(null), 1500);
      }

      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const restartGame = () => {
    setCards(shuffleCards(cards));
    setMatched([]);
    setFlipped([]);
    setNovakComment(null);
  };

  const isFinished = matched.length === cards.length;

  const getCardColor = (type, flipped) => {
    if (!flipped) {
      return type === 'idiom' ? 'bg-yellow-300' : 'bg-blue-300'; // рубашка
    }
    return type === 'idiom' ? 'bg-yellow-100' : 'bg-blue-100'; // открытая
  };

  if (loading) {
    return <div className="p-4 text-center text-lg">Načítání karet…</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">🧠 Memory Game: Idiomy</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-md mx-auto">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <div
              key={card.id}
              className={`h-24 sm:h-28 md:h-32 p-2 flex items-center justify-center rounded-xl shadow-md cursor-pointer text-center text-sm sm:text-base ${getCardColor(card.type, isFlipped)} transition-all duration-200`}
              onClick={() => handleClick(index)}
            >
              {isFlipped ? card.text : '🃏'}
            </div>
          );
        })}
      </div>

      {novakComment && (
        <div className="mt-4 text-center italic text-blue-800 font-medium text-sm sm:text-base">
          {novakComment}
        </div>
      )}

      {isFinished && (
        <div className="mt-6 text-center">
          <div className="text-lg sm:text-xl font-bold mb-3 text-green-600">
            🎉 Hotovo! Pan Novák je spokojený.
          </div>
          <button
            onClick={restartGame}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
          >
            Hrát znovu
          </button>
        </div>
      )}
    </div>
  );
}
