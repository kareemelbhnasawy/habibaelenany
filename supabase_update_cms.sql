-- Add sort_order column to media_items
ALTER TABLE public.media_items 
ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;

-- Add is_highlight column to media_items (for Home page highlights)
ALTER TABLE public.media_items 
ADD COLUMN IF NOT EXISTS is_highlight boolean DEFAULT false;

-- Create an index for faster sorting
CREATE INDEX IF NOT EXISTS idx_media_items_sort_order ON public.media_items (sort_order);
