"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle, 
  Clock, 
  XCircle, 
  MapPin, 
  Users, 
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  SlidersHorizontal
} from "lucide-react";
import { MOCK_EVENTS, MOCK_VENUES } from "@/lib/data/mock-data";
import { getStoredSubmissions } from "@/lib/data/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminEventsManagementPage() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("ALL");

  const storedSubmissions = typeof window !== "undefined" ? getStoredSubmissions() : [];

  // Combine standard mock events with any created or updated submissions
  const allEvents = React.useMemo(() => {
    return MOCK_EVENTS.map(e => ({
      id: e.id,
      title: e.title,
      category: e.category,
      host: e.society?.name || "KSAC Society",
      venue: e.venue?.name || "Campus Auditorium",
      date: new Date(e.start_time).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      capacity: e.max_capacity,
      rsvp: e.current_rsvp_count,
      status: e.status,
    }));
  }, []);

  const filtered = allEvents.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || 
                          e.host.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || e.status === statusFilter;
    const matchesCat = categoryFilter === "ALL" || e.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCat;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="success" className="text-xs">
              Central Registry
            </Badge>
            <span className="text-xs text-slate-400">• Total 128 Events</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Calendar className="h-8 w-8 text-kiit-green" />
            University Events Directory
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse, monitor, and regulate student society programs across all 25 KIIT campuses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/approvals">
            <Button variant="outline" size="sm" className="border-slate-700 bg-slate-900 text-slate-200">
              <Clock className="h-4 w-4 mr-2 text-amber-400" />
              Approval Queue (3)
            </Button>
          </Link>
          <Link href="/host/events/new">
            <Button variant="primary" size="sm">
              <Plus className="h-4 w-4 mr-1.5" />
              Schedule Event
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by event title, host society, or topic..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-kiit-green"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter events by status"
            className="bg-slate-950/80 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-kiit-green"
          >
            <option value="ALL">All Statuses</option>
            <option value="APPROVED">Approved</option>
            <option value="PENDING_APPROVAL">Pending Approval</option>
            <option value="COMPLETED">Completed</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter events by category"
            className="bg-slate-950/80 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-kiit-green"
          >
            <option value="ALL">All Categories</option>
            <option value="TECHNICAL">Technical</option>
            <option value="CULTURAL">Cultural</option>
            <option value="SPORTS">Sports</option>
            <option value="WORKSHOP">Workshop</option>
            <option value="FEST">Fest</option>
          </select>
        </div>
      </div>

      {/* Events Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/70 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Event & Organizer</th>
                <th className="px-6 py-4">Domain</th>
                <th className="px-6 py-4">Scheduled Date & Venue</th>
                <th className="px-6 py-4">Registrations</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white text-sm">{item.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{item.host}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-[11px]">
                      {item.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-200">{item.date}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-emerald-400" />
                      {item.venue}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="font-mono font-bold text-emerald-400">{item.rsvp}</div>
                      <span className="text-slate-500 text-xs">/ {item.capacity}</span>
                    </div>
                    <div className="h-1.5 w-24 bg-slate-800 rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full" 
                        style={{ width: `${Math.min(100, (item.rsvp / item.capacity) * 100)}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      item.status === "APPROVED" ? "success" :
                      item.status === "PENDING_APPROVAL" ? "warning" :
                      item.status === "COMPLETED" ? "default" : "danger"
                    } className="text-[10px]">
                      {item.status.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/events/${item.id}`}>
                      <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white text-xs">
                        Details
                        <ExternalLink className="h-3 w-3 ml-1.5" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
