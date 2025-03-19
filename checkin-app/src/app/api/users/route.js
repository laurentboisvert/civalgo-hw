import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./checkin.db');

export async function GET() {
  return new Promise((resolve, reject) => {
    const query = `
      WITH LatestCheckIn AS (
        SELECT u.id as userid, u.username, ci.timestamp, ci.site_id, ci.id as checkinid,
              ROW_NUMBER() OVER (PARTITION BY u.id ORDER BY ci.timestamp DESC) as row_num
        FROM users u
        JOIN check_ins ci ON u.id = ci.user_id
        WHERE ci.action = 'check-in'
      ),
      ActiveUsers AS (
        SELECT lc.userid, lc.username, lc.timestamp, lc.site_id, lc.checkinid
        FROM LatestCheckIn lc
        WHERE lc.row_num = 1
        AND NOT EXISTS (
          SELECT 1
          FROM check_ins ci2
          WHERE ci2.user_id = lc.userid
          AND ci2.timestamp > lc.timestamp
          AND ci2.action = 'check-out'
        )
      )
      SELECT * FROM ActiveUsers;
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
