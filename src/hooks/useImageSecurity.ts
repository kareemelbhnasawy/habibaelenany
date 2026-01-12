import { useEffect } from "react";

export function useImageSecurity() {
  useEffect(() => {
    // 1. Prevent Right Click (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      // Allow right click on inputs/textareas for accessibility (copy/paste text)
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      e.preventDefault();
    };

    // 2. Prevent Drag and Drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // 3. Prevent specific keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Cmd+S / Ctrl+S (Save)
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
      }
      // Prevent Cmd+Shift+4 / Cmd+Shift+3 (Mac Screenshots - partial shim, browser often overrides)
      // Note: We can't actually blocking OS level screenshots, but we can try to block browser specific ones.
      // Blocking Cmd+P (Print)
      if ((e.metaKey || e.ctrlKey) && e.key === "p") {
        e.preventDefault();
      }
      // Prevent Cmd+C (Copy) on images ideally, but hard to distinguish target.
      // We generally leave text copy available unless requested.
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
