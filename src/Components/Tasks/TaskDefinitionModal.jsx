import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { XMarkIcon } from '@heroicons/react/24/outline';
import taskDefinitionApi from '../../Api/taskDefinitionApi';
import { toast } from 'react-hot-toast';

const TaskDefinitionModal = ({ isOpen, onClose, teamId, taskHeadId, editData, onSuccess }) => {
    const [formData, setFormData] = useState({
        teamId: parseInt(teamId),
        taskHeadId: parseInt(taskHeadId),
        description: '',
        startDate: new Date().toISOString().split('T')[0],
        expectedEndDate: '',
        dueDate: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editData) {
            setFormData({
                teamId: parseInt(teamId),
                taskHeadId: parseInt(taskHeadId),
                description: editData.description || '',
                startDate: editData.startDate ? editData.startDate.split('T')[0] : '',
                expectedEndDate: editData.expectedEndDate ? editData.expectedEndDate.split('T')[0] : '',
                dueDate: editData.dueDate ? editData.dueDate.split('T')[0] : ''
            });
        } else if (isOpen) {
            setFormData({
                teamId: parseInt(teamId),
                taskHeadId: parseInt(taskHeadId),
                description: '',
                startDate: new Date().toISOString().split('T')[0],
                expectedEndDate: '',
                dueDate: ''
            });
        }
    }, [editData, isOpen, teamId, taskHeadId]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.expectedEndDate < formData.startDate) {
            toast.error("End date cannot be before start date");
            setLoading(false);
            return;
        }

        if (formData.dueDate < formData.expectedEndDate) {
            toast.error("Due date cannot be before expected end date");
            setLoading(false);
            return;
        }

        try {
            if (editData) {
                await taskDefinitionApi.UpdateTaskDefinition(editData.taskDefinitionId, formData);
                toast.success('Task updated successfully!');
            } else {
                await taskDefinitionApi.CreateTaskDefinition(formData);
                toast.success('Task created successfully!');
            }
            onSuccess();
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || `Failed to ${editData ? 'update' : 'create'} task`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
            <Card className="w-full max-w-lg p-8 space-y-6 shadow-2xl border-zinc-800">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-zinc-100">{editData ? 'Update Task' : 'Add New Task'}</h2>
                    <button onClick={onClose} className="p-1 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-200 transition-colors">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Task Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all placeholder:text-zinc-600 text-sm"
                            placeholder="Describe the specific task requirements..."
                            rows="3"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Start Date"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            required
                        />
                        <Input
                            label="Expected End"
                            type="date"
                            value={formData.expectedEndDate}
                            onChange={(e) => setFormData({ ...formData, expectedEndDate: e.target.value })}
                            required
                        />
                    </div>

                    <Input
                        label="Deadline"
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        required
                    />

                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="primary" className="flex-1" disabled={loading}>
                            {loading ? (editData ? 'Updating...' : 'Creating...') : (editData ? 'Update Task' : 'Create Task')}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default TaskDefinitionModal;
