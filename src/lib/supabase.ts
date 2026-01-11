import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase Environment Variables");
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");

export async function updateMediaOrder(
  updates: { id: string; sort_order: number }[]
) {
  // We'll update the items one by one or using an upsert if possible.
  // Since we only want to update sort_order, upserting might be tricky without full object.
  // But we can use Promise.all for parallel updates which is fine for small batches.
  // Or better, use a stored procedure if performance is key, but here client-side loop is fine.

  const { error } = await supabase.rpc("upsert_media_order", {
    payload: updates,
  });

  if (error) {
    // Fallback to individual updates if RPC doesn't exist (it doesn't yet)
    // Actually, let's just do individual updates for simplicity as per plan
    const promises = updates.map((update) =>
      supabase
        .from("media_items")
        .update({ sort_order: update.sort_order })
        .eq("id", update.id)
    );
    await Promise.all(promises);
  }
}
