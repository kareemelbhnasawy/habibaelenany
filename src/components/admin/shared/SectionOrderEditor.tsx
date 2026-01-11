import { useState } from "react";
import { ArrowUp, ArrowDown, X, GripVertical, Plus } from "lucide-react";
import { Reorder } from "framer-motion";

interface SectionOrderEditorProps {
  category: string;
  sections: string[];
  onChange: (newOrder: string[]) => void;
}

export function SectionOrderEditor({
  category,
  sections,
  onChange,
}: SectionOrderEditorProps) {
  const [newSection, setNewSection] = useState("");

  const move = (index: number, direction: -1 | 1) => {
    const newOrder = [...sections];
    if (index + direction < 0 || index + direction >= newOrder.length) return;

    const temp = newOrder[index];
    newOrder[index] = newOrder[index + direction];
    newOrder[index + direction] = temp;
    onChange(newOrder);
  };

  const remove = (index: number) => {
    // Determine if we should confirm. Maybe just do it. But user might click by accident.
    if (!confirm(`Remove "${sections[index]}" from order preference?`)) return;
    const newOrder = sections.filter((_, i) => i !== index);
    onChange(newOrder);
  };

  const add = () => {
    if (!newSection.trim()) return;
    if (sections.includes(newSection.trim())) {
      alert("Section already exists in list.");
      return;
    }
    onChange([...sections, newSection.trim()]);
    setNewSection("");
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-300">
        {category} Sections Order
      </h4>
      <div className="bg-black/30 rounded-lg p-2 space-y-2 max-w-md">
        {sections.length === 0 && (
          <p className="text-xs text-gray-500 italic p-2">
            No sections defined.
          </p>
        )}
        <Reorder.Group
          axis="y"
          values={sections}
          onReorder={onChange}
          className="space-y-2"
        >
          {sections.map((section, index) => (
            <Reorder.Item
              key={section}
              value={section}
              className="flex items-center gap-2 bg-white/5 rounded px-3 py-2 cursor-grab active:cursor-grabbing"
              whileDrag={{
                scale: 1.02,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
            >
              <GripVertical className="text-gray-600 w-4 h-4 cursor-grab" />
              <span className="flex-1 text-sm text-white select-none">
                {section}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className="p-1 hover:bg-white/10 rounded disabled:opacity-30 text-gray-400 hover:text-white"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  onClick={() => move(index, 1)}
                  disabled={index === sections.length - 1}
                  className="p-1 hover:bg-white/10 rounded disabled:opacity-30 text-gray-400 hover:text-white"
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  onClick={() => remove(index)}
                  className="p-1 hover:bg-red-500/20 rounded text-red-400 hover:text-red-300 ml-2"
                >
                  <X size={14} />
                </button>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {/* Add New Section Input */}
        <div className="flex gap-2 pt-2 border-t border-white/5">
          <input
            type="text"
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
            placeholder="Add section name..."
            className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-white/30"
            onKeyDown={(e) => e.key === "Enter" && add()}
          />
          <button
            onClick={add}
            disabled={!newSection.trim()}
            className="p-2 bg-white/10 hover:bg-white/20 rounded text-white disabled:opacity-30"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Sections not in this list will appear at the end. Use exact names.
      </p>
    </div>
  );
}
