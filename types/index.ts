export type UserRole = 'STUDENT' | 'HOST' | 'ADMIN';

export type EventCategory = 
  | 'TECHNICAL' 
  | 'CULTURAL' 
  | 'SPORTS' 
  | 'WORKSHOP' 
  | 'SEMINAR' 
  | 'FEST' 
  | 'HACKATHON' 
  | 'SOCIAL';

export type EventStatus = 
  | 'DRAFT' 
  | 'PENDING_APPROVAL' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'CHANGES_REQUESTED' 
  | 'CANCELLED' 
  | 'COMPLETED';

export type TicketStatus = 'CONFIRMED' | 'CANCELLED' | 'CHECKED_IN';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  username?: string;
  roll_number?: string;
  school?: string;
  role: UserRole;
  avatar_url?: string;
  phone_number?: string;
  society_name?: string;
  created_at: string;
  status?: 'ACTIVE' | 'VERIFIED' | 'SUSPENDED';
}

export interface DemoUserSession {
  username: string;
  name: string;
  role: UserRole;
  email: string;
  rollNumber?: string;
  school?: string;
  society?: string;
  avatarUrl?: string;
}

export interface Society {
  id: string;
  name: string;
  short_code: string;
  category: string;
  description: string;
  logo_url: string;
  cover_image_url?: string;
  faculty_coordinator?: string;
  lead_user_id?: string;
  is_active: boolean;
}

export interface Venue {
  id: string;
  name: string;
  campus: string;
  building?: string;
  capacity: number;
  amenities: string[];
  contact_person?: string;
  is_active: boolean;
}

export interface AgendaItem {
  time: string;
  title: string;
  speaker?: string;
  description?: string;
}

export interface GuestSpeaker {
  name: string;
  role: string;
  company?: string;
  photo_url?: string;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  tagline?: string;
  description: string;
  category: EventCategory;
  society_id: string;
  society?: Society;
  venue_id: string;
  venue?: Venue;
  created_by: string;
  start_time: string;
  end_time: string;
  registration_start?: string;
  registration_end?: string;
  max_capacity: number;
  current_rsvp_count: number;
  banner_url?: string;
  agenda?: AgendaItem[];
  guest_speakers?: GuestSpeaker[];
  budget_estimate?: number;
  target_audience?: string[];
  status: EventStatus;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Registration {
  id: string;
  event_id: string;
  event?: EventItem;
  user_id: string;
  user?: UserProfile;
  ticket_code: string;
  qr_signature: string;
  status: TicketStatus;
  registered_at: string;
  checked_in_at?: string;
  checked_in_by?: string;
}

export interface EventFeedback {
  id: string;
  event_id: string;
  user_id: string;
  user_name?: string;
  rating: number;
  comment?: string;
  submitted_at: string;
}

// Approval Queue Item
export interface PendingSubmission {
  id: string;
  title: string;
  host: string;
  hostEmail?: string;
  category: string;
  submissionDate: string;
  eventDate: string;
  timeSlot?: string;
  venue: string;
  capacity?: number;
  budget?: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Changes Requested';
  description: string;
  rejectionReason?: string;
  changesNote?: string;
  reviewedAt?: string;
}

// Vlogs & Reels Types
export interface VlogItem {
  id: string;
  title: string;
  creator: string;
  duration: string;
  category: string;
  date: string;
  views: number;
  likes: number;
  thumbnail: string;
  videoUrl?: string;
  description?: string;
  isLiked?: boolean;
}

export interface ReelItem {
  id: string;
  title: string;
  creator: string;
  category: string;
  date: string;
  views: number;
  likes: number;
  thumbnail: string;
  duration?: string;
  isLiked?: boolean;
}

// App Notifications
export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'event' | 'approval' | 'system' | 'media';
  targetRole: UserRole | 'ALL';
  actionUrl?: string;
}
