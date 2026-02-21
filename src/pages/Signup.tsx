import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import type { UserRole } from "../lib/authService";
import { signUp, ROLE_LABELS, ROLE_ROUTES } from "../lib/authService";

const ROLES: { value: UserRole; label: string; description: string; color: string; icon: string }[] = [
    {
        value: "fleet_manager",
        label: "Fleet Manager",
        description: "Manage vehicles, routes & drivers",
        color: "#6366f1",
        icon: "🚗",
    },
    {
        value: "dispatcher",
        label: "Dispatcher",
        description: "Coordinate deliveries & assignments",
        color: "#10b981",
        icon: "📡",
    },
    {
        value: "safety_officer",
        label: "Safety Officer",
        description: "Monitor compliance & incidents",
        color: "#f59e0b",
        icon: "🛡️",
    },
    {
        value: "finance_analyst",
        label: "Finance Analyst",
        description: "Track costs, budgets & reports",
        color: "#3b82f6",
        icon: "📊",
    },
];

export default function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState<UserRole>("dispatcher");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            await signUp(name, email, password, selectedRole);
            toast.success(`Account created! Welcome, ${ROLE_LABELS[selectedRole]}.`, {
                style: {
                    background: "#1a1a2e",
                    color: "#f0f0f8",
                    border: "1px solid rgba(99,102,241,0.3)",
                },
                iconTheme: { primary: "#6366f1", secondary: "#fff" },
            });
            setTimeout(() => navigate(ROLE_ROUTES[selectedRole], { replace: true }), 1000);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Signup failed.";
            if (message.includes("email-already-in-use")) {
                setError("An account with this email already exists. Try logging in.");
            } else {
                setError(message);
            }
        } finally {
            setLoading(false);
        }
    };

    const activeRole = ROLES.find((r) => r.value === selectedRole)!;

    return (
        <div className="auth-bg">
            <Toaster position="top-center" />
            <div className="auth-card" style={{ maxWidth: 500 }}>
                {/* Brand */}
                <div className="auth-brand">
                    <div className="auth-brand-icon">🚛</div>
                    <h1>FleetOS</h1>
                    <p>Create your account</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="auth-error" style={{ marginBottom: "1rem" }}>
                        <span>⚠️</span> {error}
                    </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    {/* Name */}
                    <div className="form-group">
                        <label htmlFor="name">Full name</label>
                        <input
                            id="name"
                            type="text"
                            className="form-input"
                            placeholder="John Smith"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="name"
                            disabled={loading}
                        />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            type="email"
                            className="form-input"
                            placeholder="you@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            disabled={loading}
                        />
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-input"
                            placeholder="Min. 6 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            disabled={loading}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm password</label>
                        <input
                            id="confirm-password"
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="new-password"
                            disabled={loading}
                        />
                    </div>

                    {/* Role Selection */}
                    <div className="form-group">
                        <label>Select your role</label>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "0.6rem",
                            }}
                        >
                            {ROLES.map((role) => (
                                <button
                                    key={role.value}
                                    type="button"
                                    onClick={() => setSelectedRole(role.value)}
                                    disabled={loading}
                                    style={{
                                        background:
                                            selectedRole === role.value
                                                ? `${role.color}18`
                                                : "rgba(255,255,255,0.03)",
                                        border: `1px solid ${selectedRole === role.value
                                            ? `${role.color}60`
                                            : "rgba(255,255,255,0.07)"
                                            }`,
                                        borderRadius: "10px",
                                        padding: "0.7rem 0.75rem",
                                        cursor: "pointer",
                                        textAlign: "left",
                                        transition: "all 0.2s ease",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.25rem",
                                        outline:
                                            selectedRole === role.value
                                                ? `2px solid ${role.color}40`
                                                : "none",
                                    }}
                                >
                                    <span style={{ fontSize: "1.2rem" }}>{role.icon}</span>
                                    <span
                                        style={{
                                            fontSize: "0.8125rem",
                                            fontWeight: 600,
                                            color:
                                                selectedRole === role.value ? role.color : "#f0f0f8",
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        {role.label}
                                    </span>
                                    <span
                                        style={{
                                            fontSize: "0.72rem",
                                            color: "#565670",
                                            fontFamily: "Inter, sans-serif",
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {role.description}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        style={{
                            background: `linear-gradient(135deg, ${activeRole.color} 0%, ${activeRole.color}cc 100%)`,
                            boxShadow: `0 4px 20px ${activeRole.color}40`,
                        }}
                    >
                        {loading && <span className="btn-spinner" />}
                        {loading
                            ? "Creating account..."
                            : `Join as ${activeRole.label}`}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <Link to="/login">Sign in here</Link>
                </p>
            </div>
        </div>
    );
}
