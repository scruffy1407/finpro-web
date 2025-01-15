import React, { useEffect, useState } from "react";
import CompanyComponent, { CompanyShortProps } from "./CompanyComponent";
import { CompanyUtils } from "@/utils/company.utils";
import ListSkeleton from "@/components/listSkeleton";
import CompanyCardSkeleton from "@/components/Skeleton/CompanyCard.skeleton";

function CompanyMappingComponent() {
  const companyUtls = new CompanyUtils();
  const [companyList, setCompanyList] = useState<CompanyShortProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function fetchCompany(
    companyName: string = "",
    companyCity: string = "",
  ) {
    setIsLoading(true);
    const response = await companyUtls.getCompanyList(
      companyName,
      companyCity,
      1,
      8,
    );
    const companyList: CompanyShortProps[] = [];
    response?.data?.listCompany.map(
      (company: {
        _count: {
          jobPost: number;
        };
        company_id: string;
        company_name: string;
        logo: string;
        jobsOpen: number;
        company_city: string;
        company_province: string;
      }) => {
        companyList.push({
          companyId: company.company_id,
          companyName: company.company_name,
          logo: company.logo,
          jobsOpen: company._count.jobPost,
          companyCity: company.company_city,
          companyProvince: company.company_province,
        });
      },
    );
    setCompanyList(companyList);
    // Update pagination state in Redux
    setIsLoading(false);
  }

  useEffect(() => {
    fetchCompany();
  }, []);

  return (
    <>
      {isLoading ? (
        <ListSkeleton
          ListItemComponent={CompanyCardSkeleton}
          numberItem={4}
          className={`rounded-xl overflow-x-auto grid grid-cols-1 gap-4 justify-start snap-x lg:hidden`}
        />
      ) : (
        <div className=" rounded-xl overflow-x-auto grid grid-cols-1 gap-4 justify-start snap-x lg:hidden">
          {/* Map through dummyCompanies and render CompanyComponent for each company */}
          {companyList.map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full rounded-xl sm:w-[410px] snap-start bg-white  hover:shadow-lg"
            >
              <CompanyComponent
                key={index}
                logo={company.logo}
                companyName={company.companyName}
                jobsOpen={company.jobsOpen}
                companyCity={company.companyCity}
                companyProvince={company.companyProvince}
                companyId={company.companyId}
              />
            </div>
          ))}
        </div>
      )}

      {isLoading ? (
        <ListSkeleton
          ListItemComponent={CompanyCardSkeleton}
          numberItem={4}
          className={`hidden lg:grid grid-cols-4 gap-4 rounded-xl`}
        />
      ) : (
        <div className="hidden lg:grid grid-cols-4 gap-4 rounded-xl">
          {companyList.slice(0, 8).map(
            (
              company,
              index, // Limit to 8 company for 2 rows of 4
            ) => (
              <div key={index} className="bg-white rounded-xl hover:shadow-lg">
                <CompanyComponent
                  logo={company.logo}
                  companyName={company.companyName}
                  jobsOpen={company.jobsOpen}
                  companyId={company.companyId}
                  companyProvince={company.companyProvince}
                  companyCity={company.companyCity}
                />
              </div>
            ),
          )}
        </div>
      )}
    </>
  );
}

export default CompanyMappingComponent;
