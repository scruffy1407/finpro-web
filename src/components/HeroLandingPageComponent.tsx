import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import SearchBarComponent from "./SearchBarComponent";
import { setSearchQuery } from "@/store/slices/searchQuerySlice"; // Redux action
import { useRouter } from "next/router"; // For navigation

export default function HeroComponent() {
	const dispatch = useDispatch();
	const router = useRouter(); // Initialize the router

	const handleSearch = (searchParams: {
		jobTitle: string;
		categoryId: string;
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
		<div>
			<div className="max-w-screen-xl mx-auto bg-white mt-5 rounded-xl px-4 lg:px-0">
				<div className="flex justify-between">
					<div className="flex flex-col py-6 gap-6  w-[100%] lg:w-[60%] lg:pl-8 md:gap-11 lg:py-16 ">
						<h1 className="font-bold text-2xl md:text-4xl">
							Begin Your Search for Dream Career Here
						</h1>
						<p className="text-neutral-600">
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente
							earum libero ea dolorum quos accusamus expedita id eos deleniti
							facere
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
		</div>
	);
}
