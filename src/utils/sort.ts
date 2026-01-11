import type { MediaItem } from "../types/database";

export function getReorderedUpdates(
  reorderedSubset: MediaItem[],
  originalSubset: MediaItem[]
) {
  // 1. Get all existing sort_order values from the original subset
  const existingSortOrders = originalSubset
    .map((i) => i.sort_order ?? 0)
    .sort((a, b) => a - b);

  // 2. Check if we have valid, distinct sort orders
  // If we have duplicates (common if not initialized), swapping slots won't work.
  // We need to re-normalize them.
  const uniqueOrders = new Set(existingSortOrders);
  const hasDuplicates = uniqueOrders.size !== existingSortOrders.length;

  let updates;

  if (hasDuplicates || existingSortOrders.length === 0) {
    // Fallback: Generate new sequential orders starting from the lowest existing value (or 0)
    const startOrder =
      existingSortOrders.length > 0 ? existingSortOrders[0] : 0;

    updates = reorderedSubset.map((item, index) => ({
      id: item.id,
      sort_order: startOrder + index,
    }));
  } else {
    // If we have distinct slots, preserve them (swap logic)
    updates = reorderedSubset.map((item, index) => ({
      id: item.id,
      sort_order: existingSortOrders[index],
    }));
  }

  return updates;
}
