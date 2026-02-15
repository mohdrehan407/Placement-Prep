import { useNavigate, useLocation, Outlet, NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Code2,
    FileText,
    Library,
    User,
    LogOut,
    Bell,
    Search,
    History as HistoryIcon
} from 'lucide-react';

export default function DashboardLayout() {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, exact: true },
        { name: 'Analyzer', path: '/dashboard/analyzer', icon: Search },
        { name: 'History', path: '/dashboard/history', icon: HistoryIcon },
        { name: 'Practice', path: '/dashboard/practice', icon: Code2 },
        { name: 'Assessments', path: '/dashboard/assessments', icon: FileText },
        { name: 'Resources', path: '/dashboard/resources', icon: Library },
        { name: 'Profile', path: '/dashboard/profile', icon: User },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                    <div className="w-8 h-8 bg-[hsl(245,58%,51%)] rounded-lg flex items-center justify-center text-white font-bold">P</div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">Placement Prep</span>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.exact}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive
                                    ? 'bg-indigo-50 text-[hsl(245,58%,51%)]'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors font-medium">
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sm:px-8">
                    <h2 className="text-lg font-semibold text-gray-800">Placement Prep</h2>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                                <p className="text-xs text-gray-500">Student</p>
                            </div>
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-[hsl(245,58%,51%)] font-bold text-lg border border-indigo-200">
                                AJ
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="flex-1 overflow-y-auto p-6 sm:p-8">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
