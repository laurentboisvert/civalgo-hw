const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./checkin.db');

db.serialize(() => {
  console.log('Creating DB...');
  db.run(`
    CREATE TABLE users (
      username TEXT PRIMARY KEY,  -- Changed from id INTEGER PRIMARY KEY AUTOINCREMENT
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('worker', 'supervisor')) NOT NULL
    );
  `);

  db.run(`
    CREATE TABLE check_ins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,  -- Changed from user_id INTEGER
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      action TEXT CHECK(action IN ('check-in', 'check-out')) NOT NULL,
      site_id INTEGER,
      FOREIGN KEY (username) REFERENCES users(username)  -- Reference to username instead of id
    );
  `);

  db.run(`
    INSERT INTO users (username, password, role) VALUES
    ('worker1', 'password123', 'worker'),
    ('supervisor1', 'password123', 'supervisor');
  `);

  console.log('DB setup complete!');
});

db.close();
