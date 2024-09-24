import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiLocationOn } from "react-icons/ci";

export default async function Houses() {
  const supabase = createClient();
  const { data: houses, error } = await supabase.from("houses").select();
  if (error) {
    console.log(error);
  }
  if (!houses) {
    return <div>Loading...</div>;
  }

  return (
    <main className="mt-5 px-4 sm:px-8 md:px-12 py-4 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {houses.map((house) => (
          <div
            className="card bg-fuchsia-100 shadow-xl w-auto"
            key={house.house_id}
          >
            <Link href={`/houses/${house.house_id}`}>
              <figure className="h-[200px] w-full overflow-hidden">
                {house.images && house.images[0] ? (
                  <Image
                    src={house.images[0]}
                    alt="House Image"
                    width={400}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Image
                    src={
                      "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                    }
                    alt="House Image"
                    width={400}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                )}
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {house.name}
                  {house.premium && (
                    <div className="badge badge-secondary">Top Offer</div>
                  )}
                </h2>
                <p className="text-green-500">
                  {new Intl.NumberFormat("en-KE", {
                    style: "currency",
                    currency: "KES",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(house.rent)}
                </p>
                <p className="flex items-center gap-2">
                  <CiLocationOn />
                  {/* {house.location} */}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
