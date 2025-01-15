import React from "react";
import SearchBarComponent from "./SearchBarComponent";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/store/slices/searchQuerySlice";

function HeroJobListPageComponent() {
  const dispatch = useDispatch();

  const onSearch = (searchParams: {
    jobTitle?: string;
    categoryId?: string;
    companyCity?: string;
  }) => {
    // Adding default values for missing fields
    const searchQuery = {
      ...searchParams,
      jobType: "", // Default value or pass value from your inputs
      dateRange: "", // Default value or pass value from your inputs
      sortOrder: "", // Default value or pass value from your inputs
    };
    dispatch(setSearchQuery(searchQuery)); // Dispatch action to update search query in the store
  };

  return (
    <div className=" bg-white rounded-xl px-4 md:px-0">
      <div className="flex justify-between">
        <div className="flex flex-col md:pl-8 py-6 md:gap-5 w-[100%] ">
          <h1 className="font-bold text-xl md:text-3xl ">
            Find Your Dream Jobs
          </h1>
          <div className="w-full">
            <SearchBarComponent onSearch={onSearch} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroJobListPageComponent;
