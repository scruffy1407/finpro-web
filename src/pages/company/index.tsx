import React, { useEffect, useState } from "react";
import HeroCompanyListComponent from "@/components/HeroCompanyListComponent";
import CompanyListMappingComponent from "@/components/CompanyListMappingComponent";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // Shadcn UI pagination
import FooterComponent from "@/components/FooterComponent";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { CompanyUtils } from "@/utils/company.utils";
import {
  resetPaginationState,
  setCurrentPage,
  setPaginationData,
} from "@/store/slices/companySearchSlice";
import { CompanyShortProps } from "@/components/CompanyComponent";
import { Navbar } from "@/components/NavigationBar/Navbar";
import ListSkeleton from "@/components/listSkeleton";
import CompanyCardSkeleton from "@/components/Skeleton/CompanyCard.skeleton";

const CompanyPage: React.FC = () => {
  const companyUtls = new CompanyUtils();
  const { companyName, companyCity } = useSelector(
    (state: RootState) => state.companySearch,
  );
  const { pagination } = useSelector((state: RootState) => state.companySearch);
  const [companyList, setCompanyList] = useState<CompanyShortProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  async function fetchCompany(
    currentPage: number = 1,
    companyName: string = "",
    companyCity: string = "",
  ) {
    setIsLoading(true);
    const response = await companyUtls.getCompanyList(
      companyName,
      companyCity,
      currentPage,
    );
    const companyList: CompanyShortProps[] = [];
    response.data.listCompany.map((company: any) => {
      companyList.push({
        companyId: company.company_id,
        companyName: company.company_name,
        logo: company.logo,
        jobsOpen: company._count.jobPost,
        companyCity: company.company_city,
        companyProvince: company.company_province,
      });
    });
    setCompanyList(companyList);
    // Update pagination state in Redux
    const { totalJobPosts, totalPages } = response.data;
    dispatch(setPaginationData({ totalJobPosts, totalPages }));
    setIsLoading(false);
  }

  console.log(companyList);

  async function handleSearch() {
    console.log("COMPANY CITY", companyCity);
    await fetchCompany(1, companyName, companyCity);
    dispatch(resetPaginationState());
  }

  useEffect(() => {
    fetchCompany(pagination.currentPage || 1);
  }, [pagination.currentPage]);

  return (
    <div className="mt-5 mx-4">
      <div className="flex flex-col w-full">
        <div>
          <Navbar pageRole={"jobhunter"} />
        </div>
        <HeroCompanyListComponent handleSearch={handleSearch} />

        <div className="w-full mt-5 mb-10">
          {isLoading ? (
            <ListSkeleton
              ListItemComponent={CompanyCardSkeleton}
              className={
                "max-w-screen-xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4"
              }
              numberItem={12}
            />
          ) : (
            <CompanyListMappingComponent companies={companyList} />
          )}
        </div>
        {isLoading ? null : (
          <Pagination>
            <PaginationContent>
              <PaginationPrevious
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                className={
                  pagination.currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              >
                Previous
              </PaginationPrevious>

              {/* Page numbers */}
              {[...Array(pagination.totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    isActive={pagination.currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationNext
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                className={
                  pagination.currentPage === pagination.totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              >
                Next
              </PaginationNext>
            </PaginationContent>
          </Pagination>
        )}
        <div className="mx-4 mt-20 mb-5">
          <FooterComponent pageRole={"jobhunter"} />
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
