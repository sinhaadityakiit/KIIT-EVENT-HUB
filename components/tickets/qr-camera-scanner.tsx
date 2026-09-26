"use client";

import * as React from "react";
import { Camera, CheckCircle2, AlertTriangle, Scan, RefreshCw, UserCheck, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export interface ScanResult {
  ticketCode: string;
  studentName: string;
  rollNumber: string;
  eventName: string;
  checkedInAt: string;
  status: "VALID" | "ALREADY_CHECKED_IN" | "INVALID";
}

export function QrCameraScanner({ eventId }: { eventId?: string }) {
  const [manualCode, setManualCode] = React.useState("");
  const [isScanning, setIsScanning] = React.useState(true);
  const [lastResult, setLastResult] = React.useState<ScanResult | null>(null);
  const [scanHistory, setScanHistory] = React.useState<ScanResult[]>([
    {
      ticketCode: "KIIT-HACK-21051982-8F92",
      studentName: "Ayush Sharma",
      rollNumber: "21051982",
      eventName: "Kreative Hacks 2026",
      checkedInAt: "10:14 AM",
      status: "VALID",
    }
  ]);

  const handleVerifyCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return;

    // Simulate validation logic
    if (cleanCode.includes("21051982")) {
      const alreadyChecked = scanHistory.some(s => s.ticketCode === cleanCode && s.status === "VALID");
      
      const result: ScanResult = {
        ticketCode: cleanCode,
        studentName: "Ayush Sharma",
        rollNumber: "21051982",
        eventName: "Kreative Hacks 2026",
        checkedInAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
        status: alreadyChecked ? "ALREADY_CHECKED_IN" : "VALID",
      };
      
      setLastResult(result);
      if (!alreadyChecked) {
        setScanHistory(prev => [result, ...prev]);
      }
    } else if (cleanCode.startsWith("KIIT-")) {
      const result: ScanResult = {
        ticketCode: cleanCode,
        studentName: "Rohan Verma",
        rollNumber: "22050419",
        eventName: "Kreative Hacks 2026",
        checkedInAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
        status: "VALID",
      };
      setLastResult(result);
      setScanHistory(prev => [result, ...prev]);
    } else {
      setLastResult({
        ticketCode: cleanCode,
        studentName: "Unknown",
        rollNumber: "N/A",
        eventName: "N/A",
        checkedInAt: "N/A",
        status: "INVALID",
      });
    }

    setManualCode("");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Scanner Viewfinder Box */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-slate-700 bg-slate-950 p-6 text-center shadow-2xl">
        <div className="relative mx-auto flex h-72 w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-emerald-500/60 bg-emerald-950/20">
          {/* Laser Scan line animation */}
          {isScanning && (
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#22c55e] animate-bounce"></div>
          )}

          <div className="flex flex-col items-center text-slate-400 p-6">
            <Scan className="h-16 w-16 text-emerald-400/80 mb-3 animate-pulse" />
            <p className="text-sm font-semibold text-slate-200">
              Align Student Pass QR Code within frame
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports live camera streams or fast barcode scanners
            </p>
          </div>

          <div className="absolute bottom-3 flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400">
              Gate Scanner Active
            </span>
          </div>
        </div>

        {/* Quick Simulation Buttons */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-400 mr-1">Simulate Test Scans:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleVerifyCode("KIIT-HACK-21051982-8F92")}
          >
            Valid: 21051982
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleVerifyCode("KIIT-HACK-22050419-3A19")}
          >
            Valid: 22050419
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVerifyCode("INVALID-TOKEN-9999")}
            className="text-rose-400 hover:text-rose-300"
          >
            Invalid QR
          </Button>
        </div>
      </div>

      {/* Manual Input Fallback */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md">
        <label className="text-xs font-semibold text-slate-300 mb-2 block">
          Manual Ticket Code / Roll Number Lookup:
        </label>
        <div className="flex gap-2">
          <Input
            placeholder="Enter Ticket Code or Roll Number (e.g. 21051982)..."
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleVerifyCode(manualCode)}
            icon={<Search className="h-4 w-4 text-slate-400" />}
          />
          <Button variant="primary" size="md" onClick={() => handleVerifyCode(manualCode)}>
            Check-In
          </Button>
        </div>
      </div>

      {/* Live Scan Verdict Popup */}
      {lastResult && (
        <div
          className={`rounded-2xl p-5 border transition-all ${
            lastResult.status === "VALID"
              ? "bg-emerald-950/60 border-emerald-500/80 shadow-lg shadow-emerald-950/40"
              : lastResult.status === "ALREADY_CHECKED_IN"
              ? "bg-amber-950/60 border-amber-500/80 shadow-lg shadow-amber-950/40"
              : "bg-rose-950/60 border-rose-500/80 shadow-lg shadow-rose-950/40"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {lastResult.status === "VALID" ? (
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-slate-950 font-bold">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-slate-950 font-bold">
                  <AlertTriangle className="h-7 w-7" />
                </div>
              )}
              <div>
                <h4 className="text-base font-bold text-white">
                  {lastResult.status === "VALID" && "Check-In Approved"}
                  {lastResult.status === "ALREADY_CHECKED_IN" && "Warning: Already Checked In"}
                  {lastResult.status === "INVALID" && "Access Denied: Invalid Pass"}
                </h4>
                <p className="text-xs text-slate-300">
                  {lastResult.studentName} • Roll: <span className="font-mono font-bold text-emerald-400">{lastResult.rollNumber}</span>
                </p>
              </div>
            </div>
            <Badge
              variant={
                lastResult.status === "VALID"
                  ? "success"
                  : lastResult.status === "ALREADY_CHECKED_IN"
                  ? "warning"
                  : "danger"
              }
            >
              {lastResult.status}
            </Badge>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/10">
            <span>Code: <code className="font-mono text-white">{lastResult.ticketCode}</code></span>
            <span>Time: {lastResult.checkedInAt}</span>
          </div>
        </div>
      )}

      {/* Recent Check-Ins Log */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <UserCheck className="h-4 w-4 text-emerald-400" />
          Recent Gate Check-Ins (Live Feed)
        </h4>
        <div className="divide-y divide-slate-800">
          {scanHistory.map((scan, i) => (
            <div key={i} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white">{scan.studentName}</span>
                <span className="text-slate-400 ml-2 font-mono">({scan.rollNumber})</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400">{scan.checkedInAt}</span>
                <span className="text-emerald-400 font-semibold">Entry Allowed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
