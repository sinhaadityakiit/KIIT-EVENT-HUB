"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Ticket, 
  QrCode, 
  Calendar, 
  MapPin, 
  Clock, 
  Download, 
  CheckCircle2, 
  X, 
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getClientSession } from "@/lib/auth/demo-session";

interface RegisteredTicket {
  id: string;
  ticketCode: string;
  eventTitle: string;
  category: string;
  society: string;
  venue: string;
  date: string;
  timeSlot: string;
  status: "CONFIRMED" | "CHECKED_IN" | "CANCELLED";
  seat: string;
}

export default function StudentRegistrationsPage() {
  const session = getClientSession();
  const [selectedTicket, setSelectedTicket] = React.useState<RegisteredTicket | null>(null);
  const [downloadToast, setDownloadToast] = React.useState(false);

  const [registrations, setRegistrations] = React.useState<RegisteredTicket[]>([
    {
      id: "reg-1",
      ticketCode: "KIIT-REG-2026-8812",
      eventTitle: "KIIT Cultural Night 2026",
      category: "Cultural",
      society: "Korus Music & Kalakaar",
      venue: "Campus 6 - Central Auditorium",
      date: "15 October 2026",
      timeSlot: "05:30 PM - 10:00 PM",
      status: "CONFIRMED",
      seat: "Tier 1 - Seat A-42",
    },
    {
      id: "reg-2",
      ticketCode: "KIIT-REG-2026-9403",
      eventTitle: "AI & Future Technology Workshop",
      category: "Technical",
      society: "Tech Club / KRS",
      venue: "Campus 3 - Convention Centre (Audi 1)",
      date: "25 October 2026",
      timeSlot: "10:00 AM - 04:30 PM",
      status: "CONFIRMED",
      seat: "General Entry",
    },
    {
      id: "reg-3",
      ticketCode: "KIIT-REG-2026-6124",
      eventTitle: "Inter-College Cricket Championship",
      category: "Sports",
      society: "Sports Club",
      venue: "Campus 13 Sports Complex",
      date: "20 October 2026",
      timeSlot: "08:00 AM - 05:00 PM",
      status: "CONFIRMED",
      seat: "West Pavilion Bleachers",
    },
  ]);

  const handleDownload = (ticket: RegisteredTicket) => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="success" className="text-xs">
              <ShieldCheck className="h-3.5 w-3.5 mr-1" />
              Verified Student Passes
            </Badge>
            <span className="text-xs text-slate-400">• Roll No: {session?.rollNumber || "21051982"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Ticket className="h-8 w-8 text-kiit-green" />
            My Event Passes & Digital Tickets
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Display your secure QR entry pass at campus security checkpoints and auditorium entrance gates.
          </p>
        </div>

        <Link href="/events">
          <Button variant="primary" size="sm" className="text-xs">
            Browse More Events
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>

      {downloadToast && (
        <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
          <span>Pass downloaded: <strong>KIIT_Pass_{selectedTicket?.ticketCode || "Ticket"}.pdf</strong></span>
        </div>
      )}

      {/* Registrations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {registrations.map((ticket) => (
          <div
            key={ticket.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-lg"
          >
            {/* Top Event Info */}
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant={
                  ticket.category === "Cultural" ? "success" :
                  ticket.category === "Sports" ? "warning" : "default"
                } className="text-xs">
                  {ticket.category}
                </Badge>
                <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  {ticket.status}
                </span>
              </div>

              <h2 className="text-lg font-bold text-white line-clamp-2">
                {ticket.eventTitle}
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Organized by {ticket.society}
              </p>

              <div className="pt-2 space-y-2 text-xs text-slate-300 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{ticket.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                  <span>{ticket.timeSlot}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-rose-400 flex-shrink-0" />
                  <span className="truncate">{ticket.venue}</span>
                </div>
              </div>
            </div>

            {/* Ticket Tear-off Footer */}
            <div className="p-4 bg-slate-950/80 border-t border-dashed border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-mono">Pass Number</div>
                <div className="text-xs font-mono font-bold text-slate-200">{ticket.ticketCode}</div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedTicket(ticket)}
                className="text-xs border-slate-700 bg-slate-900 text-slate-200 hover:text-white"
              >
                <QrCode className="h-3.5 w-3.5 mr-1 text-emerald-400" />
                Show QR
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* QR Code Pass Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-sm rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-2xl text-center space-y-5">
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-1">
              <Badge variant="success" className="text-[10px]">
                Valid KIIT Student Pass
              </Badge>
              <h2 className="text-lg font-bold text-white pt-1">
                {selectedTicket.eventTitle}
              </h2>
              <p className="text-xs text-slate-400">{selectedTicket.venue}</p>
            </div>

            {/* QR Code Representation */}
            <div className="mx-auto w-48 h-48 bg-white rounded-2xl p-3 flex flex-col items-center justify-center shadow-xl border-4 border-emerald-500">
              {/* SVG QR Code Pattern */}
              <svg className="w-full h-full text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 2h2v4h-2v-4zm-4-4h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4-2h2v2h-2v-2zm0 4h2v2h-2v-2zm-4-6h2v2h-2v-2z" />
              </svg>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-sm font-bold text-emerald-400">
                {selectedTicket.ticketCode}
              </div>
              <div className="text-xs text-slate-300 font-medium">
                Attendee: {session?.name || "Ayush Sharma"} ({session?.rollNumber || "21051982"})
              </div>
              <div className="text-[11px] text-slate-400">
                Seat: {selectedTicket.seat}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleDownload(selectedTicket)}
                className="text-xs w-full"
              >
                <Download className="h-3.5 w-3.5 mr-1.5" />
                Download PDF Pass
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
