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

function SearchBarComponent() {
	return (
		<div className="flex flex-col md:flex md:flex-row gap-5 items-center md:items-end">
			<div className="w-full md:w-[35%]">
				<Label className="font-semibold text-neutral-950" htmlFor="position">
					Position :{" "}
				</Label>
				<Input
					className="rounded-xl "
					id="position"
					type="text"
					placeholder="Ex : Web Developer"
				/>
			</div>
			<div className="w-full md:w-[30%]">
				<Label className="font-semibold text-neutral-950" htmlFor="position">
					Job Category :{" "}
				</Label>
				<Select>
					<SelectTrigger className=" w-full md:w-[180px] rounded-xl">
						<div className="text-slate-500">
							<SelectValue placeholder="Select Job Category" />
						</div>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="light">Digital Marketing</SelectItem>
						<SelectItem value="dark">Web Developer</SelectItem>
						<SelectItem value="system">Back-End Developer</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="w-full md:w-[35%]">
				<Label className="font-semibold text-neutral-950" htmlFor="location">
					Location :{" "}
				</Label>
				<AsyncSelect
					cacheOptions
					defaultOptions
					loadOptions={promiseLocationOptions}
					placeholder="Search Location"
				/>
			</div>
			<div className="hidden md:w-[15%] md:block">
				<ButtonComponent type="ButtonSearch" />
			</div>
			<div className="block md:hidden md:w-[15%]">
				<ButtonComponent type="ButtonFilled" container="search" />
			</div>
		</div>
	);
}

export default SearchBarComponent;
