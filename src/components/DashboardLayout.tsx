import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Truck,
    Clock,
    ShieldAlert,
    TrendingUp,
    BarChart3,
    LogOut,
    Menu,
    X,
    Bell,
    User as UserIcon,
    Search,
    ChevronDown,
    Settings,
    HelpCircle,
    Wallet
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { logOut, ROLE_LABELS, ROLE_COLORS, ROLE_ROUTES, type UserRole } from "../lib/authService";
import toast from "react-hot-toast";

interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    path: string;
    active?: boolean;
    badge?: string;
}

const SidebarItem = ({ icon: Icon, label, path, active, badge }: SidebarItemProps) => (
    <Link
        to={path}
        className={`sidebar-link ${active ? "active" : ""}`}
    >
        <div className="sidebar-link-icon-container">
            <Icon size={20} />
        </div>
        <span className="sidebar-link-text">{label}</span>
        {badge && <span className="sidebar-badge">{badge}</span>}
    </Link>
);

interface DashboardLayoutProps {
    children: React.ReactNode;
    role: UserRole;
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logOut();
            toast.success("Logged out successfully");
            navigate("/login", { replace: true });
        } catch (error) {
            toast.error("Failed to log out");
        }
    };

    const roleColor = ROLE_COLORS[role] || "#6366f1";

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: ROLE_ROUTES[role] },
        { icon: Truck, label: "Vehicle Registry", path: "/vehicle-registry" },
        { icon: Clock, label: "Trip Dispatcher", path: "/trip-dispatcher" },
        { icon: TrendingUp, label: "Maintenance", path: "/maintenance", badge: "3" },
        { icon: Wallet, label: "Trip & Expense", path: "/expenses" },
        { icon: ShieldAlert, label: "Performance", path: "/performance" },
        { icon: BarChart3, label: "Analytics", path: "/analytics" },
    ];

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className={`dashboard-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
                <div className="sidebar-header">
                    <div className="sidebar-brand">
                        <div className="brand-icon" style={{ background: roleColor }}>
                            <Truck size={24} color="#fff" />
                        </div>
                        <span className="brand-name">Fleet Flow</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <div className="sidebar-group">
                        <p className="sidebar-group-label">Menu</p>
                        {menuItems.map((item, idx) => (
                            <SidebarItem
                                key={idx}
                                icon={item.icon}
                                label={item.label}
                                path={item.path}
                                active={location.pathname === item.path && item.label === "Dashboard"}
                                badge={item.badge}
                            />
                        ))}
                    </div>

                    <div className="sidebar-group mt-auto">
                        <SidebarItem icon={Settings} label="Settings" path="#" />
                        <SidebarItem icon={HelpCircle} label="Help Center" path="#" />
                        <button
                            onClick={handleLogout}
                            className="sidebar-link text-red"
                        >
                            <div className="sidebar-link-icon-container">
                                <LogOut size={20} />
                            </div>
                            <span className="sidebar-link-text">Sign Out</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="dashboard-main">
                {/* Header */}
                <header className="main-header">
                    <div className="header-left">
                        <button
                            className="header-btn"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    <div className="header-right">
                        <div className="header-search">
                            <Search size={18} className="search-icon" />
                            <input type="text" placeholder="Search for vehicle, trip..." className="search-input" />
                            <div className="search-shortcut">⌘K</div>
                        </div>

                        <button className="header-btn relative">
                            <Bell size={20} />
                            <span className="notif-dot" />
                        </button>

                        <div className="header-divider" />

                        <div className="user-profile-relative">
                            <button
                                className="user-profile-btn"
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                            >
                                <div className="user-avatar">
                                    {currentUser?.name?.[0] || <UserIcon size={18} />}
                                </div>
                                <div className="user-info mobile-hide">
                                    <span className="user-name">{currentUser?.name || "User"}</span>
                                    <span
                                        className="user-role"
                                        style={{ color: roleColor }}
                                    >
                                        {ROLE_LABELS[role]}
                                    </span>
                                </div>
                                <ChevronDown size={16} className={`chevron ${isProfileOpen ? "rotate" : ""}`} />
                            </button>

                            {isProfileOpen && (
                                <div className="profile-dropdown">
                                    <div className="dropdown-header">
                                        <p className="dropdown-email">{currentUser?.email}</p>
                                    </div>
                                    <div className="dropdown-divider" />
                                    <button className="dropdown-item">View Profile</button>
                                    <button className="dropdown-item">Account Settings</button>
                                    <div className="dropdown-divider" />
                                    <button
                                        className="dropdown-item text-red"
                                        onClick={handleLogout}
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="content-viewport">
                    {children}
                </div>
            </main>
        </div>
    );
}
