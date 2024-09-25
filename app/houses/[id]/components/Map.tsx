"use client";
import { useEffect, useRef } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css"; // Import CSS for TomTom maps

type MapProps = {
  lat: number;
  lng: number;
};

const MapComponent: React.FC<MapProps> = ({ lat, lng }) => {
  const mapElement = useRef(null);

  useEffect(() => {
    const map = tt.map({
      key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY,
      container: mapElement.current,
      center: [lng, lat], // Center the map on the passed coordinates
      zoom: 15, // Initial zoom level
    });

    // Add a marker at the given coordinates
    const marker = new tt.Marker().setLngLat([lng, lat]).addTo(map);

    return () => {
      map.remove();
    };
  }, [lat, lng]);

  return <div ref={mapElement} className="h-[500px] w-full"></div>;
};

export default MapComponent;
