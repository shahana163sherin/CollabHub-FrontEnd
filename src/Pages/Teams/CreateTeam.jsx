import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../Components/UI/Card';
import Input from '../../Components/UI/Input';
import Button from '../../Components/UI/Button';
import teamApi from '../../Api/teamApi';
import { toast } from 'react-hot-toast';

export default function CreateTeam() {
    const [formData, setFormData] = useState({
        teamName: '',
        description: '',
        memberLimit: 5,
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'memberLimit' ? parseInt(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await teamApi.CreateTeam(formData);
            toast.success('Team created successfully!');
            navigate('/leaderdashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create team');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-8">
                Create New Team
            </h1>

            <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Team Name"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                        placeholder="Enter a creative name for your team"
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all placeholder:text-zinc-600"
                            placeholder="What will this team work on?"
                            required
                        ></textarea>
                    </div>

                    <Input
                        label="Member Limit Including TeamLead"
                        name="memberLimit"
                        type="number"
                        min="2"
                        value={formData.memberLimit}
                        onChange={handleChange}
                        placeholder="Maximum number of members including Team Lead"
                        required
                    />

                    <div className="flex gap-4 pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            className="flex-1"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="flex-1"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Team'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
