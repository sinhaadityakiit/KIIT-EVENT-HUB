"use client";

import * as React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Mail, 
  Building, 
  Phone, 
  Calendar, 
  Award, 
  CheckCircle2, 
  Lock, 
  LogOut 
} from "lucide-react";
import { getClientSession, clearSession } from "@/lib/auth/demo-session";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function AdminProfilePage() {
  const router = useRouter();
  const [session, setSession] = React.useState(getClientSession());

  React.useEffect(() => {
    setSession(getClientSession());
  }, []);

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Profile Card */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-kiit-green text-white font-extrabold text-2xl border-2 border-emerald-400 shadow-xl">
              KSAC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">
                  {session?.name || "Dr. S. K. Rout"}
                </h1>
                <Badge variant="danger" className="text-xs">
                  Central Administrator
                </Badge>
              </div>
              <p className="text-sm text-slate-300 mt-1">
                Joint Director, Student Activity Centre (KSAC)
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-emerald-400" />
                  {session?.email || "ksac.admin@kiit.ac.in"}
                </span>
                <span className="flex items-center gap-1">
                  <Building className="h-3.5 w-3.5 text-emerald-400" />
                  Campus 7, Central Office
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-rose-900/40 text-rose-300 hover:bg-rose-950/40 text-xs"
            >
              <LogOut className="h-3.5 w-3.5 mr-1.5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Permissions & Governance Responsibilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            Administrative Authority & Scope
          </h2>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Full authorization to approve, reject, or request changes on proposals</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Direct reservation control for Campus 6 Central Audi and Campus 13 Sports Complex</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>University budget sanction authority up to ₹5,00,000 per event</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Access to all student and host account records across 25 campuses</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Lock className="h-5 w-5 text-amber-400" />
            Active Session Security
          </h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Authenticated Role:</span>
              <span className="font-mono text-emerald-400 font-bold">ADMIN (KSAC)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Username:</span>
              <span className="font-mono text-white">Admin</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Security Clearance:</span>
              <span className="text-amber-400 font-semibold">Level 1 - Central Executive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
