import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./checkin.db');

export async function GET() {
  return new Promise((resolve, reject) => {
    // SQL query with LEFT JOIN to get users and their check-in status
    const query = `
      SELECT users.id as userid, users.username, check_ins.action, check_ins.site_id, check_ins.id as checkinid
      FROM users
      LEFT JOIN check_ins ON users.id = check_ins.user_id
      WHERE check_ins.action IS NULL OR check_ins.action != 'check-out'
      ORDER BY users.id;
    `;

    db.all(query, (err, rows) => {
      if (err) {
        reject(new Response(JSON.stringify({ message: 'Error fetching users' }), { status: 500 }));
      } else {
        resolve(new Response(JSON.stringify(rows), { status: 200 }));
      }
    });
  });
}
