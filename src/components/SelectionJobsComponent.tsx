import React, { useState } from "react";
import { useDispatch, UseDispatch } from "react-redux";
import { setSearchQuery } from "@/store/slices/searchQuerySlice";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

function SelectionJobsComponents() {
	const dispatch = useDispatch();

	const [jobType, setJobType] = useState<string>("");
	const [dateRange, setDateRange] = useState<string>(""); // Initial empty value
	const [sortOrder, setSortOrder] = useState<string>(""); // Initial empty value
	const [companyCity, setCompanyCity] = useState<string>(""); // Add the city filter state

	// Handle changes for jobType, dateRange, sortOrder, and companyCity
	const handleJobTypeChange = (value: string) => {
		setJobType(value);
		dispatchUpdate({ jobType: value });
	};

	const handleDateRangeChange = (value: string) => {
		setDateRange(value);
		dispatchUpdate({ dateRange: value });
	};

	const handleSortOrderChange = (value: string) => {
		setSortOrder(value);
		dispatchUpdate({ sortOrder: value });
	};

	// Dispatch updates to the Redux store
	const dispatchUpdate = (updatedValues: { [key: string]: string }) => {
		dispatch(
			setSearchQuery({
				jobTitle: "",
				categoryId: "",
				jobType: updatedValues.jobType === "all" ? "" : updatedValues.jobType, // Treat "all" as an empty string
				dateRange: updatedValues.dateRange === "all" ? "" : updatedValues.dateRange,
				sortOrder,
				companyCity,
				...updatedValues, // Spread the updated fields
			})
		);
	};

	return (
		<div className="max-w-screen-xl mx-auto overflow-x-auto snap-x sm:snap-none  flex justify-between ">
			<div className="flex flex-shrink-0 w-[610px] items-center gap-6 snap-start ">
				<div>
					<p className="text-neutral-500">We found 500+ Jobs</p>
				</div>
				<div className="">
					<Select value={jobType} onValueChange={handleJobTypeChange}>
						<SelectTrigger className=" w-full md:w-[138px] rounded-xl ">
							<div className="text-slate-500">
								<SelectValue placeholder="All Job Type" />
							</div>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Type </SelectItem>
							<SelectItem value="fulltime">Full Time </SelectItem>
							<SelectItem value="freelance">FreeLance</SelectItem>
							<SelectItem value="internship">Internship</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Select value={dateRange} onValueChange={handleDateRangeChange}>
						<SelectTrigger className=" w-full md:w-[150px] rounded-xl">
							<div className="text-slate-500">
								<SelectValue placeholder="Job Post Date" />
							</div>
						</SelectTrigger>
						<SelectContent>
						<SelectItem value="all">All Range </SelectItem>
							<SelectItem value="last7days">7 Days Ago</SelectItem>
							<SelectItem value="thisMonth">1 Month Ago</SelectItem>
							<SelectItem value="thisYear">This Year</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="flex items-center gap-4 ">
				<div className="w-[80px]">
					<span className=""> Sorted by</span>
				</div>
				<div>
					{" "}
					<Select value={sortOrder} onValueChange={handleSortOrderChange}>
						<SelectTrigger className=" w-full md:w-[124px] rounded-xl">
							<div className="text-slate-500">
								<SelectValue placeholder="Relevance" />
							</div>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="asc">A-Z</SelectItem>
							<SelectItem value="desc">Z-A</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
}

export default SelectionJobsComponents;
