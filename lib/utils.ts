import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-IN", options);
}

export function formatTime(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Date(dateString).toLocaleTimeString("en-IN", options);
}

export function getCategoryBadgeClass(category: string): string {
  switch (category) {
    case "TECHNICAL":
    case "HACKATHON":
      return "bg-blue-900/60 text-blue-300 border-blue-700/60";
    case "CULTURAL":
    case "FEST":
      return "bg-purple-900/60 text-purple-300 border-purple-700/60";
    case "SPORTS":
      return "bg-emerald-900/60 text-emerald-300 border-emerald-700/60";
    case "WORKSHOP":
    case "SEMINAR":
      return "bg-amber-900/60 text-amber-300 border-amber-700/60";
    default:
      return "bg-gray-800 text-gray-300 border-gray-700";
  }
}
