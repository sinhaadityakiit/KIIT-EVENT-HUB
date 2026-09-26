"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  Star, 
  Download, 
  Clock, 
  User, 
  CheckCircle, 
  QrCode,
  AlertCircle
} from "lucide-react";
import { MOCK_USERS, MOCK_REGISTRATIONS } from "@/lib/data/mock-data";
import { formatDate, formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrTicketPass } from "@/components/tickets/qr-ticket-pass";
import { Registration } from "@/types";

export default function StudentDashboardPage() {
  const student = MOCK_USERS.student;
  const [registrations, setRegistrations] = React.useState(MOCK_REGISTRATIONS);
  const [activeTicket, setActiveTicket] = React.useState<Registration | null>(null);

  // Feedback state
  const [feedbackRating, setFeedbackRating] = React.useState(5);
  const [feedbackText, setFeedbackText] = React.useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = React.useState(false);
  const [activeFeedbackEvent, setActiveFeedbackEvent] = React.useState<string | null>(null);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setActiveFeedbackEvent(null);
      setFeedbackSubmitted(false);
      setFeedbackText("");
    }, 1800);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Student Profile Card */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-950 p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={student.avatar_url}
              alt={student.full_name}
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-emerald-500/60 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  {student.full_name}
                </h1>
                <Badge variant="success" className="text-[10px]">
                  Verified Student
                </Badge>
              </div>
              <p className="text-xs sm:text-sm font-mono text-emerald-400 font-semibold mt-0.5">
                Roll Number: {student.roll_number}
              </p>
              <p className="text-xs text-slate-400 mt-1">{student.school}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-center">
              <span className="text-xl font-bold text-white">{registrations.length}</span>
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider">
                Confirmed Passes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmed Passes Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Ticket className="h-5 w-5 text-emerald-400" />
              My Registered Passes
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Present digital QR code pass at venue entrance for gate check-in
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {registrations.map((reg) => (
            <div
              key={reg.id}
              className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-4 hover:border-emerald-600/50 transition-all shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  {reg.event?.category}
                </span>
                <Badge variant="success">{reg.status}</Badge>
              </div>

              <div>
                <h3 className="text-base font-bold text-white line-clamp-1">
                  {reg.event?.title}
                </h3>
                <p className="text-xs text-emerald-400 mt-0.5">
                  Organized by: {reg.event?.society?.name}
                </p>
              </div>

              <div className="space-y-2 rounded-2xl bg-slate-950/70 p-3.5 border border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>
                    {reg.event?.start_time ? formatDate(reg.event.start_time) : "TBA"} •{" "}
                    {reg.event?.start_time ? formatTime(reg.event.start_time) : "TBA"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span className="line-clamp-1">{reg.event?.venue?.name}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono font-bold text-slate-400">
                  {reg.ticket_code}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTicket(reg)}
                  >
                    <QrCode className="h-3.5 w-3.5 mr-1.5 text-emerald-400" />
                    Open QR Pass
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveFeedbackEvent(reg.event?.title || "Event")}
                    className="text-xs text-amber-400 hover:text-amber-300"
                  >
                    <Star className="h-3.5 w-3.5 mr-1" />
                    Feedback
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QR Ticket Modal */}
      {activeTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-md my-8">
            <button
              onClick={() => setActiveTicket(null)}
              className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-white hover:bg-slate-700 border border-slate-600 shadow-lg"
            >
              ✕
            </button>
            <QrTicketPass registration={activeTicket} />
          </div>
        </div>
      )}

      {/* Post-Event Feedback Modal */}
      {activeFeedbackEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setActiveFeedbackEvent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Post-Event Feedback
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                {activeFeedbackEvent}
              </h3>
              <p className="text-xs text-slate-400">
                Your feedback helps KSAC and societies improve future campus experiences.
              </p>
            </div>

            {feedbackSubmitted ? (
              <div className="rounded-2xl bg-emerald-950/80 border border-emerald-600 p-6 text-center space-y-2">
                <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Feedback Submitted!</h4>
                <p className="text-xs text-emerald-300">Thank you for rating this event.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-2">
                    Overall Experience Rating:
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFeedbackRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-7 w-7 ${
                            star <= feedbackRating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-600"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-400 ml-2">
                      {feedbackRating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Comments or Suggestions (Optional):
                  </label>
                  <textarea
                    rows={3}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="What did you love? Any issues with seating, sound, or registration?"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-kiit-green focus:outline-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveFeedbackEvent(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Submit Review
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
