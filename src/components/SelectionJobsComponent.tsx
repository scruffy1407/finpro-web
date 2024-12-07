import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

function SelectionJobsComponents() {
	return (
		<div className="max-w-screen-xl mx-auto overflow-x-auto snap-x sm:snap-none  flex justify-between ">
			<div className="flex flex-shrink-0 w-[610px] items-center gap-6 snap-start ">
				<div>
					<p className="text-neutral-500">We found 500+ Jobs</p>
				</div>
				<div className="">
					<Select>
						<SelectTrigger className=" w-full md:w-[138px] rounded-xl ">
							<div className="text-slate-500">
								<SelectValue placeholder="All Job Type" />
							</div>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="light">Full Time </SelectItem>
							<SelectItem value="dark">Part Time</SelectItem>
							<SelectItem value="system">Remote Working</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Select>
						<SelectTrigger className=" w-full md:w-[150px] rounded-xl">
							<div className="text-slate-500">
								<SelectValue placeholder="Job Post Date" />
							</div>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="light">7 Days Ago</SelectItem>
							<SelectItem value="dark">1 Month Ago</SelectItem>
							<SelectItem value="system">This Year</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="flex items-center gap-4 ">
				<div className="w-[80px]" >
					
					<span className="" > Sorted by</span>
				</div>
				<div>
					{" "}
					<Select>
						<SelectTrigger className=" w-full md:w-[124px] rounded-xl">
							<div className="text-slate-500">
								<SelectValue placeholder="Relevance" />
							</div>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="light">Alphabet A-Z</SelectItem>
							<SelectItem value="dark">Newest - Longest</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
}

export default SelectionJobsComponents;
