import React, { useEffect, useState } from "react";
import JobPostComponent from "./JobPostComponent";
import { JobPostProps } from "@/utils/interface";
import { getJobNewLp } from "@/pages/api/api";
import {
  addBookmark,
  removeBookmark,
  fetchBookmarks,
} from "@/store/slices/bookmarkSlice";
import { AppDispatch } from "@/store";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

const JobPostSection: React.FC = () => {
  const [jobLpData, SetjobLpData] = useState<JobPostProps[]>([]);

  const bookmarks = useSelector(
    (state: RootState) => state.bookmarks.bookmarks
  );

  const dispatch: AppDispatch = useDispatch();

  async function handleFetchBookmark() {
    await dispatch(fetchBookmarks());
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getJobNewLp();
        console.log(response);

        const mappedData = response.map((job: any) => ({
          job_id: job.job_id,
          job_title: job.job_title,
          companyName: job.company.company_name || "Unknown",
          company_city: job.company.company_city || "Unknown",
          logo: job.logo || "/burger.svg",
          jobType: job.job_type ? [job.job_type] : [],
          jobSpace: job.job_space,
          created_at: job.created_at,
          salaryMin: parseInt(job.salary_min, 10),
          salaryMax: parseInt(job.salary_max, 10),
          salaryShow: job.salary_show,
          experienceMin: parseInt(job.job_experience_min),
          experienceMax: parseInt(job.job_experience_max),
        }));

        SetjobLpData(mappedData);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    fetchData();
    handleFetchBookmark();
  }, []);

  const handleToggleBookmark = async (jobPostId: number) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        console.error("Token is missing from cookies.");
        return;
      }

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

  return (
    <div className="max-w-screen-xl mx-auto overflow-x-auto flex gap-6 justify-start sm:justify-start snap-x sm:snap-none px-4 sm:px-0">
      {jobLpData && jobLpData.length > 0 ? (
        jobLpData.map((jobPost: JobPostProps, index: number) => {
          const isBookmarked = bookmarks.some(
            (bookmark) => bookmark.jobPostId === Number(jobPost.job_id)
          );
          return (
            <div
              key={index}
              className="flex-shrink-0 w-full sm:w-[410px] snap-start bg-white rounded-xl hover:shadow-lg"
            >
              <JobPostComponent
                logo={jobPost.logo}
                companyName={jobPost.companyName}
                job_title={jobPost.job_title}
                company_province={jobPost.company_province}
                jobType={jobPost.jobType}
                created_at={String(jobPost.created_at)}
                salaryMin={jobPost.salaryMin}
                salaryMax={jobPost.salaryMax}
                salaryShow={jobPost.salaryShow}
                experienceMin={jobPost.experienceMin}
                experienceMax={jobPost.experienceMax}
                jobSpace={jobPost.jobSpace}
                job_id={String(jobPost.job_id)}
                isBookmarked={isBookmarked}
                onAddBookmark={() =>
                  handleToggleBookmark(Number(jobPost.job_id))
                }
                onRemoveBookmark={() =>
                  handleToggleBookmark(Number(jobPost.job_id))
                }
                companyId={jobPost.companyId}
              />
            </div>
          );
        })
      ) : (
        <div>No job listings available</div>
      )}
    </div>
  );
};

export default JobPostSection;
