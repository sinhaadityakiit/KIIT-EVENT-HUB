"use client";

import * as React from "react";
import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  UserCheck, 
  UserX, 
  Mail, 
  Building, 
  School, 
  MoreVertical,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { INITIAL_USERS } from "@/lib/data/store";
import { UserProfile, UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminUsersManagementPage() {
  const [users, setUsers] = React.useState<UserProfile[]>(INITIAL_USERS);
  const [search, setSearch] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<string>("ALL");
  const [statusFilter, setStatusFilter] = React.useState<string>("ALL");
  const [notification, setNotification] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleToggleStatus = (userId: string, currentStatus?: string) => {
    const newStatus = currentStatus === "SUSPENDED" ? "ACTIVE" : "SUSPENDED";
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    showToast(`User status updated to ${newStatus}`);
  };

  const handleVerifyHost = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: "VERIFIED" } : u));
    showToast(`Host account verified and credentials approved`);
  };

  const filtered = users.filter(u => {
    const matchesSearch = 
      u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (u.username && u.username.toLowerCase().includes(search.toLowerCase())) ||
      (u.roll_number && u.roll_number.includes(search)) ||
      (u.society_name && u.society_name.toLowerCase().includes(search.toLowerCase()));
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    const matchesStatus = statusFilter === "ALL" || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="success" className="text-xs">
              Role-Based Access Registry
            </Badge>
            <span className="text-xs text-slate-400">• KSAC Portal Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Users className="h-8 w-8 text-purple-400" />
            User & Society Lead Directory
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage authenticated student identities, society organizers, and university central administrators.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs py-1.5 px-3 bg-slate-900 border-slate-700">
            Total Enrolled: <strong className="text-white ml-1 font-mono">3,330</strong>
          </Badge>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-sm flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Role Counts Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Students Registered</div>
              <div className="text-xl font-bold text-white">3,240</div>
            </div>
          </div>
          <Badge variant="success" className="text-[10px]">Active</Badge>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-950/60 text-amber-400 border border-amber-500/30">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Host Organizers & Clubs</div>
              <div className="text-xl font-bold text-white">86</div>
            </div>
          </div>
          <Badge variant="warning" className="text-[10px]">Recognized</Badge>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-950/60 text-purple-400 border border-purple-500/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Central Administrators</div>
              <div className="text-xl font-bold text-white">4</div>
            </div>
          </div>
          <Badge variant="danger" className="text-[10px]">KSAC Joint Dir</Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by full name, roll number, society, or username..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-kiit-green"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            aria-label="Filter users by role"
            className="bg-slate-950/80 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-kiit-green"
          >
            <option value="ALL">All Roles</option>
            <option value="STUDENT">Student (User)</option>
            <option value="HOST">Host (Society Lead)</option>
            <option value="ADMIN">Administrator</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter users by account status"
            className="bg-slate-950/80 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-kiit-green"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="VERIFIED">Verified</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/70 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Academic School / Affiliation</th>
                <th className="px-6 py-4">System Role</th>
                <th className="px-6 py-4">Account Status</th>
                <th className="px-6 py-4 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 font-bold text-white text-xs border border-slate-700">
                        {u.full_name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">{u.full_name}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Mail className="h-3 w-3 text-slate-500" />
                          <span>{u.email}</span>
                          {u.roll_number && (
                            <span className="font-mono text-[11px] text-slate-500">• {u.roll_number}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-300 font-medium">{u.school || "KIIT Deemed to be University"}</div>
                    {u.society_name && (
                      <div className="text-xs text-amber-400 font-semibold mt-0.5">
                        Society: {u.society_name}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      u.role === "ADMIN" ? "danger" :
                      u.role === "HOST" ? "warning" : "default"
                    } className="text-[10px]">
                      {u.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold ${
                      u.status === "VERIFIED" ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40" :
                      u.status === "ACTIVE" ? "bg-blue-950/60 text-blue-400 border border-blue-800/40" :
                      "bg-rose-950/60 text-rose-400 border border-rose-800/40"
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        u.status === "VERIFIED" ? "bg-emerald-400" :
                        u.status === "ACTIVE" ? "bg-blue-400" : "bg-rose-400"
                      }`}></span>
                      {u.status || "ACTIVE"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {u.role === "HOST" && u.status !== "VERIFIED" && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleVerifyHost(u.id)}
                          className="text-emerald-400 hover:bg-emerald-950/40 text-xs h-8"
                        >
                          <UserCheck className="h-3.5 w-3.5 mr-1" />
                          Verify Host
                        </Button>
                      )}
                      {u.role !== "ADMIN" && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleToggleStatus(u.id, u.status)}
                          className={`text-xs h-8 ${
                            u.status === "SUSPENDED" 
                              ? "text-emerald-400 hover:bg-emerald-950/40" 
                              : "text-rose-400 hover:bg-rose-950/40"
                          }`}
                        >
                          {u.status === "SUSPENDED" ? (
                            <>
                              <UserCheck className="h-3.5 w-3.5 mr-1" />
                              Reactivate
                            </>
                          ) : (
                            <>
                              <UserX className="h-3.5 w-3.5 mr-1" />
                              Suspend
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
