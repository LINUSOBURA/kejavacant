import AccountForm from "./account-form";
// import { createClient } from "@/utils/supabase/server";
import AdsList from "./ads-list";

export default async function Account() {
  // const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col gap-8 min-h-screen">
      <AccountForm />
      <AdsList />
    </div>
  );
}
