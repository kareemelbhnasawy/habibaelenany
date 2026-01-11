import { useState, useEffect } from "react";
import { supabase, updateMediaOrder } from "../../../lib/supabase";
import { MediaGrid } from "../../../components/admin/shared/MediaGrid";
import { MediaUploader } from "../../../components/admin/shared/MediaUploader";
import type { MediaItem } from "../../../types/database";
import { getReorderedUpdates } from "../../../utils/sort";
import { Loader2, Plus, Filter, List } from "lucide-react";
import { EditMediaModal } from "../../../components/admin/shared/EditMediaModal";
import { SectionOrderModal } from "../../../components/admin/shared/SectionOrderModal";

import { useSiteSettings } from "../../../hooks/useSiteSettings";

export function PhotographyPageEditor() {
  const { sectionOrder } = useSiteSettings();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [sections, setSections] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<string>("All");

  // For new section creation
  const [isCreatingSection, setIsCreatingSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");

  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [sectionOrder]);

  async function fetchData() {
    setLoading(true);
    try {
      // Fetch all photography items
      const { data, error } = await supabase
        .from("media_items")
        .select("*")
        .eq("category", "Photography")
        .order("sort_order", { ascending: true }) // Added sort_order
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems(data || []);

      // Extract unique sections
      const uniqueSections = Array.from(
        new Set(data?.map((i) => i.section).filter(Boolean) as string[])
      );

      // Sort according to site settings
      const order = sectionOrder?.Photography || [];
      uniqueSections.sort((a, b) => {
        const indexA = order.indexOf(a);
        const indexB = order.indexOf(b);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.localeCompare(b);
      });

      setSections(uniqueSections);
    } catch (error) {
      console.error("Error fetching photography data", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const { error } = await supabase
        .from("media_items")
        .delete()
        .eq("id", id);
      if (error) throw error;
      setItems((prev) => prev.filter((i) => i.id !== id));

      // Update sections list if needed (optional optimization)
    } catch (error) {
      console.error("Delete failed", error);
      alert("Delete failed");
    }
  };

  const handleEdit = (item: MediaItem) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleSectionReorder = (
    newSectionItems: MediaItem[],
    section: string
  ) => {
    // 1. Get the original subset for this section to preserve valid sort_order values
    const originalSubset = items.filter(
      (i) => (i.section || "") === (section || "")
    );

    // 2. Calculate stable updates
    const updates = getReorderedUpdates(newSectionItems, originalSubset);

    // 3. Optimistic update of local state
    setItems((prev) => {
      // Create a map of updates for O(1) lookup
      const updateMap = new Map(updates.map((u) => [u.id, u.sort_order]));

      // Return new array where items in this section are reordered,
      // but GLOBAL order of other items remains untouched.
      // Actually, we just need to update the sort_orders of the affected items in the main list
      // and let the render logic sort them if needed.
      // BUT `items` state is currently sorted by `sort_order`.
      // So straightforward approach: Map over prev, update sort_order if changed, then resort.

      const nextItems = prev.map((item) => {
        if (updateMap.has(item.id)) {
          return { ...item, sort_order: updateMap.get(item.id) };
        }
        return item;
      });

      // Maintain the sort order for the state so typical "All" view (if we used it flat) works too
      return nextItems.sort(
        (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
      );
    });

    // 4. Persist
    updateMediaOrder(updates);
  };

  const filteredItems =
    activeSection === "All"
      ? items
      : items.filter((i) => i.section === activeSection);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-display font-semibold text-white">
          Photography
        </h2>
        <p className="text-gray-400">
          Manage your photo galleries and sections.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 bg-zinc-900/50 p-4 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Filter size={16} />
          <span>Filter by Section:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSection("All")}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              activeSection === "All"
                ? "bg-white text-black font-medium"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            All
          </button>
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activeSection === section
                  ? "bg-white text-black font-medium"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Add Section Button (Simple UI to switch to specific upload mode logic effectively) */}
        {!isCreatingSection ? (
          <>
            <button
              onClick={() => setIsCreatingSection(true)}
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-400 hover:text-blue-300 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors"
            >
              <Plus size={14} /> New Section
            </button>
            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <List size={14} /> Reorder
            </button>
          </>
        ) : (
          <div className="ml-auto flex gap-2">
            <input
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              placeholder="Section Name"
              className="px-2 py-1 bg-black border border-white/20 rounded text-sm text-white w-32"
              autoFocus
            />
            <button
              onClick={() => {
                if (newSectionName) {
                  setSections((prev) => [...prev, newSectionName]);
                  setActiveSection(newSectionName);
                  setIsCreatingSection(false);
                  setNewSectionName("");
                }
              }}
              className="text-xs bg-white text-black px-2 rounded"
            >
              Add
            </button>
            <button
              onClick={() => setIsCreatingSection(false)}
              className="text-xs text-gray-400"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Upload Area - Context Aware */}
      <div className="bg-zinc-900/30 p-6 rounded-xl border border-white/5">
        <h3 className="text-lg font-medium text-white mb-4">
          Upload to {activeSection === "All" ? "Uncategorized" : activeSection}
        </h3>
        <MediaUploader
          category="Photography"
          section={activeSection === "All" ? undefined : activeSection}
          onUploadComplete={fetchData}
        />
      </div>

      {/* Grid Area */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-gray-500" />
        </div>
      ) : activeSection !== "All" ? (
        // Single Section View (Filtered)
        <MediaGrid
          items={filteredItems}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onReorder={(newItems) =>
            handleSectionReorder(newItems, activeSection)
          }
        />
      ) : (
        // Grouped View (All Sections)
        <div className="space-y-12">
          {sections.length === 0 && items.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              No photos found. Upload some to get started.
            </div>
          )}

          {/* Render each section */}
          {sections.map((section) => {
            const sectionItems = items.filter((i) => i.section === section);
            if (sectionItems.length === 0) return null;

            return (
              <div key={section} className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <h3 className="text-xl font-medium text-white">{section}</h3>
                  <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                    {sectionItems.length}
                  </span>
                </div>
                <MediaGrid
                  items={sectionItems}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onReorder={(newItems) =>
                    handleSectionReorder(newItems, section)
                  }
                />
              </div>
            );
          })}

          {/* Catch-all for items without a section (orphans) */}
          {items.some((i) => !i.section) && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <h3 className="text-xl font-medium text-white">
                  Uncategorized
                </h3>
                <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                  {items.filter((i) => !i.section).length}
                </span>
              </div>
              <MediaGrid
                items={items.filter((i) => !i.section)}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onReorder={(newItems) => handleSectionReorder(newItems, "")}
              />
            </div>
          )}
        </div>
      )}

      <EditMediaModal
        item={editingItem}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={fetchData}
      />

      <SectionOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false);
          fetchData();
        }}
        category="Photography"
        existingSections={sections}
      />
    </div>
  );
}
