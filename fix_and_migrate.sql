-- 1. Create site_settings table (idempotent)
create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS (safe to run again, policies might error if exist, so dropping first to be safe or ignoring)
alter table site_settings enable row level security;
drop policy if exists "Public Read Settings" on site_settings;
create policy "Public Read Settings" on site_settings for select using (true);

drop policy if exists "Admin Update Settings" on site_settings;
create policy "Admin Update Settings" on site_settings for all using (auth.role() = 'authenticated');

-- 2. Insert defaults
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

-- 3. FIX VIOLATING ROWS FIRST
-- Update any 'ShortForm' (no space) to 'Short Form' (with space) or other variants
update media_items set category = 'Short Form' where category = 'ShortForm';
-- Update any other unknowns to 'Photography' temporarily to save them
update media_items set category = 'Photography' 
where category not in ('Photography', 'Filmmaking', 'Short Form', 'Hero');

-- 4. NOW Update Constraints
do $$
begin
  if exists (select 1 from pg_constraint where conname = 'media_items_category_check') then
    alter table media_items drop constraint media_items_category_check;
  end if;
end $$;

alter table media_items 
add constraint media_items_category_check 
check (category in ('Photography', 'Filmmaking', 'Short Form', 'Hero'));
