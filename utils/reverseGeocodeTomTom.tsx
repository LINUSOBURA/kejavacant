export async function reverseGeocodeTomTom(lat: number, lng: number) {
  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

  console.log(lat, lng);

  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lng}&lon=${lat}&apiKey=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error details:", errorData);
    throw new Error(`Failed to reverse geocode: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.features.length) {
    console.log(data.features[0].properties.formatted);
    return data.features[0].properties.formatted;
  } else {
    return "Unknown location";
  }
}
