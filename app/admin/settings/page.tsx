"use client";

import * as React from "react";
import { 
  Settings, 
  ShieldCheck, 
  Bell, 
  Database, 
  Key, 
  CheckCircle2, 
  RefreshCw, 
  Sliders, 
  Save, 
  Info 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { INITIAL_SUBMISSIONS, INITIAL_NOTIFICATIONS } from "@/lib/data/store";

export default function AdminSettingsPage() {
  const [leadTime, setLeadTime] = React.useState("5");
  const [budgetThreshold, setBudgetThreshold] = React.useState("250000");
  const [autoEmailNotify, setAutoEmailNotify] = React.useState(true);
  const [qrStrictValidation, setQrStrictValidation] = React.useState(true);
  const [savedSuccess, setSavedSuccess] = React.useState(false);
  const [resetSuccess, setResetSuccess] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetDemoData = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("kiit_demo_submissions", JSON.stringify(INITIAL_SUBMISSIONS));
      localStorage.setItem("kiit_demo_notifications", JSON.stringify(INITIAL_NOTIFICATIONS));
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="success" className="text-xs">
            System Preferences
          </Badge>
          <span className="text-xs text-slate-400">• KSAC Security & Rules</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <Settings className="h-8 w-8 text-emerald-400" />
          University Administration Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Configure society approval workflows, venue reservation policies, and demo sandbox parameters.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <span>System configuration parameters successfully saved.</span>
        </div>
      )}

      {resetSuccess && (
        <div className="p-3.5 rounded-xl border border-amber-500/40 bg-amber-950/40 text-amber-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-amber-400" />
          <span>Demo storage reset to initial state with 3 clean pending submissions.</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Governance Rules */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            Proposal Governance & Venue Rules
          </h2>
          <p className="text-xs text-slate-400">
            Enforced policies for student societies when requesting auditoriums and funding.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Minimum Advance Proposal Submission (Days)
              </label>
              <input
                type="number"
                value={leadTime}
                onChange={(e) => setLeadTime(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 text-white text-sm p-3 focus:outline-none focus:border-kiit-green"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Default: 5 days prior to event date</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Budget Approval Escalation Threshold (₹ INR)
              </label>
              <input
                type="number"
                value={budgetThreshold}
                onChange={(e) => setBudgetThreshold(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 text-white text-sm p-3 focus:outline-none focus:border-kiit-green"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Proposals above this trigger Central Director signoff</span>
            </div>
          </div>
        </div>

        {/* Security & Verification */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Key className="h-5 w-5 text-kiit-gold" />
            Attendance & QR Verification Policies
          </h2>

          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
              <div>
                <span className="text-sm font-medium text-white block">Strict Single-Entry QR Verification</span>
                <span className="text-xs text-slate-400">Prevent ticket sharing and duplicate turnstile scans</span>
              </div>
              <input
                type="checkbox"
                checked={qrStrictValidation}
                onChange={(e) => setQrStrictValidation(e.target.checked)}
                className="h-4 w-4 rounded accent-emerald-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
              <div>
                <span className="text-sm font-medium text-white block">Automatic KSAC Notification Dispatch</span>
                <span className="text-xs text-slate-400">Send push alerts to host on approval status changes</span>
              </div>
              <input
                type="checkbox"
                checked={autoEmailNotify}
                onChange={(e) => setAutoEmailNotify(e.target.checked)}
                className="h-4 w-4 rounded accent-emerald-500 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Demo Environment Management */}
        <div className="rounded-2xl border border-amber-900/40 bg-amber-950/20 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-amber-300 flex items-center gap-2">
                <Database className="h-5 w-5 text-amber-400" />
                Demo Sandbox & Data Persistence
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Reset local simulation storage back to the initial 3 required approval queue items.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResetDemoData}
              className="border-amber-500/40 text-amber-300 hover:bg-amber-950/50 text-xs"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
              Reset Demo Queue
            </Button>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="md">
            <Save className="h-4 w-4 mr-2" />
            Save Configuration Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
