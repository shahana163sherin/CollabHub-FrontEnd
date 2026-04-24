import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import taskHeadApi from '../../Api/taskHeadApi';
import teamApi from '../../Api/teamApi';
import Card from '../../Components/UI/Card';
import Button from '../../Components/UI/Button';
import Loader from '../../Components/UI/Loader';
import { toast } from 'react-hot-toast';
import { PlusIcon, CalendarIcon, FolderIcon, UserGroupIcon, PencilSquareIcon, TrashIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import TaskHeadModal from '../../Components/Tasks/TaskHeadModal';

const TaskBoard = () => {
    const [teams, setTeams] = useState([]);
    const [selectedTeamId, setSelectedTeamId] = useState('');
    const [taskHeads, setTaskHeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPhaseModalOpen, setIsPhaseModalOpen] = useState(false);
    const [editPhaseData, setEditPhaseData] = useState(null);
    const [deletePhaseId, setDeletePhaseId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTeams();
    }, []);

    useEffect(() => {
        if (selectedTeamId) {
            fetchTaskHeads();
        } else {
            setTaskHeads([]);
        }
    }, [selectedTeamId]);

    const fetchTeams = async () => {
        try {
            const response = await teamApi.ViewMyTeams();
            setTeams(response.data || []);
            if (response.data.data?.length > 0) {
                setSelectedTeamId(response.data.data[0].teamId);
            }
        } catch (error) {
            toast.error('Failed to load teams');
        } finally {
            setLoading(false);
        }
    };

    const fetchTaskHeads = async () => {
        setLoading(true);
        try {
            const response = await taskHeadApi.GetAllTaskHead({ teamId: selectedTeamId });
            setTaskHeads(response.data.data || []);
        } catch (error) {
            toast.error('Failed to load task phases');
        } finally {
            setLoading(false);
        }
    };


    if (loading && teams.length === 0) return <div className="flex h-screen items-center justify-center"><Loader /></div>;

    return (
        <div className="space-y-8 animate-slideDown">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Task Management</h1>
                    <p className="text-zinc-500 mt-1">Organize project phases and track progress across teams.</p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={selectedTeamId}
                        onChange={(e) => setSelectedTeamId(e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 text-zinc-100 px-4 py-2 rounded-xl focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                    >
                        <option value="">Select a Team</option>
                        {teams.map(team => (
                            <option key={team.teamId} value={team.teamId}>{team.teamName}</option>
                        ))}
                    </select>
                    {/* <Button variant="primary" className="flex items-center gap-2" onClick={() => setIsPhaseModalOpen(true)}> */}
                    <Button
                        variant="primary"
                        className="flex items-center gap-2"
                        onClick={() => {
                            if (!selectedTeamId) {
                                toast.error("Select a team first");
                                return;
                            }
                            setIsPhaseModalOpen(true);
                        }}
                    >
                        <PlusIcon className="w-5 h-5" />
                        New Phase
                    </Button>
                </div>
            </div>

            <TaskHeadModal
                isOpen={isPhaseModalOpen || !!editPhaseData}
                onClose={() => {
                    setIsPhaseModalOpen(false);
                    setEditPhaseData(null);
                }}
                teamId={selectedTeamId}
                onSuccess={() => {
                    fetchTaskHeads();
                    setEditPhaseData(null);
                }}
                editData={editPhaseData}
            />

            {deletePhaseId && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
                    <Card className="w-full max-w-md p-6 space-y-6 shadow-2xl border-red-500/20">
                        <div className="flex items-center gap-4 text-red-500">
                            <ExclamationTriangleIcon className="w-8 h-8" />
                            <h2 className="text-xl font-bold text-zinc-100">Confirm Deletion</h2>
                        </div>
                        <p className="text-zinc-400">Are you sure you want to delete this phase? This action cannot be undone.</p>
                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="secondary" className="flex-1" onClick={() => setDeletePhaseId(null)}>Cancel</Button>
                            <Button type="button" variant="primary" className="flex-1 bg-red-500 hover:bg-red-600 border-none text-white" disabled={loading} onClick={async () => {
                                setLoading(true);
                                try {
                                    await taskHeadApi.DeleteTask(deletePhaseId);
                                    toast.success('Phase deleted successfully');
                                    fetchTaskHeads();
                                    setDeletePhaseId(null);
                                } catch (error) {
                                    toast.error('Failed to delete phase');
                                } finally {
                                    setLoading(false);
                                }
                            }}>
                                {loading ? 'Deleting...' : 'Delete Phase'}
                            </Button>
                        </div>
                    </Card>
                </div>
            )}

            {selectedTeamId ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {taskHeads.length === 0 ? (
                        <Card className="col-span-full p-20 flex flex-col items-center justify-center text-center space-y-4 border-dashed bg-transparent border-zinc-800">
                            <div className="w-20 h-20 rounded-3xl bg-zinc-900 flex items-center justify-center text-zinc-700">
                                <FolderIcon className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-zinc-300">No Task Phases Found</h3>
                                <p className="text-zinc-500 max-w-xs mx-auto mt-2">Start by creating a new phase (e.g., Development, Design) for this team.</p>
                            </div>
                            <Button variant="outline" className="mt-4" onClick={() => {
                                if (!selectedTeamId) {
                                    toast.error("Select a team first");
                                    return;
                                }
                                setIsPhaseModalOpen(true);
                            }}>Create First Phase</Button>
                        </Card>
                    ) : (
                        taskHeads.map((head) => (
                            <Card key={head.taskHeadId} className="group hover:border-emerald-500/30 transition-all p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors uppercase tracking-tight">
                                        {head.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setEditPhaseData(head); }}
                                            className="p-1.5 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-blue-400 transition-colors"
                                            title="Edit Phase"
                                        >
                                            <PencilSquareIcon className="w-4 h-4" />
                                        </button>

                                        {/* Hide delete button if there are task definitions inside */}
                                        {!(head.taskDefinitions?.length > 0 || head.taskCount > 0) && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setDeletePhaseId(head.taskHeadId); }}
                                                className="p-1.5 hover:bg-red-500/10 rounded-md text-zinc-400 hover:text-red-400 transition-colors"
                                                title="Delete Phase"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        )}
                                        <span className="px-2 py-1 ml-2 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase hidden sm:inline-block">Active</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-zinc-400">
                                        <CalendarIcon className="w-4 h-4 text-emerald-500/50" />
                                        <span>Due: {new Date(head.dueDate).toLocaleDateString()}</span>
                                    </div>
                                    {/* Additional stats could go here */}
                                </div>

                                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        {/* Placeholder for member avatars */}
                                        <div className="w-7 h-7 rounded-full bg-zinc-800 border-2 border-zinc-950 flex items-center justify-center text-[10px] text-zinc-500 font-bold">JD</div>
                                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border-2 border-zinc-950 flex items-center justify-center text-[10px] text-emerald-500 font-bold">AS</div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-xs hover:text-emerald-400" onClick={() => navigate(`/leader/team/${selectedTeamId}/tasks/${head.taskHeadId}`)}>
                                        Manage Tasks →
                                    </Button>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            ) : (
                <div className="p-20 text-center text-zinc-600 italic">Select a team to view and manage tasks.</div>
            )}
        </div>
    );
};

export default TaskBoard;
