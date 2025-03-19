'use client'

import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/navigation"

import { BaseFormPage } from "../components/nav";

export default function CheckIn() {
  const [status, setStatus] = useState(null);
  const [username, setUsername] = useState("")
  const [siteID, setSiteID] = useState(1234)

  const { user, login, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setStatus(null);
  }, [router.pathname]);


  const handleCheckIn = async () => {
    const action = "check-in";

    if (username == "" || !siteID) {
      setStatus("Error: Please enter username and site ID")
      return
    }

    const response = await fetch("/api/checkin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, action, siteID }),
    });

    const data = await response.json();
    if (response.ok) {
      setStatus("Check-in successful!");

      const userData = { username, siteID, role: data.role };
      console.log(`role is ${data.role}`)
      login(userData);
    } else {
      setStatus(`Error: ${data.message}`);
    }
  };

  const handleCheckout = async () => {

    const action = "check-out"
    const response = await fetch("/api/checkin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, action, siteID: user.siteID }),
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
      <BaseFormPage>
        <h1 className="flex-row text-2xl font-bold">Worker Check-In</h1>
        <div>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Username" required />
        </div>
        <div>
          <input type="text" value={siteID} onChange={(e) => setSiteID(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Site ID (default 1234)" required />
        </div>
        <button onClick={handleCheckIn} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Check-in</button>
        {status && <p>{status}</p>}
      </BaseFormPage>
    )
  }

  return (
    <BaseFormPage>
      <h1 className="flex-row text-2xl font-bold">You are logged in as {user.username}</h1>
      <h2>Role: {user.role}</h2>
      <button
        onClick={handleCheckout}
        type="submit"
        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
      >
        Check-out
      </button>
    </BaseFormPage>
  )
}
