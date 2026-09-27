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
  MessageSquare,
  Clock,
  Eye,
  Check,
  X,
  History,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  getStoredSubmissions, 
  updateSubmissionStatus, 
  PendingSubmission 
} from "@/lib/data/store";

export default function AdminApprovalsQueuePage() {
  const [submissions, setSubmissions] = React.useState<PendingSubmission[]>([]);
  const [activeTab, setActiveTab] = React.useState<"Pending" | "All" | "Approved" | "Rejected">("Pending");
  const [selectedItem, setSelectedItem] = React.useState<PendingSubmission | null>(null);
  
  // Modals state
  const [rejectingItem, setRejectingItem] = React.useState<PendingSubmission | null>(null);
  const [rejectionReason, setRejectionReason] = React.useState("");
  const [requestingItem, setRequestingItem] = React.useState<PendingSubmission | null>(null);
  const [changesNote, setChangesNote] = React.useState("");

  const [notification, setNotification] = React.useState<string | null>(null);

  // Load submissions from store
  React.useEffect(() => {
    setSubmissions(getStoredSubmissions());
  }, []);

  const handleApprove = (item: PendingSubmission) => {
    const updated = updateSubmissionStatus(item.id, "Approved");
    setSubmissions(updated);
    setNotification(`"${item.title}" has been successfully APPROVED and scheduled.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingItem) return;
    const updated = updateSubmissionStatus(rejectingItem.id, "Rejected", rejectionReason || "Does not meet university guidelines");
    setSubmissions(updated);
    setNotification(`"${rejectingItem.title}" has been REJECTED.`);
    setRejectingItem(null);
    setRejectionReason("");
    setTimeout(() => setNotification(null), 4000);
  };

  const handleConfirmRequestChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestingItem) return;
    const updated = updateSubmissionStatus(requestingItem.id, "Changes Requested", changesNote || "Please modify event timings and venue specs.");
    setSubmissions(updated);
    setNotification(`Changes requested for "${requestingItem.title}". Host has been notified.`);
    setRequestingItem(null);
    setChangesNote("");
    setTimeout(() => setNotification(null), 4000);
  };

  // Filter items by tab
  const filteredSubmissions = submissions.filter((s) => {
    if (activeTab === "Pending") return s.status === "Pending";
    if (activeTab === "Approved") return s.status === "Approved";
    if (activeTab === "Rejected") return s.status === "Rejected";
    return true;
  });

  const pendingCount = submissions.filter((s) => s.status === "Pending").length;
  const approvedCount = submissions.filter((s) => s.status === "Approved").length;
  const rejectedCount = submissions.filter((s) => s.status === "Rejected").length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Administrative Control
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {pendingCount} Pending Reviews
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Event Approval Queue
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review host event submissions, inspect campus venue clearance, and approve or request modifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Admin Dashboard
            </Button>
          </Link>
          <Link href="/admin/analytics">
            <Button variant="outline" size="sm">
              View Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Action Notification Alert */}
      {notification && (
        <div className="rounded-2xl bg-emerald-950/80 border border-emerald-500/80 p-4 text-xs font-semibold text-emerald-300 flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-emerald-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {(["Pending", "All", "Approved", "Rejected"] as const).map((tab) => {
          const count = 
            tab === "Pending" ? pendingCount : tab === "Approved" ? approvedCount : tab === "Rejected" ? rejectedCount : submissions.length;
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-kiit-green text-white shadow"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <span>{tab}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Submission Cards Grid / List */}
      <div className="space-y-4">
        {filteredSubmissions.length > 0 ? (
          filteredSubmissions.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md space-y-4 hover:border-slate-700 transition-all shadow-lg"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        item.status === "Approved"
                          ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                          : item.status === "Rejected"
                          ? "bg-rose-950 text-rose-300 border-rose-700"
                          : item.status === "Changes Requested"
                          ? "bg-amber-950 text-amber-300 border-amber-700"
                          : "bg-blue-950 text-blue-300 border-blue-700 animate-pulse"
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs font-semibold text-amber-400">
                      Category: {item.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mt-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-400">
                    Submitted by: <strong className="text-slate-200">{item.host}</strong> ({item.hostEmail || "host@kiit.ac.in"}) • Submission Date: {item.submissionDate}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedItem(item)}
                  >
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>

              {/* Event Specs Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-2xl bg-slate-950/70 p-3.5 border border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 block">Proposed Date:</span>
                    <span className="font-semibold text-white">{item.eventDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 block">Requested Venue:</span>
                    <span className="font-semibold text-white truncate">{item.venue}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <Users className="h-4 w-4 text-purple-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 block">Capacity Limit:</span>
                    <span className="font-semibold text-white">{item.capacity || 500} Attendees</span>
                  </div>
                </div>
              </div>

              {/* Description preview */}
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              {/* Status notes if rejected or changes requested */}
              {item.rejectionReason && item.status === "Rejected" && (
                <div className="rounded-xl border border-rose-900 bg-rose-950/30 p-3 text-xs text-rose-300">
                  <strong>Rejection Reason:</strong> {item.rejectionReason}
                </div>
              )}
              {item.changesNote && item.status === "Changes Requested" && (
                <div className="rounded-xl border border-amber-900 bg-amber-950/30 p-3 text-xs text-amber-300">
                  <strong>Feedback Note:</strong> {item.changesNote}
                </div>
              )}

              {/* Action Buttons for Pending Items */}
              {item.status === "Pending" && (
                <div className="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-slate-800">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setRejectingItem(item)}
                  >
                    <XCircle className="h-4 w-4 mr-1.5" />
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-amber-400 border-amber-600/50 hover:bg-amber-950/30"
                    onClick={() => setRequestingItem(item)}
                  >
                    <AlertTriangle className="h-4 w-4 mr-1.5" />
                    Request Changes
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApprove(item)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1.5" />
                    Approve & Schedule
                  </Button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-3">
            <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto" />
            <h3 className="text-base font-bold text-white">No {activeTab} Submissions</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              There are currently no event submissions matching this category filter.
            </p>
          </div>
        )}
      </div>

      {/* VIEW DETAILS MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              Proposal Details ({selectedItem.category})
            </span>
            <h2 className="text-xl font-bold text-white">{selectedItem.title}</h2>

            <div className="space-y-3 rounded-2xl bg-slate-950 p-4 border border-slate-800 text-xs">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Host / Society:</span>
                <span className="font-semibold text-white">{selectedItem.host}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Target Event Date:</span>
                <span className="font-semibold text-white">{selectedItem.eventDate}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Requested Venue:</span>
                <span className="font-semibold text-emerald-400">{selectedItem.venue}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Participant Limit:</span>
                <span className="font-semibold text-white">{selectedItem.capacity || 500} Attendees</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Budget:</span>
                <span className="font-semibold text-amber-400 font-mono">₹{selectedItem.budget?.toLocaleString("en-IN") || "1,50,000"}</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-300 block mb-1">
                Full Description & Statement of Purpose:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                {selectedItem.description}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelectedItem(null)}>
                Close
              </Button>
              {selectedItem.status === "Pending" && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    handleApprove(selectedItem);
                    setSelectedItem(null);
                  }}
                >
                  Approve Now
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {rejectingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <form
            onSubmit={handleConfirmReject}
            className="relative w-full max-w-md rounded-3xl border border-rose-900 bg-slate-900 p-6 shadow-2xl space-y-4"
          >
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <XCircle className="h-5 w-5 text-rose-500" />
              Reject Event Proposal
            </h3>
            <p className="text-xs text-slate-300">
              Rejecting <strong className="text-white">"{rejectingItem.title}"</strong>. The reason will be sent to the host.
            </p>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                Rejection Reason (Optional):
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Venue is reserved for university convocations, or proposal budget exceeds department allocation..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-rose-500 focus:outline-none"
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setRejectingItem(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="danger" size="sm">
                Confirm Rejection
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* REQUEST CHANGES MODAL */}
      {requestingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <form
            onSubmit={handleConfirmRequestChanges}
            className="relative w-full max-w-md rounded-3xl border border-amber-900 bg-slate-900 p-6 shadow-2xl space-y-4"
          >
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Request Modifications
            </h3>
            <p className="text-xs text-slate-300">
              Instruct <strong className="text-white">{requestingItem.host}</strong> on what changes are needed before approval.
            </p>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                Change Request Notes:
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Please reschedule from morning to 2:00 PM, or shift from Campus 6 Audi to Campus 7 KSAC Hall..."
                value={changesNote}
                onChange={(e) => setChangesNote(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                required
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setRequestingItem(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="gold" size="sm">
                Send Request to Host
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
