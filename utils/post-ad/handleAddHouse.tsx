"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

// Define the schema using Zod
const houseSchema = z.object({
  name: z.string().min(1, "House name is required"),
  house_number: z.string().min(1, "House number is required"),
  floor: z.string(),
  rooms: z.string().min(1, "Number of rooms is required"),
  rent: z.string().min(1, "Rent is required"),
  description: z.string().min(1, "Description is required"),
  // location: z.string().min(1, "Location is required"),
  lat: z.number(),
  lng: z.number(),
  contact: z.string().min(1, "Contact number is required"),
  balcony: z.string().nullable(),
  parking: z.string().nullable(),
  deposit: z.string().nullable(),
  gated: z.string().nullable(),
  wifi: z.string().nullable(),
  images: z.array(z.instanceof(File)).max(3, "You can upload up to 3 images"), // Validate images
});

export async function handleAdPost(formData: FormData) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  // const formEntries = Object.fromEntries(formData.entries());

  const formEntries = {
    name: formData.get("name"),
    house_number: formData.get("house_number"),
    floor: formData.get("floor"),
    rooms: formData.get("rooms"),
    rent: formData.get("rent"),
    description: formData.get("description"),
    lat: parseFloat(formData.get("lat")?.toString() ?? ""), // Convert lat to a number
    lng: parseFloat(formData.get("lng")?.toString() ?? ""),
    contact: formData.get("contact"),
    parking: formData.get("parking"),
    deposit: formData.get("deposit"),
    balcony: formData.get("balcony"),
    wifi: formData.get("wifi"),
    gated: formData.get("gated"),
    images: formData.getAll("images"), // Ensure this is an array of File objects
  };

  // Validate form data using Zod
  const validation = houseSchema.safeParse(formEntries);
  if (!validation.success) {
    throw new Error(JSON.stringify(validation.error.flatten()));
  }

  const locationPoint = `SRID=4326;POINT(${validation.data.lng} ${validation.data.lat})`;

  const houseData = {
    ...validation.data,
    user_id: user.id,
    location: locationPoint,
  };

  // Handle image uploads
  const imageFiles = formData.getAll("images") as File[];
  const imageUrls = [];

  for (const image of imageFiles) {
    const { data, error } = await supabase.storage
      .from("house-images")
      .upload(`public/${user.id}/${Date.now()}-${image.name}`, image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.log(error);
      throw new Error(`Failed to upload image: ${image.name}`);
    }

    const publicUrlResponse = supabase.storage
      .from("house-images")
      .getPublicUrl(data.path);

    const publicUrl = publicUrlResponse.data.publicUrl;
    imageUrls.push(publicUrl);
  }

  houseData.images = imageUrls;

  const { data: insertData, error: insertError } = await supabase
    .from("houses")
    .insert([houseData]);

  if (insertError) {
    console.error(insertError);
    throw new Error("Failed to post ad.");
  }

  return insertData;
}

export async function updateHouse(house_id, formData: FormData) {
  const supabase = createClient();

  // Fetch the logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  // Get form data
  const formEntries = {
    name: formData.get("name"),
    house_number: formData.get("house_number"),
    floor: formData.get("floor"),
    rooms: formData.get("rooms"),
    rent: formData.get("rent"),
    description: formData.get("description"),
    lat: parseFloat(formData.get("lat")?.toString() ?? ""), // Convert lat to a number
    lng: parseFloat(formData.get("lng")?.toString() ?? ""),
    contact: formData.get("contact"),
    parking: formData.get("parking"),
    deposit: formData.get("deposit"),
    balcony: formData.get("balcony"),
    wifi: formData.get("wifi"),
    gated: formData.get("gated"),
    images: formData.getAll("images"), // Assume images are URLs or strings
  };

  // Validate using the schema
  const validation = houseSchema.safeParse(formEntries);
  if (!validation.success) {
    throw new Error(JSON.stringify(validation.error.flatten()));
  }
  const locationPoint = `SRID=4326;POINT(${validation.data.lng} ${validation.data.lat})`;

  const updateData = {
    ...validation.data,
    user_id: user.id,
    location: locationPoint,
  };

  // Handle image uploads
  const imageFiles = formData.getAll("images") as File[];
  const imageUrls = [];

  for (const image of imageFiles) {
    const { data, error } = await supabase.storage
      .from("house-images")
      .upload(`public/${user.id}/${Date.now()}-${image.name}`, image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.log(error);
      throw new Error(`Failed to upload image: ${image.name}`);
    }

    const publicUrlResponse = supabase.storage
      .from("house-images")
      .getPublicUrl(data.path);

    const publicUrl = publicUrlResponse.data.publicUrl;
    imageUrls.push(publicUrl);
  }

  updateData.images = imageUrls;

  // Update the house record
  const { data, error } = await supabase
    .from("houses")
    .update(updateData)
    .eq("house_id", house_id);

  if (error) {
    console.error(error);
    throw new Error("Failed to update the house.");
  }

  return data;
}
