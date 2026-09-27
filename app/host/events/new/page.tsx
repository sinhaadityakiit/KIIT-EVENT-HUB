"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Users, 
  Clock, 
  Sparkles,
  AlertCircle
} from "lucide-react";
import { MOCK_VENUES, MOCK_SOCIETIES } from "@/lib/data/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VenueConflictBanner } from "@/components/events/venue-conflict-banner";
import { addEventSubmission } from "@/lib/data/store";
import { getClientSession } from "@/lib/auth/demo-session";

export default function NewEventProposalPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(1);

  // Form State
  const [title, setTitle] = React.useState("");
  const [tagline, setTagline] = React.useState("");
  const [category, setCategory] = React.useState("TECHNICAL");
  const [description, setDescription] = React.useState("");
  const [venueId, setVenueId] = React.useState(MOCK_VENUES[0].id);
  const [eventDate, setEventDate] = React.useState("2026-10-14");
  const [startTime, setStartTime] = React.useState("10:00");
  const [endTime, setEndTime] = React.useState("18:00");
  const [maxCapacity, setMaxCapacity] = React.useState("800");
  const [budgetEstimate, setBudgetEstimate] = React.useState("250000");
  const [bannerUrl, setBannerUrl] = React.useState("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80");
  const [submitted, setSubmitted] = React.useState(false);

  // Live Conflict Detection:
  // If venue is Campus 6 Audi and date is 2026-10-14, flag conflict with Kreative Hacks 2026!
  const selectedVenue = MOCK_VENUES.find((v) => v.id === venueId);
  const hasConflict = venueId === "ven-camp6-audi" && eventDate === "2026-10-14";

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const session = getClientSession();
    try {
      addEventSubmission({
        title: title || "New Society Event Proposal",
        host: session?.society || session?.name || "host1",
        hostEmail: session?.email || "host1@kiit.ac.in",
        category: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
        eventDate: eventDate,
        timeSlot: `${startTime} - ${endTime}`,
        venue: selectedVenue?.name || "Campus 6 Auditorium",
        capacity: parseInt(maxCapacity, 10) || 500,
        budget: parseInt(budgetEstimate, 10) || 200000,
        description: description || "Detailed student society event proposal awaiting KSAC clearance.",
      });
    } catch (err) {
      console.error("Error adding proposal", err);
    }
    setSubmitted(true);
    setTimeout(() => {
      router.push("/host/approvals");
    }, 1800);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <Link
        href="/host/dashboard"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Host Studio
      </Link>

      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Society Event Creation Studio
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">
          Submit Event Proposal to KSAC
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Complete the multi-step proposal form for university administrative review and venue booking clearance.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="grid grid-cols-4 gap-2 border-b border-slate-800 pb-4">
        {[
          { step: 1, label: "Basic Details" },
          { step: 2, label: "Venue & Timing" },
          { step: 3, label: "Media & Budget" },
          { step: 4, label: "Review & Submit" },
        ].map((s) => (
          <div
            key={s.step}
            className={`flex items-center gap-2 pb-1 ${
              currentStep === s.step
                ? "border-b-2 border-amber-400 text-amber-400 font-bold"
                : currentStep > s.step
                ? "text-emerald-400"
                : "text-slate-600"
            }`}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                currentStep === s.step
                  ? "bg-amber-400 text-slate-950"
                  : currentStep > s.step
                  ? "bg-emerald-500 text-slate-950"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              {currentStep > s.step ? <Check className="h-3.5 w-3.5" /> : s.step}
            </div>
            <span className="text-xs hidden sm:inline">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Form Steps */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mx-auto">
              <Check className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Event Proposal Submitted!</h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your proposal has been routed to the KSAC Approval Queue. The faculty coordinator and Joint Director will review venue clearance and budget.
            </p>
            <p className="text-xs text-amber-400 font-semibold animate-pulse">
              Redirecting back to Host Studio...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Step 1: Event Information</h3>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Event Title *
                  </label>
                  <Input
                    placeholder="e.g. RoboRumble 2026: Combat Robotics Championship"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Tagline / Subheading
                  </label>
                  <Input
                    placeholder="e.g. 15kg and 30kg combat bots clashing inside reinforced steel arena"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Event Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="h-11 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 text-xs text-slate-100 focus:border-kiit-green focus:outline-none"
                    >
                      <option value="TECHNICAL">TECHNICAL</option>
                      <option value="HACKATHON">HACKATHON</option>
                      <option value="CULTURAL">CULTURAL</option>
                      <option value="SPORTS">SPORTS</option>
                      <option value="WORKSHOP">WORKSHOP</option>
                      <option value="SEMINAR">SEMINAR</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Target Audience
                    </label>
                    <Input
                      placeholder="e.g. All B.Tech students, Robotics Enthusiasts"
                      defaultValue="All Engineering Schools"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Detailed Event Description & Objective *
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Explain the structure of the event, rules, stages, and learning outcomes for students..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-kiit-green focus:outline-none"
                    required
                  ></textarea>
                </div>
              </div>
            )}

            {/* Step 2: Venue & Schedule (Live Conflict Check) */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <h3 className="text-base font-bold text-white">
                  Step 2: Venue Request & Conflict Check
                </h3>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Preferred Campus Venue *
                  </label>
                  <select
                    value={venueId}
                    onChange={(e) => setVenueId(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 text-xs text-slate-100 focus:border-kiit-green focus:outline-none"
                  >
                    {MOCK_VENUES.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.capacity} capacity)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Proposed Date *
                    </label>
                    <Input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Start Time *
                    </label>
                    <Input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      End Time *
                    </label>
                    <Input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Venue Conflict Warning Banner */}
                <div className="pt-2">
                  <VenueConflictBanner
                    venueName={selectedVenue?.name || "Selected Venue"}
                    hasConflict={hasConflict}
                    conflictingEventTitle="Kreative Hacks 2026 (KRS)"
                    conflictingTime="Oct 14, 09:00 AM - Oct 15, 09:00 PM"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Expected Participant Limit *
                  </label>
                  <Input
                    type="number"
                    value={maxCapacity}
                    onChange={(e) => setMaxCapacity(e.target.value)}
                    required
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Venue Max Capacity: {selectedVenue?.capacity} seats.
                  </span>
                </div>
              </div>
            )}

            {/* Step 3: Media & Budget */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Step 3: Media & Budget</h3>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Event Poster / Banner Image URL
                  </label>
                  <Input
                    placeholder="https://images.unsplash.com/..."
                    value={bannerUrl}
                    onChange={(e) => setBannerUrl(e.target.value)}
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Upload to Cloudinary or Supabase Storage and paste the URL here.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Estimated Budget Requirement (INR ₹)
                  </label>
                  <Input
                    type="number"
                    value={budgetEstimate}
                    onChange={(e) => setBudgetEstimate(e.target.value)}
                    icon={<DollarSign className="h-4 w-4 text-emerald-400" />}
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Includes sound, stage lighting, guest hospitality, refreshments, and certificates.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Step 4: Final Proposal Review</h3>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 space-y-3 text-xs">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Event Title:</span>
                    <span className="font-bold text-white">{title || "RoboRumble 2026"}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Category:</span>
                    <span className="font-mono text-amber-400">{category}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Requested Venue:</span>
                    <span className="font-semibold text-white">{selectedVenue?.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Date & Slot:</span>
                    <span className="text-white">
                      {eventDate} ({startTime} - {endTime})
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Capacity Requested:</span>
                    <span className="text-white">{maxCapacity} Attendees</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Budget Estimate:</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      ₹{parseInt(budgetEstimate || "0").toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {hasConflict && (
                  <div className="rounded-xl border border-rose-800 bg-rose-950/40 p-3 text-xs text-rose-300">
                    ⚠️ <strong>Notice:</strong> This proposal has a venue conflict warning. KSAC administrators will be notified to either resolve or reassign venues.
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {currentStep > 1 ? (
                <Button type="button" variant="secondary" size="md" onClick={handleBack}>
                  Previous
                </Button>
              ) : (
                <div></div>
              )}

              {currentStep < 4 ? (
                <Button type="button" variant="primary" size="md" onClick={handleNext}>
                  Next Step
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              ) : (
                <Button type="submit" variant="gold" size="md">
                  Submit Proposal to KSAC
                </Button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
