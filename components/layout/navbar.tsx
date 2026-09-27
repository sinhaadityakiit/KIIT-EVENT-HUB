"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Compass, 
  Users, 
  MapPin, 
  Ticket, 
  ShieldCheck, 
  PlusCircle, 
  Menu, 
  X,
  LogOut,
  Bell,
  Film,
  FileText,
  BarChart3,
  Settings,
  Calendar,
  UserCheck,
  CheckSquare,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getClientSession, saveSession, clearSession, DEMO_CREDENTIALS } from "@/lib/auth/demo-session";
import { UserRole, DemoUserSession } from "@/types";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userSession, setUserSession] = React.useState<DemoUserSession | null>(null);
  const [activeRole, setActiveRole] = React.useState<UserRole>("STUDENT");

  // Load active session on mount and route change
  React.useEffect(() => {
    const session = getClientSession();
    if (session) {
      setUserSession(session);
      setActiveRole(session.role);
    } else {
      // Default to student demo if unset
      const defaultUser = DEMO_CREDENTIALS[2].user;
      setUserSession(defaultUser);
      setActiveRole("STUDENT");
      saveSession(defaultUser);
    }
  }, [pathname]);

  const handleRoleSwitch = (role: UserRole) => {
    const match = DEMO_CREDENTIALS.find((c) => c.user.role === role);
    if (match) {
      saveSession(match.user);
      setUserSession(match.user);
      setActiveRole(role);
      if (role === "ADMIN") router.push("/admin/dashboard");
      else if (role === "HOST") router.push("/host/dashboard");
      else router.push("/student/dashboard");
    }
  };

  const handleLogout = () => {
    clearSession();
    setUserSession(null);
    router.push("/login");
  };

  // Role-Specific Navigation Definitions
  const adminNav = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Compass },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Approval Queue", href: "/admin/approvals", icon: CheckSquare, badge: "3" },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Reports", href: "/admin/reports", icon: FileText },
    { name: "Notifications", href: "/admin/notifications", icon: Bell },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const hostNav = [
    { name: "Dashboard", href: "/host/dashboard", icon: Compass },
    { name: "My Events", href: "/host/events", icon: Calendar },
    { name: "Create Event", href: "/host/events/new", icon: PlusCircle },
    { name: "Approvals", href: "/host/approvals", icon: CheckSquare },
    { name: "Analytics", href: "/host/analytics", icon: BarChart3 },
    { name: "Notifications", href: "/host/notifications", icon: Bell },
  ];

  const studentNav = [
    { name: "Dashboard", href: "/student/dashboard", icon: Compass },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "My Registrations", href: "/student/registrations", icon: Ticket },
    { name: "Vlogs & Reels", href: "/student/vlogs", icon: Film, highlight: true },
    { name: "Notifications", href: "/student/notifications", icon: Bell },
  ];

  // Active navigation items based on current role
  const activeNavItems = 
    activeRole === "ADMIN" ? adminNav : activeRole === "HOST" ? hostNav : studentNav;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-kiit-green to-emerald-800 shadow-md shadow-kiit-green/30 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-white text-base tracking-tighter">KIIT</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white tracking-tight text-base sm:text-lg">Events Hub</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Demo
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Educational Project</p>
            </div>
          </Link>
        </div>

        {/* Desktop Role Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {activeNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "text-emerald-400 bg-kiit-green/15 border border-emerald-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.name}</span>
                {item.badge && (
                  <span className="flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-slate-950">
                    {item.badge}
                  </span>
                )}
                {item.highlight && (
                  <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick Demo Role Pill */}
          <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-0.5 text-xs">
            {(["STUDENT", "HOST", "ADMIN"] as const).map((r) => (
              <button
                key={r}
                onClick={() => handleRoleSwitch(r)}
                className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  activeRole === r
                    ? r === "ADMIN"
                      ? "bg-rose-700 text-white shadow"
                      : r === "HOST"
                      ? "bg-amber-600 text-white shadow"
                      : "bg-kiit-green text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {r.charAt(0) + r.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* User Profile Badge */}
          {userSession ? (
            <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
              <Link
                href={
                  activeRole === "ADMIN"
                    ? "/admin/profile"
                    : activeRole === "HOST"
                    ? "/host/profile"
                    : "/student/profile"
                }
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="text-right hidden lg:block">
                  <p className="text-xs font-semibold text-white leading-tight">
                    {userSession.name}
                  </p>
                  <p className="text-[10px] text-emerald-400 font-mono">
                    {userSession.username}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center text-xs font-bold text-slate-950 border border-slate-700">
                  {userSession.name.charAt(0)}
                </div>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                title="Log Out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                aria-label="Log Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="primary" size="sm">
                Log In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center xl:hidden gap-2">
          {userSession && (
            <button
              onClick={handleLogout}
              className="text-xs text-slate-400 hover:text-rose-400 p-1"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-4">
          {/* User Session Row */}
          {userSession && (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">
                  {userSession.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{userSession.name}</p>
                  <span className="text-[10px] text-amber-400 uppercase font-mono font-bold">
                    {userSession.role}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-rose-400 font-semibold px-2.5 py-1 rounded-lg border border-rose-900/60 hover:bg-rose-950"
              >
                Log Out
              </button>
            </div>
          )}

          {/* Role switcher row */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">Switch Role:</span>
            <div className="flex items-center gap-1">
              {(["STUDENT", "HOST", "ADMIN"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    handleRoleSwitch(r);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xs px-2.5 py-1 rounded font-medium ${
                    activeRole === r ? "bg-kiit-green text-white" : "text-slate-400 bg-slate-900"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Links List */}
          <div className="space-y-1">
            {activeNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2 px-3 rounded-xl text-sm ${
                  pathname === item.href
                    ? "bg-kiit-green/20 text-emerald-300 font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-slate-950">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}

            {/* Profile Link in Mobile */}
            <Link
              href={
                activeRole === "ADMIN"
                  ? "/admin/profile"
                  : activeRole === "HOST"
                  ? "/host/profile"
                  : "/student/profile"
              }
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 py-2 px-3 rounded-xl text-sm text-slate-300 hover:text-white"
            >
              <UserCheck className="h-4 w-4" />
              <span>My Profile</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
