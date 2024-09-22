import React from "react";
import { createClient } from "@/utils/supabase/server";
import LoggedIn from "@/utils/checkLogin";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
// import { deleteHouse } from "@/utils/post-ad/handleAddHouse";

export default async function AdsList() {
  const supabase = createClient();
  const user = await LoggedIn();

  const { data: houses, error } = await supabase
    .from("houses")
    .select("name, location,created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
  }
  if (!houses) {
    return <div>Loading...</div>;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Format date as YYYY-MM-DD and time as hh:mm AM/PM
    const formattedDate = date.toLocaleDateString("en-CA");
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true, // 12-hour format with AM/PM
    });

    return `${formattedDate} at ${formattedTime}`;
  }

  //   const handleDelete = async (house_id) => {
  //     try {
  //       await deleteHouse(house_id);
  //       router.push("/account"); // Redirect after deletion
  //     } catch (error) {
  //       console.error("Failed to delete house:", error);
  //     }
  //   };

  return (
    <div className="py-2 px-10">
      <h3>Your Ads</h3>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
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
            <tr key={house.id}>
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
                <button>
                  <MdDeleteOutline />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
