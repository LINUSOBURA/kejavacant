"use server";
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { getUserAndProfile } from "@/utils/checkLogin";
import { CiEdit } from "react-icons/ci";
import DeleteHouseForm from "./components/deleteHouseForm";

export default async function AdsList() {
  const supabase = createClient();
  const userAndProfile = await getUserAndProfile();

  if (!userAndProfile) {
    return null; // Return early if the user is not logged in
  }
  const { user } = userAndProfile;

  // Fetch the user's houses
  const { data: houses, error } = await supabase
    .from("houses")
    .select("house_id, name, location,created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <div>Error fetching houses</div>;
  }

  if (!houses || houses.length === 0) {
    return <div>No houses found</div>; // Handle empty state
  }

  // Format date function
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-CA");
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${formattedDate} at ${formattedTime}`;
  }

  return (
    <div className="py-2 px-10 overflow-scroll">
      <h3 className="text-xl font-bold">Your Ads</h3>
      <table className="min-w-full table-auto border-collapse border border-gray-300 overflow-x-auto">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Location</th>
            <th className="border border-gray-300 p-2">Posted Date</th>
            <th className="border border-gray-300 p-2">Edit</th>
            <th className="border border-gray-300 p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {houses.map((house) => (
            <tr key={house.house_id}>
              <td className="border border-gray-300 p-2">{house.name}</td>
              <td className="border border-gray-300 p-2">{house.location}</td>
              <td className="border border-gray-300 p-2">
                {formatDate(house.created_at)}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <button>
                  <CiEdit />
                </button>
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {/* Form to trigger server-side delete */}
                <DeleteHouseForm houseId={house.house_id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
