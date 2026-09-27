"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ShieldCheck, 
  User, 
  Lock, 
  ArrowRight, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Info,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authenticateDemoUser, DEMO_CREDENTIALS } from "@/lib/auth/demo-session";
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get("redirect");

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError("Please enter your username or registered email.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    const user = authenticateDemoUser(username, password);

    setTimeout(() => {
      setLoading(false);
      if (user) {
        // Successful login: redirect based on role or original redirect
        if (redirectUrl && !redirectUrl.includes("login") && !redirectUrl.includes("unauthorized")) {
          router.push(redirectUrl);
        } else if (user.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else if (user.role === "HOST") {
          router.push("/host/dashboard");
        } else {
          router.push("/student/dashboard");
        }
      } else {
        setError("Invalid username or password. Please use the example credentials provided below.");
      }
    }, 450);
  };

  const handleFillCredentials = (index: number) => {
    const cred = DEMO_CREDENTIALS[index];
    setUsername(cred.username);
    setPassword(cred.password);
    setError(null);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-kiit-green to-emerald-800 text-white font-extrabold text-xl shadow-xl shadow-kiit-green/20">
            KIIT
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Events Hub Portal Login
          </h1>
          <p className="text-xs text-slate-400">
            Sign in with your role-based demo credentials
          </p>
        </div>

        {/* Global Educational Disclaimer */}
        <DisclaimerBanner variant="card" />

        {/* Login Form Box */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          {error && (
            <div className="rounded-xl border border-rose-800 bg-rose-950/60 p-3.5 text-xs text-rose-300 flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Username or Email *
              </label>
              <Input
                type="text"
                placeholder="e.g. Admin, host1, or student1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                icon={<User className="h-4 w-4 text-emerald-500" />}
                required
              />
            </div>

            {/* Password Field with Show/Hide Toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Password *
                </label>
              </div>
              <div className="relative flex items-center">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="h-4 w-4 text-amber-500" />}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full text-sm font-bold shadow-lg shadow-kiit-green/25 mt-2"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Log In to Dashboard"}
              {!loading && <ArrowRight className="h-4 w-4 ml-1.5" />}
            </Button>
          </form>

          {/* DEMO CREDENTIALS QUICK-FILL BOX */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                Demo Credentials (Click to Fill):
              </span>
            </div>

            <div className="space-y-2">
              {DEMO_CREDENTIALS.map((cred, idx) => (
                <button
                  key={cred.username}
                  type="button"
                  onClick={() => handleFillCredentials(idx)}
                  className="w-full flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-2.5 text-xs text-left hover:border-slate-700 hover:bg-slate-800/40 transition-all group"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          cred.user.role === "ADMIN"
                            ? "bg-rose-950 text-rose-300 border border-rose-800/60"
                            : cred.user.role === "HOST"
                            ? "bg-amber-950 text-amber-300 border border-amber-800/60"
                            : "bg-emerald-950 text-emerald-300 border border-emerald-800/60"
                        }`}
                      >
                        {cred.user.role}
                      </span>
                      <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {cred.username}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      Password: <code className="font-mono text-slate-300">{cred.password}</code>
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 group-hover:text-white transition-colors">
                    Fill &rarr;
                  </span>
                </button>
              ))}
            </div>

            <p className="text-[10px] text-slate-500 leading-relaxed text-center pt-1">
              *These are DEMO credentials for prototype testing. No production credentials or authorization are represented.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center text-slate-400">
        Loading login portal...
      </div>
    }>
      <LoginForm />
    </React.Suspense>
  );
}
