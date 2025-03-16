'use client'

import { useState } from "react";

export default function CheckIn() {
  const [status, setStatus] = useState(null);

  const handleCheckIn = async () => {
    // Assuming we already have the worker's ID from the login session
    const userId = 1; // Replace with actual user ID from session or login response
    const action = "check-in"; // For check-in

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
      <button onClick={handleCheckIn}>Check-In</button>
      {status && <p>{status}</p>}
    </div>
  );
}
