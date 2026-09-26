"use client";

import * as React from "react";
import { Search, Filter, MapPin, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface EventFilterProps {
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onCampusChange: (campus: string) => void;
  selectedCategory: string;
  selectedCampus: string;
  searchQuery: string;
}

const CATEGORIES = [
  { label: "All Categories", value: "ALL" },
  { label: "Hackathons", value: "HACKATHON" },
  { label: "Technical", value: "TECHNICAL" },
  { label: "Cultural", value: "CULTURAL" },
  { label: "Sports", value: "SPORTS" },
  { label: "Workshops", value: "WORKSHOP" },
];

const CAMPUSES = [
  { label: "All Campuses", value: "ALL" },
  { label: "Campus 6 (Auditorium)", value: "Campus 6" },
  { label: "Campus 7 (KSAC)", value: "Campus 7" },
  { label: "Campus 3 (Convention)", value: "Campus 3" },
  { label: "Campus 8 (Chintan)", value: "Campus 8" },
  { label: "Campus 15 (KSOM)", value: "Campus 15" },
];

export function EventFilters({
  onSearchChange,
  onCategoryChange,
  onCampusChange,
  selectedCategory,
  selectedCampus,
  searchQuery,
}: EventFilterProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md">
      {/* Search Bar & Campus Dropdown Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search by event title, society, topic (e.g. Hackathon, Robotics, Music)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            icon={<Search className="h-4 w-4 text-emerald-500" />}
          />
        </div>

        {/* Campus Venue Selector */}
        <div className="sm:w-64">
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500 pointer-events-none" />
            <select
              value={selectedCampus}
              onChange={(e) => onCampusChange(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-700/80 bg-slate-900/90 pl-10 pr-8 text-sm text-slate-100 focus:border-kiit-green focus:outline-none focus:ring-1 focus:ring-kiit-green transition-all appearance-none cursor-pointer"
            >
              {CAMPUSES.map((c) => (
                <option key={c.value} value={c.value} className="bg-slate-900 text-white">
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
          <Filter className="h-3 w-3" />
          Filter:
        </span>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all shrink-0 border ${
                isActive
                  ? "bg-kiit-green text-white border-emerald-500 shadow-md shadow-kiit-green/20"
                  : "bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          );
        })}

        {/* Reset filter button if active */}
        {(selectedCategory !== "ALL" || selectedCampus !== "ALL" || searchQuery) && (
          <button
            onClick={() => {
              onCategoryChange("ALL");
              onCampusChange("ALL");
              onSearchChange("");
            }}
            className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 ml-auto shrink-0 pl-2"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
