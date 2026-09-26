"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, QrCode, ShieldCheck, Users } from "lucide-react";
import { QrCameraScanner } from "@/components/tickets/qr-camera-scanner";
import { MOCK_EVENTS } from "@/lib/data/mock-data";

export default function HostScannerPage() {
  const params = useParams();
  const eventId = params?.id as string;
  const event = MOCK_EVENTS.find((e) => e.id === eventId) || MOCK_EVENTS[0];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/host/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Host Studio</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Gate Entry Verification
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            QR Check-In Scanner Tool
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Event: <span className="font-semibold text-white">{event.title}</span> ({event.venue?.name})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-right">
            <span className="text-xs text-slate-400 block">Live Turnout</span>
            <span className="text-lg font-bold text-emerald-400 font-mono">
              {event.current_rsvp_count} Attendees
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Scanner */}
      <QrCameraScanner eventId={event.id} />
    </div>
  );
}
