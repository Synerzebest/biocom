"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GiPathDistance } from "react-icons/gi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SearchCity from "./SearchCity";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type='submit' className={`-ml-3 z-10 ${otherClasses} shadow p-4 bg-white rounded-full`}>
    <FaMagnifyingGlass
      className='text-xl text-green-400'
    />
  </button>
);

const SearchBar = () => {
  const [city, setCity] = useState("");
  const [radius, setRadius] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (city.trim() === "" && radius.trim() === "") {
      return alert("Please provide some input");
    }

    updateSearchParams(radius.toLowerCase(), city.toLowerCase());
  };

  const updateSearchParams = (radius: string, manufacturer: string) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Update or delete the 'radius' search parameter based on the 'radius' value
    if (radius) {
      searchParams.set("radius", radius);
    } else {
      searchParams.delete("radius");
    }

    // Update or delete the 'city' search parameter based on the 'city' value
    if (city) {
      searchParams.set("city", city);
    } else {
       searchParams.delete("city");
    }

    // Generate the new pathname with the updated search parameters
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
      <div className="flex flex-col gap-[30px] w-full items-center">
        <div className="w-full flex justify-center">
            <p className="text-2xl font-bold">Cherchez un commerce</p>
        </div>    
        <form className='flex items-center justify-start max-sm:flex-col w-full relative max-sm:gap-4 max-w-3xl' onSubmit={handleSearch}>
            <div className='flex-1 max-sm:w-full flex justify-start items-center relative'>
                <SearchCity
                city={city}
                setCity={setCity}
                />
                <SearchButton otherClasses='sm:hidden' />
            </div>
            <div className='flex-1 max-sm:w-full flex justify-start items-center relative'>
                <GiPathDistance
                width={25}
                height={25}
                className='absolute w-[20px] h-[20px] ml-4 text-green-400'
                />
                <input
                type='text'
                name='model'
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                placeholder='Rayon ...'
                className='w-full h-[48px] pl-12 p-4 bg-light-white rounded-r-full max-sm:rounded-full outline-none cursor-pointer text-sm'
                />
                <SearchButton otherClasses='sm:hidden' />
            </div>
            <SearchButton otherClasses='max-sm:hidden' />
        </form>
    </div>
  );
};

export default SearchBar;