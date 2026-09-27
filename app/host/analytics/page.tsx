"use client";

import * as React from "react";
import Link from "next/link";
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Calendar, 
  Star, 
  CheckCircle2, 
  Award,
  ChevronRight,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HostAnalyticsPage() {
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);

  const handleExport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="warning" className="text-xs">
              Society Performance
            </Badge>
            <span className="text-xs text-slate-400">• KSAC Verified Stats</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-amber-400" />
            Host Event Performance & Analytics
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track student RSVP conversion, attendance check-ins, and post-event attendee ratings.
          </p>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExport}
          className="border-slate-700 bg-slate-900 text-slate-200 text-xs self-start sm:self-auto"
        >
          <Download className="h-4 w-4 mr-1.5 text-amber-400" />
          Export Society Report
        </Button>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Attendance and registration log exported (<strong>Society_Attendance_2026.csv</strong>).</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Society RSVPs</span>
            <Users className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">1,466</div>
          <p className="text-[11px] text-emerald-400 font-medium">+31% from last semester</p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Check-in Attendance Rate</span>
            <CheckCircle2 className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-400">92.6%</div>
          <p className="text-[11px] text-slate-400 font-medium">1,358 QR scans verified</p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Average Student Rating</span>
            <Star className="h-4 w-4 text-kiit-gold" />
          </div>
          <div className="text-3xl font-extrabold text-white flex items-center gap-1.5">
            4.85 <span className="text-base text-slate-500 font-normal">/ 5.0</span>
          </div>
          <p className="text-[11px] text-amber-400 font-medium">Based on 412 student reviews</p>
        </div>
      </div>
    </div>
  );
}
