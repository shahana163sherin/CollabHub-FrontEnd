import { Outlet } from "react-router-dom";
import LeaderBoardNavbar from "./LeaderBoardNavbar.jsx";
import Sidebar from "./Sidebar.jsx";

export default function LeaderLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 flex transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 ml-20 transition-all duration-300">
        <LeaderBoardNavbar />
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}