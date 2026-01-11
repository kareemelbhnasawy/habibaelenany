import type { MediaItem } from "../types/database";

export function getReorderedUpdates(
  reorderedSubset: MediaItem[],
  originalSubset: MediaItem[]
) {
  // 1. Get all existing sort_order values from the original subset
  // We assume the subset contains the exact same items, just reordered.
  const existingSortOrders = originalSubset
    .map((i) => i.sort_order ?? 0)
    .sort((a, b) => a - b);

  // 2. Assign these sort orders to the new item order
  const updates = reorderedSubset.map((item, index) => ({
    id: item.id,
    sort_order: existingSortOrders[index],
  }));

  return updates;
}
