import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logOut } from "../lib/authService";
import toast from "react-hot-toast";

export default function DispatcherDashboard() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();
        toast.success("Logged out successfully");
        navigate("/login", { replace: true });
    };

    const stats = [
        { label: "Active Dispatches", value: "14", meta: "3 pending assignment", color: "#10b981" },
        { label: "In Transit", value: "27", meta: "On schedule", color: "#6366f1" },
        { label: "Completed Today", value: "62", meta: "↑ 8 vs yesterday", color: "#3b82f6" },
        { label: "Avg. Dispatch Time", value: "4m", meta: "↓ 30s improvement", color: "#f59e0b" },
    ];

    return (
        <div className="dashboard-bg">
            {/* Nav */}
            <nav className="dashboard-nav">
                <div className="dashboard-brand">
                    <div className="dashboard-brand-dot" style={{ background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
                    📡 FleetOS
                </div>
                <div className="dashboard-nav-right">
                    <span
                        className="role-badge"
                        style={{ background: "#10b98118", color: "#10b981", border: "1px solid #10b98130" }}
                    >
                        Dispatcher
                    </span>
                    <button className="btn-logout" onClick={handleLogout}>
                        Sign out
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <div className="dashboard-hero">
                <p className="dashboard-greeting">Live Operations 🟢</p>
                <h2 className="dashboard-title">
                    Welcome,{" "}
                    <span style={{ color: "#10b981" }}>
                        {currentUser?.displayName || "Dispatcher"}
                    </span>
                </h2>
                <p className="dashboard-subtitle">
                    Manage and coordinate all active dispatches and deliveries in real time.
                </p>

                <div className="stats-grid">
                    {stats.map((s) => (
                        <div className="stat-card" key={s.label}>
                            <p className="stat-label">{s.label}</p>
                            <p className="stat-value" style={{ color: s.color }}>
                                {s.value}
                            </p>
                            <p className="stat-meta">{s.meta}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
