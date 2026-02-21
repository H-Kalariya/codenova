import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { ROLE_ROUTES, type UserRole } from "./lib/authService";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FleetManagerDashboard from "./pages/FleetManagerDashboard";
import DispatcherDashboard from "./pages/DispatcherDashboard";
import SafetyOfficerDashboard from "./pages/SafetyOfficerDashboard";
import FinanceAnalystDashboard from "./pages/FinanceAnalystDashboard";
import VehicleRegistry from "./pages/VehicleRegistry";
import TripDispatcher from "./pages/TripDispatcher";
import MaintenanceLogs from "./pages/MaintenanceLogs";
import ExpenseLogging from "./pages/ExpenseLogging";
import DriverProfiles from "./pages/DriverProfiles";
import OperationalAnalytics from "./pages/OperationalAnalytics";

// Full-screen loading spinner shown while Firebase resolves auth state
function LoadingScreen() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0f",
        gap: "1.25rem",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          border: "3px solid rgba(99,102,241,0.2)",
          borderTopColor: "#6366f1",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <span style={{ color: "#565670", fontSize: "0.875rem", letterSpacing: "0.3px" }}>
        Initializing authentication...
      </span>
    </div>
  );
}

// Root / — redirect based on auth state
function RootRedirect() {
  const { currentUser, userRole, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!currentUser) return <Navigate to="/login" replace />;
  if (userRole) return <Navigate to={ROLE_ROUTES[userRole as UserRole]} replace />;
  return <Navigate to="/login" replace />;
}

// Wrap public routes so logged-in users are sent to their dashboard
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, userRole, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (currentUser && userRole) return <Navigate to={ROLE_ROUTES[userRole as UserRole]} replace />;
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-center" />
        <Routes>
          {/* Public routes — redirect away if already logged in */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

          {/* Root redirect */}
          <Route path="/" element={<RootRedirect />} />

          {/* Protected role-based routes */}
          <Route
            path="/fleet-manager"
            element={
              <ProtectedRoute requiredRole="fleet_manager">
                <FleetManagerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dispatcher"
            element={
              <ProtectedRoute requiredRole="dispatcher">
                <DispatcherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/safety-officer"
            element={
              <ProtectedRoute requiredRole="safety_officer">
                <SafetyOfficerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/finance-analyst"
            element={
              <ProtectedRoute requiredRole="finance_analyst">
                <FinanceAnalystDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicle-registry"
            element={
              <ProtectedRoute requiredRole="fleet_manager">
                <VehicleRegistry />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trip-dispatcher"
            element={
              <ProtectedRoute requiredRole="dispatcher">
                <TripDispatcher />
              </ProtectedRoute>
            }
          />
          <Route
            path="/maintenance"
            element={
              <ProtectedRoute requiredRole="fleet_manager">
                <MaintenanceLogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute requiredRole="finance_analyst">
                <ExpenseLogging />
              </ProtectedRoute>
            }
          />
          <Route
            path="/performance"
            element={
              <ProtectedRoute requiredRole="safety_officer">
                <DriverProfiles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute requiredRole="finance_analyst">
                <OperationalAnalytics />
              </ProtectedRoute>
            }
          />

          {/* Fallback — unknown URLs go to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
