# KIIT University Event Management Web Platform (KSAC Events Hub)

A modern, high-performance campus event management, ticketing, and governance web application tailored specifically for **KIIT University (Kalinga Institute of Industrial Technology, Bhubaneswar)** and operated under the aegis of the **Student Activity Centre (KSAC, Campus 7)**.

---

## 🏛️ Key Features & Architecture

### 1. Student Portal (`/student/*`)
- **Event Explorer:** Real-time search, multi-category tag filtering (Technical, Cultural, Sports, Hackathons, Workshops), and campus venue filters.
- **1-Click RSVP:** Automatic generation of cryptographically verified QR Code digital passes with student Roll Number (e.g. `21051982`).
- **Pass Management:** Offline digital ticket pass with print/save as PDF support.
- **Feedback & Rating:** Post-event 5-star ratings and student reviews.

### 2. Host / Society Organizer Studio (`/host/*`)
- **Multi-Step Proposal Studio:** Basic Details -> Venue Request & Conflict Check -> Media & Agenda -> Budget Estimation -> Review & Submit.
- **Venue Double-Booking Detection:** Real-time schedule overlap warning (e.g., prevents booking Campus 6 Central Auditorium if already occupied).
- **Gate Check-in Scanner:** Mobile-friendly live QR code camera scanner with real-time verification and attendance logging.
- **Attendee Management:** Real-time search by roll number, check-in status toggling, and CSV/Excel export.

### 3. Admin Approvals Hub (`/admin/*`)
- **Central Approvals Queue:** Review, approve, reject, or request changes for host proposals with custom reviewer feedback.
- **University Governance:** Campus-wide analytics, society leaderboard by engagement, and venue utilization metrics.
- **Venue Booking Matrix:** Visual schedule matrix for all major campus auditoriums.

---

## 🎨 Branding & Theme
- **Primary Brand Green:** `#006837` (Iconic KIIT University Forest Green)
- **Secondary Brand Gold:** `#F59E0B` (Amber Gold accent)
- **Background Slate:** `#0F172A` / `#090E17`
- **Domain Restriction:** Enforces `@kiit.ac.in` domain and extracts student roll numbers from email IDs.

---

## 🛠️ Database Setup (Supabase / PostgreSQL)

1. Open your Supabase or PostgreSQL SQL Editor.
2. Execute [`supabase/schema.sql`](supabase/schema.sql) to create all tables, enums, triggers, and Row-Level Security (RLS) policies.
3. The schema includes a PostgreSQL **`btree_gist` exclusion constraint** that mathematically prevents two approved events from occupying the same venue during overlapping times:

```sql
ALTER TABLE public.events ADD CONSTRAINT prevent_venue_double_booking 
EXCLUDE USING gist (
    venue_id WITH =,
    tstzrange(start_time, end_time) WITH &&
) WHERE (status = 'APPROVED');
```

---

## 🚀 Running the Project

```bash
# 1. Navigate to project directory
cd C:\Users\KIIT\.gemini\antigravity\scratch\kiit-event-hub

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Use the **Role Switcher** pill in the top navbar or visit the [Login Page](/login) to test the distinct interfaces for:
- 🎓 **Student** (Ayush Sharma - `21051982@kiit.ac.in`)
- 🤖 **Host** (Priya Mohanty - `krs.lead@kiit.ac.in`, KIIT Robotics Society)
- 🏛️ **Admin** (Dr. S. K. Rout - `ksac.admin@kiit.ac.in`, KSAC Joint Director)
