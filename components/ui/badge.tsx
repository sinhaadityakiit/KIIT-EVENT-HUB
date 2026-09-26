import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "gold" | "outline";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const base = "inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full border transition-colors";
  const variants = {
    default: "bg-slate-800 text-slate-300 border-slate-700",
    success: "bg-emerald-950/70 text-emerald-400 border-emerald-800/80",
    warning: "bg-amber-950/70 text-amber-400 border-amber-800/80",
    danger: "bg-rose-950/70 text-rose-400 border-rose-800/80",
    gold: "bg-amber-500/15 text-amber-300 border-amber-500/40",
    outline: "text-slate-300 border-slate-700/80",
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
