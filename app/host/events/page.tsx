"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Calendar, 
  PlusCircle, 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_EVENTS } from "@/lib/data/mock-data";
import { getStoredSubmissions } from "@/lib/data/store";

export default function HostEventsPage() {
  const [submissions, setSubmissions] = React.useState(getStoredSubmissions());

  React.useEffect(() => {
    setSubmissions(getStoredSubmissions());
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="warning" className="text-xs">
              Host Organizer Desk
            </Badge>
            <span className="text-xs text-slate-400">• Society Programs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Calendar className="h-8 w-8 text-amber-400" />
            My Organized Events & Proposals
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your society&apos;s active events, track live RSVP registrations, and monitor proposal clearances.
          </p>
        </div>

        <Link href="/host/events/new">
          <Button variant="primary" size="sm" className="text-xs">
            <PlusCircle className="h-4 w-4 mr-1.5" />
            Create New Event
          </Button>
        </Link>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {submissions.map((sub) => (
          <div 
            key={sub.id} 
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-amber-400/40 transition-all shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant={
                  sub.status === "Approved" ? "success" :
                  sub.status === "Rejected" ? "danger" : "warning"
                } className="text-xs">
                  {sub.status}
                </Badge>
                <span className="text-xs text-slate-400 font-mono">{sub.category}</span>
              </div>

              <h2 className="text-lg font-bold text-white line-clamp-1">
                {sub.title}
              </h2>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {sub.description}
              </p>

              <div className="pt-2 space-y-1.5 text-xs text-slate-300 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{sub.eventDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  <span>{sub.timeSlot || "Scheduled slot"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-rose-400" />
                  <span className="truncate">{sub.venue}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Target: <strong className="text-white">{sub.capacity || 500}</strong></span>
              <Link href="/host/approvals" className="text-amber-400 hover:underline flex items-center gap-1 font-medium">
                Track Review <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
