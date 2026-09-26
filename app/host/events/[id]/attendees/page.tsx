"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Download, 
  Search, 
  CheckCircle, 
  Clock, 
  FileSpreadsheet, 
  Users 
} from "lucide-react";
import { MOCK_EVENTS, MOCK_REGISTRATIONS } from "@/lib/data/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function AttendeeManagementPage() {
  const params = useParams();
  const eventId = params?.id as string;
  const event = MOCK_EVENTS.find((e) => e.id === eventId) || MOCK_EVENTS[0];

  const [searchQuery, setSearchQuery] = React.useState("");
  const [attendees, setAttendees] = React.useState([
    {
      id: "att-1",
      name: "Ayush Sharma",
      rollNumber: "21051982",
      email: "21051982@kiit.ac.in",
      school: "School of Computer Engineering",
      ticketCode: "KIIT-HACK-21051982-8F92",
      status: "CHECKED_IN",
      checkedInTime: "10:14 AM",
    },
    {
      id: "att-2",
      name: "Rohan Verma",
      rollNumber: "22050419",
      email: "22050419@kiit.ac.in",
      school: "School of Electronics",
      ticketCode: "KIIT-HACK-22050419-3A19",
      status: "CONFIRMED",
      checkedInTime: "-",
    },
    {
      id: "att-3",
      name: "Sneha Mohapatra",
      rollNumber: "21050981",
      email: "21050981@kiit.ac.in",
      school: "School of Computer Engineering",
      ticketCode: "KIIT-HACK-21050981-99B1",
      status: "CHECKED_IN",
      checkedInTime: "09:48 AM",
    },
    {
      id: "att-4",
      name: "Debabrata Dash",
      rollNumber: "23051184",
      email: "23051184@kiit.ac.in",
      school: "School of Mechanical",
      ticketCode: "KIIT-HACK-23051184-74C2",
      status: "CONFIRMED",
      checkedInTime: "-",
    }
  ]);

  // Filter attendees by search
  const filtered = attendees.filter((a) => {
    const q = searchQuery.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.rollNumber.includes(q) ||
      a.ticketCode.toLowerCase().includes(q)
    );
  });

  // Toggle check-in state
  const toggleCheckIn = (id: string) => {
    setAttendees((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === "CHECKED_IN" ? "CONFIRMED" : "CHECKED_IN";
          return {
            ...a,
            status: nextStatus,
            checkedInTime:
              nextStatus === "CHECKED_IN"
                ? new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
                : "-",
          };
        }
        return a;
      })
    );
  };

  // CSV Export Logic
  const handleExportCsv = () => {
    const headers = ["Ticket Code", "Student Name", "Roll Number", "Email", "School", "Check-in Status", "Checked-in Time"];
    const rows = attendees.map((a) => [
      a.ticketCode,
      a.name,
      a.rollNumber,
      a.email,
      `"${a.school}"`,
      a.status,
      a.checkedInTime,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${event.slug}-attendee-roster.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/host/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Host Studio</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Participant Registry
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Attendee Roster & Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Event: <span className="font-semibold text-white">{event.title}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="gold" size="sm" onClick={handleExportCsv}>
            <Download className="h-4 w-4 mr-1.5 text-slate-950" />
            Export CSV / Excel
          </Button>
        </div>
      </div>

      {/* Search and Stats Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search by student name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4 text-slate-400" />}
          />
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>
            Total Registered: <strong className="text-white">{attendees.length}</strong>
          </span>
          <span>
            Checked In:{" "}
            <strong className="text-emerald-400">
              {attendees.filter((a) => a.status === "CHECKED_IN").length}
            </strong>
          </span>
        </div>
      </div>

      {/* Attendee Table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Student Details</th>
              <th className="py-3.5 px-4">Roll Number</th>
              <th className="py-3.5 px-4">School</th>
              <th className="py-3.5 px-4">Ticket Code</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Gate Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            {filtered.map((att) => (
              <tr key={att.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 px-4">
                  <span className="font-bold text-white block">{att.name}</span>
                  <span className="text-[11px] text-slate-400">{att.email}</span>
                </td>
                <td className="py-3.5 px-4 font-mono font-semibold text-emerald-400">
                  {att.rollNumber}
                </td>
                <td className="py-3.5 px-4 text-slate-300">{att.school}</td>
                <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                  {att.ticketCode}
                </td>
                <td className="py-3.5 px-4">
                  <Badge variant={att.status === "CHECKED_IN" ? "success" : "default"}>
                    {att.status === "CHECKED_IN" ? `Checked In (${att.checkedInTime})` : "Confirmed"}
                  </Badge>
                </td>
                <td className="py-3.5 px-4">
                  <button
                    onClick={() => toggleCheckIn(att.id)}
                    className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
                      att.status === "CHECKED_IN"
                        ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        : "bg-emerald-600 text-white hover:bg-emerald-500"
                    }`}
                  >
                    {att.status === "CHECKED_IN" ? "Undo Check-In" : "Check-In"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
