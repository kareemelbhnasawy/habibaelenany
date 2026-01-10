import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import type { MediaItem } from "../../../types/database";

interface EditMediaModalProps {
  item: MediaItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export function EditMediaModal({
  item,
  isOpen,
  onClose,
  onUpdate,
}: EditMediaModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    section: "",
    sort_order: 0,
    is_highlight: false,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || "",
        description: item.description || "",
        section: item.section || "",
        sort_order: item.sort_order || 0,
        is_highlight: item.is_highlight || false,
      });
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from("media_items")
        .update({
          title: formData.title,
          description: formData.description,
          section: formData.section,
          sort_order: formData.sort_order,
          is_highlight: formData.is_highlight,
        })
        .eq("id", item.id);

      if (error) throw error;
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating media", error);
      alert("Failed to update media details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-white/10 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl max-h-[90vh] flex flex-col m-4">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-medium text-white">Edit Media Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto">
          {/* Preview */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-24 h-40 sm:h-24 bg-black rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
              {item.type === "video" ? (
                <video src={item.url} className="w-full h-full object-cover" />
              ) : (
                <img
                  src={item.url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-widest">
                {item.category} / {item.type}
              </p>
              <div className="text-sm text-gray-400 break-all">
                {item.url.split("/").pop()}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Title
              </label>
              <input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-white text-sm focus:border-white/30 outline-none"
                placeholder="Enter title..."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Description / Caption
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-white text-sm focus:border-white/30 outline-none h-24 resize-none"
                placeholder="Enter description..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Section
                </label>
                <input
                  value={formData.section}
                  onChange={(e) =>
                    setFormData({ ...formData, section: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-white text-sm focus:border-white/30 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sort_order: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-white text-sm focus:border-white/30 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isHighlight"
                checked={formData.is_highlight}
                onChange={(e) =>
                  setFormData({ ...formData, is_highlight: e.target.checked })
                }
                className="w-4 h-4 rounded bg-black border-white/10 text-white focus:ring-0 checked:bg-white"
              />
              <label
                htmlFor="isHighlight"
                className="text-sm text-white cursor-pointer select-none"
              >
                Feature on Home Page
              </label>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={14} />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
