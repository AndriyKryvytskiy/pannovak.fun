import { useState, useEffect } from "react";
import Image from "next/image";

const words = [
  { word: "slon", hint: "Самое большое сухопутное животное" },
  { word: "kocka", hint: "Любимое животное в доме" },
  { word: "pes", hint: "Лучший друг человека" },
];

function TarotCard({ tries, maxTries }) {
  const opacity = tries / maxTries;
  return (
    <div className="relative w-48 h-80 mb-6">
      <Image
        src="/images/hanged_man_tarot.png"
        alt="The Hanged Man Tarot"
        fill
        style={{ objectFit: "contain", opacity }}
      />
    </div>
  );
}

export default function Hangman() {
  const [selectedWord, setSelectedWord] = useState("");
  const [hint, setHint] = useState("");
  const [wordCompletion, setWordCompletion] = useState("");
  const [tries, setTries] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [gameStatus, setGameStatus] = useState("choose");
  const [maxTries, setMaxTries] = useState(6);

  useEffect(() => {
    if (gameStatus === "playing") {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSelectedWord(randomWord.word);
      setHint(randomWord.hint);
      setWordCompletion("_".repeat(randomWord.word.length));
      setTries(0);
      setGuessedLetters([]);
    }
  }, [gameStatus]);

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
    setGameStatus("choose");
  };

  const startGame = (level) => {
    setMaxTries(level === "easy" ? 8 : 6);
    setGameStatus("playing");
  };

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Věšák Taro (Висельник)</h1>

      {gameStatus === "choose" && (
        <div className="text-center">
          <p className="mb-4 text-lg">Выберите уровень сложности:</p>
          <div className="flex gap-4">
            <button
              onClick={() => startGame("easy")}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Простой (8 попыток)
            </button>
            <button
              onClick={() => startGame("hard")}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Сложный (6 попыток)
            </button>
          </div>
        </div>
      )}

      {gameStatus !== "choose" && (
        <>
          <TarotCard tries={tries} maxTries={maxTries} />
          <p className="text-lg mb-2">Подсказка: {hint}</p>
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
                className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
              >
                Начать заново
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
