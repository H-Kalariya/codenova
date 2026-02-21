import { createContext } from "react";
import type { User, UserRole } from "../lib/authService";

export interface AuthContextType {
    currentUser: User | null;
    userRole: UserRole | null;
    loading: boolean;
    setCurrentUser: (user: User | null) => void;
    setUserRole: (role: UserRole | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
