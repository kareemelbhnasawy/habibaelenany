import { useState } from "react";
import { Plus, X } from "lucide-react";

interface SectionManagerProps {
  sections: string[];
  onAdd: (section: string) => void;
  onRemove: (section: string) => void;
  title?: string;
}

export function SectionManager({
  sections,
  onAdd,
  onRemove,
  title = "Manage Sections",
}: SectionManagerProps) {
  const [newSection, setNewSection] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSection.trim() && !sections.includes(newSection.trim())) {
      onAdd(newSection.trim());
      setNewSection("");
    }
  };

  return (
    <div className="space-y-4 bg-zinc-900/50 p-6 rounded-xl border border-white/5">
      <h3 className="text-lg font-medium text-white">{title}</h3>

      {/* Existing Sections */}
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <div
            key={section}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 text-sm text-gray-300"
          >
            <span>{section}</span>
            <button
              onClick={() => onRemove(section)}
              className="text-gray-500 hover:text-red-400"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        {sections.length === 0 && (
          <span className="text-gray-500 text-sm italic">
            No sections defined.
          </span>
        )}
      </div>

      {/* Add New */}
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newSection}
          onChange={(e) => setNewSection(e.target.value)}
          placeholder="New section name..."
          className="flex-1 px-3 py-2 bg-black border border-white/10 rounded-lg text-white text-sm focus:border-white/30 outline-none"
        />
        <button
          type="submit"
          disabled={!newSection.trim()}
          className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 disabled:opacity-50"
        >
          <Plus size={18} />
        </button>
      </form>
    </div>
  );
}
