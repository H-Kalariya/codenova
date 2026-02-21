import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { logIn, ROLE_LABELS, ROLE_ROUTES } from "../lib/authService";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            const role = await logIn(email, password);
            toast.success(`Welcome back, ${ROLE_LABELS[role]}!`, {
                style: {
                    background: "#1a1a2e",
                    color: "#f0f0f8",
                    border: "1px solid rgba(99,102,241,0.3)",
                },
                iconTheme: { primary: "#6366f1", secondary: "#fff" },
            });
            setTimeout(() => navigate(ROLE_ROUTES[role], { replace: true }), 800);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Login failed.";
            if (message.includes("invalid-credential") || message.includes("wrong-password") || message.includes("user-not-found")) {
                setError("Invalid email or password. Please try again.");
            } else {
                setError(message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-bg">
            <Toaster position="top-center" />
            <div className="auth-card">
                {/* Brand */}
                <div className="auth-brand">
                    <div className="auth-brand-icon">🚛</div>
                    <h1>FleetOS</h1>
                    <p>Sign in to your account</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="auth-error" style={{ marginBottom: "1rem" }}>
                        <span>⚠️</span> {error}
                    </div>
                )}

                {/* Form */}
                <form className="auth-form" onSubmit={handleSubmit} noValidate>
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

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading && <span className="btn-spinner" />}
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                {/* Role guide */}
                <div className="auth-divider" style={{ marginTop: "1.5rem" }}>
                    <span>available roles</span>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        justifyContent: "center",
                        marginTop: "0.75rem",
                    }}
                >
                    {(
                        [
                            { label: "Fleet Manager", color: "#6366f1" },
                            { label: "Dispatcher", color: "#10b981" },
                            { label: "Safety Officer", color: "#f59e0b" },
                            { label: "Finance Analyst", color: "#3b82f6" },
                        ] as { label: string; color: string }[]
                    ).map((r) => (
                        <span
                            key={r.label}
                            className="role-badge"
                            style={{
                                background: `${r.color}18`,
                                color: r.color,
                                border: `1px solid ${r.color}30`,
                            }}
                        >
                            {r.label}
                        </span>
                    ))}
                </div>

                <p className="auth-footer">
                    Don't have an account?{" "}
                    <Link to="/signup">Create one here</Link>
                </p>
            </div>
        </div>
    );
}
