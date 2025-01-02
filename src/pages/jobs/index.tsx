import React, { useEffect } from "react";
import NavbarComponent from "@/components/NavbarComponent";
import HeroJobListPageComponent from "@/components/HeroJobListPageComponent";
import SelectionJobsComponents from "@/components/SelectionJobsComponent";
import JobListMappingComponent from "@/components/JobListMappingComponent";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // Shadcn UI pagination
import FooterComponent from "@/components/FooterComponent";
import {
  setCurrentPage,
  setPaginationData,
} from "@/store/slices/jobPaginationSlice";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getJobPost } from "../api/api";
import { Navbar } from "@/components/NavigationBar/Navbar";
import { AuthHandler } from "@/utils/auth.utils";
import ListSkeleton from "@/components/listSkeleton";
import JobPostComponentSkeleton from "@/components/JobPostSkeleton";

const JobPostPage: React.FC = () => {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser();

  const [jobPosts, setJobPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { currentPage, totalPages } = useSelector(
    (state: RootState) => state.pagination,
  );
  const { jobTitle, categoryId, jobType, dateRange, sortOrder, companyCity } =
    useSelector((state: RootState) => state.searchQuery); // Access searchQuery from the store

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobPosts = async () => {
      setLoading(true);
      try {
        const response = await getJobPost(currentPage, {
          jobTitle,
          categoryId,
          jobType,
          dateRange,
          sortOrder,
          companyCity,
        });

        // Check if response is valid and set job posts
        if (response?.data?.data) {
          setJobPosts(response.data.data);

          // Update pagination state in Redux
          const { totalJobPosts, totalPages } = response.data;
          dispatch(setPaginationData({ totalJobPosts, totalPages }));
        } else {
          console.error("Invalid job posts data:", response);
        }
      } catch (error) {
        console.error("Error fetching job posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobPosts();
  }, [
    currentPage,
    jobTitle,
    categoryId,
    jobType,
    dateRange,
    sortOrder,
    companyCity,
    dispatch,
  ]);

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
          <Navbar />
        </div>

        <div>
          <HeroJobListPageComponent />
        </div>

        <div className="w-full mt-4">
          <SelectionJobsComponents />
        </div>

        <div className="w-full mt-5 mb-10">
          {loading ? (
            <ListSkeleton
              ListItemComponent={JobPostComponentSkeleton}
              numberItem={16}
              className={"max-w-screen-xl mx-auto gap-6 grid grid-cols-3"}
            />
          ) : (
            <JobListMappingComponent jobPosts={jobPosts} />
          )}
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

export default JobPostPage;
