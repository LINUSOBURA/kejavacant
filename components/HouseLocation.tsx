import { reverseGeocodeTomTom } from "@/utils/reverseGeocodeTomTom";
import { fetchHousesWithLatLng } from "@/utils/fetchHousesLT"; // assuming you already have a function to get lat/lng

export async function getHousesWithTomTomAddresses() {
  const houses = await fetchHousesWithLatLng();

  const housesWithAddresses = await Promise.all(
    houses.map(async (house) => {
      const address = await reverseGeocodeTomTom(house.lat, house.lng);
      return {
        house_id: house.house_id,
        lat: house.lat,
        lng: house.lng,
        name: house.name,
        images: house.images,
        rent: house.rent,
        premium: house.premium,
        address: address,
      };
    })
  );

  return housesWithAddresses;
}
