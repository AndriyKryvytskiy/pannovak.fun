import psycopg2

# 🔐 Подставь актуальные данные
DB_CONFIG = {
    "host": "db.qushffwucqihujxbwnfw.supabase.co",
    "port": 5432,
    "dbname": "postgres",
    "user": "postgres",
    "password": "Korr7383_pnovak",
    "sslmode": "require",
}

def export_all_to_one_file():
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()

    cur.execute("SELECT chapter_title, content_cz FROM book_chapters ORDER BY chapter_title;")
    rows = cur.fetchall()

    output_file = "kniha_pan_novak.md"

    with open(output_file, "w", encoding="utf-8") as f:
        for i, (title, content) in enumerate(rows, 1):
            f.write(f"# {i}. {title}\n\n")
            f.write(content.strip() + "\n\n")
            f.write("---\n\n")

    cur.close()
    conn.close()
    print(f"📘 Все главы собраны в файл: {output_file}")

if __name__ == "__main__":
    export_all_to_one_file()
