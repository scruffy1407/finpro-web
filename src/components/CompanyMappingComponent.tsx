import React from "react";
import CompanyComponent from "./CompanyComponent";
import { dummyCompanies } from "@/utils/datadummy";

function CompanyMappingComponent() {
  return (
    <div className="">
      <div className="max-w-screen-xl rounded-xl mx-auto overflow-x-auto flex gap-4 justify-start snap-x px-4 lg:hidden">
        {/* Map through dummyCompanies and render CompanyComponent for each company */}
        {dummyCompanies.map((company, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full rounded-xl sm:w-[410px] snap-start bg-white  hover:shadow-lg"
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
      <div className="hidden max-w-screen-xl mx-auto lg:grid grid-cols-4 gap-4 justify-center rounded-xl">
        {/* Map through dummyCompanies and render CompanyComponent for each company */}
        {dummyCompanies.slice(0, 8).map(
          (
            company,
            index, // Limit to 8 company for 2 rows of 4
          ) => (
            <div key={index} className="bg-white rounded-xl hover:shadow-lg">
              <CompanyComponent
                logo={company.logo}
                companyName={company.companyName}
                jobsOpen={company.jobsOpen}
              />
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default CompanyMappingComponent;
