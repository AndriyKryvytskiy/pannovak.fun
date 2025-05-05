import re
import stanza
from collections import Counter

# === Шаг 1. Подсчёт частот ===
with open('kniha_pan_novak.md', 'r', encoding='utf-8') as f:
    text = f.read().lower()

words = re.findall(r'\b[\wěščřžýáíéúůóďťň\-]+\b', text)
clean_words = [w for w in words if len(w) >= 3 and w.isalpha()]

freq_counter = Counter(clean_words)
top_words = freq_counter.most_common(50)

# === Шаг 2. Анализ через Stanza ===
stanza.download('cs')  # первый запуск
nlp = stanza.Pipeline(lang='cs', processors='tokenize,mwt,pos,lemma')

results = []

for word, freq in top_words:
    doc = nlp(word)
    lemma = doc.sentences[0].words[0].lemma
    upos = doc.sentences[0].words[0].upos
    results.append((word, freq, lemma, upos))

# === Шаг 3. Запись результатов ===
with open('words_analysis.txt', 'w', encoding='utf-8') as f:
    f.write("word | frequency | lemma | upos\n")
    f.write("-" * 40 + "\n")
    for word, freq, lemma, upos in results:
        f.write(f"{word} | {freq} | {lemma} | {upos}\n")

print("✅ Анализ завершён. Сохранено в 'words_analysis.txt'")
