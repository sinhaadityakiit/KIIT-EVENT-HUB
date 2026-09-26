"use client";

import * as React from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Share2, 
  CheckCircle, 
  Sparkles, 
  Ticket, 
  ArrowLeft,
  User,
  ShieldCheck,
  Building
} from "lucide-react";
import { MOCK_EVENTS, MOCK_USERS } from "@/lib/data/mock-data";
import { formatDate, formatTime, getCategoryBadgeClass } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrTicketPass } from "@/components/tickets/qr-ticket-pass";
import { Registration } from "@/types";

export default function EventDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const event = MOCK_EVENTS.find((e) => e.slug === slug);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [createdRegistration, setCreatedRegistration] = React.useState<Registration | null>(null);
  const [rsvpCount, setRsvpCount] = React.useState(event ? event.current_rsvp_count : 0);
  const [showTicketModal, setShowTicketModal] = React.useState(false);

  if (!event) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white">Event Not Found</h2>
        <p className="mt-2 text-sm text-slate-400">The requested event could not be located in KSAC registry.</p>
        <Link href="/events" className="mt-6 inline-block">
          <Button variant="outline">Back to Event Explorer</Button>
        </Link>
      </div>
    );
  }

  // Handle 1-Click RSVP
  const handleRsvp = () => {
    const student = MOCK_USERS.student;
    const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
    const ticketCode = `KIIT-${event.category.substring(0, 4)}-${student.rollNumber || "21051982"}-${randomHex}`;

    const newReg: Registration = {
      id: `reg-${Date.now()}`,
      event_id: event.id,
      event: event,
      user_id: student.id,
      user: student,
      ticket_code: ticketCode,
      qr_signature: btoa(JSON.stringify({ ticketCode, eventId: event.id, roll: student.rollNumber })),
      status: "CONFIRMED",
      registered_at: new Date().toISOString(),
    };

    setCreatedRegistration(newReg);
    setIsRegistered(true);
    setRsvpCount((prev) => prev + 1);
    setShowTicketModal(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Events</span>
        </Link>
      </div>

      {/* Hero Poster Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
        <div className="relative h-64 sm:h-96 w-full">
          {event.banner_url ? (
            <img
              src={event.banner_url}
              alt={event.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-emerald-950">
              <span className="text-6xl font-black text-emerald-800">KIIT</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

          {/* Banner Floating Metadata */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${getCategoryBadgeClass(
                    event.category
                  )}`}
                >
                  {event.category}
                </span>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  {event.society?.name}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                {event.title}
              </h1>
              {event.tagline && (
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  {event.tagline}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details, Agenda, Speakers */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              About This Event
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Agenda & Itinerary */}
          {event.agenda && event.agenda.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-400" />
                Schedule & Agenda
              </h2>
              <div className="space-y-4 border-l-2 border-emerald-800/80 pl-4 ml-2">
                {event.agenda.map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[23px] top-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-slate-950 group-hover:scale-125 transition-transform"></div>
                    <span className="text-xs font-mono font-semibold text-emerald-400">
                      {item.time}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{item.title}</h4>
                    {item.speaker && (
                      <p className="text-xs text-slate-400">Speaker: {item.speaker}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guest Speakers */}
          {event.guest_speakers && event.guest_speakers.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <User className="h-5 w-5 text-purple-400" />
                Distinguished Guest Speakers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.guest_speakers.map((spk, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 rounded-xl border border-slate-800 bg-slate-950/60 p-3.5"
                  >
                    <img
                      src={spk.photo_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
                      alt={spk.name}
                      className="h-12 w-12 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{spk.name}</h4>
                      <p className="text-xs text-emerald-400">{spk.role}</p>
                      {spk.company && (
                        <p className="text-[11px] text-slate-400">{spk.company}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: RSVP Registration Card & Venue Spec */}
        <div className="space-y-6">
          {/* Registration Card */}
          <div className="sticky top-24 rounded-3xl border border-slate-700/80 bg-slate-900/80 p-6 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Entry Fee</span>
                <Badge variant="gold">KIIT Student Exclusive</Badge>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white">FREE</span>
                <span className="text-xs text-slate-400">with active @kiit.ac.in ID</span>
              </div>
            </div>

            {/* Quick Details */}
            <div className="space-y-3 rounded-2xl bg-slate-950/60 p-4 border border-slate-800/80 text-xs">
              <div className="flex items-start gap-2.5">
                <Calendar className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Date & Time</p>
                  <p className="text-slate-400">
                    {formatDate(event.start_time)} • {formatTime(event.start_time)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-800/60">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">{event.venue?.name}</p>
                  <p className="text-slate-400">{event.venue?.campus}, KIIT University</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-800/60">
                <Users className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Available Seats</p>
                  <p className="text-slate-400">
                    {rsvpCount} / {event.max_capacity} Registered
                  </p>
                </div>
              </div>
            </div>

            {/* 1-Click RSVP Action */}
            <div className="space-y-2">
              {!isRegistered ? (
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full text-base font-bold shadow-xl shadow-amber-500/20"
                  onClick={handleRsvp}
                >
                  <Ticket className="h-5 w-5 mr-2 text-slate-950" />
                  1-Click RSVP & Get QR Ticket
                </Button>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-950/80 border border-emerald-600/80 p-3 text-emerald-300 text-xs font-semibold">
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>RSVP Confirmed! Digital Pass Generated.</span>
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={() => setShowTicketModal(true)}
                  >
                    View Scannable QR Ticket
                  </Button>
                </div>
              )}
              <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Instant confirmation to your student email
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Ticket Modal */}
      {showTicketModal && createdRegistration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-md my-8">
            <button
              onClick={() => setShowTicketModal(false)}
              className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-white hover:bg-slate-700 border border-slate-600 shadow-lg"
            >
              ✕
            </button>
            <QrTicketPass registration={createdRegistration} />
          </div>
        </div>
      )}
    </div>
  );
}
