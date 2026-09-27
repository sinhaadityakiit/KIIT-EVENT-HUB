"use client";

import * as React from "react";
import Link from "next/link";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Users, 
  ArrowUpRight, 
  Download, 
  Filter, 
  Award,
  CheckCircle2,
  Clock,
  XCircle,
  FileSpreadsheet,
  ChevronRight,
  ShieldCheck,
  Building2,
  Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = React.useState<"30d" | "semester" | "year">("semester");
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);

  const handleExport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  // Popular Events Ranking as required by specification
  const popularEvents = [
    { rank: 1, name: "KIIT Cultural Fest 2026", registrations: 842, category: "Cultural", host: "Korus Music Society", capacity: 1500, percentFilled: 92 },
    { rank: 2, name: "Inter-College Cricket Championship", registrations: 624, category: "Sports", host: "Sports Club", capacity: 800, percentFilled: 78 },
    { rank: 3, name: "AI & Future Technology Workshop", registrations: 487, category: "Technical", host: "Tech Club / KRS", capacity: 500, percentFilled: 97 },
    { rank: 4, name: "Photography Walk & Exhibition", registrations: 312, category: "Cultural", host: "K-Click Photographers", capacity: 350, percentFilled: 89 },
  ];

  // Category breakdown
  const categoryStats = [
    { name: "Technical", count: 44, pct: 34, color: "bg-emerald-500", textCol: "text-emerald-400" },
    { name: "Cultural", count: 36, pct: 28, color: "bg-purple-500", textCol: "text-purple-400" },
    { name: "Sports", count: 23, pct: 18, color: "bg-amber-500", textCol: "text-amber-400" },
    { name: "Workshops & Seminars", count: 15, pct: 12, color: "bg-blue-500", textCol: "text-blue-400" },
    { name: "Social & Hackathons", count: 10, pct: 8, color: "bg-rose-500", textCol: "text-rose-400" },
  ];

  // Monthly trend mock data
  const monthlyData = [
    { month: "Jun", count: 280, events: 11 },
    { month: "Jul", count: 410, events: 14 },
    { month: "Aug", count: 620, events: 21 },
    { month: "Sep", count: 810, events: 29 },
    { month: "Oct (Proj)", count: 960, events: 35 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header with Title and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="success" className="text-xs">
              <ShieldCheck className="h-3.5 w-3.5 mr-1" />
              KSAC Central Intelligence
            </Badge>
            <span className="text-xs text-slate-400">• Academic Session 2025-26</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-emerald-400" />
            University Event Analytics & Reports
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Comprehensive audit of campus registrations, student engagement metrics, and society performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setTimeRange("30d")}
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                timeRange === "30d" ? "bg-kiit-green text-white shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange("semester")}
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                timeRange === "semester" ? "bg-kiit-green text-white shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              This Semester
            </button>
            <button
              onClick={() => setTimeRange("year")}
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                timeRange === "year" ? "bg-kiit-green text-white shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              Full Year
            </button>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExport}
            className="flex items-center gap-2 border-slate-700 bg-slate-900/80 text-slate-200 hover:text-white"
          >
            <Download className="h-4 w-4 text-emerald-400" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-sm flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span>Audit analytics report successfully prepared (<strong>KIIT_Events_Analytics_2026.csv</strong>).</span>
          </div>
          <span className="text-xs text-emerald-400 font-mono">Status: Ready</span>
        </div>
      )}

      {/* Primary KPI Cards (Exact numbers requested) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Events Overview */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
              <Calendar className="h-4 w-4 text-emerald-400" />
              <span>Total Events Managed</span>
            </div>
            <span className="flex items-center text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              <TrendingUp className="h-3 w-3 mr-1" /> +18.4%
            </span>
          </div>
          <div className="text-4xl font-extrabold text-white tracking-tight">128</div>
          <p className="text-xs text-slate-400 mt-1">Scheduled across 25 KIIT campuses</p>

          <div className="mt-5 grid grid-cols-4 gap-2 pt-4 border-t border-slate-800/80 text-center">
            <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/20">
              <div className="text-lg font-bold text-emerald-400">24</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Upcoming</div>
            </div>
            <div className="p-2 rounded-lg bg-blue-950/30 border border-blue-500/20">
              <div className="text-lg font-bold text-blue-400">91</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Completed</div>
            </div>
            <div className="p-2 rounded-lg bg-amber-950/30 border border-amber-500/20">
              <div className="text-lg font-bold text-amber-400">13</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Pending</div>
            </div>
            <div className="p-2 rounded-lg bg-rose-950/30 border border-rose-500/20">
              <div className="text-lg font-bold text-rose-400">7</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Rejected</div>
            </div>
          </div>
        </div>

        {/* Metric 2: Registrations */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
              <TrendingUp className="h-4 w-4 text-kiit-gold" />
              <span>Total Registrations</span>
            </div>
            <span className="flex items-center text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              <TrendingUp className="h-3 w-3 mr-1" /> +24.2%
            </span>
          </div>
          <div className="text-4xl font-extrabold text-white tracking-tight">4,862</div>
          <p className="text-xs text-slate-400 mt-1">Verified student RSVPs generated</p>

          <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-slate-800/80">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">This Month</div>
                <div className="text-xl font-bold text-white mt-0.5">742</div>
              </div>
              <span className="text-[11px] font-medium text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded">
                Active Peak
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Avg per Event</div>
                <div className="text-xl font-bold text-amber-400 mt-0.5">38</div>
              </div>
              <span className="text-[11px] font-medium text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded">
                Students
              </span>
            </div>
          </div>
        </div>

        {/* Metric 3: Active Users Breakdown */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
              <Users className="h-4 w-4 text-purple-400" />
              <span>Platform Stakeholders</span>
            </div>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
              3,330 Total
            </span>
          </div>
          <div className="text-4xl font-extrabold text-white tracking-tight">3,240</div>
          <p className="text-xs text-slate-400 mt-1">Enrolled student participants</p>

          <div className="mt-5 grid grid-cols-3 gap-2 pt-4 border-t border-slate-800/80 text-center">
            <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800">
              <div className="text-lg font-bold text-emerald-400">3,240</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Students</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800">
              <div className="text-lg font-bold text-amber-400">86</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Hosts / Clubs</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800">
              <div className="text-lg font-bold text-purple-400">4</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Admins (KSAC)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Registrations & Events Trend (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Monthly Registration & Participation Curve
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Surge in student RSVPs during Autumn cultural and hackathon season
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="h-3 w-3 rounded bg-emerald-500 inline-block"></span>
                <span>Registrations</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="h-3 w-3 rounded bg-amber-500 inline-block"></span>
                <span>Events</span>
              </div>
            </div>
          </div>

          {/* SVG Bar & Trend Chart */}
          <div className="h-64 w-full flex items-end justify-between gap-4 pt-8 px-2 border-b border-slate-800">
            {monthlyData.map((d) => {
              const heightPct = Math.round((d.count / 1000) * 100);
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                  {/* Tooltip on hover */}
                  <div className="text-[11px] font-mono text-emerald-400 font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                    {d.count}
                  </div>
                  {/* Bar representation */}
                  <div className="w-full max-w-[56px] rounded-t-lg bg-slate-800/80 overflow-hidden flex flex-col justify-end h-44 relative group-hover:border-emerald-500/50 border border-transparent transition-all">
                    <div 
                      style={{ height: `${heightPct}%` }} 
                      className="w-full bg-gradient-to-t from-emerald-700 via-emerald-500 to-emerald-400 rounded-t-md transition-all duration-500 group-hover:brightness-110"
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors">
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>Average Attendance Conversion: <strong className="text-emerald-400">91.4%</strong></span>
            <span>Fastest registration sell-out: <strong className="text-amber-400">KIIT Cultural Fest (14 hrs)</strong></span>
          </div>
        </div>

        {/* Category Breakdown Donut / Progress (1 col) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2 mb-1">
              <Flame className="h-5 w-5 text-amber-400" />
              Event Categories Distribution
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Breakdown across all 128 campus events
            </p>

            <div className="space-y-4">
              {categoryStats.map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{cat.name}</span>
                    <span className="font-mono font-semibold text-slate-200">
                      {cat.count} <span className="text-slate-500">({cat.pct}%)</span>
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${cat.color}`} 
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Leading domain: <strong className="text-white">Technical (KSCE/KRS)</strong></span>
            <Link href="/admin/approvals" className="text-emerald-400 hover:underline">
              View queue →
            </Link>
          </div>
        </div>
      </div>

      {/* Popular Events Table (Exact requirements) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden shadow-lg">
        <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-kiit-gold" />
              Top University Events by Student Registrations
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Ranked by confirmed QR ticket registrations across all KIIT societies
            </p>
          </div>
          <Link href="/admin/events">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white text-xs">
              View All 128 Events
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="px-6 py-3.5">Rank & Event Title</th>
                <th className="px-6 py-3.5">Domain</th>
                <th className="px-6 py-3.5">Organizer Society</th>
                <th className="px-6 py-3.5">Capacity Filled</th>
                <th className="px-6 py-3.5 text-right">Confirmed RSVPs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {popularEvents.map((evt) => (
                <tr key={evt.rank} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-lg font-extrabold text-xs ${
                        evt.rank === 1 ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" :
                        evt.rank === 2 ? "bg-slate-400/20 text-slate-200 border border-slate-400/40" :
                        evt.rank === 3 ? "bg-amber-700/20 text-amber-500 border border-amber-700/40" :
                        "bg-slate-800 text-slate-400"
                      }`}>
                        #{evt.rank}
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">{evt.name}</div>
                        <div className="text-[11px] text-slate-400">Campus Auditorium & Grounds</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      evt.category === "Technical" ? "default" :
                      evt.category === "Sports" ? "warning" : "success"
                    } className="text-[11px]">
                      {evt.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-300 font-medium">
                    {evt.host}
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-36 space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>{evt.percentFilled}% filled</span>
                        <span>{evt.capacity} cap</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-kiit-green rounded-full" 
                          style={{ width: `${evt.percentFilled}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="font-mono font-extrabold text-base text-emerald-400">
                      {evt.registrations.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase">Tickets Issued</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campus Venue Utilization Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Campus 6 Central Audi</div>
            <div className="text-lg font-bold text-white">94% Booked</div>
            <div className="text-[11px] text-emerald-400">Next available: 28 Oct 2026</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Campus 13 Sports Complex</div>
            <div className="text-lg font-bold text-white">82% Booked</div>
            <div className="text-[11px] text-amber-400">Active Cricket & Football slots</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-400">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Campus 3 Convention Centre</div>
            <div className="text-lg font-bold text-white">88% Booked</div>
            <div className="text-[11px] text-blue-400">Workshops & Hackathons</div>
          </div>
        </div>
      </div>
    </div>
  );
}
