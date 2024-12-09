import React from "react";
import SearchBarCompanyListComponent from "./SearchBarCompanyListComponent";

function HeroCompanyListComponent() {
	return (
		<div className="max-w-screen-xl mx-auto bg-white mt-5 rounded-xl px-4 md:px-0">
			<div className="flex justify-between">
				<div className="flex flex-col md:pl-8 py-6 md:gap-11 w-[100%] ">
					<h1 className="font-bold text-2xl md:text-4xl ">Explore Companies</h1>
					<div className="w-full">
						<SearchBarCompanyListComponent />
					</div>
				</div>
			</div>
		</div>
	);
}

export default HeroCompanyListComponent;
