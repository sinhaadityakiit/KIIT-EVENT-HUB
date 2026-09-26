import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users, ArrowUpRight } from "lucide-react";
import { EventItem } from "@/types";
import { formatDate, formatTime, getCategoryBadgeClass } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface EventCardProps {
  event: EventItem;
}

export function EventCard({ event }: EventCardProps) {
  const percentageFilled = Math.min(
    100,
    Math.round((event.current_rsvp_count / event.max_capacity) * 100)
  );

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600/50 hover:shadow-xl hover:shadow-emerald-950/20">
      {/* Banner / Poster */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        {event.banner_url ? (
          <img
            src={event.banner_url}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-950 to-slate-900">
            <span className="text-4xl font-extrabold text-emerald-800">KIIT</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryBadgeClass(
              event.category
            )}`}
          >
            {event.category}
          </span>
        </div>

        {/* Society Chip */}
        {event.society && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-slate-950/80 px-2.5 py-1 text-xs font-medium text-slate-300 backdrop-blur-md border border-slate-800">
            <span>{event.society.short_code}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <h3 className="line-clamp-2 text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
          {event.title}
        </h3>

        {/* Tagline */}
        {event.tagline && (
          <p className="mt-1 line-clamp-1 text-xs text-slate-400 font-medium">
            {event.tagline}
          </p>
        )}

        {/* Details: Date & Venue */}
        <div className="mt-4 space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>
              {formatDate(event.start_time)} • {formatTime(event.start_time)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span className="line-clamp-1">{event.venue?.name || "Campus Venue"}</span>
          </div>
        </div>

        {/* Capacity Progress Bar */}
        <div className="mt-5 space-y-1.5 border-t border-slate-800/80 pt-3">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3 text-slate-500" />
              <span>RSVP Status</span>
            </span>
            <span className="font-semibold text-slate-300">
              {event.current_rsvp_count} / {event.max_capacity} Seats
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentageFilled > 90
                  ? "bg-rose-500"
                  : percentageFilled > 70
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              }`}
              style={{ width: `${percentageFilled}%` }}
            ></div>
          </div>
        </div>

        {/* Action Link */}
        <div className="mt-4 pt-3 flex items-center justify-between border-t border-slate-800/60">
          <span className="text-xs font-bold text-amber-400">
            Free with KIIT ID
          </span>
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
          >
            View Details
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
