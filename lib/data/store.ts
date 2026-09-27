import { PendingSubmission, VlogItem, ReelItem, AppNotification, UserProfile, UserRole } from "@/types";

// INITIAL APPROVAL QUEUE SUBMISSIONS (As required by prompt)
export const INITIAL_SUBMISSIONS: PendingSubmission[] = [
  {
    id: "sub-cultural-night-2026",
    title: "KIIT Cultural Night 2026",
    host: "host1",
    hostEmail: "host1@kiit.ac.in",
    category: "Cultural",
    submissionDate: "10 October 2026",
    eventDate: "15 October 2026",
    timeSlot: "05:30 PM - 10:00 PM",
    venue: "Campus 6 - Central Auditorium",
    capacity: 1500,
    budget: 350000,
    status: "Pending",
    description: "Grand annual cultural night showcasing classical, western, and fusion student performances, band battles, and drama troupe acts with prominent guest artists.",
  },
  {
    id: "sub-cricket-championship-2026",
    title: "Inter-College Cricket Championship",
    host: "Sports Club",
    hostEmail: "sports.club@kiit.ac.in",
    category: "Sports",
    submissionDate: "12 October 2026",
    eventDate: "20 October 2026",
    timeSlot: "08:00 AM - 05:00 PM",
    venue: "Campus 13 Sports Complex",
    capacity: 800,
    budget: 180000,
    status: "Pending",
    description: "Inter-collegiate cricket tournament featuring 16 premier university teams competing in knockout league stages with certified umpires and live scoreboards.",
  },
  {
    id: "sub-ai-future-tech-2026",
    title: "AI & Future Technology Workshop",
    host: "Tech Club",
    hostEmail: "tech.club@kiit.ac.in",
    category: "Technical",
    submissionDate: "14 October 2026",
    eventDate: "25 October 2026",
    timeSlot: "10:00 AM - 04:30 PM",
    venue: "Campus 3 - Convention Centre (Audi 1)",
    capacity: 500,
    budget: 120000,
    status: "Pending",
    description: "Deep dive workshop into LLMs, Multi-Agent systems, Retrieval-Augmented Generation (RAG), and production deployment on modern cloud clusters.",
  },
];

// INITIAL VLOGS (As specified by prompt)
export const INITIAL_VLOGS: VlogItem[] = [
  {
    id: "vlog-1",
    title: "KIIT Fest 2026 Highlights",
    creator: "KIIT Events Team",
    duration: "8:45",
    category: "Events",
    date: "22 Sep 2026",
    views: 28400,
    likes: 3820,
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    description: "Relive the electrifying moments of Central India's biggest university fest: star nights, battle of the bands, pro-shows, and celebrity appearances at Campus 6 Central Lawns.",
  },
  {
    id: "vlog-2",
    title: "Campus Tour — Campus 6 & 15",
    creator: "Campus Life",
    duration: "12:20",
    category: "Campus",
    date: "18 Sep 2026",
    views: 19500,
    likes: 2150,
    thumbnail: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    description: "Complete walkthrough of KIIT Campus 6 (Central Convention Center & Auditorium) and Campus 15 (School of Computer Engineering high-tech AI research labs).",
  },
  {
    id: "vlog-3",
    title: "Hackathon Aftermovie",
    creator: "KRS Tech",
    duration: "6:10",
    category: "Technical",
    date: "24 Sep 2026",
    views: 14200,
    likes: 1980,
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    description: "36 hours of non-stop coding, pizza, hardware prototyping, and AI agent hacking at the annual KIIT Inter-College Hackathon.",
  },
  {
    id: "vlog-4",
    title: "Drama Society Auditions",
    creator: "Kalakaar",
    duration: "4:30",
    category: "Cultural",
    date: "25 Sep 2026",
    views: 11300,
    likes: 1420,
    thumbnail: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80",
    description: "Catch the raw talent, emotional monologues, and dramatic improv battles at Kalakaar's Autumn 2026 fresher recruitment drive at KSAC.",
  },
];

// INITIAL REELS (As specified by prompt)
export const INITIAL_REELS: ReelItem[] = [
  {
    id: "reel-1",
    title: "Dance Society Flashmob",
    creator: "Korus",
    category: "Cultural",
    date: "22 Sep 2026",
    views: 45200,
    likes: 6200,
    duration: "0:45",
    thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "reel-2",
    title: "RoboWar Final Moment",
    creator: "Robotics Club",
    category: "Technical",
    date: "23 Sep 2026",
    views: 38900,
    likes: 4900,
    duration: "0:30",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "reel-3",
    title: "Star Night Teaser",
    creator: "KIIT Fest Team",
    category: "Events",
    date: "24 Sep 2026",
    views: 62100,
    likes: 9100,
    duration: "0:50",
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "reel-4",
    title: "Cricket Championship Winning Six",
    creator: "Sports Cell",
    category: "Sports",
    date: "25 Sep 2026",
    views: 29400,
    likes: 3800,
    duration: "0:25",
    thumbnail: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "reel-5",
    title: "Food Fest Sneak Peek",
    creator: "Hospitality Club",
    category: "Campus",
    date: "26 Sep 2026",
    views: 31800,
    likes: 4200,
    duration: "0:40",
    thumbnail: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "reel-6",
    title: "Fashion Walk Highlights",
    creator: "Kronicle",
    category: "Cultural",
    date: "27 Sep 2026",
    views: 34500,
    likes: 5100,
    duration: "0:55",
    thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
  },
];

// INITIAL NOTIFICATIONS
export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif-1",
    title: "Registration Confirmed",
    message: "Your registration for KIIT Cultural Night has been confirmed.",
    timestamp: "10 mins ago",
    read: false,
    type: "event",
    targetRole: "STUDENT",
    actionUrl: "/student/dashboard",
  },
  {
    id: "notif-2",
    title: "Event Reminder",
    message: "AI & Future Technology Workshop starts tomorrow at Campus 3 Audi 1.",
    timestamp: "2 hours ago",
    read: false,
    type: "event",
    targetRole: "STUDENT",
    actionUrl: "/events",
  },
  {
    id: "notif-3",
    title: "New Media Upload",
    message: "New campus reel uploaded by KIIT Events Team: 'Cultural Fest Highlights 🎉'.",
    timestamp: "5 hours ago",
    read: true,
    type: "media",
    targetRole: "ALL",
    actionUrl: "/student/vlogs",
  },
  {
    id: "notif-4",
    title: "Pending Proposal Review",
    message: "New event proposal 'Inter-College Cricket Championship' submitted by Sports Club.",
    timestamp: "1 day ago",
    read: false,
    type: "approval",
    targetRole: "ADMIN",
    actionUrl: "/admin/approvals",
  },
  {
    id: "notif-5",
    title: "Venue Maintenance Notice",
    message: "Campus 6 Auditorium sound system routine maintenance scheduled for this Sunday.",
    timestamp: "2 days ago",
    read: true,
    type: "system",
    targetRole: "HOST",
    actionUrl: "/venues",
  },
];

// USERS DIRECTORY FOR ADMIN USER MANAGEMENT
export const INITIAL_USERS: UserProfile[] = [
  {
    id: "usr-1",
    full_name: "Ayush Sharma",
    username: "student1",
    email: "21051982@kiit.ac.in",
    roll_number: "21051982",
    school: "School of Computer Engineering (KSCE)",
    role: "STUDENT",
    status: "ACTIVE",
    created_at: "2026-01-15",
    avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "usr-2",
    full_name: "Priya Mohanty",
    username: "host1",
    email: "host1@kiit.ac.in",
    roll_number: "20050811",
    school: "School of Mechanical Engineering",
    role: "HOST",
    status: "VERIFIED",
    society_name: "KIIT Robotics Society (KRS)",
    created_at: "2026-01-10",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "usr-3",
    full_name: "Dr. S. K. Rout",
    username: "Admin",
    email: "ksac.admin@kiit.ac.in",
    school: "Student Activity Centre (KSAC)",
    role: "ADMIN",
    status: "ACTIVE",
    created_at: "2025-08-01",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "usr-4",
    full_name: "Rohan Verma",
    username: "rohanv",
    email: "22050419@kiit.ac.in",
    roll_number: "22050419",
    school: "School of Electronics Engineering (KSEE)",
    role: "STUDENT",
    status: "ACTIVE",
    created_at: "2026-02-01",
  },
  {
    id: "usr-5",
    full_name: "Sneha Mohapatra",
    username: "sneham",
    email: "21050981@kiit.ac.in",
    roll_number: "21050981",
    school: "School of Computer Engineering (KSCE)",
    role: "STUDENT",
    status: "ACTIVE",
    created_at: "2026-02-11",
  },
  {
    id: "usr-6",
    full_name: "Ananya Mishra",
    username: "korus_coord",
    email: "ananya.mishra@kiit.ac.in",
    school: "Korus Music Society",
    role: "HOST",
    status: "VERIFIED",
    society_name: "Korus - The Music Society",
    created_at: "2025-11-20",
  },
  {
    id: "usr-7",
    full_name: "Dr. B. K. Jena",
    username: "jena_admin",
    email: "bk.jena@kiit.ac.in",
    school: "KSAC Operations Desk",
    role: "ADMIN",
    status: "ACTIVE",
    created_at: "2025-09-01",
  },
  {
    id: "usr-8",
    full_name: "Debabrata Dash",
    username: "debabrata_d",
    email: "23051184@kiit.ac.in",
    roll_number: "23051184",
    school: "School of Civil Engineering",
    role: "STUDENT",
    status: "ACTIVE",
    created_at: "2026-03-05",
  },
  {
    id: "usr-9",
    full_name: "Tanmoy Sen",
    username: "kalakaar_lead",
    email: "kalakaar.lead@kiit.ac.in",
    school: "Kalakaar Dramatics",
    role: "HOST",
    status: "VERIFIED",
    society_name: "Kalakaar - The Dramatics Club",
    created_at: "2025-12-05",
  },
  {
    id: "usr-10",
    full_name: "Ritesh Patnaik",
    username: "ritesh_p",
    email: "20054910@kiit.ac.in",
    roll_number: "20054910",
    school: "School of Management (KSOM)",
    role: "STUDENT",
    status: "SUSPENDED",
    created_at: "2026-01-20",
  },
];

// CLIENT-SIDE STATE HELPERS (With LocalStorage Persistence)
export function getStoredSubmissions(): PendingSubmission[] {
  if (typeof window === "undefined") return INITIAL_SUBMISSIONS;
  try {
    const data = localStorage.getItem("kiit_demo_submissions");
    if (data) return JSON.parse(data);
    localStorage.setItem("kiit_demo_submissions", JSON.stringify(INITIAL_SUBMISSIONS));
  } catch (e) {
    console.error("Error reading submissions", e);
  }
  return INITIAL_SUBMISSIONS;
}

export function saveStoredSubmissions(items: PendingSubmission[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("kiit_demo_submissions", JSON.stringify(items));
  } catch (e) {
    console.error("Error saving submissions", e);
  }
}

export function addEventSubmission(newSub: Omit<PendingSubmission, "id" | "submissionDate" | "status">): PendingSubmission {
  const current = getStoredSubmissions();
  const created: PendingSubmission = {
    ...newSub,
    id: `sub-${Date.now()}`,
    submissionDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
    status: "Pending",
  };
  const updated = [created, ...current];
  saveStoredSubmissions(updated);
  return created;
}

export function updateSubmissionStatus(id: string, status: PendingSubmission["status"], reason?: string): PendingSubmission[] {
  const current = getStoredSubmissions();
  const updated = current.map((sub) => {
    if (sub.id === id) {
      return {
        ...sub,
        status,
        rejectionReason: status === "Rejected" ? reason : sub.rejectionReason,
        changesNote: status === "Changes Requested" ? reason : sub.changesNote,
        reviewedAt: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
      };
    }
    return sub;
  });
  saveStoredSubmissions(updated);
  return updated;
}

export function getStoredNotifications(): AppNotification[] {
  if (typeof window === "undefined") return INITIAL_NOTIFICATIONS;
  try {
    const data = localStorage.getItem("kiit_demo_notifications");
    if (data) return JSON.parse(data);
    localStorage.setItem("kiit_demo_notifications", JSON.stringify(INITIAL_NOTIFICATIONS));
  } catch (e) {
    console.error("Error reading notifications", e);
  }
  return INITIAL_NOTIFICATIONS;
}

export function toggleNotificationRead(id: string): AppNotification[] {
  const current = getStoredNotifications();
  const updated = current.map((n) => (n.id === id ? { ...n, read: !n.read } : n));
  if (typeof window !== "undefined") {
    localStorage.setItem("kiit_demo_notifications", JSON.stringify(updated));
  }
  return updated;
}

export function markAllNotificationsRead(role?: UserRole): AppNotification[] {
  const current = getStoredNotifications();
  const updated = current.map((n) => {
    if (!role || n.targetRole === "ALL" || n.targetRole === role) {
      return { ...n, read: true };
    }
    return n;
  });
  if (typeof window !== "undefined") {
    localStorage.setItem("kiit_demo_notifications", JSON.stringify(updated));
  }
  return updated;
}

export function getStoredVlogs(): VlogItem[] {
  if (typeof window === "undefined") return INITIAL_VLOGS;
  try {
    const data = localStorage.getItem("kiit_demo_vlogs_v2");
    if (data) return JSON.parse(data);
    localStorage.setItem("kiit_demo_vlogs_v2", JSON.stringify(INITIAL_VLOGS));
  } catch (e) {
    console.error("Error reading vlogs", e);
  }
  return INITIAL_VLOGS;
}

export function toggleLikeVlog(id: string): VlogItem[] {
  const current = getStoredVlogs();
  const updated = current.map((v) => {
    if (v.id === id) {
      const isLiked = !v.isLiked;
      return {
        ...v,
        isLiked,
        likes: isLiked ? v.likes + 1 : v.likes - 1,
      };
    }
    return v;
  });
  if (typeof window !== "undefined") {
    localStorage.setItem("kiit_demo_vlogs_v2", JSON.stringify(updated));
  }
  return updated;
}

export function getStoredReels(): ReelItem[] {
  if (typeof window === "undefined") return INITIAL_REELS;
  try {
    const data = localStorage.getItem("kiit_demo_reels_v2");
    if (data) return JSON.parse(data);
    localStorage.setItem("kiit_demo_reels_v2", JSON.stringify(INITIAL_REELS));
  } catch (e) {
    console.error("Error reading reels", e);
  }
  return INITIAL_REELS;
}

export function toggleLikeReel(id: string): ReelItem[] {
  const current = getStoredReels();
  const updated = current.map((r) => {
    if (r.id === id) {
      const isLiked = !r.isLiked;
      return {
        ...r,
        isLiked,
        likes: isLiked ? r.likes + 1 : r.likes - 1,
      };
    }
    return r;
  });
  if (typeof window !== "undefined") {
    localStorage.setItem("kiit_demo_reels_v2", JSON.stringify(updated));
  }
  return updated;
}

