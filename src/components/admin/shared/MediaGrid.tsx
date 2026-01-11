import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, Edit2, Play, GripVertical } from "lucide-react";
import type { MediaItem } from "../../../types/database";

// ... imports

interface MediaGridProps {
  items: MediaItem[];
  onDelete: (id: string) => void;
  onEdit?: (item: MediaItem) => void;
  onReorder?: (items: MediaItem[]) => void;
}

function SortableMediaItem({
  item,
  onEdit,
  onDelete,
  isActive,
  onToggle,
}: {
  item: MediaItem;
  onEdit?: (item: MediaItem) => void;
  onDelete: (id: string) => void;
  isActive: boolean;
  onToggle: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  // Handle click to toggle overlay on mobile
  const handleClick = (e: React.MouseEvent) => {
    // If clicking a button, don't toggle
    if ((e.target as HTMLElement).closest("button")) return;
    onToggle(item.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative aspect-square bg-zinc-900 rounded-lg overflow-hidden border border-white/5 ${
        isActive ? "ring-2 ring-white/20" : ""
      }`}
      onClick={handleClick}
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

      {/* Overlay Actions - Visible if Active (Mobile Tap) OR Hover (Desktop) */}
      <div
        className={`absolute inset-0 bg-black/80 flex flex-col justify-between p-4 transition-opacity duration-200 ${
          isActive ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
        }`}
      >
        <div className="flex justify-between items-start">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="p-2 text-gray-400 hover:text-white cursor-grab active:cursor-grabbing touch-none"
            title="Drag to reorder"
          >
            <GripVertical size={20} />
          </button>

          <div className="flex gap-2">
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
        </div>
        <div>
          <p className="font-medium truncate text-white text-sm">
            {item.title || "Untitled"}
          </p>
          {item.section && (
            <p className="text-xs text-gray-400 mt-0.5">{item.section}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function MediaGrid({
  items,
  onDelete,
  onEdit,
  onReorder,
}: MediaGridProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), // Prevent drag on simple click
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id && onReorder) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      onReorder(newItems);
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
        <p className="text-gray-400">No media items found</p>
      </div>
    );
  }

  if (!onReorder) {
    // Non-sortable fallback (though we should usually pass onReorder now)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <SortableMediaItem
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            isActive={activeId === item.id}
            onToggle={handleToggle}
          />
        ))}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-1">
          {" "}
          {/* p-1 ensures outline doesn't look cut off */}
          {items.map((item) => (
            <SortableMediaItem
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              isActive={activeId === item.id}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
