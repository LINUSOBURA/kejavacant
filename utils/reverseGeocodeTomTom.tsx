export async function reverseGeocodeTomTom(lat: number, lng: number) {
  const apiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;
  //   const newlat = parseFloat(lat.trim());
  //   const newlng = parseFloat(lng.trim());
  const url = `https://api.tomtom.com/search/2/reverseGeocode/${lat},${lng}.json?key=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error details:", errorData);
    throw new Error(`Failed to reverse geocode: ${response.statusText}`);
  }

  const data = await response.json();

  // Return relevant location data from the response
  if (data && data.addresses && data.addresses.length > 0) {
    const address = data.addresses[0].address;
    return `${address.streetName}, ${address.countrySubdivision}, ${address.country}`;
  } else {
    return "Unknown location";
  }
}
