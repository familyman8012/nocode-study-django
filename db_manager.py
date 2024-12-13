import sqlite3
import pandas as pd
from datetime import datetime

class TodoDB:
    def __init__(self, db_name="todo.db"):
        self.db_name = db_name
        self.init_db()

    def init_db(self):
        conn = sqlite3.connect(self.db_name)
        c = conn.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS todos
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
             task TEXT NOT NULL,
             due_date DATE,
             priority TEXT,
             status TEXT,
             created_at TIMESTAMP)
        ''')
        conn.commit()
        conn.close()

    def add_todo(self, task, due_date, priority):
        conn = sqlite3.connect(self.db_name)
        c = conn.cursor()
        c.execute('''
            INSERT INTO todos (task, due_date, priority, status, created_at)
            VALUES (?, ?, ?, ?, ?)
        ''', (task, due_date, priority, 'Pending', datetime.now().strftime("%Y-%m-%d %H:%M:%S")))
        conn.commit()
        conn.close()

    def get_todos(self):
        conn = sqlite3.connect(self.db_name)
        df = pd.read_sql_query("SELECT * FROM todos", conn)
        conn.close()
        return df

    def update_status(self, todo_id, new_status):
        conn = sqlite3.connect(self.db_name)
        c = conn.cursor()
        c.execute('''
            UPDATE todos
            SET status = ?
            WHERE id = ?
        ''', (new_status, todo_id))
        conn.commit()
        conn.close()

    def delete_todo(self, todo_id):
        conn = sqlite3.connect(self.db_name)
        c = conn.cursor()
        c.execute('DELETE FROM todos WHERE id = ?', (todo_id,))
        conn.commit()
        conn.close()
