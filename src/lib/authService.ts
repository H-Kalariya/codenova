export type UserRole =
    | "fleet_manager"
    | "dispatcher"
    | "safety_officer"
    | "finance_analyst";

export interface User {
    uid: string;
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    createdAt: string;
}

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

// Local storage keys
const USERS_KEY = "fleetos_users";
const SESSION_KEY = "fleetos_session";

// Helper to get all users
const getUsers = (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    let users = data ? JSON.parse(data) : [];
    
    // Add default users if none exist
    if (users.length === 0) {
        users = [
            {
                uid: "fleet_manager_1",
                name: "Fleet Manager",
                email: "fleet@demo.com",
                password: "demo123",
                role: "fleet_manager" as UserRole,
                createdAt: new Date().toISOString(),
            },
            {
                uid: "dispatcher_1",
                name: "Dispatcher",
                email: "dispatch@demo.com",
                password: "demo123",
                role: "dispatcher" as UserRole,
                createdAt: new Date().toISOString(),
            },
            {
                uid: "safety_officer_1",
                name: "Safety Officer",
                email: "safety@demo.com",
                password: "demo123",
                role: "safety_officer" as UserRole,
                createdAt: new Date().toISOString(),
            },
            {
                uid: "finance_analyst_1",
                name: "Finance Analyst",
                email: "finance@demo.com",
                password: "demo123",
                role: "finance_analyst" as UserRole,
                createdAt: new Date().toISOString(),
            },
        ];
        saveUsers(users);
        console.log("Created default demo users");
    }
    
    return users;
};

// Helper to save all users
const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export async function signUp(
    name: string,
    email: string,
    password: string,
    role: UserRole
): Promise<void> {
    const users = getUsers();

    // Check if user already exists
    if (users.some(u => u.email === email)) {
        throw new Error("User with this email already exists.");
    }

    const newUser: User = {
        uid: Math.random().toString(36).substring(2, 15),
        name,
        email,
        password, // In a real app, this would be hashed
        role,
        createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    // Auto log in after signup
    localStorage.setItem(SESSION_KEY, JSON.stringify({ uid: newUser.uid, email: newUser.email }));
}

export async function logIn(
    email: string,
    password: string
): Promise<UserRole> {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    // Set session
    localStorage.setItem(SESSION_KEY, JSON.stringify({ uid: user.uid, email: user.email }));

    return user.role;
}

export async function getUserRole(uid: string): Promise<UserRole | null> {
    const users = getUsers();
    const user = users.find(u => u.uid === uid);
    return user ? user.role : null;
}

export async function getCurrentUser(): Promise<User | null> {
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (!sessionData) return null;

    const { uid } = JSON.parse(sessionData);
    const users = getUsers();
    const user = users.find(u => u.uid === uid);

    if (!user) return null;

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
}

export async function logOut(): Promise<void> {
    localStorage.removeItem(SESSION_KEY);
}
