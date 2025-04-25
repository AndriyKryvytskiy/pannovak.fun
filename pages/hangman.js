import { useState, useEffect } from "react";

const words = [
  { word: "slon", hint: "Самое большое сухопутное животное" },
  { word: "kocka", hint: "Любимое животное в доме" },
  { word: "pes", hint: "Лучший друг человека" },
];

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
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Сыграть ещё раз
          </button>
        </div>
      )}
    </div>
  );
}
