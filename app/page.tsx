import Image from "next/image";
import Corousel from "../components/Corousel";
import { CiLocationOn } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";

export default function Home() {
  return (
    <main className="mt-10 p-4 sm:p-8 md:p-12">
      <div className="flex sm:justify-center items-center">
        <div className="px-5 w-full lg:w-1/2">
          <h1 className="text-xl sm:text-4xl md:text-6xl font-bold">
            Easly Find a living Space you deserve
          </h1>
          <p className="text-sm sm:text-lg md:text-2xl mt-8">
            It is easy to find your dream house here. Filter, Search, Take a
            virtual tour and get a live location to the house!
          </p>

          <div className="bg-gray-200 flex gap-5 py-2 px-4 rounded mt-10 justify-center w-full lg:w-1/2">
            <div className="flex gap-2 justify-center items-center">
              <CiLocationOn />
              <input
                type="text"
                placeholder="Location"
                className="px-3 py-2 max-w-sm w-full rounded bg-slate-100"
              />
            </div>
            <button className="bg-customGreen rounded px-2 py-1 text-xs sm:text-lg">
              <p className="flex items-center gap-2">
                <CiSearch /> Search
              </p>
            </button>
          </div>
        </div>
        <div className="hidden sm:block justify-center items-center w-1/2">
          <Image alt="Logo" src="/bg.png" width={800} height={800} />
        </div>
      </div>

      <div className="md:hidden justify-center items-center w-full mt-10">
        <Corousel />
      </div>
    </main>
  );
}
