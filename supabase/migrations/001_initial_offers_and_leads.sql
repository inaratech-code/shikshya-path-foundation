-- Run this in Supabase: SQL Editor → New query → Paste → Run
-- Creates offers + leads tables with Row Level Security for the public site and admin APIs.

-- ---------------------------------------------------------------------------
-- OFFERS (matches app: title, subtitle, badge, active, created_at)
-- ---------------------------------------------------------------------------
create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text not null,
  badge text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists offers_active_created_idx on public.offers (active, created_at desc);

alter table public.offers enable row level security;

-- Public read: only rows where active = true (for /offers page + floating button)
drop policy if exists "Public read active offers" on public.offers;
create policy "Public read active offers"
  on public.offers
  for select
  to anon, authenticated
  using (active = true);

-- Inserts/updates/deletes: use the service_role key in server Route Handlers, or add auth policies later.
-- Service role bypasses RLS. Anon cannot insert offers by default.

-- ---------------------------------------------------------------------------
-- LEADS (form submissions; status pipeline for admin)
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text not null,
  phone text,
  destination text,
  message text,
  status text not null default 'received'
    check (status in ('received', 'contacted', 'processed', 'onboarded')),
  created_at timestamptz not null default now()
);

create index if not exists leads_created_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

alter table public.leads enable row level security;

-- Website forms: allow anyone to insert a lead (tighten later with captcha / edge function)
drop policy if exists "Public insert leads" on public.leads;
create policy "Public insert leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- No public SELECT on leads (privacy). Reads use service_role in /api or server actions.

comment on table public.offers is 'Published promotions; public sees active=true only.';
comment on table public.leads is 'Inbound leads; insert allowed from site; list via service role.';
