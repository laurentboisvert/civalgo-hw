'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import Link from 'next/link';

export default function Dashboard() {
  const [liveWorkers, setLiveWorkers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLiveWorkers = async () => {
      const response = await fetch('/api/checkins/live');
      const data = await response.json();
      if (response.ok) {
        setLiveWorkers(data);
      } else {
        console.error('Failed to fetch users:', data.message);
      }
    };

    fetchLiveWorkers();

    // Use 10 second interval to have a "live update" effect
    const intervalId = setInterval(fetchLiveWorkers, 10000);

    // Cleanup interval on component dismount
    return () => clearInterval(intervalId);
  }, []);

  if (user?.role !== 'supervisor') {
    return (
      <div className="flex h-screen items-center">
        <div className="m-auto gap-6 grid">
          <h1 className="my-8 flex-row text-2xl font-bold">
            Unauthorized...Supervisors only!
          </h1>
          <Link
            href="/checkin"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Log in here
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-4xl mx-auto p-8">
      <h1 className="my-8 flex-row text-2xl font-bold">
        Live checked-in users List
      </h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Site ID</th>
            <th>Check-in time</th>
          </tr>
        </thead>
        <tbody>
          {liveWorkers.length > 0 ? (
            liveWorkers.map((liveWorker) => (
              <tr key={liveWorker.checkinid}>
                <td key={`username-${liveWorker.username}`}>
                  {liveWorker.username}
                </td>
                <td key={`siteid-${liveWorker.site_id}`}>
                  {liveWorker.site_id}
                </td>
                <td key={`checkintime-${liveWorker.timestamp}`}>
                  {liveWorker.timestamp}
                </td>
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
