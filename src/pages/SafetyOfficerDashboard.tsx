import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logOut } from "../lib/authService";
import toast from "react-hot-toast";

export default function SafetyOfficerDashboard() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();
        toast.success("Logged out successfully");
        navigate("/login", { replace: true });
    };

    const stats = [
        { label: "Open Incidents", value: "3", meta: "2 under review", color: "#f59e0b" },
        { label: "Compliance Score", value: "96%", meta: "↑ 2% this quarter", color: "#10b981" },
        { label: "Inspections Due", value: "7", meta: "This week", color: "#ef4444" },
        { label: "Days Incident-Free", value: "42", meta: "Company record: 87", color: "#6366f1" },
    ];

    return (
        <div className="dashboard-bg">
            {/* Nav */}
            <nav className="dashboard-nav">
                <div className="dashboard-brand">
                    <div className="dashboard-brand-dot" style={{ background: "#f59e0b", boxShadow: "0 0 8px #f59e0b" }} />
                    🛡️ FleetOS
                </div>
                <div className="dashboard-nav-right">
                    <span
                        className="role-badge"
                        style={{ background: "#f59e0b18", color: "#f59e0b", border: "1px solid #f59e0b30" }}
                    >
                        Safety Officer
                    </span>
                    <button className="btn-logout" onClick={handleLogout}>
                        Sign out
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <div className="dashboard-hero">
                <p className="dashboard-greeting">Safety First 🛡️</p>
                <h2 className="dashboard-title">
                    Welcome,{" "}
                    <span style={{ color: "#f59e0b" }}>
                        {currentUser?.displayName || "Safety Officer"}
                    </span>
                </h2>
                <p className="dashboard-subtitle">
                    Monitor compliance, incidents, and ensure all fleet operations meet safety standards.
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
