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

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
        throw new Error("User profile not found. Please contact support.");
    }

    return userDoc.data().role as UserRole;
}

export async function getUserRole(uid: string): Promise<UserRole | null> {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) return null;
    return userDoc.data().role as UserRole;
}

export async function logOut(): Promise<void> {
    await signOut(auth);
}
