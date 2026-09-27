"use client";

import * as React from "react";
import { Compass, Sparkles, Filter } from "lucide-react";
import { EventFilters } from "@/components/events/event-filters";
import { EventCard } from "@/components/events/event-card";
import { MOCK_EVENTS } from "@/lib/data/mock-data";
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";

export default function EventsExplorerPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("ALL");
  const [selectedCampus, setSelectedCampus] = React.useState("ALL");

  // Filter approved events based on search query, category, and campus
  const filteredEvents = React.useMemo(() => {
    return MOCK_EVENTS.filter((evt) => {
      // Only show approved events in public explorer
      if (evt.status !== "APPROVED") return false;

      // Category check
      if (selectedCategory !== "ALL" && evt.category !== selectedCategory) {
        return false;
      }

      // Campus check
      if (selectedCampus !== "ALL" && evt.venue && !evt.venue.campus.includes(selectedCampus)) {
        return false;
      }

      // Search query check (title, tagline, society short code, description)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = evt.title.toLowerCase().includes(q);
        const matchesTagline = evt.tagline?.toLowerCase().includes(q) || false;
        const matchesSoc = evt.society?.name.toLowerCase().includes(q) || evt.society?.short_code.toLowerCase().includes(q);
        const matchesVenue = evt.venue?.name.toLowerCase().includes(q) || false;
        return matchesTitle || matchesTagline || matchesSoc || matchesVenue;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedCampus]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 p-8 sm:p-10">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-500/30">
            <Compass className="h-3.5 w-3.5" />
            <span>Campus Event Explorer (Sample Demo Project)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Discover Campus Happenings
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Sample prototype showcasing technical hackathons, cultural nights, athletic meets, and seminars. Instant demonstration RSVP with student passes.
          </p>
          <div className="pt-2">
            <DisclaimerBanner variant="subtle" />
          </div>
        </div>
      </div>

      {/* Filter Component */}
      <EventFilters
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedCampus={selectedCampus}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        onCampusChange={setSelectedCampus}
      />

      {/* Results Counter & Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            Showing <strong className="text-white">{filteredEvents.length}</strong> upcoming events
          </span>
          {(selectedCategory !== "ALL" || selectedCampus !== "ALL" || searchQuery) && (
            <span className="text-amber-400">Filters applied</span>
          )}
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-3">
            <Filter className="h-10 w-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No Matching Events Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find any events matching your selected criteria. Try adjusting the category, campus or search keyword.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
