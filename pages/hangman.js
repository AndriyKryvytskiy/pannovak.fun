import { useState, useEffect } from "react";

const words = [
  { word: "slon", hint: "Самое большое сухопутное животное" },
  { word: "kocka", hint: "Любимое животное в доме" },
  { word: "pes", hint: "Лучший друг человека" },
];

function HangmanDrawing({ tries }) {
  return (
    <div className="relative w-32 h-64 mx-auto">
      {/* Основание */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-black" />
      {/* Стойка */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-full bg-black" />
      {/* Перекладина */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-black" />
      {/* Верёвка */}
      <div className="absolute top-0 left-[calc(50%+5.5rem)] w-2 h-10 bg-black" />

      {/* Голова */}
      {tries > 0 && (
        <div className="absolute top-10 left-[calc(50%+5rem)] w-8 h-8 border-2 border-black rounded-full" />
      )}
      {/* Туловище */}
      {tries > 1 && (
        <div className="absolute top-18 left-[calc(50%+5.75rem)] w-1 h-12 bg-black" />
      )}
      {/* Левая рука */}
      {tries > 2 && (
        <div className="absolute top-20 left-[calc(50%+5.75rem)] w-12 h-1 bg-black rotate-[-45deg] origin-left" />
      )}
      {/* Правая рука */}
      {tries > 3 && (
        <div className="absolute top-20 left-[calc(50%+5.75rem)] w-12 h-1 bg-black rotate-[45deg] origin-right" />
      )}
      {/* Левая нога */}
      {tries > 4 && (
        <div className="absolute top-28 left-[calc(50%+5.75rem)] w-10 h-1 bg-black rotate-[-45deg] origin-left" />
      )}
      {/* Правая нога */}
      {tries > 5 && (
        <div className="absolute top-28 left-[calc(50%+5.75rem)] w-10 h-1 bg-black rotate-[45deg] origin-right" />
      )}
    </div>
  );
}

export default function Hangman() {
  const maxTries = 6;

  const [selectedWord, setSelectedWord] = useState("");
  const [hint, setHint] = useState("");
  const [wordCompletion, setWordCompletion] = useState("");
  const [tries, setTries] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [gameStatus, setGameStatus] = useState("playing");

  useEffect(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSelectedWord(randomWord.word);
    setHint(randomWord.hint);
    setWordCompletion("_".repeat(randomWord.word.length));
    setTries(0);
    setGuessedLetters([]);
    setGameStatus("playing");
  }, []);

  const handleGuess = (letter) => {
    if (gameStatus !== "playing" || guessedLetters.includes(letter)) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (selectedWord.includes(letter)) {
      const updatedCompletion = selectedWord
        .split("")
        .map((l, i) => (guessedLetters.includes(l) || l === letter ? l : wordCompletion[i]))
        .join("");
      setWordCompletion(updatedCompletion);

      if (!updatedCompletion.includes("_")) {
        setGameStatus("won");
      }
    } else {
      const newTries = tries + 1;
      setTries(newTries);
      if (newTries >= maxTries) {
        setGameStatus("lost");
      }
    }
  };

  const resetGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSelectedWord(randomWord.word);
    setHint(randomWord.hint);
    setWordCompletion("_".repeat(randomWord.word.length));
    setTries(0);
    setGuessedLetters([]);
    setGameStatus("playing");
  };

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Věšák (Виселица)</h1>
      <HangmanDrawing tries={tries} />
      <p className="text-lg mb-2 mt-6">Подсказка: {hint}</p>
      <p className="text-2xl font-mono tracking-widest mb-4">{wordCompletion}</p>
      <p className="mb-2">Ошибки: {tries} / {maxTries}</p>

      <div className="grid grid-cols-8 gap-2 mb-6">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || gameStatus !== "playing"}
            className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>

      {gameStatus !== "playing" && (
        <div className="text-center">
          {gameStatus === "won" ? (
            <p className="text-green-600 text-xl font-bold">Вы угадали слово!</p>
          ) : (
            <p className="text-red-600 text-xl font-bold">Вы проиграли. Было слово: {selectedWord}</p>
          )}
          <button
            onClick={resetGame}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Сыграть ещё раз
          </button>
        </div>
      )}
    </div>
  );
}