import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Plus, Search, Filter, X, Trash2, Loader2 } from "lucide-react";
import type { MediaItem } from "../../types/database";

export function MediaLibrary() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Upload Form State
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Photography",
    section: "Editorial",
    description: "",
  });

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("media_items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      setUploading(true);

      // 1. Upload file to Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${formData.category.toLowerCase()}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio-media").getPublicUrl(filePath);

      // 3. Insert into Database
      // Note: In a real app, we'd calculate width/height here
      const { error: dbError } = await supabase.from("media_items").insert({
        url: publicUrl,
        type: file.type.startsWith("video") ? "video" : "image",
        category: formData.category,
        section: formData.section,
        title: formData.title,
        description: formData.description,
        width: 0, // Placeholder
        height: 0, // Placeholder
      });

      if (dbError) throw dbError;

      // Reset and refresh
      setShowUploadModal(false);
      setFile(null);
      setPreviewUrl(null);
      setFormData({
        title: "",
        category: "Photography",
        section: "Editorial",
        description: "",
      });
      fetchItems();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Upload failed:", message);
      alert("Upload failed: " + message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      // 1. Delete from Storage (Extract path from URL if needed, or simple delete from DB first)
      // For simplicity, we'll just delete from DB. Storage clean up logic usually needs the path.
      // Let's try to parse path from URL if possible, or skip for now.

      const { error } = await supabase
        .from("media_items")
        .delete()
        .eq("id", id);
      if (error) throw error;

      setItems(items.filter((item) => item.id !== id));
    } catch (error: unknown) {
      console.error("Delete failed:", error);
      alert("Delete failed");
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Media Library</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage all your portfolio images and videos
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          onClick={() => setShowUploadModal(true)}
        >
          <Plus size={18} />
          Upload New
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex gap-4 p-4 border border-white/10 bg-zinc-900/30 rounded-lg backdrop-blur-sm">
        <div className="relative flex-1 max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full pl-9 pr-4 py-2 bg-black border border-white/10 rounded-md text-sm text-white focus:outline-none focus:border-white/30"
          />
        </div>

        {/* Placeholder for category filters */}
        <button className="flex items-center gap-2 px-3 py-2 border border-white/10 rounded-md text-sm text-gray-400 hover:text-white">
          <Filter size={16} />
          Filter
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading media...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
          <p className="text-gray-400">No media items found</p>
          <p className="text-sm text-gray-600 mt-1">
            Upload your first image to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square bg-zinc-900 rounded-lg overflow-hidden border border-white/5"
            >
              {item.type === "video" ? (
                <video src={item.url} className="w-full h-full object-cover" />
              ) : (
                <img
                  src={item.url}
                  alt={item.title || "Portfolio item"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}

              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div>
                  <p className="font-medium truncate text-white">
                    {item.title || "Untitled"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.category} • {item.section}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Upload Media</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              {/* File Input */}
              <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-white/20 transition-colors">
                {previewUrl ? (
                  <div className="relative aspect-video mx-auto max-h-48 overflow-hidden rounded">
                    <img
                      src={previewUrl}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setPreviewUrl(null);
                      }}
                      className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer block"
                    >
                      <Plus className="mx-auto h-10 w-10 text-gray-500 mb-2" />
                      <p className="text-sm text-gray-400">
                        Click to select file
                      </p>
                    </label>
                  </>
                )}
              </div>

              {/* Fields */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-white text-sm focus:border-white/30 outline-none"
                  placeholder="e.g. Urban Sunset"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-white text-sm focus:border-white/30 outline-none"
                  >
                    <option value="Photography">Photography</option>
                    <option value="Filmmaking">Filmmaking</option>
                    <option value="Short Form">Short Form</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Section
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.section}
                    onChange={(e) =>
                      setFormData({ ...formData, section: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-white text-sm focus:border-white/30 outline-none"
                    placeholder="e.g. Editorial"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-white text-sm focus:border-white/30 outline-none h-20 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={uploading || !file}
                className="w-full py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Uploading...
                  </>
                ) : (
                  "Upload Media"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
