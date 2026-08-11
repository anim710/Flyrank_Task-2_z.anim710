const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(process.cwd(), 'tasks.db');
const db = new sqlite3.Database(dbPath);

// Initialize DB schema and initial data
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      done BOOLEAN NOT NULL DEFAULT 0
    )
  `);

  db.get('SELECT COUNT(*) AS count FROM tasks', (err, row) => {
    if (row && row.count === 0) {
      const stmt = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
      stmt.run('Buy milk', 0);
      stmt.run('Walk the dog', 1);
      stmt.run('Complete Assignment 2', 0);
      stmt.finalize();
    }
  });
});

class TaskRepository {
  findAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT id, title, done FROM tasks', [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows.map(t => ({ ...t, done: Boolean(t.done) })));
      });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT id, title, done FROM tasks WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        resolve({ ...row, done: Boolean(row.done) });
      });
    });
  }

  create(title) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO tasks (title, done) VALUES (?, 0)', [title], function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, title, done: false });
      });
    });
  }

  update(id, title, done) {
    return new Promise(async (resolve, reject) => {
      const existing = await this.findById(id);
      if (!existing) return resolve(null);

      const newTitle = title !== undefined ? title : existing.title;
      const newDone = done !== undefined ? (done ? 1 : 0) : (existing.done ? 1 : 0);

      db.run(
        'UPDATE tasks SET title = ?, done = ? WHERE id = ?',
        [newTitle, newDone, id],
        async (err) => {
          if (err) return reject(err);
          const updated = await this.findById(id);
          resolve(updated);
        }
      );
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
        if (err) return reject(err);
        resolve(this.changes > 0);
      });
    });
  }
}

module.exports = new TaskRepository();