import Image from "next/image";
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { generateStaticParams } from "@/utils/generateStatic";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Houses from "../page";

type props = {
  params: {
    id: string;
  };
};

generateStaticParams();

export default async function House({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const supabase = createClient();

  if (!params?.id) {
    console.log("Error: id is undefined");
    return Error;
  }

  const { data: house, error } = await supabase
    .from("houses")
    .select()
    .eq("house_id", params.id)
    .single();

  if (error) {
    console.log(error);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const showContact = searchParams?.showContact === "true";
  if (showContact && !user) {
    redirect("/login");
  }
  return (
    <div className="min-h-screen ml-0 mr-0 sm:ml-5 sm:mr-5 mt-4">
      <div className="card lg:card-side shadow-xl">
        <figure className="flex flex-col items-center justify-center p-6 w-full md:w-1/3">
          <Carousel className="w-full max-w-xs flex justify-center items-center bg-inherit">
            <CarouselContent>
              {house.images.map((image) => (
                <CarouselItem key={image}>
                  <Image
                    src={image}
                    alt="House Image"
                    width={500}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-100 p-2 rounded-full" />
            <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-100 p-2 rounded-full" />
          </Carousel>
        </figure>
        <div className="card-body bg-CustomPink1">
          <h2 className="card-title">{house.name}</h2>
          <p>{house.description}</p>
          <p>House Number: {house.house_number}</p>
          <p>Rooms: {house.rooms}</p>
          <p>
            {new Intl.NumberFormat("en-KE", {
              style: "currency",
              currency: "KES",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(house.rent)}
          </p>

          <p>{house.location}</p>
          <h3 className="font-bold">Features</h3>
          <p>Deposit: {house.deposit ? <span>Yes</span> : <span>No</span>}</p>
          <p>
            Gated Community: {house.gated ? <span>Yes</span> : <span>No</span>}
          </p>
          <p>
            Parking Area: {house.parking ? <span>Yes</span> : <span>No</span>}
          </p>
          <p>
            Has a Balcony: {house.deposit ? <span>Yes</span> : <span>No</span>}
          </p>
          <p>
            Gated Community:{" "}
            {house.deposit ? <span>Yes</span> : <span>No</span>}
          </p>
          <div className="card-actions justify-between items-center">
            <p>
              <CiLocationOn /> {house.location}
            </p>
            <div className="flex gap-5 items-center">
              <Link
                href={!showContact ? `?showContact=true` : `?showContact=false`}
              >
                <button className="btn btn-primary">
                  {showContact ? "Hide Contact" : "Show Contact"}
                </button>
              </Link>
              {showContact && <p>{house.contact}</p>}
            </div>
          </div>

          <p>{house.user_id}</p>
        </div>
      </div>
    </div>
  );
}
