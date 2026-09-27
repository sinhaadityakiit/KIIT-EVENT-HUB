import Link from "next/link";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-kiit-green text-white font-black text-sm">
                KIIT
              </div>
              <span className="font-bold text-white tracking-tight text-lg">KSAC Events Hub</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Independent student sample project created for educational and demonstration purposes. Designed to model campus event discovery, ticketing, and scheduling workflows.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400/90">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
              Demonstration Mode (Educational Project)
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Campus Portals</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/events" className="hover:text-emerald-400 transition-colors">Browse All Events</Link></li>
              <li><Link href="/societies" className="hover:text-emerald-400 transition-colors">Recognized Societies</Link></li>
              <li><Link href="/venues" className="hover:text-emerald-400 transition-colors">Campus Auditoriums</Link></li>
              <li><Link href="/student/dashboard" className="hover:text-emerald-400 transition-colors">Student Passes</Link></li>
            </ul>
          </div>

          {/* Organizer Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Organizers & Admins</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/host/dashboard" className="hover:text-amber-400 transition-colors">Host Studio</Link></li>
              <li><Link href="/host/events/new" className="hover:text-amber-400 transition-colors">Submit Event Proposal</Link></li>
              <li><Link href="/admin/approvals" className="hover:text-rose-400 transition-colors">KSAC Approval Queue</Link></li>
              <li><Link href="/admin/venues" className="hover:text-rose-400 transition-colors">Venue Conflict Matrix</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Campus Reference Info</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Campus 7, KIIT Deemed to be University, Patia, Bhubaneswar, Odisha - 751024</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>ksac@kiit.ac.in (Reference Only)</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>kiit.ac.in (Official University Site)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-8 pt-8 border-t border-slate-900 space-y-4">
          <div className="rounded-2xl border border-amber-500/20 bg-slate-900/80 p-4 text-xs text-slate-300">
            <p className="font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
              <span>Important Notice & Disclaimer</span>
            </p>
            <p className="leading-relaxed text-slate-400">
              This is an independent student/sample project created for educational and demonstration purposes. It is not an official KIIT website or application, is not affiliated with or endorsed by KIIT, and I do not have authorization from KIIT to represent this as an official platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 Independent Educational Demonstration Project.</p>
            <p className="text-slate-400 font-medium">Unofficial Sample Implementation</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
