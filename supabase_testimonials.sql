-- Create testimonials table
create table if not exists testimonials (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  role text,
  quote text not null,
  avatar_url text,
  sort_order int default 0
);

-- Enable Row Level Security (RLS)
alter table testimonials enable row level security;

-- Create policies (modify as needed for your auth setup)
-- Allow anyone to read testimonials
create policy "Public items are visible to everyone."
  on testimonials for select
  using ( true );

-- Allow authenticated users (admin) to insert, update, delete
create policy "Authenticated users can modify testimonials"
  on testimonials
  for all
  using ( auth.role() = 'authenticated' );
