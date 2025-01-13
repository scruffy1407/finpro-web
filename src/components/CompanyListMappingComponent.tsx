import React from "react";
import CompanyComponent, { CompanyShortProps } from "./CompanyComponent";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { CompanyListPostDummy } from "@/utils/datadummy";

interface CompanyListProps {
  companies: CompanyShortProps[];
}

function CompanyListMappingComponent({ companies }: CompanyListProps) {
  // Get pagination state from Redux
  const { currentPage, companiesPerPage } = useSelector(
    (state: RootState) => state.companyPagination,
  );

  // Calculate the index of the first and last job to display
  const indexOfLastJob = currentPage * companiesPerPage;
  const indexOfFirstJob = indexOfLastJob - companiesPerPage;

  // Slice the jobListPostDummy array based on the current page and jobsPerPage
  const currentCompanies = CompanyListPostDummy.slice(
    indexOfFirstJob,
    indexOfLastJob,
  );

  return (
    <div
      className={
        "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4"
      }
    >
      {/* Map through dummyCompanies and render CompanyComponent for each company */}
      {companies.map((company, index) => (
        <CompanyComponent
          companyId={company.companyId}
          key={index}
          logo={company.logo}
          companyName={company.companyName}
          jobsOpen={company.jobsOpen}
          companyProvince={company.companyProvince}
          companyCity={company.companyCity}
        />
      ))}
    </div>
  );
}

export default CompanyListMappingComponent;
