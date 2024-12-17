import React from "react";
import CompanyComponent from "./CompanyComponent";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { CompanyListPostDummy } from "@/utils/datadummy";

function CompanyListMappingComponent() {
  // Get pagination state from Redux
  const { currentPage, companiesPerPage } = useSelector(
    (state: RootState) => state.companyPagination,
  );

  // Calculate the index of the first and last job to display
  const indexOfLastJob = currentPage * companiesPerPage;
  const indexOfFirstJob = indexOfLastJob - companiesPerPage;

  // Slice the jobListPostDummy array based on the current page and jobsPerPage
  // const currentJobs = 0
  const currentCompanies = CompanyListPostDummy.slice(
    indexOfFirstJob,
    indexOfLastJob,
  );

  return (
    <div className="">
      <div className="max-w-screen-xl rounded-xl mx-auto flex flex-col gap-4 items-center px-4 lg:hidden">
        {/* Map through dummyCompanies and render CompanyComponent for each company */}
        {currentCompanies.map((company, index) => (
          <div
            key={index}
            className="flex w-full rounded-xl sm:w-[410px] bg-white  hover:shadow-lg"
          >
            <CompanyComponent
              key={index}
              logo={company.logo}
              companyName={company.companyName}
            />
          </div>
        ))}
      </div>
      <div className="hidden max-w-screen-xl mx-auto lg:grid grid-cols-4 gap-4 justify-center rounded-xl">
        {/* Map through currentCompanies and render CompanyComponent for each company */}
        {currentCompanies.map(
          (
            company,
            index, // Limit to 8 company for 2 rows of 4
          ) => (
            <div key={index} className="bg-white rounded-xl hover:shadow-lg">
              <CompanyComponent
                logo={company.logo}
                companyName={company.companyName}
              />
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default CompanyListMappingComponent;
