import { useState } from "react";
import { supabase } from "../../lib/supabase";

export function Migration() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isMigrating, setIsMigrating] = useState(false);

  const addLog = (msg: string) => setLogs((prev) => [...prev, msg]);

  const migrate = async () => {
    setIsMigrating(true);
    setLogs(["Starting migration..."]);

    try {
      // 1. Get all local assets
      // Include video formats as well
      const modules = import.meta.glob(
        "../../assets/**/*.{png,jpg,jpeg,webp,JPG,PNG,JPEG,WEBP,mp4,mov,webm,MP4,MOV,WEBM}"
      );

      const total = Object.keys(modules).length;
      addLog(`Found ${total} assets (images/videos) to migrate.`);

      let count = 0;

      for (const path in modules) {
        count++;
        const mod = (await modules[path]()) as { default: string };
        const url = mod.default;
        const filename = path.split("/").pop() || "unknown";
        addLog(`[${count}/${total}] Processing ${filename}...`);

        // Determine Metadata based on path
        let category: "Photography" | "Filmmaking" | "Short Form" | string =
          "Uncategorized";
        let section: string | undefined = undefined;
        let isHero = false;
        let type: "image" | "video" = "image";

        // Check if video
        if (filename.toLowerCase().match(/\.(mp4|mov|webm)$/)) {
          type = "video";
        }

        if (path.includes("/hero/")) {
          isHero = true;
          category = "Photography"; // Assume hero images are photography for now or generic
        } else if (path.includes("/photography/")) {
          category = "Photography";
          if (path.includes("/editorial/")) section = "Editorial";
          else if (path.includes("/fashion/")) section = "Fashion";
          else if (path.includes("/outdoor/")) section = "Outdoor";
          else if (path.includes("/portraits/")) section = "Portraits";
          else if (path.includes("/products/")) section = "Products";
        } else if (
          path.includes("/filmaking/") ||
          path.includes("/vids/filmmaking/")
        ) {
          // Check for video paths too if distinct
          category = "Filmmaking";
          // Extract section-X
          const match = path.match(/section-(\d+)/);
          if (match) section = `Section ${match[1]}`; // Or map to real names if known
        } else if (
          path.includes("/short-form") ||
          path.includes("/short-form-highlights/")
        ) {
          category = "Short Form";
        } else if (path.includes("/photography-highlights/")) {
          category = "Photography";
          // These are highlights, maybe no specific section or reuse existing logic
        } else if (path.includes("/filmaking_landpage_highlights/")) {
          category = "Filmmaking";
        }

        // 2. Upload to Storage
        // Fetch blob from local URL
        const response = await fetch(url);
        const blob = await response.blob();

        // Generate unique path for storage
        // We use original filename but prepend folder structure to avoid collisions if needed,
        // or just use a timestamp to ensure uniqueness.
        const storagePath = `${category
          .toLowerCase()
          .replace(/\s+/g, "-")}/${Date.now()}_${filename}`;

        const { error: uploadError } = await supabase.storage
          .from("portfolio-media")
          .upload(storagePath, blob);

        if (uploadError) {
          addLog(`Error uploading ${filename}: ${uploadError.message}`);
          continue;
        }

        const publicUrl = supabase.storage
          .from("portfolio-media")
          .getPublicUrl(storagePath).data.publicUrl;

        // 3. Insert into Database
        // Check real dimensions if possible, otherwise null
        let width: number | null = null;
        let height: number | null = null;

        if (type === "image") {
          const dimensions = await new Promise<{
            width: number;
            height: number;
          }>((resolve) => {
            const img = new Image();
            img.onload = () =>
              resolve({ width: img.width, height: img.height });
            img.onerror = () => resolve({ width: 0, height: 0 });
            img.src = url;
          });
          width = dimensions.width || null;
          height = dimensions.height || null;
        }

        const { error: dbError } = await supabase.from("media_items").insert({
          url: publicUrl,
          category,
          section,
          is_hero: isHero,
          title: filename, // Default title
          type: type,
          width,
          height,
        });

        if (dbError) {
          addLog(
            `Error inserting DB record for ${filename}: ${dbError.message}`
          );
        } else {
          addLog(`Successfully migrated ${filename}`);
        }
      }

      addLog("Migration finished!");
    } catch (error) {
      console.error(error);
      addLog(`Critical error: ${error}`);
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-semibold text-white">
        Data Migration
      </h1>
      <p className="text-gray-400">
        Click the button below to scan local assets and upload them to Supabase.
        This process may take a while. Check console for details.
      </p>

      <button
        onClick={migrate}
        disabled={isMigrating}
        className="btn btn-primary disabled:opacity-50"
      >
        {isMigrating ? "Migrating..." : "Start Migration"}
      </button>

      <div className="bg-ink/50 p-4 rounded-lg h-96 overflow-y-auto font-mono text-xs text-green-400">
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
        {logs.length === 0 && (
          <span className="text-gray-600">Ready to start.</span>
        )}
      </div>
    </div>
  );
}
