import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const czechAlphabet = [
  "A", "B", "C", "Č", "D", "Ď", "E", "É", "Ě", "F", "G", "H", "CH",
  "I", "Í", "J", "K", "L", "M", "N", "Ň", "O", "Ó", "P", "Q", "R", "Ř", "S",
  "Š", "T", "Ť", "U", "Ú", "Ů", "V", "W", "X", "Y", "Ý", "Z", "Ž"
];

const englishAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Hangman() {
  const [categories, setCategories] = useState([]);
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState("");
  const [hint, setHint] = useState("");
  const [languageGuess, setLanguageGuess] = useState("cz");
  const [languageHint, setLanguageHint] = useState("cz");
  const [chosenCategory, setChosenCategory] = useState(null);
  const [wordCompletion, setWordCompletion] = useState("");
  const [tries, setTries] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [gameStatus, setGameStatus] = useState("loading");
  const [maxTries, setMaxTries] = useState(6);
  const [motivationalQuote, setMotivationalQuote] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const { data, error } = await supabase.from("categories").select("*");
    if (data) {
      setCategories(data);
      setGameStatus("choose");
    }
  }

  async function fetchWords(categoryId) {
    const { data, error } = await supabase
      .from("words")
      .select("*")
      .eq("category_id", categoryId);
    if (data) {
      setWords(data);
    }
  }

  async function fetchRandomQuote() {
    const { data, error } = await supabase.from("quotestaro").select("*");
    if (data && data.length > 0) {
      const random = data[Math.floor(Math.random() * data.length)];
      if (languageHint === "cz") setMotivationalQuote(random.text_cz);
      else if (languageHint === "uk") setMotivationalQuote(random.text_uk);
      else setMotivationalQuote(random.text_en);
    }
  }

  function startGame(level) {
    setMaxTries(level === "easy" ? 8 : 6);
    setTries(0);
    setGuessedLetters([]);

    if (words.length > 0) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      const word = languageGuess === "cz" ? randomWord.word_cz : randomWord.word_en;
      const hintText =
        languageHint === "cz"
          ? randomWord.hint_cz
          : languageHint === "uk"
          ? randomWord.hint_uk
          : randomWord.hint_en;

      setSelectedWord(word.toLowerCase());
      setHint(hintText);
      setWordCompletion("_".repeat(word.length));
      setGameStatus("playing");
    }
  }

  const handleLetterClick = (letter) => {
    if (gameStatus !== "playing" || guessedLetters.includes(letter)) return;
    setGuessedLetters([...guessedLetters, letter]);

    if (selectedWord.includes(letter.toLowerCase())) {
      const updatedCompletion = selectedWord
        .split("")
        .map((l, i) => (guessedLetters.includes(l) || l === letter.toLowerCase() ? l : wordCompletion[i]))
        .join("");
      setWordCompletion(updatedCompletion);

      if (!updatedCompletion.includes("_")) {
        setGameStatus("won");
      }
    } else {
      const newTries = tries + 1;
      setTries(newTries);
      if (newTries >= maxTries) {
        fetchRandomQuote();
        setGameStatus("lost");
      }
    }
  };

  const resetGame = () => {
    setSelectedWord("");
    setHint("");
    setChosenCategory(null);
    setWords([]);
    setMotivationalQuote("");
    setGameStatus("choose");
  };

  const alphabet = languageGuess === "cz" ? czechAlphabet : englishAlphabet;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 overflow-hidden">
      {gameStatus === "loading" && <p>Načítání...</p>}

      {gameStatus === "choose" && (
        <div className="z-10 bg-white p-6 rounded shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Vyberte kategorii:</h1>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setChosenCategory(cat);
                  fetchWords(cat.id);
                  setGameStatus("settings");
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                {cat.name_cz}
              </button>
            ))}
          </div>
        </div>
      )}

      {gameStatus === "settings" && (
        <div className="z-10 bg-white p-6 rounded shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4">Nastavení hry</h2>

          <div className="mb-4">
            <p>Jazyk slova:</p>
            <select
              className="border p-2"
              value={languageGuess}
              onChange={(e) => setLanguageGuess(e.target.value)}
            >
              <option value="cz">Čeština</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="mb-4">
            <p>Jazyk nápovědy:</p>
            <select
              className="border p-2"
              value={languageHint}
              onChange={(e) => setLanguageHint(e.target.value)}
            >
              <option value="cz">Čeština</option>
              <option value="uk">Українська</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button onClick={() => startGame("easy")} className="bg-green-500 text-white px-4 py-2 rounded">
              Lehká (8 pokusů)
            </button>
            <button onClick={() => startGame("hard")} className="bg-red-500 text-white px-4 py-2 rounded">
              Těžká (6 pokusů)
            </button>
          </div>
        </div>
      )}

      {(gameStatus === "playing" || gameStatus === "won" || gameStatus === "lost") && (
        <div className="z-10 text-center">
          <p className="text-lg mb-2">Nápověda: {hint}</p>
          <p className="text-2xl font-mono tracking-widest mb-4">{wordCompletion.toUpperCase()}</p>
          <p className="mb-2">Chyb: {tries} / {maxTries}</p>

          <div className="grid grid-cols-8 gap-2 mb-6">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                disabled={guessedLetters.includes(letter.toLowerCase()) || gameStatus !== "playing"}
                className={`p-2 rounded text-white ${guessedLetters.includes(letter.toLowerCase()) ? 'bg-gray-400' : 'bg-blue-500'} disabled:opacity-50`}
              >
                {letter}
              </button>
            ))}
          </div>

          {(gameStatus === "won" || gameStatus === "lost") && (
            <div className="mt-6">
              {gameStatus === "won" ? (
                <p className="text-green-600 text-xl font-bold">Správně! Slovo bylo: {selectedWord.toUpperCase()}</p>
              ) : (
                <div>
                  <p className="text-red-600 text-xl font-bold">Prohráli jste! Slovo bylo: {selectedWord.toUpperCase()}</p>
                  <p className="mt-4 italic">"{motivationalQuote}"</p>
                </div>
              )}
              <button onClick={resetGame} className="mt-4 bg-purple-500 text-white px-4 py-2 rounded">
                Začít znovu
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
