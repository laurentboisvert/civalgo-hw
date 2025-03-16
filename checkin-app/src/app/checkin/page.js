'use client'

import { useState } from "react";

export default function CheckIn() {
  const [status, setStatus] = useState(null);
  const [workerName, setWorkerName] = useState("")
  const [siteID, setSiteID] = useState("")

  const handleCheckIn = async () => {
    // Assuming we already have the worker's ID from the login session
    const userId = 1; // Replace with actual user ID from session or login response
    const action = "check-in"; // For check-in

    if (workerName == "" || siteID == "") {
      setStatus("Error: Please enter worker name and site ID")
      return
    }

    const response = await fetch("/api/checkin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, action }),
    });

    const data = await response.json();
    if (response.ok) {
      setStatus("Check-in successful!");
    } else {
      setStatus(`Error: ${data.message}`);
    }
  };

  return (
    <div className="container">
      <h1>Worker Check-In</h1>
      <p><input type="text" value={workerName} onChange={(e) => setWorkerName(e.target.value)} placeholder="Worker name"/></p>
      <p><input type="text" value={siteID} onChange={(e) => setSiteID(e.target.value)} placeholder="Site ID"/></p>
      <button style={{border: "1px solid white"}} onClick={handleCheckIn}>Check-In</button>
      {status && <p>{status}</p>}
    </div>
  );
}
