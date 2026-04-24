import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Squares2X2Icon,
    UserGroupIcon,
    ClipboardDocumentCheckIcon,
    UserIcon,
    ShieldCheckIcon,
    PlusIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', icon: Squares2X2Icon, path: '/leaderdashboard' },
        { name: 'Create Team', icon: PlusIcon, path: '/leader/create-team', highlight: true },
        { name: 'My Teams', icon: UserGroupIcon, path: '/leader/teams' },
        { name: 'Tasks', icon: ClipboardDocumentCheckIcon, path: '/leader/tasks' },
        { name: 'Profile', icon: UserIcon, path: '/leader/viewProfile' },
        { name: 'Security', icon: ShieldCheckIcon, path: '/leader/change-password' },
    ];

    const isActive = (path) => {
        if (path === '/leaderdashboard') return location.pathname === path;
        if (path === '/leader/teams') return location.pathname === '/leader/teams' || (location.pathname.startsWith('/leader/team/') && !location.pathname.includes('/tasks'));
        if (path === '/leader/tasks') return location.pathname.startsWith('/leader/tasks') || location.pathname.includes('/tasks');
        return location.pathname.startsWith(path);
    };

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-zinc-950 border-r border-zinc-800/50 transition-all duration-300 z-50 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}
        >
            {/* Logo Section */}
            <div className="h-20 flex items-center px-6 mb-4">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-emerald-500 rounded-xl flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    {!isCollapsed && (
                        <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent whitespace-nowrap">
                            CollabHub
                        </span>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`
              group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
              ${isActive(item.path)
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'}
              ${item.highlight && !isActive(item.path) ? 'text-emerald-500' : ''}
            `}
                    >
                        <item.icon className={`w-6 h-6 flex-shrink-0 ${isActive(item.path) ? 'text-emerald-400' : ''}`} />
                        {!isCollapsed && <span className="font-medium">{item.name}</span>}

                        {/* Tooltip for collapsed mode */}
                        {isCollapsed && (
                            <div className="absolute left-16 px-2 py-1 bg-zinc-800 text-zinc-200 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                                {item.name}
                            </div>
                        )}
                    </Link>
                ))}
            </nav>

            {/* Collapse Toggle */}
            <div className="p-4 border-t border-zinc-900">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center justify-center p-2 rounded-xl bg-zinc-900 text-zinc-500 hover:text-zinc-200 transition-colors"
                >
                    {isCollapsed ? <ChevronRightIcon className="w-5 h-5" /> : <ChevronLeftIcon className="w-5 h-5" />}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
