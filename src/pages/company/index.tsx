import React from "react";
import NavbarComponent from "@/components/NavbarComponent";
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
import { setCurrentPage } from "@/store/slices/companyPaginationSlice";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

const CompanyPage: React.FC = () => {
  const { currentPage, totalPages } = useSelector(
    (state: RootState) => state.companyPagination,
  );
  const dispatch = useDispatch();

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  return (
    <div className="mt-5 mx-4">
      <div className="flex flex-col w-full">
        <div>
          <NavbarComponent
            findJobs="Find Jobs"
            skillAssessment="Skill Assessment"
            exploreCompanies="Explore Companies"
            loginJobHunter="Login"
            loginCompanies="Login as Recruiter"
          />
        </div>

        <div>
          <HeroCompanyListComponent />
        </div>
        <div className="w-full mt-5 mb-10">
          <CompanyListMappingComponent />
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }
            >
              Previous
            </PaginationPrevious>

            {/* Page numbers */}
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            >
              Next
            </PaginationNext>
          </PaginationContent>
        </Pagination>
        <div className="mx-4 mt-20 mb-5">
          <FooterComponent />
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
