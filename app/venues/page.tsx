import { MapPin, Users, CheckCircle, ShieldCheck } from "lucide-react";
import { MOCK_VENUES } from "@/lib/data/mock-data";
import { Badge } from "@/components/ui/badge";

export default function CampusVenuesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 p-8 sm:p-10">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Campus Infrastructure & Booking
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Campus Auditoriums & Halls
          </h1>
          <p className="text-sm text-slate-300">
            Explore seating capacities, acoustic capabilities, stage dimensions, and booking eligibility for auditoriums across KIIT campuses.
          </p>
        </div>
      </div>

      {/* Grid of Venues */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_VENUES.map((venue) => (
          <div
            key={venue.id}
            className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-4 hover:border-slate-700 transition-all"
          >
            {/* Campus Chip & Capacity */}
            <div className="flex items-center justify-between">
              <Badge variant="gold" className="text-xs font-bold">
                {venue.campus}
              </Badge>
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Users className="h-4 w-4 text-emerald-400" />
                {venue.capacity} Seating
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">{venue.name}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                {venue.building || "KIIT Campus"}
              </p>
            </div>

            {/* Amenities list */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Key Amenities:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {venue.amenities.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/50"
                  >
                    <CheckCircle className="h-3 w-3 text-emerald-400" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Person */}
            {venue.contact_person && (
              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
                <span className="text-[10px] text-slate-500 block">Facility Manager:</span>
                <span className="font-medium text-slate-200">{venue.contact_person}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
