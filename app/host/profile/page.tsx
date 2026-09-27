"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Building, 
  Mail, 
  Award, 
  Calendar, 
  LogOut, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  PlusCircle
} from "lucide-react";
import { getClientSession, clearSession } from "@/lib/auth/demo-session";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function HostProfilePage() {
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
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-2xl border-2 border-amber-300 shadow-xl">
              H1
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">
                  {session?.name || "Priya Mohanty"}
                </h1>
                <Badge variant="warning" className="text-xs">
                  Verified Host Lead
                </Badge>
              </div>
              <p className="text-sm text-slate-300 mt-1">
                {session?.society || "KIIT Robotics Society (KRS)"}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1 font-mono text-amber-400 font-bold">
                  Username: host1
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  {session?.email || "host1@kiit.ac.in"}
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

      {/* Host Society Authority Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Proposals Submitted</div>
            <div className="text-2xl font-bold text-white mt-1">6</div>
            <Link href="/host/approvals" className="text-xs text-amber-400 hover:underline mt-2 inline-block">
              Track Approvals →
            </Link>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-950/60 text-amber-400 border border-amber-500/30">
            <Calendar className="h-6 w-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Live RSVPs</div>
            <div className="text-2xl font-bold text-white mt-1">1,466</div>
            <Link href="/host/analytics" className="text-xs text-emerald-400 hover:underline mt-2 inline-block">
              View Analytics →
            </Link>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
            <Award className="h-6 w-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">KSAC Host Status</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">Verified</div>
            <span className="text-xs text-slate-500 mt-2 inline-block">Valid until Jul 2027</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-950/60 text-purple-400 border border-purple-500/30">
            <ShieldCheck className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
