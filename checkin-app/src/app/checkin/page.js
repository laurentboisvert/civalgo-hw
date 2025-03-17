'use client'

import { useState } from "react";
import { useAuth } from "../../context/authContext"; 

export default function CheckIn() {
  const [status, setStatus] = useState(null);
  const [workerName, setWorkerName] = useState("")
  const [siteID, setSiteID] = useState("")

  const {user, login, logout} = useAuth()

  const handleCheckIn = async () => {
    const userId = 1;
    const action = "check-in";

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

      const userData = { id: userId, name: workerName, siteID, role: data.role };
      console.log(`role is ${data.role}`)
      login(userData);
    } else {
      setStatus(`Error: ${data.message}`);
    }
  };

  const handleCheckout = async () => {
    const action = "check-out"
    const userId = 1
    const response = await fetch("/api/checkin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId, action }),
    })

    if (response.ok) {
      setStatus("Check-out succesful!")
      logout()
    } else {
      setStatus(`Error: ${response.message}`)
    }

  }

  if (!user) {
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

  return (
    <div className="container">
      <h1>You are logged in</h1>
      <button type="button" value={"Logout"} onClick={handleCheckout}>Check-out</button>
    </div>
  )
}
