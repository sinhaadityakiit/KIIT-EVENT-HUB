"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Users, 
  Calendar, 
  PlusCircle, 
  QrCode, 
  FileSpreadsheet, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertTriangle 
} from "lucide-react";
import { MOCK_USERS, MOCK_SOCIETIES, MOCK_EVENTS } from "@/lib/data/mock-data";
import { formatDate, formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HostDashboardPage() {
  const host = MOCK_USERS.host;
  const society = MOCK_SOCIETIES[0]; // KIIT Robotics Society (KRS)
  const societyEvents = MOCK_EVENTS.filter((e) => e.society_id === society.id);

  const totalRsvps = societyEvents.reduce((acc, curr) => acc + curr.current_rsvp_count, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Society Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={society.logo_url}
              alt={society.name}
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-amber-500/60 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  {society.name}
                </h1>
                <Badge variant="gold" className="text-[10px]">
                  Society Host
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Lead Organizer: <span className="font-semibold text-white">{host.full_name}</span> ({host.email})
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Faculty Coordinator: {society.faculty_coordinator}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/host/events/new">
              <Button variant="gold" size="md">
                <PlusCircle className="h-4 w-4 mr-2" />
                Submit New Proposal
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total RSVPs</span>
            <Users className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2">{totalRsvps}</p>
          <span className="text-[11px] text-emerald-400 font-medium">Across all society events</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Active Events</span>
            <Calendar className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            {societyEvents.filter((e) => e.status === "APPROVED").length}
          </p>
          <span className="text-[11px] text-amber-400 font-medium">Published on portal</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Pending Approvals</span>
            <Clock className="h-4 w-4 text-purple-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            {societyEvents.filter((e) => e.status === "PENDING_APPROVAL").length}
          </p>
          <span className="text-[11px] text-purple-400 font-medium">Under review at KSAC</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Avg. Turnout Rate</span>
            <TrendingUp className="h-4 w-4 text-blue-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2">84.2%</p>
          <span className="text-[11px] text-blue-400 font-medium">QR Gate Attendance</span>
        </div>
      </div>

      {/* Society Events Management List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Society Events Management</h2>
          <span className="text-xs text-slate-400">{societyEvents.length} Events on Record</span>
        </div>

        <div className="divide-y divide-slate-800 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md overflow-hidden">
          {societyEvents.map((evt) => (
            <div key={evt.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/20 transition-colors">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      evt.status === "APPROVED"
                        ? "success"
                        : evt.status === "PENDING_APPROVAL"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {evt.status}
                  </Badge>
                  <span className="text-xs font-mono text-slate-400">{evt.category}</span>
                </div>
                <h3 className="text-base font-bold text-white">{evt.title}</h3>
                <p className="text-xs text-slate-400">
                  {formatDate(evt.start_time)} • {evt.venue?.name}
                </p>
                <div className="text-xs text-emerald-400 font-medium pt-1">
                  RSVP: {evt.current_rsvp_count} / {evt.max_capacity} Seats Filled
                </div>
              </div>

              {/* Host Quick Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/host/events/${evt.id}/scanner`}>
                  <Button variant="primary" size="sm">
                    <QrCode className="h-4 w-4 mr-1.5" />
                    QR Scanner Tool
                  </Button>
                </Link>
                <Link href={`/host/events/${evt.id}/attendees`}>
                  <Button variant="secondary" size="sm">
                    <FileSpreadsheet className="h-4 w-4 mr-1.5 text-emerald-400" />
                    Attendees List
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
