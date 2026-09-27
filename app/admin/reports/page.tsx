"use client";

import * as React from "react";
import { 
  FileText, 
  Download, 
  CheckCircle, 
  Calendar, 
  TrendingUp, 
  FileSpreadsheet, 
  Filter, 
  Building, 
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminReportsPage() {
  const [downloadingId, setDownloadingId] = React.useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = React.useState<string | null>(null);

  const reports = [
    {
      id: "rep-budget-2026",
      title: "KIIT Society Budget Allocation & Utilization Report",
      description: "Detailed expenditure audit covering ₹14.5L total sanctioned grants across 86 registered student societies.",
      period: "Autumn Semester 2026",
      format: "PDF / CSV",
      size: "2.4 MB",
      dateGenerated: "26 Sep 2026",
      category: "Finance & Budget",
    },
    {
      id: "rep-attendance-2026",
      title: "Campus 1-25 QR Ticket Attendance & Verification Logs",
      description: "Complete database of 4,862 scanned student check-ins with timestamps, roll numbers, and venue entry gates.",
      period: "Jul 2026 - Present",
      format: "CSV",
      size: "5.1 MB",
      dateGenerated: "27 Sep 2026",
      category: "Attendance & Security",
    },
    {
      id: "rep-venues-2026",
      title: "Central Auditorium & Sports Complex Venue Usage Metrics",
      description: "Hourly utilization rates, sound system approvals, and security clearances for Campus 6 Audi and Campus 13 grounds.",
      period: "Academic Year 2025-26",
      format: "PDF",
      size: "1.8 MB",
      dateGenerated: "24 Sep 2026",
      category: "Facilities",
    },
    {
      id: "rep-compliance-2026",
      title: "Student Society Annual Compliance & Governance Review",
      description: "KSAC advisory ratings, faculty coordinator sign-offs, and conduct scores for cultural and tech societies.",
      period: "Annual 2025-2026",
      format: "PDF",
      size: "3.2 MB",
      dateGenerated: "20 Sep 2026",
      category: "Compliance",
    },
  ];

  const handleDownload = (id: string, name: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccess(name);
      setTimeout(() => setDownloadSuccess(null), 3500);
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="success" className="text-xs">
              Central Documentation
            </Badge>
            <span className="text-xs text-slate-400">• KSAC Governance Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <FileText className="h-8 w-8 text-emerald-400" />
            University Compliance & Analytics Reports
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Export comprehensive audits on student attendance, society expenditures, and venue allocations.
          </p>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-sm flex items-center justify-between animate-in fade-in duration-150">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
            <span>
              Document ready: <strong>{downloadSuccess}</strong> was downloaded to your system.
            </span>
          </div>
          <Badge variant="success" className="text-xs">Verified Export</Badge>
        </div>
      )}

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((rep) => (
          <div 
            key={rep.id} 
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <Badge variant="outline" className="text-xs">
                  {rep.category}
                </Badge>
                <span className="text-xs text-slate-400 font-mono">{rep.dateGenerated}</span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                {rep.title}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {rep.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                <span className="text-white font-medium">{rep.period}</span> • {rep.size}
              </div>

              <Button
                variant="primary"
                size="sm"
                disabled={downloadingId === rep.id}
                onClick={() => handleDownload(rep.id, rep.title)}
                className="flex items-center gap-1.5 text-xs"
              >
                <Download className="h-3.5 w-3.5" />
                {downloadingId === rep.id ? "Preparing..." : "Export File"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
