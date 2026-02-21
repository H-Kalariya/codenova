import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../lib/authService";
import { ROLE_ROUTES } from "../lib/authService";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: UserRole;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
    const { currentUser, userRole, loading } = useAuth();

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0a0a0f",
                    color: "#8b8ba8",
                    flexDirection: "column",
                    gap: "1rem",
                    fontFamily: "Inter, sans-serif",
                }}
            >
                <div
                    style={{
                        width: 40,
                        height: 40,
                        border: "3px solid rgba(99,102,241,0.2)",
                        borderTopColor: "#6366f1",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                    }}
                />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <span style={{ fontSize: "0.875rem" }}>Loading...</span>
            </div>
        );
    }

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
        // Redirect to their own dashboard
        const correctRoute = userRole ? ROLE_ROUTES[userRole as UserRole] : "/login";
        return <Navigate to={correctRoute} replace />;
    }

    return <>{children}</>;
}
