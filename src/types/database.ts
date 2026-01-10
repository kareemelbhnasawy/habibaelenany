export interface MediaItem {
  id: string;
  created_at: string;
  url: string;
  width: number;
  height: number;
  type: "image" | "video";
  category: "Photography" | "Filmmaking" | "Short Form";
  section: string;
  title: string | null;
  description: string | null;
  year: number | null;
  is_hero: boolean;
  is_highlight?: boolean;
  sort_order?: number;
}

export type NewMediaItem = Omit<MediaItem, "id" | "created_at">;

export interface Photo {
  id: string;
  src: string;
  width?: number;
  height?: number;
  alt: string;
  category?: string;
  title?: string;
  caption?: string;
  year?: number;
}
