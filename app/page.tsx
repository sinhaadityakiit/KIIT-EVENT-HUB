import Link from "next/link";
import { 
  Compass, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  MapPin, 
  ArrowRight, 
  Users, 
  Ticket,
  Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/events/event-card";
import { MOCK_EVENTS, MOCK_SOCIETIES, MOCK_VENUES } from "@/lib/data/mock-data";
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";

export default function HomePage() {
  const featuredEvents = MOCK_EVENTS.filter((e) => e.status === "APPROVED").slice(0, 3);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#07130c] to-slate-950">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-emerald-600/15 blur-[128px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 h-64 w-64 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* University KSAC Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-4 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>Educational Sample Project • Unofficial Demonstration</span>
          </div>

          {/* Main Headline */}
          <h1 className="mx-auto max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            The Beating Heart of <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-400 bg-clip-text text-transparent">
              Campus Life at KIIT
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
            Sample interactive prototype modeling campus hackathons, cultural fests, technical masterclasses, and sports tournaments across campuses. One-click demonstration RSVP with student <span className="font-mono text-emerald-400">@kiit.ac.in</span> accounts.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/events">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                <Compass className="h-5 w-5 mr-2 text-emerald-300" />
                Explore Upcoming Events
              </Button>
            </Link>
            <Link href="/student/dashboard">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <Ticket className="h-5 w-5 mr-2 text-amber-400" />
                View My Digital Passes
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-md">
              <p className="text-3xl font-extrabold text-white">40+</p>
              <p className="text-xs text-slate-400 mt-1">Recognized Societies</p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-md">
              <p className="text-3xl font-extrabold text-emerald-400">25+</p>
              <p className="text-xs text-slate-400 mt-1">Campuses & Auditoriums</p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-md">
              <p className="text-3xl font-extrabold text-amber-400">30,000+</p>
              <p className="text-xs text-slate-400 mt-1">Simulated KIITians</p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-md">
              <p className="text-3xl font-extrabold text-purple-400">100%</p>
              <p className="text-xs text-slate-400 mt-1">Digital QR Entry</p>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Educational Notice */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DisclaimerBanner variant="card" />
      </section>

      {/* Featured Events Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Flame className="h-4 w-4 text-amber-400 animate-pulse" />
              <span>Trending on Campus</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
              Featured University Events
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Sample events modeled after university student activity initiatives
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
          >
            <span>View All Events</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </section>

      {/* Recognized Societies Spotlight */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Student Communities
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
                Active KIIT Societies & Clubs
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                From robotics and coding to theatre and music, join the creators shaping university culture.
              </p>
            </div>
            <Link href="/societies">
              <Button variant="outline" size="sm">
                Explore All Clubs
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_SOCIETIES.slice(0, 3).map((soc) => (
              <div
                key={soc.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 backdrop-blur-md transition-all hover:border-emerald-600/50"
              >
                <img
                  src={soc.logo_url}
                  alt={soc.name}
                  className="h-14 w-14 rounded-xl object-cover border border-slate-700"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400">{soc.short_code}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800">
                      {soc.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white truncate mt-0.5">{soc.name}</h4>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{soc.faculty_coordinator}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* University Auditoriums & Venues Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Infrastructure & Spaces
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
              Campus Auditoriums & Arenas
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Explore capacity, acoustics, and live venue availability across campuses.
            </p>
          </div>
          <Link
            href="/venues"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
          >
            <span>View Venues Directory</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_VENUES.slice(0, 3).map((v) => (
            <div
              key={v.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  {v.campus}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-slate-400" />
                  {v.capacity} Seats
                </span>
              </div>
              <h3 className="text-base font-bold text-white">{v.name}</h3>
              <p className="text-xs text-slate-400">{v.building}</p>
              <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-800">
                {v.amenities.slice(0, 2).map((a, i) => (
                  <span key={i} className="text-[10px] text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
