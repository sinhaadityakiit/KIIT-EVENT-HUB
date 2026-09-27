import Link from "next/link";
import { ShieldAlert, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 rounded-3xl border border-rose-900/60 bg-slate-900/80 p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-950 border border-rose-700/80 text-rose-400 mx-auto">
          <ShieldAlert className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">Access Restricted (403)</h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your simulated account does not have sufficient role privileges to access this area.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950/80 p-4 border border-slate-800 text-left text-xs space-y-2 text-slate-400">
          <p className="text-slate-300 font-semibold">Demo Role Matrix:</p>
          <p>• <strong>Host Studio:</strong> Accessible to simulated Host & Admin accounts.</p>
          <p>• <strong>Admin Portal:</strong> Accessible to simulated Admin accounts only.</p>
          <p className="text-[11px] text-amber-300 pt-1">
            💡 Tip: In this prototype, you can instantly test other roles using the <strong>Role Switcher</strong> pill in the top navigation bar!
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <Link href="/">
            <Button variant="primary" size="md" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Campus Events Portal
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" size="sm" className="w-full text-xs">
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
              Switch Demo Account on Login Screen
            </Button>
          </Link>
        </div>

        <div className="pt-2 border-t border-slate-800/80">
          <DisclaimerBanner variant="subtle" />
        </div>
      </div>
    </div>
  );
}
