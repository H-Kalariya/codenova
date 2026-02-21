import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logOut } from "../lib/authService";
import toast from "react-hot-toast";

export default function FleetManagerDashboard() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();
        toast.success("Logged out successfully");
        navigate("/login", { replace: true });
    };

    const stats = [
        { label: "Active Vehicles", value: "48", meta: "↑ 3 this week", color: "#6366f1" },
        { label: "Active Routes", value: "21", meta: "Across 5 regions", color: "#10b981" },
        { label: "Drivers On Duty", value: "39", meta: "6 on break", color: "#f59e0b" },
        { label: "Fleet Utilization", value: "87%", meta: "↑ 4% vs last month", color: "#3b82f6" },
    ];

    return (
        <div className="dashboard-bg">
            {/* Nav */}
            <nav className="dashboard-nav">
                <div className="dashboard-brand">
                    <div className="dashboard-brand-dot" style={{ background: "#6366f1", boxShadow: "0 0 8px #6366f1" }} />
                    🚛 FleetOS
                </div>
                <div className="dashboard-nav-right">
                    <span
                        className="role-badge"
                        style={{ background: "#6366f118", color: "#6366f1", border: "1px solid #6366f130" }}
                    >
                        Fleet Manager
                    </span>
                    <button className="btn-logout" onClick={handleLogout}>
                        Sign out
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <div className="dashboard-hero">
                <p className="dashboard-greeting">Good morning 👋</p>
                <h2 className="dashboard-title">
                    Welcome back,{" "}
                    <span style={{ color: "#6366f1" }}>
                        {currentUser?.displayName || "Fleet Manager"}
                    </span>
                </h2>
                <p className="dashboard-subtitle">
                    Here's your fleet overview for today. Everything is running smoothly.
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
