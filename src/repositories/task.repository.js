const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../tasks.db');
const db = new Database(dbPath);

// Create table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT 0
  )
`).run();

// Seed 3 example tasks if the table is empty
const count = db.prepare('SELECT COUNT(*) AS count FROM tasks').get().count;
if (count === 0) {
  const insert = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
  insert.run('Buy milk', 0);
  insert.run('Walk the dog', 1);
  insert.run('Complete Assignment 2', 0);
}

class TaskRepository {
  findAll() {
    const rows = db.prepare('SELECT id, title, done FROM tasks').all();
    return rows.map(t => ({ ...t, done: Boolean(t.done) }));
  }

  findById(id) {
    const task = db.prepare('SELECT id, title, done FROM tasks WHERE id = ?').get(id);
    if (!task) return null;
    return { ...task, done: Boolean(task.done) };
  }

  create(title) {
    const stmt = db.prepare('INSERT INTO tasks (title, done) VALUES (?, 0)');
    const info = stmt.run(title);
    return { id: Number(info.lastInsertRowid), title, done: false };
  }

  update(id, title, done) {
    const existing = this.findById(id);
    if (!existing) return null;

    const newTitle = title !== undefined ? title : existing.title;
    const newDone = done !== undefined ? (done ? 1 : 0) : existing.done;

    db.prepare('UPDATE tasks SET title = ?, done = ? WHERE id = ?').run(newTitle, newDone, id);
    return this.findById(id);
  }

  delete(id) {
    const info = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
    return info.changes > 0;
  }
}

module.exports = new TaskRepository();