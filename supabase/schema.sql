-- ============================================================================
-- KIIT UNIVERSITY (KSAC) EVENT MANAGEMENT PLATFORM SCHEMA
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

-- Types & Enums
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('STUDENT', 'HOST', 'ADMIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE event_category AS ENUM (
        'TECHNICAL', 'CULTURAL', 'SPORTS', 'WORKSHOP', 
        'SEMINAR', 'FEST', 'HACKATHON', 'SOCIAL'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE event_status AS ENUM (
        'DRAFT', 'PENDING_APPROVAL', 'APPROVED', 
        'REJECTED', 'CHANGES_REQUESTED', 'CANCELLED', 'COMPLETED'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ticket_status AS ENUM ('CONFIRMED', 'CANCELLED', 'CHECKED_IN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    roll_number TEXT,
    school TEXT,
    role user_role DEFAULT 'STUDENT' NOT NULL,
    avatar_url TEXT,
    phone_number TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT check_kiit_email CHECK (email ~* '^[a-zA-Z0-9._%+-]+@kiit\.ac\.in$')
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_roll ON public.profiles(roll_number);

-- 2. Societies Table
CREATE TABLE IF NOT EXISTS public.societies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    short_code TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    logo_url TEXT,
    cover_image_url TEXT,
    faculty_coordinator TEXT,
    lead_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Society Members Table
CREATE TABLE IF NOT EXISTS public.society_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    society_id UUID REFERENCES public.societies(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    position TEXT NOT NULL,
    joined_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(society_id, user_id)
);

-- 4. Campus Venues Table
CREATE TABLE IF NOT EXISTS public.venues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    campus TEXT NOT NULL,
    building TEXT,
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    amenities TEXT[] DEFAULT '{}',
    contact_person TEXT,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Events Table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    category event_category NOT NULL,
    society_id UUID REFERENCES public.societies(id) ON DELETE SET NULL,
    venue_id UUID REFERENCES public.venues(id) ON DELETE RESTRICT NOT NULL,
    created_by UUID REFERENCES public.profiles(id) ON DELETE RESTRICT NOT NULL,
    
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    registration_start TIMESTAMPTZ,
    registration_end TIMESTAMPTZ,
    max_capacity INTEGER NOT NULL CHECK (max_capacity > 0),
    current_rsvp_count INTEGER DEFAULT 0 NOT NULL,
    
    banner_url TEXT,
    agenda JSONB DEFAULT '[]'::jsonb,
    guest_speakers JSONB DEFAULT '[]'::jsonb,
    budget_estimate NUMERIC(12, 2) DEFAULT 0.00,
    target_audience TEXT[] DEFAULT '{"ALL"}',
    
    status event_status DEFAULT 'PENDING_APPROVAL' NOT NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,

    CONSTRAINT check_event_dates CHECK (end_time > start_time),
    CONSTRAINT check_reg_dates CHECK (
        registration_end IS NULL OR registration_start IS NULL OR registration_end > registration_start
    )
);

-- Venue conflict prevention index
DO $$ BEGIN
    ALTER TABLE public.events ADD CONSTRAINT prevent_venue_double_booking 
    EXCLUDE USING gist (
        venue_id WITH =,
        tstzrange(start_time, end_time) WITH &&
    ) WHERE (status = 'APPROVED');
EXCEPTION
    WHEN duplicate_table THEN null;
    WHEN others THEN null;
END $$;

CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_events_start_time ON public.events(start_time);
CREATE INDEX IF NOT EXISTS idx_events_society ON public.events(society_id);

-- 6. Registrations & Tickets Table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    ticket_code TEXT UNIQUE NOT NULL,
    qr_signature TEXT NOT NULL,
    status ticket_status DEFAULT 'CONFIRMED' NOT NULL,
    registered_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    checked_in_at TIMESTAMPTZ,
    checked_in_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    UNIQUE (event_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_registrations_ticket ON public.registrations(ticket_code);
CREATE INDEX IF NOT EXISTS idx_registrations_user ON public.registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_registrations_event ON public.registrations(event_id);

-- 7. Event Approvals Table
CREATE TABLE IF NOT EXISTS public.event_approvals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
    reviewer_id UUID REFERENCES public.profiles(id) ON DELETE RESTRICT NOT NULL,
    decision event_status NOT NULL CHECK (decision IN ('APPROVED', 'REJECTED', 'CHANGES_REQUESTED')),
    notes TEXT,
    reviewed_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Event Feedback Table
CREATE TABLE IF NOT EXISTS public.event_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    submitted_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (event_id, user_id)
);
