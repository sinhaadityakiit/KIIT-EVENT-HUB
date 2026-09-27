"use client";

import * as React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-950/60 text-rose-400 border border-rose-500/30">
          <ShieldAlert className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-white">
            Access Restricted
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            You do not have the required role privileges to access this university administrative area.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full text-xs">
              <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
              Return Home
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button variant="primary" size="sm" className="w-full text-xs">
              <LogIn className="h-3.5 w-3.5 mr-1.5" />
              Switch Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
