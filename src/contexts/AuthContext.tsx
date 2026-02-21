import {
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { getCurrentUser, type UserRole, type User } from "../lib/authService";
import { AuthContext } from "./AuthContextTypes";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const user = await getCurrentUser();
                if (user) {
                    setCurrentUser(user);
                    setUserRole(user.role);
                }
            } catch (error) {
                console.error("Manual auth initialization error:", error);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                userRole,
                loading,
                setCurrentUser,
                setUserRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

