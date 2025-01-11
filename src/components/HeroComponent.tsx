import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic"; // For navigation

import { useDispatch } from "react-redux";
const SearchBarComponent = dynamic(
  () => import("@/components/SearchBarComponent"),
  { ssr: false },
);
import { setSearchQuery } from "@/store/slices/searchQuerySlice"; // Redux action
import { useRouter } from "next/router";

export default function HeroComponent() {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize the router

  const handleSearch = (searchParams: {
    jobTitle: string;
    categoryId: string;
    companyCity: string;
  }) => {
    // Construct search query with default values
    const searchQuery = {
      ...searchParams,
      jobType: "", // Default value or use real input
      dateRange: "", // Default value or use real input
      sortOrder: "", // Default value or use real input
    };

    // Dispatch the search query to Redux store
    dispatch(setSearchQuery(searchQuery));
    console.log("Search query dispatched:", searchQuery);

    // Navigate to the JobPostPage with the search parameters
    router.push({
      pathname: "/jobs", // Assuming you have a /joblist route for the job posts
      query: searchQuery, // Pass search parameters in the URL query
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto bg-white mt-5 rounded-xl px-4 md:px-0">
      <div className="flex justify-between">
        <div className="flex flex-col md:pl-8 py-6 gap-6 md:gap-11 w-full lg:w-[60%]">
          <h1 className="font-bold text-2xl md:text-4xl">
            Begin Your Search for Dream Career Here
          </h1>
          <p>
            Search your path to success with ease—explore endless opportunities,
            discover the perfect job for your skills and passions, and take the
            first step toward building the career of your dreams.
          </p>
          <div>
            <SearchBarComponent onSearch={handleSearch} />
          </div>
        </div>

        <div className="hidden lg:flex w-[40%]">
          <Image
            src="HeroImage.svg"
            alt="Picture Hero"
            width={408}
            height={335}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
