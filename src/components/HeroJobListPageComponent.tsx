import React from "react";
import SearchBarComponent from "./SearchBarComponent";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/store/slices/searchQuerySlice";

function HeroJobListPageComponent() {
	const dispatch = useDispatch();

	const onSearch = (searchParams: { jobTitle: string; categoryId: string; companyCity : string}) => {
		    // Adding default values for missing fields
			const searchQuery = {
				...searchParams,
				jobType: "",     // Default value or pass value from your inputs
				dateRange: "",   // Default value or pass value from your inputs
				sortOrder: "",   // Default value or pass value from your inputs
			  };
		dispatch(setSearchQuery(searchQuery)); // Dispatch action to update search query in the store
		console.log("Search query:", searchQuery);
	};

	return (
		<div className="max-w-screen-xl mx-auto bg-white mt-5 rounded-xl px-4 md:px-0">
			<div className="flex justify-between">
				<div className="flex flex-col md:pl-8 py-6 md:gap-11 w-[100%] ">
					<h1 className="font-bold text-2xl md:text-4xl ">
						Find Your Dream jobs
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
