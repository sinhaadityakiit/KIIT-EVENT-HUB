"use client";

import * as React from "react";
import { 
  Bell, 
  Send, 
  CheckCheck, 
  AlertCircle, 
  ShieldCheck, 
  Clock, 
  Filter, 
  Trash2,
  CheckCircle2,
  Calendar,
  Building
} from "lucide-react";
import { getStoredNotifications, toggleNotificationRead, markAllNotificationsRead } from "@/lib/data/store";
import { AppNotification, UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = React.useState<AppNotification[]>([]);
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [targetRole, setTargetRole] = React.useState<UserRole | "ALL">("ALL");
  const [showBroadcastModal, setShowBroadcastModal] = React.useState(false);
  const [toast, setToast] = React.useState<string | null>(null);

  React.useEffect(() => {
    setNotifications(getStoredNotifications());
  }, []);

  const showNotificationToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggle = (id: string) => {
    const updated = toggleNotificationRead(id);
    setNotifications(updated);
  };

  const handleMarkAll = () => {
    const updated = markAllNotificationsRead("ADMIN");
    setNotifications(updated);
    showNotificationToast("All admin notifications marked as read");
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: title.trim(),
      message: message.trim(),
      timestamp: "Just now",
      read: false,
      type: "system",
      targetRole,
      actionUrl: "/events",
    };

    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("kiit_demo_notifications", JSON.stringify(updated));
    }

    setTitle("");
    setMessage("");
    setShowBroadcastModal(false);
    showNotificationToast(`Broadcast broadcasted to ${targetRole} users successfully!`);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="success" className="text-xs">
              Central Broadcast Desk
            </Badge>
            <span className="text-xs text-slate-400">• KSAC Real-Time Alerts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Bell className="h-8 w-8 text-kiit-gold" />
            Admin Notifications & Broadcasts
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Review security alerts, proposal submission pings, and send campus-wide announcements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleMarkAll}
            className="border-slate-700 bg-slate-900 text-slate-200 text-xs"
          >
            <CheckCheck className="h-4 w-4 mr-1.5 text-emerald-400" />
            Mark All Read
          </Button>

          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => setShowBroadcastModal(true)}
            className="text-xs"
          >
            <Send className="h-4 w-4 mr-1.5" />
            Create Broadcast
          </Button>
        </div>
      </div>

      {toast && (
        <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
            <Bell className="h-10 w-10 mx-auto text-slate-600 mb-3" />
            <p>No active notifications in the system.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleToggle(n.id)}
              className={`cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all flex items-start justify-between gap-4 ${
                n.read
                  ? "border-slate-800/80 bg-slate-900/30 opacity-70"
                  : "border-emerald-500/30 bg-slate-900/80 shadow-md"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl flex-shrink-0 ${
                  n.type === "approval" ? "bg-amber-950/60 text-amber-400 border border-amber-500/30" :
                  n.type === "system" ? "bg-blue-950/60 text-blue-400 border border-blue-500/30" :
                  n.type === "media" ? "bg-purple-950/60 text-purple-400 border border-purple-500/30" :
                  "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30"
                }`}>
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-white text-sm sm:text-base">{n.title}</span>
                    <Badge variant={n.targetRole === "ADMIN" ? "danger" : "default"} className="text-[10px]">
                      Target: {n.targetRole}
                    </Badge>
                    {!n.read && (
                      <span className="flex h-2 w-2 rounded-full bg-kiit-gold animate-pulse"></span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                  <div className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    <span>{n.timestamp}</span>
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-medium text-slate-500 hover:text-slate-300 flex-shrink-0">
                {n.read ? "Mark Unread" : "Mark Read"}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Broadcast Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <Send className="h-5 w-5 text-emerald-400" />
              Send Campus-Wide Broadcast
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Post an official announcement to students, society hosts, or all university members.
            </p>

            <form onSubmit={handleBroadcast} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Audience</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value as any)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 text-white text-xs p-3 focus:outline-none focus:border-kiit-green"
                >
                  <option value="ALL">All Campus Stakeholders (Students + Hosts + Admins)</option>
                  <option value="STUDENT">Students Only</option>
                  <option value="HOST">Society Hosts / Organizers Only</option>
                  <option value="ADMIN">Administration Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Announcement Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Campus 6 Central Audi Booking Open"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 text-white text-sm p-3 focus:outline-none focus:border-kiit-green"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Message Content</label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter broadcast details, timings, or guidelines..."
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 text-white text-sm p-3 focus:outline-none focus:border-kiit-green"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBroadcastModal(false)}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" className="text-xs">
                  <Send className="h-3.5 w-3.5 mr-1.5" />
                  Dispatch Broadcast
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
