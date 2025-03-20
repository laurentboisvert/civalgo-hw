'use client';

import { useAuth } from '../../context/authContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NavBar(props) {
  const { user } = useAuth();

  const router = useRouter();

  const goToCheckinPage = () => {
    router.push('/checkin');
  };

  return (
    <nav className="bg-blue-600 text-white sticky top-0 w-full z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="space-x-4 ml-auto">
            <Link href="/" className="hover:bg-blue-700 px-4 py-2 rounded">
              Home
            </Link>
            {/* Supervisor Links */}
            {user?.role === 'supervisor' && (
              <>
                <Link
                  href="/dashboard"
                  className="hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Live Dashboard
                </Link>
                <Link
                  href="/history"
                  className="hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Historical Data
                </Link>
              </>
            )}
            <Link
              href="/checkin"
              className="hover:bg-blue-700 px-4 py-2 rounded border-2 border-white"
            >
              {!user ? 'Go check-in' : 'Go check-out'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
