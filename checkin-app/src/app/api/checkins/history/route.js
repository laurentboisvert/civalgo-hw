import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./checkin.db');

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
        reject(
          new Response('Error fetching historical check-ins', { status: 500 }),
        );
        return;
      }
      resolve(new Response(JSON.stringify(rows), { status: 200 }));
    });
  });
}
