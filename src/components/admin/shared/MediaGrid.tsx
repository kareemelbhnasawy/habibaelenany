import { Trash2, Edit2, Play } from "lucide-react";
import type { MediaItem } from "../../../types/database";

interface MediaGridProps {
  items: MediaItem[];
  onDelete: (id: string) => void;
  onEdit?: (item: MediaItem) => void;
}

export function MediaGrid({ items, onDelete, onEdit }: MediaGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
        <p className="text-gray-400">No media items found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative aspect-square bg-zinc-900 rounded-lg overflow-hidden border border-white/5"
        >
          {item.type === "video" ? (
            <div className="relative w-full h-full">
              <video src={item.url} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                <Play className="text-white opacity-70" size={32} />
              </div>
            </div>
          ) : (
            <img
              src={item.url}
              alt={item.title || "Portfolio item"}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
            <div className="flex justify-end gap-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 bg-white/10 text-white rounded-full hover:bg-white hover:text-black transition-colors"
                  title="Edit Metadata"
                >
                  <Edit2 size={16} />
                </button>
              )}
              <button
                onClick={() => {
                  if (confirm("Delete this item?")) onDelete(item.id);
                }}
                className="p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div>
              <p className="font-medium truncate text-white text-sm">
                {item.title || "Untitled"}
              </p>
              {item.section && (
                <p className="text-xs text-gray-400 mt-0.5">{item.section}</p>
              )}
              {/* Debug info or sort order could go here */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
