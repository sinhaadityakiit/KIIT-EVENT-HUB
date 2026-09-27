"use client";

import * as React from "react";
import QRCode from "qrcode";
import { Download, Printer, CheckCircle2, MapPin, Calendar, Clock, User, ShieldCheck } from "lucide-react";
import { Registration } from "@/types";
import { formatDate, formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface QrTicketPassProps {
  registration: Registration;
}

export function QrTicketPass({ registration }: QrTicketPassProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const event = registration.event;
  const user = registration.user;

  React.useEffect(() => {
    if (canvasRef.current && registration.ticket_code) {
      QRCode.toCanvas(
        canvasRef.current,
        registration.ticket_code,
        {
          width: 180,
          margin: 1,
          color: {
            dark: "#006837", // KIIT Forest Green
            light: "#FFFFFF",
          },
        },
        (error) => {
          if (error) console.error("Error generating ticket QR:", error);
        }
      );
    }
  }, [registration]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-lg overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900 shadow-2xl">
      {/* Top University Header */}
      <div className="bg-gradient-to-r from-kiit-green to-emerald-800 p-6 text-white relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 font-black text-sm backdrop-blur-md">
              KIIT
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight">KSAC Events Concept</h2>
              <p className="text-[10px] text-amber-200">Sample Event Pass (Educational Demo • Unofficial)</p>
            </div>
          </div>
          <Badge variant="gold" className="uppercase font-mono text-[10px]">
            {registration.status} (DEMO)
          </Badge>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-extrabold tracking-tight text-white line-clamp-2">
            {event?.title || "KIIT Campus Event"}
          </h3>
          <p className="text-xs text-emerald-100 mt-1">
            Organized by: <span className="font-semibold">{event?.society?.name || "KSAC"}</span>
          </p>
        </div>
      </div>

      {/* Middle Section: Event & Student Info */}
      <div className="p-6 space-y-4">
        {/* Date & Venue Chips */}
        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-950/60 p-3.5 border border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar className="h-3.5 w-3.5 text-emerald-400" />
              <span>Event Date</span>
            </div>
            <p className="mt-1 text-xs font-semibold text-slate-100">
              {event?.start_time ? formatDate(event.start_time) : "TBA"}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              <span>Gate Time</span>
            </div>
            <p className="mt-1 text-xs font-semibold text-slate-100">
              {event?.start_time ? formatTime(event.start_time) : "TBA"}
            </p>
          </div>
          <div className="col-span-2 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <MapPin className="h-3.5 w-3.5 text-rose-400" />
              <span>Campus Venue</span>
            </div>
            <p className="mt-0.5 text-xs font-bold text-white">
              {event?.venue?.name || "Campus Auditorium"}
            </p>
          </div>
        </div>

        {/* Student Credential Box */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{user?.full_name || "KIITian"}</p>
                <p className="text-[11px] font-mono text-emerald-400">
                  Roll: {user?.roll_number || "2105XXXX"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Verified Email</span>
              <span className="text-xs font-medium text-slate-300">{user?.email || "student@kiit.ac.in"}</span>
            </div>
          </div>
        </div>

        {/* Jagged Divider / Perforation Simulation */}
        <div className="relative py-2">
          <div className="border-t-2 border-dashed border-slate-800"></div>
          <div className="absolute -left-9 -top-2.5 h-5 w-5 rounded-full bg-slate-950 border-r border-slate-800"></div>
          <div className="absolute -right-9 -top-2.5 h-5 w-5 rounded-full bg-slate-950 border-l border-slate-800"></div>
        </div>

        {/* QR Code & Barcode Section */}
        <div className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-white text-slate-950">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">
            Present at Gate Entrance for Check-in
          </p>

          <canvas ref={canvasRef} className="rounded-lg shadow-sm"></canvas>

          <p className="mt-3 font-mono text-xs font-extrabold tracking-widest text-emerald-800">
            {registration.ticket_code}
          </p>
          <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-500 font-medium">
            <ShieldCheck className="h-3 w-3 text-emerald-600" />
            <span>Sample Verified Pass (Educational Demo)</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-3 p-6 pt-0 border-t border-slate-800/80 mt-2">
        <Button variant="outline" size="sm" onClick={handlePrint} className="flex-1">
          <Printer className="h-4 w-4 mr-1.5" />
          Print / Save PDF
        </Button>
        <Button variant="primary" size="sm" onClick={() => alert("Digital Ticket saved to student profile (Demo)!")} className="flex-1">
          <Download className="h-4 w-4 mr-1.5" />
          Offline Pass
        </Button>
      </div>

      {/* Unofficial Disclaimer Footer */}
      <div className="px-6 pb-4 pt-1 text-center">
        <p className="text-[10px] text-slate-500 leading-tight">
          Sample demonstration pass. Not an official KIIT admission pass. For educational evaluation only.
        </p>
      </div>
    </div>
  );
}
