import Link from "next/link";
import { Users, ExternalLink, Calendar, Award } from "lucide-react";
import { MOCK_SOCIETIES, MOCK_EVENTS } from "@/lib/data/mock-data";
import { Button } from "@/components/ui/button";

export default function SocietiesDirectoryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 p-8 sm:p-10">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Student Life & Leadership
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Recognized KIIT Societies & Clubs
          </h1>
          <p className="text-sm text-slate-300">
            Discover student-led technical communities, music guilds, dramatics troupes, and social societies under the aegis of the Student Activity Centre (KSAC).
          </p>
        </div>
      </div>

      {/* Grid of Societies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_SOCIETIES.map((soc) => {
          const societyEvents = MOCK_EVENTS.filter((e) => e.society_id === soc.id);

          return (
            <div
              key={soc.id}
              className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md transition-all hover:border-emerald-600/50 hover:shadow-xl"
            >
              {/* Top Row: Logo & Category */}
              <div className="flex items-start justify-between gap-4">
                <img
                  src={soc.logo_url}
                  alt={soc.name}
                  className="h-16 w-16 rounded-2xl object-cover border border-slate-700 shadow-md"
                />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  {soc.category}
                </span>
              </div>

              {/* Society Info */}
              <div className="mt-4 flex-1">
                <span className="text-xs font-mono font-bold text-amber-400">
                  {soc.short_code}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{soc.name}</h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {soc.description}
                </p>
              </div>

              {/* Faculty coordinator */}
              <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
                <span className="block text-[11px] text-slate-500">Faculty Coordinator:</span>
                <span className="font-semibold text-slate-200">{soc.faculty_coordinator}</span>
              </div>

              {/* Active Events counter */}
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/60">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                  {societyEvents.length} Active Events
                </span>
                <Link href={`/events?search=${soc.short_code}`}>
                  <Button variant="ghost" size="sm" className="text-xs text-emerald-400">
                    View Events →
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
