import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import teamApi from "../../Api/teamApi";
import Card from "../../Components/UI/Card.jsx";
import Button from "../../Components/UI/Button.jsx";
import Loader from "../../Components/UI/Loader.jsx";
import {
  UsersIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  PlusIcon,
  ArrowRightIcon,
  FireIcon
} from "@heroicons/react/24/outline";

export default function LeaderDashboard() {
  const { data } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await teamApi.ViewMyTeams();
      setTeams(response.data || []);
    } catch (error) {
      console.error("Failed to fetch teams", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: "Active Project Teams", value: teams.length.toString(), icon: ChartBarIcon, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Collaborators", value: teams.reduce((acc, t) => acc + (t.members?.length || 0), 0).toString(), icon: UsersIcon, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Milestones", value: "8", icon: FireIcon, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  if (loading && teams.length === 0) return <div className="flex h-[80vh] items-center justify-center"><Loader /></div>;

  return (
    <div className="space-y-10 animate-slideDown">
      {/* Dynamic Header */}
      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        <div className="relative p-8 md:p-12 bg-zinc-900 border border-zinc-800/50 rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] -mr-48 -mt-48 transition-colors duration-700"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-6 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                Lead Console Active
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Design. Build. <br />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Collaborate Better.</span>
              </h1>
              <p className="text-zinc-500 text-lg mt-4 max-w-lg leading-relaxed font-medium">
                Welcome, {data?.name || "Leader"}. You have {teams.length} active teams under your command.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" className="gap-2 px-8 py-4 shadow-emerald-900/40" onClick={() => navigate('/leader/create-team')}>
                <PlusIcon className="w-6 h-6" />
                Scale Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="group p-6 bg-zinc-900/30 border-zinc-800/80 hover:border-emerald-500/20 transition-all duration-500">
            <div className="flex items-start justify-between">
              <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <span className="text-[10px] text-zinc-600 font-bold uppercase">Live Stats</span>
            </div>
            <div className="mt-4">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-bold text-zinc-100 mt-1">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      {/* Enhanced Teams Grid */}
      <section className="space-y-6">
        <div className="flex justify-between items-end px-2">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
              My Workspace
              <span className="h-2 w-2 bg-emerald-500 rounded-full opacity-50"></span>
            </h2>
            <p className="text-zinc-500 text-sm mt-1">Active production environments.</p>
          </div>
          <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-emerald-400" onClick={() => navigate('/leader/teams')}>Manage All →</Button>
        </div>

        {loading ? (
          <div className="flex justify-center p-20"><Loader /></div>
        ) : teams.length === 0 ? (
          <Card className="p-20 text-center border-dashed border-zinc-800 bg-transparent flex flex-col items-center justify-center space-y-4">
            <UsersIcon className="w-12 h-12 text-zinc-800" />
            <div>
              <p className="text-zinc-400 font-bold">No active teams discovered.</p>
              <p className="text-zinc-600 text-sm">Kick off your first project by creating a team.</p>
            </div>
            <Button variant="outline" className="mt-2" onClick={() => navigate('/leader/create-team')}>Sync First Team</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {teams.map((team, idx) => (
              <Card
                key={team.teamId}
                className="group p-8 bg-zinc-900/50 border-zinc-800/50 hover:bg-zinc-900 transition-all duration-700 cursor-pointer overflow-hidden relative"
                onClick={() => navigate(`/leader/team/${team.teamId}`)}
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-emerald-500 group-hover:h-full transition-all duration-700"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-1">
                    <h5 className="text-2xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{team.teamName}</h5>
                    <p className="text-zinc-500 text-sm line-clamp-2 max-w-sm leading-relaxed">{team.description}</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-zinc-950 flex items-center justify-center text-zinc-600 border border-zinc-800 group-hover:text-emerald-500 group-hover:border-emerald-500/20 transition-all duration-500 group-hover:rotate-12">
                    <ArrowRightIcon className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-800/50">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {team.members?.slice(0, 3).map((member, i) => (
                        <div key={i} className="w-9 h-9 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center text-xs text-zinc-500 font-bold overflow-hidden ring-2 ring-transparent group-hover:ring-emerald-500/20 transition-all">
                          {member.profileImg ? (
                            <img src={`data:image/png;base64,${member.profileImg}`} alt="" className="w-full h-full object-cover" />
                          ) : (
                            member.userName?.charAt(0).toUpperCase() || 'U'
                          )}
                        </div>
                      ))}
                      {(team.members?.length > 3) && (
                        <div className="w-9 h-9 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400 font-bold z-10">
                          +{team.members.length - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-zinc-500 font-medium">
                      <span className="text-zinc-300 font-bold">{team.members?.length || 0}</span> / {team.memberLimit} Contributors
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-zinc-800 text-[10px] text-zinc-500 font-bold rounded uppercase tracking-widest">Team {idx + 1}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
