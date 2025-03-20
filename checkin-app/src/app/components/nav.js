'use client'

import { useAuth } from "../../context/authContext";
import { useRouter } from "next/navigation"

export const BaseFormPage = ({ children }) => {
    return (
        <div className="flex h-screen items-center">
            <div className="m-auto gap-6 grid">
                {children}
            </div>
        </div>
    )
}

export default function NavBar(props) {
    const { user } = useAuth();

    const router = useRouter();

    const goToCheckinPage = () => {
        router.push("/checkin")
    };

    return (
        <nav className="bg-blue-600 text-white sticky top-0 w-full z-10 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="space-x-4 ml-auto">
                        <a href="/" className="hover:bg-blue-700 px-4 py-2 rounded">Home</a>
                        {/* Supervisor Links */}
                        {user?.role === "supervisor" && (
                            <>
                                <a href="/dashboard" className="hover:bg-blue-700 px-4 py-2 rounded">Live Dashboard</a>
                                <a href="/history" className="hover:bg-blue-700 px-4 py-2 rounded">Historical Data</a>
                            </>
                        )}
                        {!user ? (
                            <a href="/checkin" className="hover:bg-blue-700 px-4 py-2 rounded border-2 border-white">Check-in</a>
                        ) : (
                            <button
                                onClick={goToCheckinPage}
                                className="hover:bg-blue-700 px-4 py-2 rounded border-2 border-white"
                            >
                                Go to check-out
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
