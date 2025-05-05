import psycopg2
import os
import re

# 🔐 Подставь свой реальный пароль
DB_CONFIG = {
    "host": "db.qushffwucqihujxbwnfw.supabase.co",
    "port": 5432,
    "dbname": "postgres",
    "user": "postgres",
    "password": "Korr7383_pnovak",
    "sslmode": "require",
}


def slugify(title):
    """Преобразует название в безопасное имя файла"""
    return re.sub(r'[^a-zA-Z0-9_-]', '_', title.lower())


def export_chapters():
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()

    cur.execute("SELECT chapter_title, content_cz FROM book_chapters ORDER BY chapter_title;")
    rows = cur.fetchall()

    output_dir = "exported_chapters"
    os.makedirs(output_dir, exist_ok=True)

    for i, (title, content) in enumerate(rows, 1):
        filename = f"{i:02d}_{slugify(title)}.md"
        filepath = os.path.join(output_dir, filename)

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(f"# {title}\n\n{content.strip()}")

        print(f"✅ Сохранено: {filename}")

    cur.close()
    conn.close()


if __name__ == "__main__":
    export_chapters()
