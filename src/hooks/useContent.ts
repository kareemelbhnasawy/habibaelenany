import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { MediaItem } from "../types/database";

// Define options interface for useMedia
interface UseMediaOptions {
  category?: string;
  section?: string;
  limit?: number;
  isHero?: boolean;
  isHighlight?: boolean; // New option
}

export function useMedia(options?: UseMediaOptions) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchMedia() {
      try {
        setLoading(true);
        let query = supabase
          .from("media_items")
          .select("*")
          .order("sort_order", { ascending: true }) // Sort by custom order first
          .order("created_at", { ascending: false }); // Then by newest

        if (options?.category) {
          query = query.eq("category", options.category);
        }

        if (options?.section) {
          query = query.eq("section", options.section);
        }

        if (options?.isHero !== undefined) {
          query = query.eq("is_hero", options.isHero);
        }

        if (options?.isHighlight !== undefined) {
          query = query.eq("is_highlight", options.isHighlight);
        }

        if (options?.limit) {
          query = query.limit(options.limit);
        }

        const { data, error } = await query;

        if (error) throw error;
        setItems(data || []);
      } catch (err: unknown) {
        const errorVal = err instanceof Error ? err : new Error(String(err));
        setError(errorVal);
        console.error("Error loading media:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMedia();
  }, [
    options?.category,
    options?.section,
    options?.limit,
    options?.isHero,
    options?.isHighlight,
  ]);

  return { items, loading, error };
}

export function useGroupedMedia(category: string) {
  const { items, loading, error } = useMedia({ category });

  const sections = items.reduce((acc, item) => {
    const section = item.section || "Uncategorized";
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(item);
    return acc;
  }, {} as Record<string, MediaItem[]>);

  return { sections, loading, error };
}
