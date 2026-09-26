"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateKiitEmail } from "@/lib/auth/kiit-validator";
import { MOCK_USERS } from "@/lib/data/mock-data";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/student/dashboard";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Enforce KIIT domain validation
    const validation = validateKiitEmail(email);
    if (!validation.isValid) {
      setError(validation.error || "Must be an official @kiit.ac.in university email address.");
      return;
    }

    setLoading(true);

    // Save session role simulation
    let role = "STUDENT";
    if (email.includes("admin") || email.includes("ksac")) role = "ADMIN";
    else if (email.includes("lead") || email.includes("host") || email.includes("krs")) role = "HOST";

    localStorage.setItem("kiit_demo_role", role);

    setTimeout(() => {
      setLoading(false);
      router.push(role === "ADMIN" ? "/admin/dashboard" : role === "HOST" ? "/host/dashboard" : redirectUrl);
    }, 800);
  };

  const handleQuickLogin = (demoRole: "student" | "host" | "admin") => {
    const user = MOCK_USERS[demoRole];
    setEmail(user.email);
    setPassword("kiit@2026");
    localStorage.setItem("kiit_demo_role", user.role);

    setTimeout(() => {
      router.push(user.role === "ADMIN" ? "/admin/dashboard" : user.role === "HOST" ? "/host/dashboard" : "/student/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-kiit-green to-emerald-800 text-white font-extrabold text-xl shadow-xl shadow-kiit-green/20">
            KIIT
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            KSAC Events Hub Sign In
          </h1>
          <p className="text-xs text-slate-400">
            Kalinga Institute of Industrial Technology, Bhubaneswar
          </p>
        </div>

        {/* Login Form Box */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          {error && (
            <div className="rounded-xl border border-rose-800 bg-rose-950/60 p-3 text-xs text-rose-300 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Official KIIT University Email *
              </label>
              <Input
                type="email"
                placeholder="21051982@kiit.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="h-4 w-4 text-emerald-500" />}
                required
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Must end with <strong className="text-emerald-400">@kiit.ac.in</strong>
              </span>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Password *
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="h-4 w-4 text-amber-500" />}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full text-sm font-bold shadow-lg shadow-kiit-green/25"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Sign In to KIIT Portal"}
              {!loading && <ArrowRight className="h-4 w-4 ml-1.5" />}
            </Button>
          </form>

          {/* Quick Demo Role Switcher */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block text-center">
              Quick 1-Click Demo Accounts:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin("student")}
                className="rounded-xl border border-slate-700 bg-slate-800/60 p-2 text-center text-xs hover:border-emerald-500 transition-colors"
              >
                <span className="block font-bold text-white">Student</span>
                <span className="text-[10px] text-slate-400">Ayush</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("host")}
                className="rounded-xl border border-slate-700 bg-slate-800/60 p-2 text-center text-xs hover:border-amber-500 transition-colors"
              >
                <span className="block font-bold text-white">Host</span>
                <span className="text-[10px] text-slate-400">KRS Lead</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("admin")}
                className="rounded-xl border border-slate-700 bg-slate-800/60 p-2 text-center text-xs hover:border-rose-500 transition-colors"
              >
                <span className="block font-bold text-white">Admin</span>
                <span className="text-[10px] text-slate-400">KSAC Dir</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
