import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import ButtonComponent from "./ButtonComponent";
import AsyncSelect from "react-select/async";
import { locationOptions } from "@/utils/datadummy";
import { LocationOption } from "@/utils/interface";
import { useState, useEffect } from "react";
import { getCategories } from "@/pages/api/api";

const customStyles = {
	control: (provided: any) => ({
		...provided,
		borderRadius: "12px",
		padding: "1px", // Adjust the value for the border radius
		borderColor: "rgb(228 228 261)",
	}),
};

export interface SearchBarProps {
	onSearch: (searchParams: {
	  jobTitle: string;
	  categoryId: string;
	  jobType: string;
	  dateRange: string;
	  sortOrder: string;
	}) => void;
  }

export interface CategoriesReal {
	categoryId: string;
	category_name: string;
}

// data.ts

const filterLocations = (inputValue: string) => {
	return locationOptions.filter((i) =>
		i.label.toLowerCase().includes(inputValue.toLowerCase())
	);
};

const promiseLocationOptions = (inputValue: string) =>
	new Promise<LocationOption[]>((resolve) => {
		setTimeout(() => {
			resolve(filterLocations(inputValue));
		}, 1000);
	});

function SearchBarComponent({ onSearch }: SearchBarProps) {
	const [jobTitle, setJobTitle] = useState<string>("");
	const [categoryId, setCategoryId] = useState<string>("");
	const [category, setCategory] = useState<CategoriesReal[]>([]);
	const [loadingCategories, setLoadingCategories] = useState<boolean>(true); // Loading state for categories
	const [jobType, setJobType] = useState<string>("");
	const [dateRange, setDateRange] = useState<string>("");
	const [sortOrder, setSortOrder] = useState<string>("");

	const handleSearch = () => {
		const searchParams = {
			jobTitle,
			categoryId: categoryId === "all" ? "" : categoryId, // If "all" is selected, pass an empty string
			jobType,
			dateRange,
			sortOrder,
	  
		};
		console.log("THIS IS ", categoryId);
		onSearch(searchParams);
	};

	useEffect(() => {
		const fetchdata = async () => {
			try {
				const response = await getCategories();
				console.log("Ini response only", response);
				console.log("ini response.data", response.data);
				setCategory(response.data);
				console.log("LOOK AT THIS SHIT ", category);
				console.log(category);
			} catch (error) {
				const err = error as Error;
				return err.message;
			}
		};
		fetchdata();
	}, []);

	return (
		<div className="flex flex-col md:flex md:flex-row gap-5 items-center md:items-end mt-2">
			<div className="w-full md:w-[35%]">
				<Label className="font-semibold text-neutral-950" htmlFor="position">
					Position :{" "}
				</Label>
				<Input
					className="rounded-xl "
					id="position"
					type="text"
					placeholder="Ex : Web Developer"
					value={jobTitle}
					onChange={(e) => setJobTitle(e.target.value)}
				/>
			</div>
			<div className="w-full md:w-[40%]">
				<Label className="font-semibold text-neutral-950" htmlFor="position">
					Job Category :{" "}
				</Label>
				<Select onValueChange={setCategoryId}>
					<SelectTrigger className=" w-full md:w-full rounded-xl">
						<div className="text-slate-500">
							<SelectValue placeholder="Select Job Category" />
						</div>
					</SelectTrigger>
					<SelectContent>
					<SelectItem value="all">All categories</SelectItem>
						{/* Dynamically generate SelectItem for each category */}
						{category.length > 0 ? (
							category.map((categoryItem, index) => (
								<SelectItem
									key={categoryItem.categoryId}
									value={`${index}`}
								>
									{categoryItem.category_name} {/* Display category name */}
								</SelectItem>
							))
						) : (
							<SelectItem value="no-categories" disabled>
								No categories available
							</SelectItem>
						)}
					</SelectContent>
				</Select>
			</div>
			<div className="w-full md:w-[35%] rounded-xl">
				<Label className="font-semibold text-neutral-950" htmlFor="location">
					Location :{" "}
				</Label>
				<AsyncSelect
					cacheOptions
					defaultOptions
					loadOptions={promiseLocationOptions}
					placeholder="Search Location"
					styles={customStyles} // Apply custom styles here
				/>
			</div>
			<div className="hidden md:w-[15%] md:block">
				<ButtonComponent onClick={handleSearch} type="ButtonSearch" />
			</div>
			<div className="block w-full md:hidden md:w-[15%] mt-0">
				<ButtonComponent
					type="ButtonFilledCustom"
					container="search"
					onClick={handleSearch}
				/>
			</div>
		</div>
	);
}

export default SearchBarComponent;
