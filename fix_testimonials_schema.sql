-- Run this in your Supabase SQL Editor to fix the error
-- It adds the missing 'sort_order' column to your testimonials table

alter table testimonials 
add column if not exists sort_order int default 0;

-- Just in case avatar_url was also missed:
alter table testimonials 
add column if not exists avatar_url text;
