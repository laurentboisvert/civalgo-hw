import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./checkin.db");


export async function POST(req) {
  const { userId, action } = await req.json();
  const testSiteID = 1234;

  if (action === 'check-in') {

    // Needs to check credentials first (password)
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO check_ins (user_id, action, site_id) VALUES (?, ?, ?)',
        [userId, 'check-in', testSiteID],
        function (err) {
          if (err) {
            reject(new Response(JSON.stringify({ message: 'Error checking in' }), { status: 500 }));
          }
          resolve(new Response(JSON.stringify({ message: 'Check-in successful', id: this.lastID }), { status: 200 }));
        }
      );
    });
  }

  if (action === "check-out") {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO check_ins (user_id, action, site_id) VALUES (?, ?, ?)',
        [userId, 'check-out', testSiteID],
        function (err) {
          if (err) {
            reject(new Response(JSON.stringify({ message: 'Error checking out' }), { status: 500 }));
          }
          resolve(new Response(JSON.stringify({ message: 'Check-out successful' }), { status: 200 }))
        }
      )
    })
  }
  
  return new Response(JSON.stringify({ message: 'Invalid action' }), { status: 400 });

}