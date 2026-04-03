-- Run in Supabase SQL Editor after 001_initial_offers_and_leads.sql

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists gallery_items_active_sort_idx on public.gallery_items (active, sort_order asc, created_at desc);

alter table public.gallery_items enable row level security;

drop policy if exists "Public read active gallery" on public.gallery_items;
create policy "Public read active gallery"
  on public.gallery_items
  for select
  to anon, authenticated
  using (active = true);

comment on table public.gallery_items is 'Website gallery photos; public sees active=true only; writes via service role.';
