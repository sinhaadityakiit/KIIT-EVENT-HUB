"use client";

import * as React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign,
  MessageSquare
} from "lucide-react";
import { MOCK_EVENTS, MOCK_VENUES } from "@/lib/data/mock-data";
import { formatDate, formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VenueConflictBanner } from "@/components/events/venue-conflict-banner";
import { EventItem, EventStatus } from "@/types";

export default function AdminApprovalsQueuePage() {
  const [proposals, setProposals] = React.useState<EventItem[]>(
    MOCK_EVENTS.filter((e) => e.status === "PENDING_APPROVAL")
  );
  const [decisionNotes, setDecisionNotes] = React.useState<Record<string, string>>({});
  const [actionVerdict, setActionVerdict] = React.useState<string | null>(null);

  const handleDecision = (eventId: string, decision: EventStatus) => {
    const note = decisionNotes[eventId] || "";
    setProposals((prev) => prev.filter((p) => p.id !== eventId));
    setActionVerdict(
      `Event proposal has been marked as ${decision}. ${
        note ? `Reviewer Note: "${note}".` : ""
      } Notification email dispatched to society coordinator.`
    );

    setTimeout(() => {
      setActionVerdict(null);
    }, 4000);
  };

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
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              KSAC Central Approvals Hub
            </span>
            <Badge variant="warning">{proposals.length} Pending Clearance</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Society Event Proposals Review
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review event proposals, budget requests, and campus auditorium bookings.
          </p>
        </div>
      </div>

      {/* Action Verdict Banner */}
      {actionVerdict && (
        <div className="rounded-2xl bg-emerald-950/80 border border-emerald-500/80 p-4 text-emerald-300 text-xs font-medium flex items-center gap-2 shadow-lg">
          <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{actionVerdict}</span>
        </div>
      )}

      {/* Proposals Queue */}
      <div className="space-y-6">
        {proposals.length > 0 ? (
          proposals.map((evt) => {
            // Check conflict: Campus 6 Audi overlap with Kreative Hacks 2026
            const isConflicting =
              evt.venue_id === "ven-camp6-audi" && evt.start_time.includes("2026-10-14");

            return (
              <div
                key={evt.id}
                className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md space-y-6"
              >
                {/* Proposal Title & Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="warning">{evt.status}</Badge>
                      <span className="text-xs font-mono text-emerald-400">
                        {evt.society?.name}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white mt-1.5">{evt.title}</h2>
                    {evt.tagline && (
                      <p className="text-xs text-slate-400 mt-0.5">{evt.tagline}</p>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs text-slate-400 block">Requested Budget</span>
                    <span className="text-lg font-mono font-bold text-emerald-400">
                      ₹{evt.budget_estimate?.toLocaleString("en-IN") || "0"}
                    </span>
                  </div>
                </div>

                {/* Key Event Specifications */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl bg-slate-950/70 p-4 border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-1 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                      Date & Timings
                    </span>
                    <p className="font-semibold text-white">
                      {formatDate(evt.start_time)} ({formatTime(evt.start_time)} - {formatTime(evt.end_time)})
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-1 flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-amber-400" />
                      Requested Venue
                    </span>
                    <p className="font-semibold text-white">{evt.venue?.name}</p>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-1 flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-purple-400" />
                      Target Audience & Limit
                    </span>
                    <p className="font-semibold text-white">
                      {evt.max_capacity} Seats ({evt.target_audience?.join(", ")})
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="text-xs text-slate-300 leading-relaxed">
                  <span className="font-semibold text-white block mb-1">Proposal Objective:</span>
                  <p>{evt.description}</p>
                </div>

                {/* Real-time Venue Conflict Warning */}
                <div>
                  <VenueConflictBanner
                    venueName={evt.venue?.name || "Campus 6 - Central Auditorium"}
                    hasConflict={isConflicting}
                    conflictingEventTitle="Kreative Hacks 2026 (KRS)"
                    conflictingTime="Oct 14, 09:00 AM - Oct 15, 09:00 PM"
                  />
                </div>

                {/* Reviewer Note / Modification Instructions */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                    Reviewer Notes / Society Guidance:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Approved contingent on shifting sound check to 8 AM, OR please switch venue to Campus 7 KSAC..."
                    value={decisionNotes[evt.id] || ""}
                    onChange={(e) =>
                      setDecisionNotes({ ...decisionNotes, [evt.id]: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-kiit-green focus:outline-none"
                  />
                </div>

                {/* Admin Decision Actions */}
                <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDecision(evt.id, "REJECTED")}
                  >
                    <XCircle className="h-4 w-4 mr-1.5" />
                    Reject Proposal
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDecision(evt.id, "CHANGES_REQUESTED")}
                    className="text-amber-400 border-amber-500/50 hover:bg-amber-950/20"
                  >
                    <AlertTriangle className="h-4 w-4 mr-1.5" />
                    Request Changes
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleDecision(evt.id, "APPROVED")}
                  >
                    <CheckCircle className="h-4 w-4 mr-1.5" />
                    Approve & Publish to Campus
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-3">
            <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto" />
            <h3 className="text-base font-bold text-white">Approvals Queue is Clear</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              All submitted society event proposals have been reviewed and processed by KSAC.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
