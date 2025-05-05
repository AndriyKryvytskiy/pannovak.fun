import re

# 1. Прочитать исходный файл
with open('kniha_pan_novak.md', 'r', encoding='utf-8') as file:
    text = file.read().lower()

# 2. Извлечь слова: чешские буквы + дефис (одно слово), без цифр и спецсимволов
raw_words = re.findall(r'\b[\wěščřžýáíéúůóďťň\-]+\b', text)

# 3. Фильтрация: оставить только слова из букв (чешских/латиницы), без цифр и спецсимволов
def is_clean(word):
    return word.isalpha() or all(c in 'ěščřžýáíéúůóďťňabcdefghijklmnopqrstuvwxyz' for c in word)

filtered_words = [w for w in raw_words if is_clean(w)]

# 4. Уникальные и отсортированные слова
unique_words = sorted(set(filtered_words))

# 5. Запись в файл
with open('kniha_words.txt', 'w', encoding='utf-8') as f:
    for word in unique_words:
        f.write(word + '\n')

print(f"✅ Готово! Найдено {len(unique_words)} уникальных слов (без цифр и спецсимволов).")
