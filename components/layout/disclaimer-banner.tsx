import * as React from "react";
import { AlertCircle, Info } from "lucide-react";

export interface DisclaimerBannerProps {
  variant?: "top-bar" | "card" | "subtle";
  className?: string;
}

export function DisclaimerBanner({ variant = "card", className = "" }: DisclaimerBannerProps) {
  const disclaimerText =
    "This is an independent student/sample project created for educational and demonstration purposes. It is not an official KIIT website or application, is not affiliated with or endorsed by KIIT, and I do not have authorization from KIIT to represent this as an official platform.";

  if (variant === "top-bar") {
    return (
      <div className={`bg-amber-950/80 border-b border-amber-500/30 px-4 py-2 text-center text-[11px] sm:text-xs text-amber-200/90 flex items-center justify-center gap-2 ${className}`}>
        <Info className="h-3.5 w-3.5 text-amber-400 shrink-0" />
        <span>
          <strong>Educational Demo:</strong> {disclaimerText}
        </span>
      </div>
    );
  }

  if (variant === "subtle") {
    return (
      <p className={`text-[11px] text-slate-400/90 leading-relaxed ${className}`}>
        <strong className="text-slate-300">Disclaimer:</strong> {disclaimerText}
      </p>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-amber-500/30 bg-amber-950/30 p-4 text-xs text-amber-200/90 backdrop-blur-sm flex items-start gap-3 ${className}`}
    >
      <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="font-semibold text-amber-300">Independent Educational Project Notice</p>
        <p className="leading-relaxed text-amber-200/80">{disclaimerText}</p>
      </div>
    </div>
  );
}
