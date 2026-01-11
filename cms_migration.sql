-- 1. Create site_settings table
create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table site_settings enable row level security;

-- Policies for site_settings
create policy "Public Read Settings"
  on site_settings for select
  using (true);

create policy "Admin Update Settings"
  on site_settings for all
  using (auth.role() = 'authenticated'); -- Simplified for this project context

-- 2. Insert default settings (safe to run multiple times due to ON CONFLICT)
insert into site_settings (key, value)
values 
  ('general_config', '{
    "hero_title": "Capturing Life''s Motions & Emotions",
    "hero_subtitle": "Specializing in editorial photography, filmmaking, and visual storytelling. Based in Cairo, Egypt.",
    "footer_image_url": "", 
    "filmmaking_speed_ms": 300
  }'::jsonb),
   ('section_order', '{
    "Photography": ["Editorial", "Fashion", "Outdoor", "Portraits", "Products"],
    "Filmmaking": ["Production", "Cinematography", "Visual Effects", "Direction"],
    "Short Form": []
  }'::jsonb)
on conflict (key) do nothing;

-- 3. Update media_items category constraint to allow 'Hero'
-- Note: Check constraints might be enforcing categories. 
-- If there is a check constraint on category, we need to drop and re-add it.
-- We'll try to drop a common name for it, or just alter the column type if it's text.
-- Assuming 'category' is just text with a check constraint or app-level enforcement.
-- If it's a check constraint:
do $$
begin
  if exists (select 1 from pg_constraint where conname = 'media_items_category_check') then
    alter table media_items drop constraint media_items_category_check;
  end if;
end $$;

alter table media_items 
add constraint media_items_category_check 
check (category in ('Photography', 'Filmmaking', 'Short Form', 'Hero'));
