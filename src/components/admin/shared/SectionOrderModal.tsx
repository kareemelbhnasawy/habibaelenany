import { X } from "lucide-react";
import { useMemo } from "react";
import { SectionOrderEditor } from "./SectionOrderEditor";
import { useSiteSettings } from "../../../hooks/useSiteSettings";

interface SectionOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  existingSections?: string[];
}

export function SectionOrderModal({
  isOpen,
  onClose,
  category,
  existingSections = [],
}: SectionOrderModalProps) {
  const { sectionOrder, updateSectionOrder } = useSiteSettings();
  const storedOrder = sectionOrder[category] || [];

  const allSections = useMemo(() => {
    // 1. Start with the stored order to preserve user's previous sorts
    const combined = [...storedOrder];
    const storedSet = new Set(storedOrder);

    // 2. Append any existing sections that haven't been ordered yet
    existingSections.forEach((section) => {
      if (!storedSet.has(section)) {
        combined.push(section);
      }
    });

    return combined;
  }, [storedOrder, existingSections]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-white/10 rounded-xl w-full max-w-md p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-medium text-white mb-2">
          Reorder Sections
        </h3>
        <p className="text-sm text-gray-400 mb-6">
          Drag and drop items to change the order on the public website.
        </p>

        <SectionOrderEditor
          category={category}
          sections={allSections}
          onChange={async (newOrder) => {
            // Optimistic update handled by hook, but we need to pass it back
            await updateSectionOrder(category, newOrder);
          }}
        />

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
