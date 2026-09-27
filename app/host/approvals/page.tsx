"use client";

import * as React from "react";
import Link from "next/link";
import { 
  CheckSquare, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  PlusCircle, 
  Calendar, 
  MapPin, 
  ChevronRight,
  ShieldCheck,
  FileEdit
} from "lucide-react";
import { getStoredSubmissions } from "@/lib/data/store";
import { PendingSubmission } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HostApprovalsPage() {
  const [submissions, setSubmissions] = React.useState<PendingSubmission[]>([]);

  React.useEffect(() => {
    setSubmissions(getStoredSubmissions());
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="warning" className="text-xs">
              KSAC Central Clearance Tracker
            </Badge>
            <span className="text-xs text-slate-400">• Proposal Status</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <CheckSquare className="h-8 w-8 text-amber-400" />
            Proposal Review & Approvals
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time status updates from the Student Activity Centre for your submitted venue and budget proposals.
          </p>
        </div>

        <Link href="/host/events/new">
          <Button variant="primary" size="sm" className="text-xs">
            <PlusCircle className="h-4 w-4 mr-1.5" />
            Submit New Proposal
          </Button>
        </Link>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.map((sub) => (
          <div 
            key={sub.id} 
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 hover:border-slate-700 transition-all shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={
                    sub.status === "Approved" ? "success" :
                    sub.status === "Rejected" ? "danger" :
                    sub.status === "Changes Requested" ? "default" : "warning"
                  } className="text-xs">
                    {sub.status === "Approved" && <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-emerald-400" />}
                    {sub.status === "Pending" && <Clock className="h-3.5 w-3.5 mr-1 text-amber-400" />}
                    {sub.status === "Rejected" && <XCircle className="h-3.5 w-3.5 mr-1 text-rose-400" />}
                    {sub.status === "Changes Requested" && <AlertTriangle className="h-3.5 w-3.5 mr-1 text-blue-400" />}
                    {sub.status}
                  </Badge>
                  <span className="text-xs text-slate-400">• Submitted: {sub.submissionDate}</span>
                </div>
                <h2 className="text-lg font-bold text-white">{sub.title}</h2>
              </div>

              <div className="text-xs text-slate-400 sm:text-right">
                <div>Venue: <strong className="text-slate-200">{sub.venue}</strong></div>
                <div>Event Date: <strong className="text-amber-400">{sub.eventDate}</strong></div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {sub.description}
            </p>

            {/* Rejection / Changes Notes */}
            {sub.status === "Rejected" && sub.rejectionReason && (
              <div className="p-3.5 rounded-xl border border-rose-900/40 bg-rose-950/20 text-rose-300 text-xs">
                <strong>Reason for KSAC Rejection:</strong> {sub.rejectionReason}
              </div>
            )}

            {sub.status === "Changes Requested" && sub.changesNote && (
              <div className="p-3.5 rounded-xl border border-blue-900/40 bg-blue-950/20 text-blue-300 text-xs">
                <strong>Administrative Changes Requested:</strong> {sub.changesNote}
              </div>
            )}

            {sub.status === "Approved" && (
              <div className="p-3.5 rounded-xl border border-emerald-900/40 bg-emerald-950/20 text-emerald-300 text-xs flex items-center justify-between">
                <span>Approved by Joint Director KSAC. Venue booked and public registration live.</span>
                <Link href="/events" className="text-emerald-400 underline font-semibold ml-2">
                  View Public Page →
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
