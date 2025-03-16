import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./checkin.db");


export async function POST(req) {
  const { userId, action } = await req.json();

  if (action === 'check-in') {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO check_ins (user_id, action) VALUES (?, ?)',
        [userId, 'check-in'],
        function (err) {
          if (err) {
            reject(new Response(JSON.stringify({ message: 'Error checking in' }), { status: 500 }));
          }
          resolve(new Response(JSON.stringify({ message: 'Check-in successful', id: this.lastID }), { status: 200 }));
        }
      );
    });
  } else {
    return new Response(JSON.stringify({ message: 'Invalid action' }), { status: 400 });
  }
}