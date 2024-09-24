"use server";
import { createClient } from "@/utils/supabase/server";
export async function deleteHouse(house_id) {
  const supabase = createClient();

  const { error } = await supabase
    .from("houses")
    .delete()
    .eq("house_id", house_id);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete the house.");
  }

  return { success: true };
}
