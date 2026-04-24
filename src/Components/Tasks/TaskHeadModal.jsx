import React, { useState,useEffect } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { XMarkIcon } from '@heroicons/react/24/outline';
import taskHeadApi from '../../Api/taskHeadApi';
import { toast } from 'react-hot-toast';

const TaskHeadModal = ({ isOpen, onClose, teamId, onSuccess, editData }) => {
    const [formData, setFormData] = useState({
        title: '',
        teamId: "", 
        startDate: new Date().toISOString().split('T')[0],
        expectedEndDate: '',
        dueDate: ''
    });

    useEffect(() => {
        if (editData) {
            setFormData({
                title: editData.title || '',
                teamId: editData.teamId || teamId,
                startDate: editData.startDate ? editData.startDate.split('T')[0] : '',
                expectedEndDate: editData.expectedEndDate ? editData.expectedEndDate.split('T')[0] : '',
                dueDate: editData.dueDate ? editData.dueDate.split('T')[0] : ''
            });
        } else if (teamId && isOpen) {
            setFormData({
                title: '',
                teamId: teamId,
                startDate: new Date().toISOString().split('T')[0],
                expectedEndDate: '',
                dueDate: ''
            });
        }
    }, [editData, teamId, isOpen]);

    const [loading, setLoading] = useState(false);

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
                await taskHeadApi.UpdateTask(editData.taskHeadId, formData);
                toast.success('Project phase updated!');
            } else {
                await taskHeadApi.CreateTask(formData);
                toast.success('Project phase created!');
            }

            setFormData({
                title: '',
                teamId: teamId,
                startDate: new Date().toISOString().split('T')[0],
                expectedEndDate: '',
                dueDate: ''
            });

            onSuccess();
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || error.response?.message || `Failed to ${editData ? 'update' : 'create'} phase`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
            <Card className="w-full max-w-lg p-8 space-y-6 shadow-2xl border-zinc-800">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-zinc-100">{editData ? 'Update Phase' : 'Add Project Phase'}</h2>
                    <button onClick={onClose} className="p-1 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-200 transition-colors">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Phase Title"
                        placeholder="e.g. Requirement Analysis, UI Design..."
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />

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
                        label="Final Deadline"
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        required
                    />

                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="primary" className="flex-1" disabled={loading}>
                            {loading ? (editData ? 'Updating...' : 'Creating...') : (editData ? 'Update Phase' : 'Create Phase')}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default TaskHeadModal;
