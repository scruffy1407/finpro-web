import React, { useEffect, useState } from "react";
import HeadingComponent from "@/components/HeadingComponent";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { getNearestJob } from "@/pages/api/api";
import { JobPostProps } from "@/utils/interface";
import JobPostComponent from "@/components/JobPostComponent";
import axios from "axios";
import {
  addBookmark,
  fetchBookmarks,
  removeBookmark,
} from "@/store/slices/bookmarkSlice";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import ListSkeleton from "@/components/listSkeleton";
import JobPostComponentSkeleton from "@/components/JobPostSkeleton";
import { toast } from "sonner";

interface NearestProps {
  hasLocation: boolean;
}

enum JobType {
  fulltime = "Full Time",
  freelance = "Freelance",
  internship = "Internship",
}

enum JobSpace {
  remoteworking = "Remote Working",
  onoffice = "On Office",
  hybrid = "Hybrid",
}

function NearestJobSection({ hasLocation }: NearestProps) {
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [jobList, setJobList] = useState<JobPostProps[]>([]);
  const bookmarks = useSelector(
    (state: RootState) => state.bookmarks.bookmarks
  );
  const { user_role } = useSelector((state: RootState) => state.auth);

  const handleToggleBookmark = async (jobPostId: number) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        console.error("Token is missing from cookies.");
        return;
      }
      if (user_role !== "jobhunter") {
        toast.error("Please login as Job Hunter to add bookmark");
        return;
      }

      const existingBookmark = bookmarks.find(
        (bookmark) => bookmark.jobPostId === jobPostId
      );

      if (existingBookmark) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/applyjob/bookmark/remove`,
          { wishlist_id: existingBookmark.wishlist_id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(removeBookmark(existingBookmark.wishlist_id));
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/applyjob/bookmark`,
          { jobPostId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(addBookmark(response.data.bookmark));
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

  async function handleFetchBookmark() {
    await dispatch(fetchBookmarks());
  }

  async function fetchNearestJobs() {
    const lastLocation = Cookies.get("last_user_location");
    if (!lastLocation) {
      return;
    }
    try {
      setIsLoading(true);
      // Parse JSON string from the API response
      const location = JSON.parse(lastLocation);
      const response = await getNearestJob(location?.lat, location?.lng);
      const mappedData = response?.data.map((job: any) => ({
        job_id: job.job_id,
        job_title: job.job_title,
        companyName: job.company.company_name || "Undisclosed Name",
        company_city: job.company.company_city || "Undisclosed Location",
        company_province:
          job.company.company_province || "Undisclosed Location",
        logo: job.company.logo,
        jobType: job.job_type
          ? [JobType[job.job_type as keyof typeof JobType]]
          : [],
        jobSpace: JobSpace[job.job_space as keyof typeof JobSpace],
        created_at: job.created_at,
        salaryMin: job.salary_min,
        salaryMax: job.salary_max,
        salaryShow: job.salary_show,
        experienceMin: job.job_experience_min,
        experienceMax: job.job_experience_max,
      }))
      setJobList(mappedData);
      setIsLoading(false);
    } catch (e) {}
  }

  useEffect(() => {
    if (hasLocation) {
      fetchNearestJobs();
      handleFetchBookmark();
    }
  }, [hasLocation]);

  return hasLocation ? (
    <section className={`w-full flex flex-col gap-5`}>
      <HeadingComponent
        heading="Jobs Near you"
        paragraph="Explore our partner companies and discover exciting job openings available for you right now."
        onClick={() => router.push("/jobs")}
      />

      <div className="overflow-x-auto flex gap-6 px-4 justify-start snap-x sm:justify-start sm:snap-none sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <ListSkeleton
            ListItemComponent={JobPostComponentSkeleton}
            numberItem={3}
            setShrink={true}
            className={"flex gap-5"}
          />
        ) : jobList && jobList.length > 0 ? (
          jobList.map((jobPost: JobPostProps, index: number) => {
            const isBookmarked = bookmarks.some(
              (bookmark) => bookmark.jobPostId === Number(jobPost.job_id)
            );
            return (
              <div
                key={index}
                className="flex-shrink-0 w-[410px] snap-start bg-white rounded-xl hover:shadow-lg  md:w-full"
              >
                <JobPostComponent
                  logo={jobPost.logo}
                  companyName={jobPost.companyName}
                  job_title={jobPost.job_title}
                  company_province={jobPost.company_city}
                  jobType={jobPost.jobType}
                  created_at={String(jobPost.created_at)}
                  salaryMin={jobPost.salaryMin}
                  salaryMax={jobPost.salaryMax}
                  salaryShow={jobPost.salaryShow}
                  experienceMin={jobPost.experienceMin}
                  experienceMax={jobPost.experienceMax}
                  jobSpace={jobPost.jobSpace}
                  job_id={String(jobPost.job_id)}
                  companyId={jobPost.companyId}
                  isBookmarked={isBookmarked}
                  onAddBookmark={() =>
                    handleToggleBookmark(Number(jobPost.job_id))
                  }
                  onRemoveBookmark={() =>
                    handleToggleBookmark(Number(jobPost.job_id))
                  }
                />
              </div>
            );
          })
        ) : (
          <div>No job listings available</div>
        )}

        {}
      </div>
    </section>
  ) : null;
}

export default NearestJobSection;
