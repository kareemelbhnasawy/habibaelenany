import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { Loader2, Plus, Edit2, Trash2 } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  avatar_url: string | null;
  created_at: string;
  sort_order: number;
}

export function TestimonialsEditor() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    quote: "",
    avatar_url: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) {
        // If table doesn't exist yet, just return empty to avoid crash while user runs migration
        console.warn("Could not fetch testimonials", error);
        return;
      }
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching testimonials", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        const { error } = await supabase
          .from("testimonials")
          .update({
            name: formData.name,
            role: formData.role || null,
            quote: formData.quote,
            avatar_url: formData.avatar_url || null,
          })
          .eq("id", editingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("testimonials").insert({
          name: formData.name,
          role: formData.role || null,
          quote: formData.quote,
          avatar_url: formData.avatar_url || null,
        });
        if (error) throw error;
      }

      closeModal();
      fetchData();
    } catch (error: any) {
      console.error("Save failed", error);
      alert(
        `Failed to save testimonial: ${
          error.message || error.error_description || "Unknown error"
        }`
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);
      if (error) throw error;
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
      alert("Delete failed");
    }
  };

  const openModal = (item?: Testimonial) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        role: item.role || "",
        quote: item.quote,
        avatar_url: item.avatar_url || "",
      });
    } else {
      setEditingItem(null);
      setFormData({ name: "", role: "", quote: "", avatar_url: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-display font-semibold text-white">
          Manage Testimonials
        </h2>
        <p className="text-gray-400">Add or edit client feedback.</p>
      </div>

      {/* Add Button */}
      <div className="flex justify-end">
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.length === 0 ? (
            <div className="col-span-full text-center py-20 border border-dashed border-white/10 rounded-xl">
              <p className="text-gray-400">
                No testimonials found. Run the database migration if you haven't
                yet!
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-900 border border-white/5 rounded-xl p-6 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {item.avatar_url ? (
                      <img
                        src={item.avatar_url}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover bg-zinc-800"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-gray-500 text-xs">
                        IMG
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-white">{item.name}</h4>
                      <p className="text-xs text-gray-400">{item.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(item)}
                      className="p-1.5 text-gray-400 hover:text-white bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-red-400 hover:text-white bg-red-500/10 rounded-lg hover:bg-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <blockquote className="text-sm text-gray-300 italic flex-1">
                  "{item.quote}"
                </blockquote>
              </div>
            ))
          )}
        </div>
      )}

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 rounded-xl w-full max-w-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-white">
              {editingItem ? "Edit Testimonial" : "Add Testimonial"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name</label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:border-white/30 outline-none"
                  placeholder="Client Name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Role / Company (Optional)
                </label>
                <input
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:border-white/30 outline-none"
                  placeholder="e.g. Wedding Planner"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Quote
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.quote}
                  onChange={(e) =>
                    setFormData({ ...formData, quote: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:border-white/30 outline-none resize-none"
                  placeholder="Their feedback..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Avatar URL (Optional)
                </label>
                <input
                  value={formData.avatar_url}
                  onChange={(e) =>
                    setFormData({ ...formData, avatar_url: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:border-white/30 outline-none"
                  placeholder="https://..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tip: You can upload an image in the "Media" tab and copy its
                  URL here.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
