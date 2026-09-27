import { DemoUserSession, UserRole } from "@/types";

export const DEMO_CREDENTIALS = [
  {
    username: "Admin",
    password: "admin@123",
    user: {
      username: "Admin",
      name: "Dr. S. K. Rout (Admin)",
      role: "ADMIN" as UserRole,
      email: "ksac.admin@kiit.ac.in",
      school: "Student Activity Centre (KSAC)",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    username: "host1",
    password: "1234",
    user: {
      username: "host1",
      name: "Priya Mohanty (Host)",
      role: "HOST" as UserRole,
      email: "host1@kiit.ac.in",
      society: "KIIT Robotics Society (KRS)",
      school: "School of Mechanical Engineering",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    username: "student1",
    password: "12345",
    user: {
      username: "student1",
      name: "Ayush Sharma (Student)",
      role: "STUDENT" as UserRole,
      email: "21051982@kiit.ac.in",
      rollNumber: "21051982",
      school: "School of Computer Engineering (KSCE)",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    },
  },
];

export function authenticateDemoUser(usernameInput: string, passwordInput: string): DemoUserSession | null {
  const cleanUser = usernameInput.trim();
  const cleanPass = passwordInput.trim();

  // Find matching credential by username (case-insensitive) or email
  const match = DEMO_CREDENTIALS.find((c) => {
    const isUserMatch = c.username.toLowerCase() === cleanUser.toLowerCase();
    const isEmailMatch = c.user.email.toLowerCase() === cleanUser.toLowerCase();
    return (isUserMatch || isEmailMatch) && c.password === cleanPass;
  });

  if (match) {
    saveSession(match.user);
    return match.user;
  }

  return null;
}

export function saveSession(user: DemoUserSession): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("kiit_demo_user", JSON.stringify(user));
    localStorage.setItem("kiit_demo_role", user.role);

    // Set cookie for middleware access (expires in 7 days)
    document.cookie = `kiit_demo_role=${user.role}; path=/; max-age=604800; SameSite=Lax`;
    document.cookie = `kiit_demo_username=${encodeURIComponent(user.username)}; path=/; max-age=604800; SameSite=Lax`;
  } catch (e) {
    console.error("Failed to save session", e);
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem("kiit_demo_user");
    localStorage.removeItem("kiit_demo_role");

    // Clear cookies
    document.cookie = "kiit_demo_role=; path=/; max-age=0";
    document.cookie = "kiit_demo_username=; path=/; max-age=0";
  } catch (e) {
    console.error("Failed to clear session", e);
  }
}

export function getClientSession(): DemoUserSession | null {
  if (typeof window === "undefined") return null;

  try {
    const saved = localStorage.getItem("kiit_demo_user");
    if (saved) {
      return JSON.parse(saved);
    }

    // Fallback if role cookie exists but user json is missing
    const role = localStorage.getItem("kiit_demo_role");
    if (role === "ADMIN") return DEMO_CREDENTIALS[0].user;
    if (role === "HOST") return DEMO_CREDENTIALS[1].user;
    if (role === "STUDENT") return DEMO_CREDENTIALS[2].user;
  } catch (e) {
    console.error("Error reading session", e);
  }

  return null;
}
