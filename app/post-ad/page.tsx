import React from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default function PostAd() {
  const supabase = createClient();

  async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect("/login");
    }
    return <p>Hello {data.user.email}</p>;
  };
}
