import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./checkin.db");

export async function POST(req) {
  const { username, action, siteID } = await req.json();

  if (action === 'check-in') {
    // Needs to check credentials first (password)
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO check_ins (username, action, site_id) VALUES (?, ?, ?)',
        [username, 'check-in', siteID],
        function (err) {
          if (err) {
            reject(new Response(JSON.stringify({ message: 'Error checking in' }), { status: 500 }));
          }

          // After inserting check-in, query the user's role from the `users` table
          db.get(
            'SELECT role FROM users WHERE username = ?', 
            [username],
            (err, row) => {
              if (err || !row) {
                reject(new Response(JSON.stringify({ message: 'Error retrieving user role' }), { status: 500 }));
              }

              // Successful response with both check-in id and user role
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
          }
          resolve(new Response(JSON.stringify({ message: 'Check-out successful' }), { status: 200 }));
        }
      );
    });
  }

  return new Response(JSON.stringify({ message: 'Invalid action' }), { status: 400 });
}

export async function GET() {
  const query = `
      SELECT c.id, c.timestamp, c.site_id, c.action, u.username 
      FROM check_ins c
      JOIN users u ON u.username = c.username
      ORDER BY c.timestamp DESC
    `;
  
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(new Response(`Error fetching historical check-ins`, { status: 500 }));
      }
      resolve(new Response(JSON.stringify(rows), { status: 200 }));
    });
  });
}
