import { Link } from "react-router-dom";

export default function LeaderDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Leader Dashboard</h1>

      <div className="flex flex-col gap-3 max-w-sm">
        <Link to="/leader/profile" className="p-2 bg-blue-600 text-white rounded">
          View Profile
        </Link>
      </div>
    </div>
  );
}
