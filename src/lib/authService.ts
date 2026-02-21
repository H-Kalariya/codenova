import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export type UserRole =
    | "fleet_manager"
    | "dispatcher"
    | "safety_officer"
    | "finance_analyst";

export const ROLE_LABELS: Record<UserRole, string> = {
    fleet_manager: "Fleet Manager",
    dispatcher: "Dispatcher",
    safety_officer: "Safety Officer",
    finance_analyst: "Finance Analyst",
};

export const ROLE_ROUTES: Record<UserRole, string> = {
    fleet_manager: "/fleet-manager",
    dispatcher: "/dispatcher",
    safety_officer: "/safety-officer",
    finance_analyst: "/finance-analyst",
};

export const ROLE_COLORS: Record<UserRole, string> = {
    fleet_manager: "#6366f1",
    dispatcher: "#10b981",
    safety_officer: "#f59e0b",
    finance_analyst: "#3b82f6",
};

export async function signUp(
    name: string,
    email: string,
    password: string,
    role: UserRole
): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
    });
}

export async function logIn(
    email: string,
    password: string
): Promise<UserRole> {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
    const user = userCredential.user;

    // Retry mechanism for Firestore access
    let retries = 3;
    let lastError: any;
    
    while (retries > 0) {
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (!userDoc.exists()) {
                throw new Error("User profile not found. Please contact support.");
            }
            return userDoc.data().role as UserRole;
        } catch (error) {
            lastError = error;
            retries--;
            if (retries > 0) {
                console.log(`Retrying user role fetch, ${retries} attempts left...`);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
    
    throw lastError || new Error("Failed to fetch user role after multiple attempts.");
}

export async function getUserRole(uid: string): Promise<UserRole | null> {
    const timeout = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error("Firestore request timed out. Please check your internet connection or Firebase setup.")), 5000)
    );

    try {
        const userDocPromise = getDoc(doc(db, "users", uid));
        const userDoc = await Promise.race([userDocPromise, timeout]) as any;

        if (!userDoc || !userDoc.exists()) return null;
        return userDoc.data().role as UserRole;
    } catch (error) {
        console.error("getUserRole error:", error);
        throw error;
    }
}

export async function logOut(): Promise<void> {
    await signOut(auth);
}
