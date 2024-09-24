"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { handleAdPost } from "../../utils/post-ad/handleAddHouse";
import { getUserAndProfile } from "@/utils/checkLogin";
import { z } from "zod";

// Zod schema for client-side validation
const houseSchema = z.object({
  name: z.string().min(1, "House name is required"),
  house_number: z.string().min(1, "House number is required"),
  floor: z.string().optional(),
  rooms: z.string().min(1, "Number of rooms is required"),
  rent: z.string().min(1, "Rent is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  contact: z.string().min(1, "Contact number is required"),
  images: z.array(z.instanceof(File)).max(3, "You can upload up to 3 images"),
});

export default function PostAd() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({}); // Store individual errors here

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormErrors({}); // Reset errors

    const formData = new FormData(event.currentTarget);

    try {
      const formEntries = {
        name: formData.get("name"),
        house_number: formData.get("house_number"),
        floor: formData.get("floor"),
        rooms: formData.get("rooms"),
        rent: formData.get("rent"),
        description: formData.get("description"),
        location: formData.get("location"),
        contact: formData.get("contact"),
        parking: formData.get("parking"),
        deposit: formData.get("deposit"),
        balcony: formData.get("balcony"),
        wifi: formData.get("wifi"),
        gated: formData.get("gated"),
        images: formData.getAll("images"), // Use array of files
      };
      // Perform Zod validation client-side

      const validation = houseSchema.safeParse(formEntries);

      if (!validation.success) {
        // Map Zod errors to the state
        const errorMessages: Record<string, string> = {};
        validation.error.issues.forEach((issue) => {
          errorMessages[issue.path[0]] = issue.message;
        });
        setFormErrors(errorMessages);
        return;
      }

      // Handle Ad Post and file upload
      await handleAdPost(formData);
      router.push("/success");
    } catch (error) {
      console.error(error);
      alert("Failed to post the ad. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  getUserAndProfile();

  return (
    <div className="flex justify-center">
      <main className="flex min-h-screen flex-col items-center rounded-md bg-white text-black p-24 w-auto sm:w-3/4 lg:w-1/2 m-5">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Post an ad and reach your next Tenants
        </h1>
        <form onSubmit={handleSubmit}>
          {/* House Name */}
          <div className="mt-3 flex flex-col gap-2">
            <label> House Name</label>
            <input
              type="text"
              name="name"
              className="block w-full text-sm rounded-lg border border-gray-300 bg-inherit px-3 dark:placeholder-gray-400"
            />
            {formErrors.name && (
              <p className="text-red-500">{formErrors.name}</p>
            )}
          </div>

          {/* House Number */}
          <div className="mt-3 flex flex-col gap-2">
            <label> House Number</label>
            <input
              type="number"
              name="house_number"
              className="block w-full text-sm rounded-lg border border-gray-300 bg-inherit px-3 dark:placeholder-gray-400"
            />
            {formErrors.house_number && (
              <p className="text-red-500">{formErrors.house_number}</p>
            )}
          </div>

          {/* Floor */}
          <div className="mt-3 flex flex-col gap-2">
            <label>Floor (0 for ground floor)</label>
            <input
              type="number"
              name="floor"
              className="block w-full text-sm rounded-lg border border-gray-300 bg-inherit px-3 dark:placeholder-gray-400"
            />
            {formErrors.floor && (
              <p className="text-red-500">{formErrors.floor}</p>
            )}
          </div>

          {/* Rooms */}
          <div className="mt-3 flex flex-col gap-2">
            <label> Rooms</label>
            <input
              type="number"
              name="rooms"
              className="block w-full text-sm rounded-lg border border-gray-300 bg-inherit px-3 dark:placeholder-gray-400"
            />
            {formErrors.rooms && (
              <p className="text-red-500">{formErrors.rooms}</p>
            )}
          </div>

          {/* Rent */}
          <div className="mt-3 flex flex-col gap-2">
            <label>Rent (Monthly in KES)</label>
            <input
              type="number"
              name="rent"
              className="block w-full text-sm rounded-lg border border-gray-300 bg-inherit px-3 dark:placeholder-gray-400"
            />
            {formErrors.rent && (
              <p className="text-red-500">{formErrors.rent}</p>
            )}
          </div>

          {/* Description */}
          <div className="mt-3 flex flex-col gap-2">
            <label>Description (Add as much information as possible)</label>
            <textarea
              name="description"
              className="block w-full text-sm rounded-lg border border-gray-300 bg-inherit px-3 dark:placeholder-gray-400"
            />
            {formErrors.description && (
              <p className="text-red-500">{formErrors.description}</p>
            )}
          </div>

          {/* Location */}
          <div className="mt-3 flex flex-col gap-2">
            <label>Location (County, Constituency, Area)</label>
            <input
              type="text"
              name="location"
              className="block w-full text-sm rounded-lg border border-gray-300 bg-inherit px-3 dark:placeholder-gray-400"
            />
            {formErrors.location && (
              <p className="text-red-500">{formErrors.location}</p>
            )}
          </div>

          {/* Contact */}
          <div className="mt-3 flex flex-col gap-2">
            <label>Phone Number</label>
            <input
              type="text"
              name="contact"
              className="block w-full text-sm rounded-lg border border-gray-300 bg-inherit px-3 dark:placeholder-gray-400"
            />
            {formErrors.contact && (
              <p className="text-red-500">{formErrors.contact}</p>
            )}
          </div>
          {/* Additional information */}
          <h3 className="mt-5">
            Additional information (Check all applicable)
          </h3>
          <div className="mt-3 flex gap-5 flex-wrap">
            <span className="flex gap-2">
              <label htmlFor="">Balcony</label>
              <input
                type="checkbox"
                name="balcony"
                id=""
                className="bg-white"
              />
            </span>
            <span className="flex gap-2">
              <label htmlFor="">Parking</label>
              <input type="checkbox" name="parking" id="" />
            </span>
            <span className="flex gap-2">
              <label htmlFor="">Deposit</label>
              <input type="checkbox" name="deposit" id="" />
            </span>
            <span className="flex gap-2">
              <label htmlFor="">Balcony</label>
              <input type="checkbox" name="balcony" id="" />
            </span>
            <span className="flex gap-2">
              <label htmlFor="">Gated Community</label>
              <input type="checkbox" name="gated" id="" />
            </span>
            <span className="flex gap-2">
              <label htmlFor="">WI-FI</label>
              <input type="checkbox" name="wifi" id="" />
            </span>
          </div>

          {/* Images */}
          <div className="mt-5 flex gap-2 items-center">
            <label> Images (Max 3): </label>
            <input
              type="file"
              name="images"
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              accept="image/*"
              multiple
            />
            {formErrors.images && (
              <p className="text-red-500">{formErrors.images}</p>
            )}
          </div>

          <div className="mt-5 flex gap-2 items-center">
            <button
              type="submit"
              className="btn btn-primary mt-5"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post Ad"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
