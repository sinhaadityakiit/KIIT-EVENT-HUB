"use client";

import * as React from "react";
import Link from "next/link";
import { 
  User, 
  Mail, 
  School, 
  Ticket, 
  Award, 
  Calendar, 
  LogOut, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Film
} from "lucide-react";
import { getClientSession, clearSession } from "@/lib/auth/demo-session";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function StudentProfilePage() {
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
              AS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">
                  {session?.name || "Ayush Sharma"}
                </h1>
                <Badge variant="success" className="text-xs">
                  Active Student
                </Badge>
              </div>
              <p className="text-sm text-slate-300 mt-1">
                {session?.school || "School of Computer Engineering (KSCE)"}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1 font-mono text-emerald-400 font-bold">
                  Roll: {session?.rollNumber || "21051982"}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  {session?.email || "21051982@kiit.ac.in"}
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

      {/* Engagement & Activity Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Confirmed Passes</div>
            <div className="text-2xl font-bold text-white mt-1">3</div>
            <Link href="/student/registrations" className="text-xs text-emerald-400 hover:underline mt-2 inline-block">
              View Passes →
            </Link>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
            <Ticket className="h-6 w-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Events Attended</div>
            <div className="text-2xl font-bold text-white mt-1">14</div>
            <span className="text-xs text-slate-500 mt-2 inline-block">Past Semesters</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-950/60 text-blue-400 border border-blue-500/30">
            <Calendar className="h-6 w-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Certificates Earned</div>
            <div className="text-2xl font-bold text-white mt-1">5</div>
            <span className="text-xs text-amber-400 mt-2 inline-block">KSAC Verified</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-950/60 text-amber-400 border border-amber-500/30">
            <Award className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/student/registrations" className="group p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-emerald-500/40 transition-all flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
              <Ticket className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                My Digital Passes & QR Tickets
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Quick entry passes for upcoming cultural and tech events.
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link href="/student/vlogs" className="group p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-amber-500/40 transition-all flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-950/60 text-amber-400 border border-amber-500/30">
              <Film className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors">
                Campus Vlogs & Highlights
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Watch aftermovies, fest coverage, and campus reels.
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  );
}
