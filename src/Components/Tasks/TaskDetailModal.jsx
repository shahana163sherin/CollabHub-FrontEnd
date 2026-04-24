import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { XMarkIcon, UserIcon, TrashIcon } from '@heroicons/react/24/outline';
import taskDefinitionApi from '../../Api/taskDefinitionApi';
import { toast } from 'react-hot-toast';
import Loader from '../UI/Loader';

const TaskDetailModal = ({ isOpen, onClose, taskId, onSuccess, teamMembers }) => {
    const [taskDetails, setTaskDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen && taskId) {
            fetchTaskDetails();
        }
    }, [isOpen, taskId]);

    const fetchTaskDetails = async () => {
        setLoading(true);
        try {
            const response = await taskDefinitionApi.GetTaskDefinitionById(taskId);
            setTaskDetails(response.data.data);
        } catch (error) {
            toast.error('Failed to load task details');
            onClose();
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const handleRemoveMember = async (memberId) => {
        if (!window.confirm("Are you sure you want to remove this member from the task?")) return;
        try {
            await taskDefinitionApi.RemoveMember(taskId, memberId);
            toast.success('Member removed from task');
            fetchTaskDetails();
            onSuccess();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to remove member');
        }
    };
    
    // We try to safely determine the assigned members list or single member
    // Different backend architectures may pass this property under varying names
    let assignedList = [];
    if (taskDetails) {
        if (Array.isArray(taskDetails.assignedMembers)) {
            assignedList = taskDetails.assignedMembers;
        } else if (Array.isArray(taskDetails.members)) {
            assignedList = taskDetails.members;
        } else if (taskDetails.memberId || taskDetails.assignedTo) {
            // Check if it matches any team member
            const id = taskDetails.memberId || taskDetails.assignedTo;
            const memberObj = teamMembers.find(m => m.userId === id);
            assignedList = [{ userId: id, userName: memberObj?.userName || 'Assigned User' }];
        } else if (taskDetails.teamMemberEmail) {
           assignedList = [{ userId: taskDetails.teamMemberEmail, userName: taskDetails.teamMemberEmail }];
        }
    }

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
            <Card className="w-full max-w-lg p-6 space-y-6 shadow-2xl border-zinc-800">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-zinc-100">Task Details</h2>
                    <button onClick={onClose} className="p-1 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-200 transition-colors">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center p-8"><Loader /></div>
                ) : !taskDetails ? (
                    <p className="text-zinc-500">No details found.</p>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold text-emerald-500 uppercase tracking-widest mb-1">Description</h3>
                            <p className="text-zinc-200">{taskDetails.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="space-y-1">
                                <span className="text-zinc-500">Start Date</span>
                                <div className="text-zinc-200">{new Date(taskDetails.startDate).toLocaleDateString()}</div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-zinc-500">Expected End</span>
                                <div className="text-zinc-200">{new Date(taskDetails.extendedTo).toLocaleDateString()}</div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-zinc-500">Due Date</span>
                                <div className="text-zinc-200">{new Date(taskDetails.dueDate).toLocaleDateString()}</div>
                            </div>
                        </div>

                        <div className="border-t border-zinc-800 pt-4">
                            <h3 className="text-sm font-semibold text-zinc-400 mb-3">Assigned Members</h3>
                            {assignedList.length === 0 ? (
                                <p className="text-zinc-500 text-sm italic">No members assigned to this task currently.</p>
                            ) : (
                                <div className="space-y-2">
                                    {assignedList.map((m, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-zinc-900 rounded-xl border border-zinc-800/60">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                    <UserIcon className="w-4 h-4" />
                                                </div>
                                                <span className="text-zinc-200 text-sm">{m.userName || 'Unknown Member'}</span>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-red-500/50 hover:text-red-500 gap-2" onClick={() => handleRemoveMember(m.userId || m.memberId || m.id)}>
                                                <TrashIcon className="w-4 h-4" /> Remove
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="button" variant="secondary" onClick={onClose}>Close</Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default TaskDetailModal;
