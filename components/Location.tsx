import { createClient } from "@/utils/supabase/server";

export async function fetchHousesWithLocation() {
  const supabase = createClient();

  // Fetch the id and location (latitude and longitude) from the 'houses' table
  const { data, error } = await supabase.from("houses").select("id, location");

  if (error) {
    throw new Error("Failed to fetch houses with location");
  }

  return data;
}

export async function reverseGeocodeTomTom(lat: number, lng: number) {
  const apiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY; // Make sure to store your TomTom API key in environment variables
  const url = `https://api.tomtom.com/search/2/reverseGeocode/${lat},${lng}.json?key=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to reverse geocode: ${response.statusText}`);
  }

  const data = await response.json();

  // Return relevant location data from the response
  if (data && data.addresses && data.addresses.length > 0) {
    const address = data.addresses[0].address;
    return `${address.streetName}, ${address.municipality}, ${address.countrySubdivision}, ${address.country}`;
  } else {
    return "Unknown location";
  }
}
