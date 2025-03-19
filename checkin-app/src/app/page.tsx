export default function Home() {
  return (
    <div className="flex h-screen items-center">
      
      <div className="m-auto">
        <h1 className="flex-row text-3xl font-bold">Welcome to the Check-in App</h1>
        <p className="my-4">Web-based system where...</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Workers check in and out when they arrive and leave</li>
          <li>The Supervisors see a live dashboard of currently on-site workers</li>
          <li>Check-in/out events are recorded for future reference</li>
        </ol>
      </div>
    </div>
  );
}