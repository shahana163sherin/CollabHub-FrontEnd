import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import teamApi from '../../Api/teamApi';
import Card from '../../Components/UI/Card';
import Button from '../../Components/UI/Button';
import Loader from '../../Components/UI/Loader';
import { toast } from 'react-hot-toast';
import {
    DocumentDuplicateIcon,
    UserMinusIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    ClipboardDocumentListIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';

export default function TeamDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetchTeamDetails();
    }, [id]);

    const fetchTeamDetails = async () => {
        try {
            const response = await teamApi.ViewTeamById(id);
            setTeam(response.data.data);
            const memberResponse = await teamApi.GetTeamMembers({ teamId: id });
            setMembers(memberResponse.data.data || []);
        } catch (error) {
            toast.error('Failed to load team details');
            navigate('/leaderdashboard');
        } finally {
            setLoading(false);
        }
    };

    const copyInviteLink = () => {
        if (team?.inviteLink) {
            // Using the user-requested prefix
            const link = `http://colabhub.link/join-team/${team.inviteLink}`;
            navigator.clipboard.writeText(link);
            toast.success('Invite link copied to clipboard!');
        }
    };

    const handleMemberAction = async (memberId, action) => {
        try {
            if (action === 'remove') {
                await teamApi.RemoveMember(id, memberId);
                toast.success('Member removed');
            } else {
                await teamApi.ApproveOrRejectMember({
                    memberId,
                    action: action === 'approve' ? 1 : 2
                });
                toast.success(`Member ${action}d`);
            }
            fetchTeamDetails();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Action failed');
        }
    };

    const handleDeleteTeam = async () => {
        if (!window.confirm(`Are you sure you want to delete ${team.teamName}? This action cannot be undone.`)) return;
        try {
            await teamApi.RemoveTeam(id);
            toast.success('Team deleted successfully');
            navigate('/leaderdashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Delete failed');
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader /></div>;
    if (!team) return null;

    return (
        <div className="space-y-8 animate-slideDown">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/leaderdashboard')} className="p-2 hover:bg-zinc-900 rounded-xl text-zinc-400 transition-all">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-zinc-100">{team.teamName}</h1>
                    <p className="text-zinc-500 text-sm mt-1">{team.description}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="ghost" className="text-red-500 hover:bg-red-500/5 gap-2 border border-transparent hover:border-red-500/20" onClick={handleDeleteTeam}>
                        <UserMinusIcon className="w-5 h-5" />
                        Delete Team
                    </Button>
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Active Team</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Team Stats & Members */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Invite Section */}
                    <Card className="p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 border-emerald-500/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors"></div>
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                                    <ShieldCheckIcon className="w-5 h-5 text-emerald-500" />
                                    Team Access
                                </h3>
                                <p className="text-zinc-500 text-sm mt-1">Share this link with your teammates to join.</p>
                            </div>
                            <div className="flex items-center gap-3 bg-zinc-950 p-2 pl-4 rounded-xl border border-zinc-800">
                                <code className="text-emerald-400 font-mono text-sm">colabhub.link/{team.inviteLink?.substring(0, 8)}...</code>
                                <Button variant="primary" size="sm" className="gap-2" onClick={copyInviteLink}>
                                    <DocumentDuplicateIcon className="w-4 h-4" />
                                    Copy Link
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Members List */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                                <UserGroupIcon className="w-6 h-6 text-zinc-500" />
                                Team Members
                            </h2>
                            <span className="text-xs font-bold text-zinc-500 bg-zinc-900 px-2 py-1 rounded-md">
                                {members.length} / {team.memberLimit} Capacity
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {members.length === 0 ? (
                                <p className="col-span-full text-zinc-600 italic py-8 text-center border border-dashed border-zinc-800 rounded-2xl">
                                    No members have joined yet.
                                </p>
                            ) : (
                                members.map((member) => (
                                    <Card key={member.userId} className="p-4 flex items-center justify-between hover:bg-zinc-900/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center">
                                                {member.profileImg ? (
                                                    <img src={`data:image/png;base64,${member.profileImg}`} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-zinc-500 font-bold">{member.userName.charAt(0)}</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-zinc-100 font-medium text-sm">{member.userName}</p>
                                                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">
                                                    {member.role === 1 ? 'Leader' : 'Contributor'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {member.status === 0 && ( // Assuming 0 is Pending
                                                <>
                                                    <Button size="icon" variant="ghost" className="text-emerald-500 hover:bg-emerald-500/10" onClick={() => handleMemberAction(member.userId, 'approve')}>
                                                        <ShieldCheckIcon className="w-5 h-5" />
                                                    </Button>
                                                </>
                                            )}
                                            {member.role !== 1 && (
                                                <Button size="icon" variant="ghost" className="text-red-500/40 hover:text-red-500 hover:bg-red-500/5" onClick={() => handleMemberAction(member.userId, 'remove')}>
                                                    <UserMinusIcon className="w-5 h-5" />
                                                </Button>
                                            )}
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    </section>
                </div>

                {/* Right: Task Shortcuts */}
                <div className="space-y-6">
                    <Card className="p-8 flex flex-col items-center justify-center text-center space-y-6 border-zinc-800 bg-zinc-900/30">
                        <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center text-zinc-700 border border-zinc-800">
                            <ClipboardDocumentListIcon className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-zinc-100">Task Orchestration</h3>
                            <p className="text-zinc-500 text-xs mt-2 leading-relaxed">
                                Define project milestones and assign specific tasks to your team members.
                            </p>
                        </div>
                        <Button variant="outline" className="w-full" onClick={() => navigate('/leader/tasks')}>
                            Go to Task Board
                        </Button>
                    </Card>

                    <Card className="p-6 border-zinc-800 bg-transparent">
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Quick Stats</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-sm text-zinc-400">Completion</span>
                                <span className="text-lg font-bold text-zinc-100">0%</span>
                            </div>
                            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-0 transition-all duration-1000"></div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
