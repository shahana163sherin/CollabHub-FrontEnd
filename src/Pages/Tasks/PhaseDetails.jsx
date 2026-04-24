import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import taskDefinitionApi from '../../Api/taskDefinitionApi';
import taskHeadApi from '../../Api/taskHeadApi';
import teamApi from '../../Api/teamApi';
import Card from '../../Components/UI/Card';
import Button from '../../Components/UI/Button';
import Loader from '../../Components/UI/Loader';
import { toast } from 'react-hot-toast';
import { PlusIcon, UserIcon, ClockIcon, CheckCircleIcon, ArrowLeftIcon, PencilSquareIcon, TrashIcon, ExclamationTriangleIcon, EyeIcon } from '@heroicons/react/24/outline';
import TaskDefinitionModal from '../../Components/Tasks/TaskDefinitionModal';
import TaskDetailModal from '../../Components/Tasks/TaskDetailModal';

const PhaseDetails = () => {
    const { teamId, taskHeadId } = useParams();
    const navigate = useNavigate();
    const [phase, setPhase] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [editTaskData, setEditTaskData] = useState(null);
    const [viewTaskId, setViewTaskId] = useState(null);
    const [deleteTaskId, setDeleteTaskId] = useState(null);

    useEffect(() => {
        fetchData();
    }, [taskHeadId]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [phaseRes, tasksRes, membersRes] = await Promise.all([
                taskHeadApi.GetTaskById(taskHeadId),
                taskDefinitionApi.GetAllTaskDefinition(taskHeadId),
                teamApi.GetTeamMembers({ teamId })
            ]);
            setPhase(phaseRes.data.data);
            setTasks(tasksRes.data.data || []);
            setTeamMembers(membersRes.data.data || []);
        } catch (error) {
            toast.error('Failed to load phase data');
            navigate('/leader/tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleAssignTask = async (taskId, memberId) => {
        try {
            await taskDefinitionApi.AssignTask(taskId, memberId);
            toast.success('Task assigned successfully!');
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Assignment failed');
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader /></div>;
    if (!phase) return null;

    return (
        <div className="space-y-8 animate-slideDown">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-900 rounded-xl text-zinc-400 transition-all">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100 uppercase tracking-tight">{phase.title}</h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage individual tasks and assignments for this phase.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Phase Info */}
                <Card className="p-6 space-y-4 h-fit border-emerald-500/10 bg-emerald-500/5">
                    <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-widest">Phase Overview</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-500">Starts</span>
                            <span className="text-zinc-200">{new Date(phase.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-500">Expected End Date</span>
                            <span className="text-zinc-200">{new Date(phase.extendedTo).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm border-t border-zinc-800 pt-3">
                            <span className="text-zinc-500 font-bold uppercase text-[10px]">Hard Deadline</span>
                            <span className="text-red-400 font-bold">{new Date(phase.dueDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                </Card>

                {/* Tasks List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-zinc-100">{tasks.length} Tasks Defined</h2>
                        <Button variant="primary" size="sm" className="gap-2" onClick={() => setIsTaskModalOpen(true)}>
                            <PlusIcon className="w-4 h-4" />
                            Add Task
                        </Button>
                    </div>

                    <div className="space-y-3">
                                {tasks.length === 0 ? (
                            <div className="p-12 text-center text-zinc-600 italic border border-dashed border-zinc-800 rounded-2xl">
                                No tasks defined yet. Add the first one to start tracking.
                            </div>
                        ) : (
                            tasks.map((task) => {
                                const isAssigned = task.isAssigned || task.assignedTo || task.memberId || task.assignedMemberId || task.teamMemberEmail || (task.members && task.members.length > 0) || (task.assignedMembers && task.assignedMembers.length > 0);
                                
                                return (
                                <Card key={task.taskDefinitionId} className="p-5 flex items-center justify-between hover:bg-zinc-900/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-zinc-800 rounded-lg">
                                            <CheckCircleIcon className="w-5 h-5 text-zinc-500" />
                                        </div>
                                        <div>
                                            <p className="text-zinc-200 font-medium">{task.description}</p>
                                            <div className="flex items-center gap-4 mt-1">
                                                <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                                                    <ClockIcon className="w-3 h-3" />
                                                    Due: {new Date(task.dueDate).toLocaleDateString()}
                                                </span>
                                                {isAssigned && (
                                                    <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold uppercase">
                                                        Assigned
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="relative group/select mr-1 border border-zinc-800 rounded-full hover:border-emerald-500 overflow-hidden bg-zinc-900">
                                            <select
                                                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                                                onChange={(e) => handleAssignTask(task.taskDefinitionId, e.target.value)}
                                                defaultValue=""
                                                title="Assign Member"
                                            >
                                                <option value="" disabled>Assign Member</option>
                                                {teamMembers.map(m => (
                                                    <option key={m.userId} value={m.userId}>{m.userName}</option>
                                                ))}
                                            </select>
                                            <div className="w-8 h-8 flex items-center justify-center text-[10px] text-zinc-400 bg-zinc-800 transition-colors pointer-events-none" title="Assign Member">
                                                <UserIcon className="w-4 h-4" />
                                            </div>
                                        </div>

                                        <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-emerald-400 text-xs p-1.5 h-auto w-auto min-w-[32px] min-h-[32px]" title="View Details" onClick={() => setViewTaskId(task.taskDefinitionId)}>
                                            <EyeIcon className="w-4 h-4" />
                                        </Button>

                                        <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-blue-400 text-xs p-1.5 h-auto w-auto min-w-[32px] min-h-[32px]" title="Edit Task" onClick={() => setEditTaskData(task)}>
                                            <PencilSquareIcon className="w-4 h-4" />
                                        </Button>

                                        {!isAssigned && (
                                            <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-red-500 text-xs p-1.5 h-auto w-auto min-w-[32px] min-h-[32px]" title="Delete Task" onClick={() => setDeleteTaskId(task.taskDefinitionId)}>
                                                <TrashIcon className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                </Card>
                            )})
                        )}
                    </div>
                </div>
            </div>

            <TaskDefinitionModal
                isOpen={isTaskModalOpen || !!editTaskData}
                onClose={() => {
                    setIsTaskModalOpen(false);
                    setEditTaskData(null);
                }}
                teamId={teamId}
                taskHeadId={taskHeadId}
                editData={editTaskData}
                onSuccess={() => {
                    fetchData();
                    setEditTaskData(null);
                }}
            />

            <TaskDetailModal
                isOpen={!!viewTaskId}
                onClose={() => setViewTaskId(null)}
                taskId={viewTaskId}
                teamMembers={teamMembers}
                onSuccess={fetchData}
            />

            {deleteTaskId && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
                    <Card className="w-full max-w-md p-6 space-y-6 shadow-2xl border-red-500/20">
                        <div className="flex items-center gap-4 text-red-500">
                            <ExclamationTriangleIcon className="w-8 h-8" />
                            <h2 className="text-xl font-bold text-zinc-100">Confirm Deletion</h2>
                        </div>
                        <p className="text-zinc-400">Are you sure you want to delete this task? This action cannot be undone.</p>
                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="secondary" className="flex-1" onClick={() => setDeleteTaskId(null)}>Cancel</Button>
                            <Button type="button" variant="primary" className="flex-1 bg-red-500 hover:bg-red-600 border-none text-white" disabled={loading} onClick={async () => {
                                setLoading(true);
                                try {
                                    await taskDefinitionApi.DeleteTask(deleteTaskId);
                                    toast.success('Task deleted successfully');
                                    fetchData();
                                    setDeleteTaskId(null);
                                } catch (error) {
                                    toast.error('Failed to delete task');
                                } finally {
                                    setLoading(false);
                                }
                            }}>
                                {loading ? 'Deleting...' : 'Delete Task'}
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default PhaseDetails;
