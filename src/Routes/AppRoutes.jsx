import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicRoutes from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import LeaderLayout from '../Components/Layout/LeaderLayout';
import LeaderDashboard from '../Pages/Dashboard/TeamLeaderDashBoard';
import Profile from '../Pages/Profile/Profile';
import EditMyProfile from '../Pages/Profile/EditProfile';
import ChangeMyPassword from '../Pages/Profile/ChangePassword';
import CreateTeam from '../Pages/Teams/CreateTeam';
import TeamDetails from '../Pages/Teams/TeamDetails';
import MyTeams from '../Pages/Teams/MyTeams';
import TaskBoard from '../Pages/Tasks/TaskBoard';
import PhaseDetails from '../Pages/Tasks/PhaseDetails';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/*" element={<PublicRoutes />} />

            {/* Team Lead Protected Routes */}
            <Route
                element={
                    <PrivateRoute allowedRoles={['TeamLead']}>
                        <LeaderLayout />
                    </PrivateRoute>
                }
            >
                <Route path="/leaderdashboard" element={<LeaderDashboard />} />
                <Route path="/leader/profile" element={<Profile />} />
                <Route path="/leader/editProfile" element={<EditMyProfile />} />
                <Route path="/leader/change-password" element={<ChangeMyPassword />} />
                <Route path="/leader/create-team" element={<CreateTeam />} />
                <Route path="/leader/teams" element={<MyTeams />} />
                <Route path="/leader/tasks" element={<TaskBoard />} />
              
                <Route path="/leader/team/:teamId/tasks/:taskHeadId" element={<PhaseDetails />} />
                <Route path="/leader/team/:id" element={<TeamDetails />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
