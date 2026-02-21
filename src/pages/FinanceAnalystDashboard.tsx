import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logOut } from "../lib/authService";
import toast from "react-hot-toast";

export default function FinanceAnalystDashboard() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();
        toast.success("Logged out successfully");
        navigate("/login", { replace: true });
    };

    const stats = [
        { label: "Monthly Spend", value: "$84K", meta: "↑ 6% vs last month", color: "#3b82f6" },
        { label: "Fuel Cost / Mile", value: "$0.31", meta: "↓ $0.02 this week", color: "#10b981" },
        { label: "Maintenance Budget", value: "73%", meta: "Used of Q1 budget", color: "#f59e0b" },
        { label: "Cost Savings", value: "$12K", meta: "Route optimization", color: "#6366f1" },
    ];

    return (
        <div className="dashboard-bg">
            {/* Nav */}
            <nav className="dashboard-nav">
                <div className="dashboard-brand">
                    <div className="dashboard-brand-dot" style={{ background: "#3b82f6", boxShadow: "0 0 8px #3b82f6" }} />
                    📊 FleetOS
                </div>
                <div className="dashboard-nav-right">
                    <span
                        className="role-badge"
                        style={{ background: "#3b82f618", color: "#3b82f6", border: "1px solid #3b82f630" }}
                    >
                        Finance Analyst
                    </span>
                    <button className="btn-logout" onClick={handleLogout}>
                        Sign out
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <div className="dashboard-hero">
                <p className="dashboard-greeting">Financial Overview 📊</p>
                <h2 className="dashboard-title">
                    Welcome,{" "}
                    <span style={{ color: "#3b82f6" }}>
                        {currentUser?.displayName || "Finance Analyst"}
                    </span>
                </h2>
                <p className="dashboard-subtitle">
                    Track fleet costs, manage budgets, and identify savings opportunities across operations.
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
