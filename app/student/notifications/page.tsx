"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Bell, 
  CheckCheck, 
  Clock, 
  Calendar, 
  Film, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { getStoredNotifications, toggleNotificationRead, markAllNotificationsRead } from "@/lib/data/store";
import { AppNotification } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = React.useState<AppNotification[]>([]);
  const [toast, setToast] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Filter notifications relevant to student (STUDENT or ALL)
    const all = getStoredNotifications();
    setNotifications(all.filter(n => n.targetRole === "STUDENT" || n.targetRole === "ALL"));
  }, []);

  const handleToggle = (id: string) => {
    const updated = toggleNotificationRead(id);
    setNotifications(updated.filter(n => n.targetRole === "STUDENT" || n.targetRole === "ALL"));
  };

  const handleMarkAll = () => {
    const updated = markAllNotificationsRead("STUDENT");
    setNotifications(updated.filter(n => n.targetRole === "STUDENT" || n.targetRole === "ALL"));
    setToast("All student notifications marked as read");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="success" className="text-xs">
              Student Activity Updates
            </Badge>
            <span className="text-xs text-slate-400">• Real-Time Reminders</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Bell className="h-8 w-8 text-kiit-green" />
            Campus Notifications & Reminders
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Ticket confirmations, workshop reminders, and highlights from campus media societies.
          </p>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleMarkAll}
          className="border-slate-700 bg-slate-900 text-slate-200 text-xs self-start sm:self-auto"
        >
          <CheckCheck className="h-4 w-4 mr-1.5 text-emerald-400" />
          Mark All Read
        </Button>
      </div>

      {toast && (
        <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Notifications Feed */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
            <Bell className="h-10 w-10 mx-auto text-slate-600 mb-3" />
            <p>You have no unread notifications at this time.</p>
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
                  n.type === "media" ? "bg-amber-950/60 text-amber-400 border border-amber-500/30" :
                  n.type === "system" ? "bg-blue-950/60 text-blue-400 border border-blue-500/30" :
                  "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30"
                }`}>
                  {n.type === "media" ? (
                    <Film className="h-4 w-4" />
                  ) : (
                    <Calendar className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-white text-sm sm:text-base">{n.title}</span>
                    {!n.read && (
                      <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                  <div className="text-[11px] text-slate-500 mt-2 flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>{n.timestamp}</span>
                    {n.actionUrl && (
                      <Link 
                        href={n.actionUrl} 
                        onClick={(e) => e.stopPropagation()} 
                        className="text-emerald-400 hover:underline flex items-center gap-0.5 ml-2"
                      >
                        View Link <ChevronRight className="h-3 w-3" />
                      </Link>
                    )}
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
    </div>
  );
}
