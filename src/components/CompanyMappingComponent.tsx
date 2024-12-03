import React from "react";
import CompanyComponent from "./CompanyComponent";
import { dummyCompanies } from "@/utils/datadummy";

function CompanyMappingComponent() {
	return (
		<div>
			<div className="max-w-screen-xl mx-auto overflow-x-auto flex gap-4 justify-start snap-x px-4 md:hidden">
				{/* Map through dummyCompanies and render CompanyComponent for each company */}
				{dummyCompanies.map((company, index) => (
					<div
						key={index}
						className="flex-shrink-0 w-full sm:w-[410px] snap-start bg-white rounded-xl hover:shadow-lg"
					>
						<CompanyComponent
							key={index}
							logo={company.logo}
							companyName={company.companyName}
							jobsOpen={company.jobsOpen}
						/>
					</div>
				))}
			</div>

			<div className="hidden max-w-screen-xl mx-auto md:flex flex-wrap gap-4 justify-center">
				{/* Map through dummyCompanies and render CompanyComponent for each company */}
				{dummyCompanies.map((company, index) => (
					<CompanyComponent
						key={index}
						logo={company.logo}
						companyName={company.companyName}
						jobsOpen={company.jobsOpen}
					/>
				))}
			</div>
		</div>
	);
}

export default CompanyMappingComponent;
