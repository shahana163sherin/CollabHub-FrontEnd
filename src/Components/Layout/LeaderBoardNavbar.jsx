import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  BellIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { logoutApi } from "../../Api/authApi";
import { toast } from "react-hot-toast";

export default function LeaderBoardNavbar() {
  const [openNotifications, setOpenNotifications] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { data } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const token = localStorage.getItem("token");
      await logoutApi(token);
      localStorage.clear();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="h-20 px-6 flex items-center justify-between bg-zinc-950/50 backdrop-blur-md border-b border-zinc-800/50 sticky top-0 z-40">
      {/* Search/Context Section */}
      <div className="flex-1 max-w-xl hidden md:block">
        <div className="relative group">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
          <input
            type="text"
            placeholder="Search teams, tasks or members..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
          />
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-4 ml-auto">
        <Link
          to="/leader/create-team"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all shadow-lg shadow-emerald-900/20 text-sm font-semibold"
        >
          <PlusIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Create Team</span>
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setOpenNotifications(!openNotifications)}
            className="p-2.5 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900 rounded-xl border border-transparent hover:border-zinc-800 transition-all relative"
          >
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-zinc-950"></span>
          </button>

          {openNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-slideDown">
              <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
                <span className="font-bold text-zinc-100">Notifications</span>
                <span className="text-xs text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">3 NEW</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-4 hover:bg-zinc-800/50 border-b border-zinc-800/20 cursor-pointer transition-colors">
                  <p className="text-sm text-zinc-200 font-medium">New member request</p>
                  <p className="text-xs text-zinc-500 mt-1">John Doe wants to join Team Alpha</p>
                </div>
              </div>
              <div className="p-3 text-center bg-zinc-950/50">
                <button className="text-xs text-emerald-500 font-bold hover:text-emerald-400">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-zinc-800 mx-2"></div>

        {/* User Profile Dropdown Placeholder / Direct Info */}
        <div className="flex items-center gap-3 group px-2 py-1.5 rounded-xl hover:bg-zinc-900 cursor-pointer transition-all border border-transparent hover:border-zinc-800">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-zinc-100">{data?.name || 'Team Leader'}</p>
            <p className="text-[10px] text-zinc-500 leading-none mt-0.5">Administrator</p>
          </div>
          {data?.profileImage ? (
            <img
              src={`data:image/png;base64,${data.profileImage}`}
              className="w-10 h-10 rounded-full border-2 border-emerald-500/20"
              alt="Profile"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
              <UserCircleIcon className="w-6 h-6" />
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="p-2.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all"
          title="Logout"
        >
          <ArrowRightOnRectangleIcon className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
