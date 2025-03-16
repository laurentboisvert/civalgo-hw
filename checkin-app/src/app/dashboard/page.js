'use client'

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        console.error('Failed to fetch users:', data.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Site ID</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((checkin) => (
              <tr key={checkin.checkinid}>
                <td key={`username-${checkin.username}`}>{checkin.username}</td>
                <td key={`siteid-${checkin.side_id}`}>{checkin.site_id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
