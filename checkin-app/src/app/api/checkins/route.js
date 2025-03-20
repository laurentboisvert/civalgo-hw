import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./checkin.db");

// Use to create check-in/check-out events
export async function POST(req) {
  const { username, password, action, siteID } = await req.json();

  if (action === 'check-in') {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT role FROM users WHERE username = ? AND password = ?',
        [username, password],
        (err, row) => {
          if (err) {
            reject(new Response(JSON.stringify({ message: 'Error logging in' }, { status: 500 })))
          }
          if (!row) {
            resolve(new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 }));
            return;
          }

          // Credentials validated - get user's role
          db.run(
            'INSERT INTO check_ins (username, action, site_id) VALUES (?, ?, ?)',
            [username, 'check-in', siteID],
            function (err) {
              if (err) {
                reject(new Response(JSON.stringify({ message: 'Error checking in' }), { status: 500 }));
                return;
              }

              resolve(new Response(JSON.stringify({ message: 'Check-in successful', role: row.role }), { status: 200 }));
            }
          );
        }
      );
    });
  }

  if (action === "check-out") {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO check_ins (username, action, site_id) VALUES (?, ?, ?)',
        [username, 'check-out', siteID],
        function (err) {
          if (err) {
            reject(new Response(JSON.stringify({ message: 'Error checking out' }), { status: 500 }));
            return;
          }
          resolve(new Response(JSON.stringify({ message: 'Check-out successful' }), { status: 200 }));
        }
      );
    });
  }

  return new Response(JSON.stringify({ message: 'Invalid action' }), { status: 400 });
}
