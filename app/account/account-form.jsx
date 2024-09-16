"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import Avatar from "./avatar";

export default function AccountForm({ user }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState(null);
  const [username, setUsername] = useState(null);
  const [phone, setPhone] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const router = useRouter();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`display_name, username, phone, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setPhone(data.phone);
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

  async function updateProfile({ username, phone, avatar_url }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        full_name: fullname,
        username,
        phone,
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
    <div className="mx-auto mt-8 min-h-screen p-10">
      <div className="form-widget flex flex-col gap-2">
        <Avatar
          uid={user?.id}
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ fullname, username, website, avatar_url: url });
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
            value={fullname || ""}
            onChange={(e) => setFullname(e.target.value)}
            className="bg-yellow-50 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-customGreen"
          />
        </div>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-yellow-50 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-customGreen"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number: </label>
          <input
            id="phone"
            type="text"
            value={phone || ""}
            onChange={(e) => setWebsite(e.target.value)}
            className="bg-yellow-50 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-customGreen"
          />
        </div>

        <div>
          <button
            className="button primary block bg-customGreen rounded-xl p-2 mt-2"
            onClick={() =>
              updateProfile({ fullname, username, phone, avatar_url })
            }
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </button>
        </div>

        <div>
          <form action="/auth/signout" method="post">
            <button
              className="button block primary bg-CustomPink2 rounded-xl p-2 mt-2"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
