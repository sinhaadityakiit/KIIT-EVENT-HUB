"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Building, CheckCircle, AlertTriangle, Users, Clock } from "lucide-react";
import { MOCK_VENUES, MOCK_EVENTS } from "@/lib/data/mock-data";
import { Badge } from "@/components/ui/badge";

export default function AdminVenueConflictManagerPage() {
  const [selectedDate, setSelectedDate] = React.useState("2026-10-14");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Admin Dashboard</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Resource Allocation & Anti-Overlap Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Campus Venue Conflict & Booking Matrix
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Inspect real-time booking schedules and automated conflict logs across all university auditoriums.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400 font-medium">Inspect Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white focus:border-kiit-green focus:outline-none"
          />
        </div>
      </div>

      {/* Conflict Log Banner */}
      <div className="rounded-2xl border border-amber-800/80 bg-amber-950/40 p-4 text-xs text-amber-200 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-white">Active Venue Overlap Flagged by Database Engine</h4>
          <p className="text-amber-200/90 mt-0.5">
            <strong>Campus 6 Central Auditorium</strong> received an event proposal ("RoboRumble 2026") that conflicts with approved flagship event ("Kreative Hacks 2026") on <strong>Oct 14, 2026</strong>. The Postgres exclusion constraint is actively preventing double booking.
          </p>
        </div>
      </div>

      {/* Venue Timeline Matrix */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="h-4 w-4 text-emerald-400" />
          Campus Auditoriums Schedule Matrix ({selectedDate})
        </h3>

        <div className="space-y-4">
          {MOCK_VENUES.map((venue) => {
            const isCamp6 = venue.id === "ven-camp6-audi";
            const isCamp7 = venue.id === "ven-camp7-ksac";

            return (
              <div
                key={venue.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Building className="h-4 w-4 text-emerald-400" />
                    <span className="font-bold text-white text-sm">{venue.name}</span>
                    <Badge variant="outline" className="text-[10px]">
                      {venue.capacity} seats
                    </Badge>
                  </div>
                  <div>
                    {isCamp6 ? (
                      <Badge variant="danger">Occupied (Flagship Hackathon)</Badge>
                    ) : (
                      <Badge variant="success">Slots Available</Badge>
                    )}
                  </div>
                </div>

                {/* Visual Time Block */}
                <div className="relative h-12 w-full rounded-xl bg-slate-900 border border-slate-800 flex items-center px-3 overflow-hidden text-xs">
                  {isCamp6 ? (
                    <div className="absolute inset-y-1 left-2 right-2 rounded-lg bg-emerald-950 border border-emerald-600/80 px-3 flex items-center justify-between text-emerald-300">
                      <span className="font-bold truncate">
                        Kreative Hacks 2026 (KRS + GDGC) • 09:00 AM - 09:00 PM (Approved)
                      </span>
                      <span className="font-mono text-[10px] text-emerald-400 uppercase">
                        Booked
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full text-slate-500 text-[11px]">
                      <span>Morning (08:00 AM - 12:00 PM): Free</span>
                      <span>Afternoon (12:00 PM - 05:00 PM): Free</span>
                      <span>Evening (05:00 PM - 10:00 PM): Free</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
