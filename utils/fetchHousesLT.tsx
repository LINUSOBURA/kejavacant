import { createClient } from "@/utils/supabase/server";

export async function fetchHousesWithLatLng() {
  const supabase = createClient();

  const { data, error } = await supabase.from("house_coordinates").select(`
      house_id,
      lat,
      lng,
      images,
      premium,
      rent,
      name
    `);

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch houses with lat and lng");
  }

  return data;
}
