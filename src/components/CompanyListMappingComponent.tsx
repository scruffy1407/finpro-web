import React from "react";
import CompanyComponent, { CompanyShortProps } from "./CompanyComponent";

interface CompanyListProps {
  companies: CompanyShortProps[];
}

function CompanyListMappingComponent({ companies }: CompanyListProps) {
  return companies.length === 0 ? (
    <div className={"mx-auto"}>No Companies found</div>
  ) : (
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
