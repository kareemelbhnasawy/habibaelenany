import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { supabase } from "../../../lib/supabase";

interface MediaUploaderProps {
  onUploadComplete: () => void;
  category: "Photography" | "Filmmaking" | "Short Form" | "Hero";
  section?: string;
  isHero?: boolean;
}

export function MediaUploader({
  onUploadComplete,
  category,
  section,
  isHero = false,
}: MediaUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setFile(file);
    setPreview(URL.createObjectURL(file));
    // Default title from filename
    setTitle(file.name.split(".").slice(0, -1).join("."));
  };

  const uploadFile = async () => {
    if (!file) return;
    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${category.toLowerCase()}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio-media").getPublicUrl(filePath);

      // Get dimensions for images
      let width = 0;
      let height = 0;

      if (file.type.startsWith("image/")) {
        const dimensions = await new Promise<{ width: number; height: number }>(
          (resolve) => {
            const img = new Image();
            img.onload = () =>
              resolve({ width: img.width, height: img.height });
            img.onerror = () => resolve({ width: 0, height: 0 });
            img.src = publicUrl;
          }
        );
        width = dimensions.width;
        height = dimensions.height;
      }

      // Insert into DB
      const { error: dbError } = await supabase.from("media_items").insert({
        url: publicUrl,
        type: file.type.startsWith("video/") ? "video" : "image",
        category,
        section,
        is_hero: isHero,
        title: title || file.name,
        width: width || null,
        height: height || null,
      });

      if (dbError) throw dbError;

      // Reset
      setFile(null);
      setPreview(null);
      setTitle("");
      onUploadComplete();
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? "border-white bg-white/5"
            : "border-white/10 hover:border-white/20"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*,video/*"
          onChange={handleChange}
        />

        {preview ? (
          <div className="relative max-w-sm mx-auto">
            {file?.type.startsWith("video/") ? (
              <video src={preview} className="rounded-lg w-full" controls />
            ) : (
              <img src={preview} alt="Preview" className="rounded-lg w-full" />
            )}
            <button
              onClick={() => {
                setFile(null);
                setPreview(null);
              }}
              className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div
            className="cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <p className="text-sm text-gray-300 font-medium">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG, or MP4</p>
          </div>
        )}
      </div>

      {file && (
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-white text-sm focus:border-white/30 outline-none"
              placeholder="Enter title..."
            />
          </div>
          <button
            onClick={uploadFile}
            disabled={uploading}
            className="px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 h-[38px]"
          >
            {uploading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
