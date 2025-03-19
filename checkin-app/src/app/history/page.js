'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';


export default function History() {
    const [checkIns, setCheckIns] = useState([])
    const { user } = useAuth()

    useEffect(() => {

        const fetchCheckIns = async () => {
            const response = await fetch("/api/checkin");
            const data = await response.json();
            if (response.ok) {
                setCheckIns(data)
            } else {
                console.error(`Failed to fetch historical check-ins`)
            }
        }

        fetchCheckIns();
    }, [])

    // TODO make "Unauthorized screen"
    if (user?.role !== "supervisor") {
        return (
            <div className="flex h-screen items-center">
                <div className="m-auto gap-6 grid">
                    <h1 className="my-8 flex-row text-2xl font-bold">Unauthorized...Supervisors only!</h1>
                    <a href="/checkin" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Log in here</a>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col max-w-4xl mx-auto p-8">
       <h1 className="my-8 flex-row text-2xl font-bold">Historical data</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Site ID</th>
            <th>Check-in time</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO problem with similar keys */}
          {checkIns.length > 0 ? (
            checkIns.map((checkin) => (
              <tr key={checkin.checkinid}>
                <td key={`checkin-${checkin.username}`}>{checkin.username}</td>
                <td key={`checkin-${checkin.side_id}`}>{checkin.site_id}</td>
                <td key={`checkintime-${checkin.timestamp}`}>{checkin.timestamp}</td>
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
    )
}