import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiLocationOn } from "react-icons/ci";

export default function Houses() {
  const houses = [
    {
      id: 1,
      name: "House 1",
      image: "https://picsum.photos/id/1/200/300",
      rent: 10000,
      location: "Umoja, Nairobi",
    },
    {
      id: 2,
      name: "House 2",
      image: "https://picsum.photos/id/1/200/300",
      rent: 10000,
      location: "Kayole, Nairobi",
    },
  ];
  return (
    <main className="mt-5 px-4 sm:px-8 md:px-12 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {houses.map((house) => (
          <div key={house.id} className="flex flex-col bg-slate-100 rounded">
            <Link href={`/houses/${house.id}`}>
              <Image
                src={house.image}
                alt={house.name}
                width={200}
                height={300}
                className="object-cover w-[500px] h-[300px] rounded"
              />
              <div className="p-4 flex flex-col gap-2 text-sm sm:text-lg md:text-xl">
                <h1 className="text-lg font-bold">{house.name}</h1>
                <p>Ksh {house.rent}</p>
                <p className="flex items-center gap-2">
                  <CiLocationOn /> {house.location}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
