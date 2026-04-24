import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import teamApi from "../../Api/teamApi";
import Card from "../../Components/UI/Card.jsx";
import Button from "../../Components/UI/Button.jsx";
import Loader from "../../Components/UI/Loader.jsx";
import { UsersIcon, ArrowRightIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function MyTeams() {
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

    if (loading) return <div className="flex h-[80vh] items-center justify-center"><Loader /></div>;

    return (
        <div className="space-y-8 animate-slideDown">
            <div className="flex justify-between items-end px-2">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100 uppercase tracking-tight">My Teams</h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage all your active project environments.</p>
                </div>
                <Button variant="primary" className="gap-2" onClick={() => navigate('/leader/create-team')}>
                    <PlusIcon className="w-5 h-5" />
                    New Team
                </Button>
            </div>

            {teams.length === 0 ? (
                <Card className="p-20 text-center border-dashed border-zinc-800 bg-transparent flex flex-col items-center justify-center space-y-4">
                    <UsersIcon className="w-12 h-12 text-zinc-800" />
                    <p className="text-zinc-500 font-medium">You haven't created any teams yet.</p>
                    <Button variant="outline" onClick={() => navigate('/leader/create-team')}>Create Your First Team</Button>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teams.map((team, idx) => (
                        <Card
                            key={team.teamId}
                            className="group p-6 bg-zinc-900/50 border-zinc-800/50 hover:bg-zinc-900 transition-all duration-500 cursor-pointer overflow-hidden relative"
                            onClick={() => navigate(`/leader/team/${team.teamId}`)}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h5 className="text-xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{team.teamName}</h5>
                                    <p className="text-zinc-500 text-sm mt-1 line-clamp-2">{team.description}</p>
                                </div>
                                <div className="h-10 w-10 rounded-xl bg-zinc-950 flex items-center justify-center text-zinc-600 border border-zinc-800 group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-all duration-300">
                                    <ArrowRightIcon className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-t border-zinc-800/50 pt-4">
                                <span className="text-xs text-zinc-500 font-medium">
                                    <span className="text-zinc-300 font-bold">{team.members?.length || 0}</span> / {team.memberLimit} Capacity
                                </span>
                                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded uppercase tracking-widest">Active</span>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
