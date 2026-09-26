import * as React from "react";
import { AlertCircle, CheckCircle, Calendar, MapPin } from "lucide-react";

export interface VenueConflictBannerProps {
  venueName: string;
  hasConflict: boolean;
  conflictingEventTitle?: string;
  conflictingTime?: string;
}

export function VenueConflictBanner({
  venueName,
  hasConflict,
  conflictingEventTitle,
  conflictingTime,
}: VenueConflictBannerProps) {
  if (!hasConflict) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-emerald-800/80 bg-emerald-950/40 p-4 text-emerald-300">
        <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
        <div className="text-xs">
          <p className="font-bold text-white">Venue Slot Available!</p>
          <p className="text-emerald-300/80">
            No scheduling overlaps detected for <span className="font-semibold text-white">{venueName}</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-xl border border-rose-800/80 bg-rose-950/50 p-4 text-rose-200">
      <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
      <div className="text-xs space-y-1">
        <p className="font-bold text-white flex items-center gap-1.5">
          <span>Campus Venue Scheduling Conflict Detected!</span>
        </p>
        <p className="text-rose-200/90 leading-relaxed">
          <strong className="text-white">{venueName}</strong> is already booked by{" "}
          <strong className="text-amber-400">{conflictingEventTitle || "another approved event"}</strong> during{" "}
          <span className="font-mono text-white">{conflictingTime || "this timeslot"}</span>.
        </p>
        <p className="text-[11px] text-rose-400">
          *KSAC policy strictly prevents double-booking. Please choose another campus venue or reschedule the slot.
        </p>
      </div>
    </div>
  );
}
