"use client";

import * as React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Users, 
  Calendar, 
  TrendingUp, 
  Building, 
  Award, 
  CheckCircle, 
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import { MOCK_EVENTS, MOCK_SOCIETIES, MOCK_VENUES } from "@/lib/data/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboardPage() {
  const pendingCount = MOCK_EVENTS.filter((e) => e.status === "PENDING_APPROVAL").length;
  const approvedCount = MOCK_EVENTS.filter((e) => e.status === "APPROVED").length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Admin Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-kiit-green text-white font-extrabold text-2xl border-2 border-emerald-400 shadow-xl">
              KSAC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  University Central Administration
                </h1>
                <Badge variant="danger" className="text-[10px]">
                  KSAC Joint Director
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Kalinga Institute of Industrial Technology • Student Activity Centre (Campus 7)
              </p>
              <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                University Governance & Venue Conflict Control Active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/approvals">
              <Button variant="primary" size="md" className="relative">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Review Pending Proposals
                {pendingCount > 0 && (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-slate-950">
                    {pendingCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Active Events</span>
            <Calendar className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2">{approvedCount}</p>
          <span className="text-[11px] text-emerald-400 font-medium">Published across campuses</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Awaiting Clearance</span>
            <AlertTriangle className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-2">{pendingCount}</p>
          <span className="text-[11px] text-amber-400 font-medium">Requires KSAC Action</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Campus Venues</span>
            <Building className="h-4 w-4 text-purple-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            {MOCK_VENUES.length} Auditoriums
          </p>
          <span className="text-[11px] text-purple-400 font-medium">Conflict protection on</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Student Participation</span>
            <TrendingUp className="h-4 w-4 text-blue-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2">2,294</p>
          <span className="text-[11px] text-blue-400 font-medium">Confirmed RSVPs</span>
        </div>
      </div>

      {/* Society Leaderboard & Venue Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Society Leaderboard */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-400" />
              Top Active Societies Leaderboard
            </h3>
            <span className="text-xs text-slate-400">By Engagement</span>
          </div>

          <div className="space-y-3">
            {[
              { name: "KIIT Robotics Society (KRS)", events: 4, rsvps: 1120, tag: "Technical" },
              { name: "Korus - Music Society", events: 3, rsvps: 750, tag: "Cultural" },
              { name: "Google Developer Groups (GDGC KIIT)", events: 2, rsvps: 620, tag: "Technical" },
              { name: "Kalakaar - Dramatics Club", events: 2, rsvps: 530, tag: "Cultural" },
            ].map((soc, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-2xl bg-slate-950/70 p-3.5 border border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-800 text-xs font-bold text-amber-400">
                    #{i + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white">{soc.name}</h4>
                    <span className="text-[10px] text-slate-400">{soc.tag} • {soc.events} Events</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    {soc.rsvps} RSVPs
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auditorium Booking Summary */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building className="h-4 w-4 text-emerald-400" />
              Campus Auditoriums Live Status
            </h3>
            <Link
              href="/admin/venues"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Conflict Matrix →
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_VENUES.map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between rounded-2xl bg-slate-950/70 p-3.5 border border-slate-800 text-xs"
              >
                <div>
                  <span className="font-bold text-white block">{v.name}</span>
                  <span className="text-slate-400 text-[11px]">{v.capacity} Seating Capacity</span>
                </div>
                <div>
                  {v.id === "ven-camp6-audi" ? (
                    <Badge variant="warning">Booked (Oct 14-15)</Badge>
                  ) : (
                    <Badge variant="success">Available</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
