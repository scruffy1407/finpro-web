import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import ButtonComponent from "../ButtonComponent";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQueryJobDash } from "@/store/slices/searchQueryJobDashSlice";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface SearchBarJobDashProps {
	onSearch: (searchParams: { jobTitle?: string; sortOrder?: string }) => void;
}

function SearchBarJobDash({ onSearch }: SearchBarJobDashProps) {
	const dispatch = useDispatch<AppDispatch>();
	const searchQueryJobDash = useSelector(
		(state: RootState) => state.searchQueryJobdash
	);
	const { jobTitle, sortOrder } = searchQueryJobDash;
	const [localJobTitle, setLocalJobTitle] = useState<string>(jobTitle || "");
	const [localSortOrder, setLocalSortOrder] = useState(sortOrder || "newest");

	useEffect(() => {
		setLocalSortOrder(sortOrder || "newest");
	}, []);

	const dispatchUpdate = (updateValues: { [key: string]: string }) => {
		dispatch(setSearchQueryJobDash({ ...searchQueryJobDash, ...updateValues }));
	};
	const handleSortOrderChange = (value: string) => {
		setLocalSortOrder(value);
		dispatchUpdate({ sortOrder: value });

		// Trigger search immediately with updated sort order
		const apiSortOrder = value === "newest" ? "" : value;

		onSearch({
			jobTitle: localJobTitle,
			sortOrder: apiSortOrder,
		});
	};

	const handleSearch = () => {
		const apiSortOrder = localSortOrder === "newest" ? "" : localSortOrder;

		const searchParams = {
			jobTitle: localJobTitle,
			sortOrder: apiSortOrder,
		};
		onSearch(searchParams);

		dispatchUpdate({
			jobTitle: localJobTitle,
			sortOrder: localSortOrder,
		});
	};

	return (
		<div className="flex md:flex md:flex-row gap-5 justify-between md:items-center mt-2">
			<div className="w-full md:w-[35%] flex gap-4  ">
				<Input
					className="rounded-xl "
					id="position"
					type="text"
					placeholder="Ex : Web Developer"
					value={localJobTitle}
					onChange={(e) => setLocalJobTitle(e.target.value)}
				/>

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

			<div className="flex items-center gap-4">
				<div className="w-[80px]">
					<span>Sorted by</span>
				</div>
				<div>
					<Select value={localSortOrder} onValueChange={handleSortOrderChange}>
						<SelectTrigger className="w-full md:w-[124px] rounded-xl">
							<div className="text-slate-500">
								<SelectValue />
							</div>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="asc">A-Z</SelectItem>
							<SelectItem value="desc">Z-A</SelectItem>
							<SelectItem value="newest">Newest</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
}

export default SearchBarJobDash;
