"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Calendar, 
  Compass, 
  Users, 
  MapPin, 
  Ticket, 
  ShieldCheck, 
  PlusCircle, 
  QrCode, 
  Menu, 
  X,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeRole, setActiveRole] = React.useState<"STUDENT" | "HOST" | "ADMIN">("STUDENT");

  // Keep role in localStorage for cross-page demo switching
  React.useEffect(() => {
    const saved = localStorage.getItem("kiit_demo_role");
    if (saved === "STUDENT" || saved === "HOST" || saved === "ADMIN") {
      setActiveRole(saved);
    }
  }, []);

  const handleRoleChange = (role: "STUDENT" | "HOST" | "ADMIN") => {
    setActiveRole(role);
    localStorage.setItem("kiit_demo_role", role);
  };

  const navLinks = [
    { name: "Explore Events", href: "/events", icon: Compass },
    { name: "Societies & Clubs", href: "/societies", icon: Users },
    { name: "Campus Venues", href: "/venues", icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-kiit-green to-emerald-800 shadow-md shadow-kiit-green/30 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-white text-base tracking-tighter">KIIT</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-tight text-lg">KSAC Events</span>
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest font-semibold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Campus 7
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Kalinga Institute of Industrial Technology</p>
            </div>
          </Link>

          {/* Desktop Public Nav */}
          <nav className="hidden md:flex items-center gap-1 pl-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-emerald-400 bg-kiit-green/10"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action Controls & Role Switcher */}
        <div className="hidden md:flex items-center gap-3">
          {/* Role Mode Switcher Pill */}
          <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs">
            <button
              onClick={() => handleRoleChange("STUDENT")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                activeRole === "STUDENT"
                  ? "bg-kiit-green text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => handleRoleChange("HOST")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                activeRole === "HOST"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Host
            </button>
            <button
              onClick={() => handleRoleChange("ADMIN")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                activeRole === "ADMIN"
                  ? "bg-rose-700 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Admin
            </button>
          </div>

          {/* Dynamic Action Buttons Based on Role */}
          {activeRole === "STUDENT" && (
            <Link href="/student/dashboard">
              <Button variant="outline" size="sm">
                <Ticket className="h-4 w-4 mr-1 text-emerald-400" />
                My Passes
              </Button>
            </Link>
          )}

          {activeRole === "HOST" && (
            <div className="flex items-center gap-2">
              <Link href="/host/events/new">
                <Button variant="gold" size="sm">
                  <PlusCircle className="h-4 w-4 mr-1 text-slate-950" />
                  + Propose Event
                </Button>
              </Link>
              <Link href="/host/dashboard">
                <Button variant="secondary" size="sm">
                  Host Studio
                </Button>
              </Link>
            </div>
          )}

          {activeRole === "ADMIN" && (
            <div className="flex items-center gap-2">
              <Link href="/admin/approvals">
                <Button variant="primary" size="sm" className="relative">
                  <ShieldCheck className="h-4 w-4 mr-1" />
                  Approvals Queue
                  <span className="ml-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-slate-950">
                    1
                  </span>
                </Button>
              </Link>
              <Link href="/admin/dashboard">
                <Button variant="secondary" size="sm">
                  Admin Analytics
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden gap-2">
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
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs text-slate-400 font-medium">Active Interface:</span>
            <div className="flex items-center gap-1">
              {(["STUDENT", "HOST", "ADMIN"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleChange(r)}
                  className={`text-xs px-2 py-1 rounded font-medium ${
                    activeRole === r ? "bg-kiit-green text-white" : "text-slate-400"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 text-sm text-slate-200 hover:text-emerald-400"
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            {activeRole === "STUDENT" && (
              <Link href="/student/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">
                  <Ticket className="h-4 w-4 mr-2" />
                  My Tickets & Passes
                </Button>
              </Link>
            )}
            {activeRole === "HOST" && (
              <>
                <Link href="/host/events/new" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="gold" size="sm" className="w-full">
                    + Propose Event
                  </Button>
                </Link>
                <Link href="/host/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">
                    Host Studio
                  </Button>
                </Link>
              </>
            )}
            {activeRole === "ADMIN" && (
              <Link href="/admin/approvals" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">
                  KSAC Approvals Queue (1)
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
