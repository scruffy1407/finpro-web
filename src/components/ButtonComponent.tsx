import React, { useState } from "react";
import { ButtonProps } from "@/utils/interface";
import Image from "next/image";

function ButtonComponent({ container, type, onClick }: ButtonProps) {
	const [isBookmarked, setIsBookmarked] = useState(false);

	const toggleBookmark = () => {
		setIsBookmarked(!isBookmarked);
	};

	switch (type) {
		case "ButtonBorder":
			return (
				<button
					className="border font-semibold border-neutral-900 rounded-xl py-2 px-6 hover:bg-blue-500 hover:border-blue-500 hover:text-white "
					onClick={onClick}
				>
					{container}
				</button>
			);
		case "ButtonBorderCustom":
			return (
				<button
					className="h-fit w-full p-3 border border-neutral-900 font-semibold rounded-xl hover:bg-blue-500 hover:border-blue-500"
					onClick={onClick}
				>
					{container}
				</button>
			);

		case "ButtonText":
			return (
				<button
					className="py-2 font-semibold hover:text-blue-500"
					onClick={onClick}
				>
					{container}
				</button>
			);

		case "ButtonSearch":
			return (
				<button
					className="h-fit w-fit p-3 border border-white font-semibold bg-blue-500 rounded-xl hover:bg-blue-500"
					onClick={onClick}
				>
					<Image src="/search.svg" alt="Search Icon" width={20} height={20} />
				</button>
			);
		case "ButtonFilled":
			return (
				<button
					className="h-fit w-fit p-3 border text-white border-white font-semibold bg-blue-500 rounded-xl hover:bg-blue-500"
					onClick={onClick}
				>
					{container}
				</button>
			);
		case "ButtonFilledCustom":
			return (
				<button
					className="h-fit w-full p-3 border text-white border-white font-semibold bg-blue-500 rounded-xl hover:bg-blue-500"
					onClick={onClick}
				>
					{container}
				</button>
			);
		case "ButtonBookmark":
			return (
				<button className="" onClick={toggleBookmark}>
					<Image
						src={
							isBookmarked
								? "/Bookmark_Fill_Icon.svg"
								: "/Bookmark_Line_Icon.svg"
						}
						alt={
							isBookmarked ? "Bookmark Filled Icon" : "Bookmark Unfilled Icon"
						}
						width={24}
						height={24}
					/>
				</button>
			);
		default:
			// This default case should catch any cases that aren't explicitly listed
			return (
				<button className="border rounded-xl py-2 px-4" onClick={onClick}>
					{container}
				</button>
			);
	}
}

export default ButtonComponent;
