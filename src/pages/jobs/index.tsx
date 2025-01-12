import React, { useEffect } from "react";
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
import { Navbar } from "@/components/NavigationBar/Navbar";
import { AuthHandler } from "@/utils/auth.utils";
import ListSkeleton from "@/components/listSkeleton";
import JobPostComponentSkeleton from "@/components/JobPostSkeleton";
import {
  addBookmark,
  removeBookmark,
  setBookmarks,
  fetchBookmarks,
} from "@/store/slices/bookmarkSlice";
import Cookies from "js-cookie";
import axios from "axios";
import VerifyBanner from "@/components/VerifyBanner";

const JobPostPage: React.FC = () => {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser();

  const [jobPosts, setJobPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const bookmarks = useSelector(
    (state: RootState) => state.bookmarks.bookmarks,
  );
  const { currentPage, totalPages } = useSelector(
    (state: RootState) => state.pagination,
  );
  const { jobTitle, categoryId, jobType, dateRange, sortOrder, companyCity } =
    useSelector((state: RootState) => state.searchQuery);
  const { isVerified, isLoggedIn } = useSelector(
    (state: RootState) => state.auth,
  );

  const dispatch: AppDispatch = useDispatch();

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
        if (response?.data?.data) {
          setJobPosts(response.data.data);
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

    const fetchBookmarks = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) {
          console.error("Token is missing from cookies.");
          return;
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/applyjob/bookmark`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const jobWishlist = response.data.bookmarks?.jobWishlist || [];
        dispatch(setBookmarks(jobWishlist));
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      }
    };

    fetchJobPosts();
    fetchBookmarks();
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

  const handleToggleBookmark = async (jobPostId: number) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        console.error("Token is missing from cookies.");
        return;
      }
      const existingBookmark = bookmarks.find(
        (bookmark) => bookmark.jobPostId === jobPostId,
      );

      if (existingBookmark) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/applyjob/bookmark/remove`,
          { wishlist_id: existingBookmark.wishlist_id },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        dispatch(removeBookmark(existingBookmark.wishlist_id));
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/applyjob/bookmark`,
          { jobPostId },
          { headers: { Authorization: `Bearer ${token}` } },
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
    <main>
      <Navbar pageRole={"jobhunter"} />

      {isLoggedIn && !isVerified && <VerifyBanner />}
      <section
        className={`flex flex-col gap-10 px-4 max-w-screen-xl mx-auto ${!isVerified && isLoggedIn ? "mt-0" : "mt-5"}`}
      >
        <div className={"flex flex-col gap-4"}>
          <HeroJobListPageComponent />
          <SelectionJobsComponents />
        </div>
        <div className={"flex flex-col gap-8"}>
          {loading ? (
            <ListSkeleton
              ListItemComponent={JobPostComponentSkeleton}
              numberItem={16}
              className={"gap-6 grid grid-cols-3"}
            />
          ) : (
            <JobListMappingComponent
              jobPosts={jobPosts}
              bookmarkedJobs={bookmarks.map((bookmark) => ({
                ...bookmark,
                job_id: bookmark.jobPostId,
              }))}
              onAddBookmark={handleToggleBookmark}
              onRemoveBookmark={handleToggleBookmark}
            />
          )}

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
        </div>

        <FooterComponent pageRole={"jobhunter"} />
      </section>
    </main>
  );
};

export default JobPostPage;
