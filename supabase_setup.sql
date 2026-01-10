-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create Media Items Table
create table public.media_items (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  url text not null,
  width integer,
  height integer,
  type text check (type in ('image', 'video')),
  category text not null, -- 'Photography', 'Filmmaking', 'Short Form'
  section text, -- 'Editorial', 'Fashion', 'Production', etc.
  title text,
  description text,
  year integer,
  is_hero boolean default false
);

-- 2. Create Testimonials Table
create table public.testimonials (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  role text,
  quote text not null,
  avatar_url text
);

-- 3. Create Site Config Table (Key-Value store)
create table public.site_config (
  key text primary key,
  value jsonb not null
);

-- 4. Enable Row Level Security (RLS)
alter table public.media_items enable row level security;
alter table public.testimonials enable row level security;
alter table public.site_config enable row level security;

-- 5. Create Policies (Public Read, Admin Write)
-- Allow public read access to all tables
create policy "Public Media Access" on public.media_items for select using (true);
create policy "Public Testimonials Access" on public.testimonials for select using (true);
create policy "Public Config Access" on public.site_config for select using (true);

-- Allow authenticated users (admins) to insert/update/delete
-- NOTE: In a real app, you might want a specific 'admin' role check. 
-- For simplicity, we assume any authenticated user in this project is an admin.
create policy "Admin Media Manage" on public.media_items for all using (auth.role() = 'authenticated');
create policy "Admin Testimonials Manage" on public.testimonials for all using (auth.role() = 'authenticated');
create policy "Admin Config Manage" on public.site_config for all using (auth.role() = 'authenticated');

-- 6. Storage Buckets
-- You need to create a bucket named 'portfolio-media' and 'avatars' in the Supabase Dashboard.
-- These SQL commands insert into storage.buckets, but sometimes it's easier to do in the UI.
insert into storage.buckets (id, name, public) values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

-- Storage Policies
-- Allow public read
create policy "Public Storage Read" on storage.objects for select using (bucket_id = 'portfolio-media');

-- Allow authenticated upload/delete
create policy "Admin Storage Insert" on storage.objects for insert with check (bucket_id = 'portfolio-media' and auth.role() = 'authenticated');
create policy "Admin Storage Update" on storage.objects for update with check (bucket_id = 'portfolio-media' and auth.role() = 'authenticated');
create policy "Admin Storage Delete" on storage.objects for delete using (bucket_id = 'portfolio-media' and auth.role() = 'authenticated');

-- Initial Data (Optional - You can insert site config)
insert into public.site_config (key, value)
values 
('site_info', '{"title": "Habiba El Enany", "description": "Telling stories through light and movement."}'),
('contact_info', '{"email": "hello@habibaphoto.com", "instagram": "https://instagram.com/habibaphoto"}')
on conflict (key) do nothing;
