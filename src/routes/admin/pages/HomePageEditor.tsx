import { useState, useEffect } from "react";
import { supabase, updateMediaOrder } from "../../../lib/supabase";
import { MediaGrid } from "../../../components/admin/shared/MediaGrid";
import { MediaUploader } from "../../../components/admin/shared/MediaUploader";
import type { MediaItem } from "../../../types/database";
import { Loader2 } from "lucide-react";
import { EditMediaModal } from "../../../components/admin/shared/EditMediaModal";

export function HomePageEditor() {
  const [activeTab, setActiveTab] = useState<"hero" | "highlights">("hero");
  const [loading, setLoading] = useState(true);
  const [heroItems, setHeroItems] = useState<MediaItem[]>([]);
  const [highlightItems, setHighlightItems] = useState<MediaItem[]>([]);

  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      // Fetch Hero Items
      const { data: heroData } = await supabase
        .from("media_items")
        .select("*")
        .eq("category", "Hero") // Updated to use category
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (heroData) setHeroItems(heroData);

      // Fetch Highlight Items
      const { data: highlightData, error } = await supabase
        .from("media_items")
        .select("*")
        .eq("is_highlight", true)
        .order("sort_order", { ascending: true }) // Use sort_order for highlights
        .order("created_at", { ascending: false });

      if (!error && highlightData) {
        setHighlightItems(highlightData);
      }
    } catch (error) {
      console.error("Error fetching home data", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string, isHero: boolean) => {
    if (!confirm("Are you sure you want to delete this specific item?")) return;
    try {
      const { error } = await supabase
        .from("media_items")
        .delete()
        .eq("id", id);
      if (error) throw error;

      if (isHero) {
        setHeroItems((prev) => prev.filter((i) => i.id !== id));
      } else {
        setHighlightItems((prev) => prev.filter((i) => i.id !== id));
      }
    } catch (error) {
      console.error("Delete failed", error);
      alert("Delete failed");
    }
  };

  const handleEdit = (item: MediaItem) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleHeroReorder = (newItems: MediaItem[]) => {
    setHeroItems(newItems);
    const updates = newItems.map((item, index) => ({
      id: item.id,
      sort_order: index,
    }));
    updateMediaOrder(updates);
  };

  const handleHighlightReorder = (newItems: MediaItem[], category: string) => {
    // Update local state by merging the reordered items with the rest
    setHighlightItems((prev) => {
      const others = prev.filter((i) => i.category !== category);
      return [...others, ...newItems];
    });

    const updates = newItems.map((item, index) => ({
      id: item.id,
      sort_order: index,
    }));
    updateMediaOrder(updates);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-display font-semibold text-white">
          Home Page
        </h2>
        <p className="text-gray-400">Manage hero carousel and highlights.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10 pb-1">
        <button
          onClick={() => setActiveTab("hero")}
          className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
            activeTab === "hero"
              ? "text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Hero Carousel
          {activeTab === "hero" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("highlights")}
          className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
            activeTab === "highlights"
              ? "text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Highlights
          {activeTab === "highlights" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-t-full" />
          )}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-gray-500" />
        </div>
      ) : (
        <>
          {activeTab === "hero" && (
            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-medium text-white mb-4">
                  Add Hero Image
                </h3>
                <MediaUploader
                  category="Hero"
                  isHero={true} // Keep for now if component uses it for sizing etc
                  onUploadComplete={fetchData}
                />
              </section>

              <section>
                <h3 className="text-lg font-medium text-white mb-4">
                  Current Hero Images
                </h3>
                <MediaGrid
                  items={heroItems}
                  onDelete={(id) => handleDelete(id, true)}
                  onEdit={handleEdit}
                  onReorder={handleHeroReorder}
                />
              </section>
            </div>
          )}

          {activeTab === "highlights" && (
            <div className="space-y-8">
              <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-lg text-sm text-blue-200">
                To add highlights, you can edit items in other tabs
                (Photography, Filmmaking) and check "Feature in Home Page
                Highlights".
                <br />
                Or upload items directly here.
              </div>

              <section>
                <h3 className="text-lg font-medium text-white mb-4">
                  Upload New Highlight
                </h3>
                {/* For uploading a highlight directly, we can just treat it as a photography upload but we'll need to manually set is_highlight edits. 
                    Actually, let's just use photography uploader for now and let user edit. 
                 */}
                <MediaUploader
                  category="Photography"
                  onUploadComplete={fetchData}
                />
                <p className="text-xs text-gray-500 mt-2">
                  *Uploaded items go to Photography by default. You can edit
                  them below to ensure they are highlighted.
                </p>
              </section>

              <section className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
                    Photography Highlights
                    <span className="text-sm font-normal text-gray-400 bg-white/10 px-2 py-0.5 rounded-full">
                      {
                        highlightItems.filter(
                          (i) => i.category === "Photography"
                        ).length
                      }
                    </span>
                  </h3>
                  <MediaGrid
                    items={highlightItems.filter(
                      (i) => i.category === "Photography"
                    )}
                    onDelete={(id) => handleDelete(id, false)}
                    onEdit={handleEdit}
                    onReorder={(items) =>
                      handleHighlightReorder(items, "Photography")
                    }
                  />
                  {highlightItems.filter((i) => i.category === "Photography")
                    .length === 0 && (
                    <div className="text-center py-8 border border-dashed border-white/10 rounded-lg text-gray-500">
                      No photography highlights. Go to Photography tab to
                      feature items.
                    </div>
                  )}
                </div>

                <div className="border-t border-white/10 pt-8">
                  <h3 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
                    Filmmaking Highlights
                    <span className="text-sm font-normal text-gray-400 bg-white/10 px-2 py-0.5 rounded-full">
                      {
                        highlightItems.filter(
                          (i) => i.category === "Filmmaking"
                        ).length
                      }
                    </span>
                  </h3>
                  <MediaGrid
                    items={highlightItems.filter(
                      (i) => i.category === "Filmmaking"
                    )}
                    onDelete={(id) => handleDelete(id, false)}
                    onEdit={handleEdit}
                    onReorder={(items) =>
                      handleHighlightReorder(items, "Filmmaking")
                    }
                  />
                  {highlightItems.filter((i) => i.category === "Filmmaking")
                    .length === 0 && (
                    <div className="text-center py-8 border border-dashed border-white/10 rounded-lg text-gray-500">
                      No filmmaking highlights. Go to Filmmaking tab to feature
                      items.
                    </div>
                  )}
                </div>

                <div className="border-t border-white/10 pt-8">
                  <h3 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
                    Short Form Highlights
                    <span className="text-sm font-normal text-gray-400 bg-white/10 px-2 py-0.5 rounded-full">
                      {
                        highlightItems.filter(
                          (i) => i.category === "Short Form"
                        ).length
                      }
                    </span>
                  </h3>
                  <MediaGrid
                    items={highlightItems.filter(
                      (i) => i.category === "Short Form"
                    )}
                    onDelete={(id) => handleDelete(id, false)}
                    onEdit={handleEdit}
                    onReorder={(items) =>
                      handleHighlightReorder(items, "Short Form")
                    }
                  />
                  {highlightItems.filter((i) => i.category === "Short Form")
                    .length === 0 && (
                    <div className="text-center py-8 border border-dashed border-white/10 rounded-lg text-gray-500">
                      No short form highlights. Go to Short Form tab to feature
                      items.
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}
        </>
      )}

      <EditMediaModal
        item={editingItem}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={fetchData}
      />
    </div>
  );
}
