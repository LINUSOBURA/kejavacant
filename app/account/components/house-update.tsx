"use client";
import { useState, useEffect } from "react";
import { updateHouse } from "@/utils/post-ad/handleAddHouse";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function EditHouseForm({ house_id }) {
  const [house, setHouse] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch the house data by ID when the component loads
    const fetchHouse = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("houses")
        .select("*")
        .eq("id", house_id)
        .single(); // Fetch single house record

      if (error) {
        console.error(error);
      } else {
        setHouse(data);
      }
    };

    fetchHouse();
  }, [house_id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      await updateHouse(house_id, formData);
      router.push("/houses"); // Redirect after successful update
    } catch (error) {
      console.error("Failed to update house:", error);
    }
  };

  if (!house) return <div>Loading...</div>;

  return (
    <form onSubmit={handleUpdate}>
      <div>
        <label htmlFor="name">House Name</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={house.name}
          required
        />
      </div>
      <div>
        <label htmlFor="house_number">House Number</label>
        <input
          type="text"
          id="house_number"
          name="house_number"
          defaultValue={house.house_number}
          required
        />
      </div>
      {/* Repeat for other fields like floor, rooms, rent, etc. */}

      <div>
        <label htmlFor="images">Images</label>
        <input type="file" id="images" name="images" multiple />
        {/* Optionally show existing images */}
        <div>
          {house.images?.map((url) => (
            <img key={url} src={url} alt="House" width="100" />
          ))}
        </div>
      </div>

      <button type="submit">Update House</button>
    </form>
  );
}
