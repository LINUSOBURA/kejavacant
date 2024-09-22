"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import Avatar from "./components/avatar";

export default function AccountForm({ user }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [full_name, setFullname] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const router = useRouter();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, email, avatar_url`)
        .eq("id", user?.id)
        .single();
      console.log(data);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({ full_name, avatar_url }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        full_name: full_name,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    router.push("/login");
  }
  if (loading) {
    <Loading />;
  }

  return (
    <div className="mt-8 p-10">
      <form className="form-widget flex flex-col gap-2">
        <Avatar
          uid={user?.id}
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ full_name, username, website, avatar_url: url });
          }}
        />
        <div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="text"
            value={user?.email}
            disabled
            className="bg-yellow-50 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-customGreen"
          />
        </div>
        <div>
          <label htmlFor="fullName">Full Name: </label>
          <input
            id="fullName"
            type="text"
            value={full_name || ""}
            disabled
            className="bg-yellow-50 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-customGreen"
          />
        </div>

        <div>
          <button
            className="button primary block bg-customGreen rounded-xl p-2 mt-2"
            onClick={() => updateProfile({ full_name, avatar_url })}
            disabled={loading}
            type="button"
          >
            {loading ? "Loading ..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
