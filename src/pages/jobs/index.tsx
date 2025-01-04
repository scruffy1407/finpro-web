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
} from "@/components/ui/pagination";
import FooterComponent from "@/components/FooterComponent";
import {
  setCurrentPage,
  setPaginationData,
} from "@/store/slices/jobPaginationSlice";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { useState } from "react";
import { getJobPost } from "../api/api";
import { AuthHandler } from "@/utils/auth.utils";
import { addBookmark, removeBookmark, fetchBookmarks } from "@/store/slices/bookmarkSlice";
import Cookies from "js-cookie";
import axios from "axios";

const JobPostPage: React.FC = () => {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser("jobhunter");

  const [jobPosts, setJobPosts] = useState<any[]>([]);

  const bookmarks = useSelector(
    (state: RootState) => state.bookmarks.bookmarks
  );

  const { currentPage, totalPages } = useSelector(
    (state: RootState) => state.pagination
  );
  const { jobTitle, categoryId, jobType, dateRange, sortOrder, companyCity } =
    useSelector((state: RootState) => state.searchQuery);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchBookmarks());
      const response = await getJobPost(currentPage, {
        jobTitle,
        categoryId,
        jobType,
        dateRange,
        sortOrder,
        companyCity,
      });
      if (response?.data?.data) {
        setJobPosts(response.data.data);
        const { totalJobPosts, totalPages } = response.data;
        dispatch(setPaginationData({ totalJobPosts, totalPages }));
      }
    };
    fetchData();
  }, [
    dispatch,
    currentPage,
    jobTitle,
    categoryId,
    jobType,
    dateRange,
    sortOrder,
    companyCity,
  ]);

  const handleToggleBookmark = async (jobPostId: number) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        console.error("Token is missing from cookies.");
        return;
      }

      // Check if job is already bookmarked
      const existingBookmark = bookmarks.find(
        (bookmark) => bookmark.jobPostId === jobPostId
      );

      if (existingBookmark) {
        await axios.post(
          "http://localhost:8000/applyjob/bookmark/remove",
          { wishlist_id: existingBookmark.wishlist_id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(removeBookmark(existingBookmark.wishlist_id));
      } else {
        const response = await axios.post(
          "http://localhost:8000/applyjob/bookmark",
          { jobPostId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(addBookmark(response.data.bookmark));
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

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
          <HeroJobListPageComponent />
        </div>

        <div className="w-full mt-4">
          <SelectionJobsComponents />
        </div>

        <div className="w-full mt-5 mb-10">
          <JobListMappingComponent
            jobPosts={jobPosts}
			bookmarkedJobs={bookmarks.map((bookmark) => ({
				...bookmark,
				job_id: bookmark.jobPostId,
			  }))}
            onAddBookmark={handleToggleBookmark}
            onRemoveBookmark={handleToggleBookmark}
          />
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
