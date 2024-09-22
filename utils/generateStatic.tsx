import { createClient } from "@supabase/supabase-js";

export async function generateStaticParams() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: houses } = await supabaseAdmin.from("houses").select();
  if (!houses) {
    return [];
  }

  return houses.map((house) => ({
    id: house.house_id,
  }));
}
