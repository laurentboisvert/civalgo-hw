'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';

export default function History() {
  const [checkIns, setCheckIns] = useState([]);
  const [filteredCheckIns, setFilteredCheckIns] = useState([]);
  const { user } = useAuth();

  // Filter states
  const [usernameFilter, setUsernameFilter] = useState('');
  const [timestampFilter, setTimestampFilter] = useState('');
  const [siteIdFilter, setSiteIdFilter] = useState('');

  useEffect(() => {
    const fetchCheckIns = async () => {
      const response = await fetch("/api/checkins/history");
      const data = await response.json();
      if (response.ok) {
        setCheckIns(data);
        setFilteredCheckIns(data); // Initialize filtered data
      } else {
        console.error('Failed to fetch historical check-ins');
      }
    };

    fetchCheckIns();
  }, []);

  useEffect(() => {
    // Apply filters on the check-ins data
    const filtered = checkIns.filter((checkin) => {
      return (
        (usernameFilter ? checkin.username.toLowerCase().includes(usernameFilter.toLowerCase()) : true) &&
        (timestampFilter ? checkin.timestamp.includes(timestampFilter) : true) &&
        (siteIdFilter ? checkin.site_id.toString().includes(siteIdFilter) : true)
      );
    });
    setFilteredCheckIns(filtered);
  }, [usernameFilter, timestampFilter, siteIdFilter, checkIns]);

  if (user?.role !== "supervisor") {
    return (
      <div className="flex h-screen items-center">
        <div className="m-auto gap-6 grid">
          <h1 className="my-8 flex-row text-2xl font-bold">Unauthorized...Supervisors only!</h1>
          <a href="/checkin" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Log in here</a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-4xl mx-auto p-8">
      <h1 className="my-8 flex-row text-2xl font-bold">Historical data</h1>
      
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by Username"
          value={usernameFilter}
          onChange={(e) => setUsernameFilter(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Filter by Site ID"
          value={siteIdFilter}
          onChange={(e) => setSiteIdFilter(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Filter by Timestamp"
          value={timestampFilter}
          onChange={(e) => setTimestampFilter(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Site ID</th>
            <th>Timestamp</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCheckIns.length > 0 ? (
            filteredCheckIns.map((checkin) => (
              <tr key={`checkin-${checkin.id}`}>
                <td>{checkin.username}</td>
                <td>{checkin.site_id}</td>
                <td>{checkin.timestamp}</td>
                <td>{checkin.action}</td>
              </tr>
            ))
          ) : (
            <tr key="noentries">
              <td colSpan="4">No entries found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
