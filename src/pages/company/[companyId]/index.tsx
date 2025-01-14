import React, { useEffect, useState } from "react";
import FooterComponent from "@/components/FooterComponent";
import CompanyHighlight from "@/components/CompanyPageComponents/CompanyHighlight";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyInfoTab from "@/components/Tabs/CompanyDetail/CompanyInfoTab";
import JobListTab from "@/components/Tabs/CompanyDetail/JobsListTab";
import ReviewTab from "@/components/Tabs/CompanyDetail/ReviewTab";
import { useRouter } from "next/router";
import { CompanyUtils } from "@/utils/company.utils";
import {
  companyDetailResponse,
  JobPost,
  reviewResponse,
} from "@/models/company.model";
import SectionSkeleton from "@/components/Skeleton/CompanyDetailPage.skeleton";
import { AuthHandler } from "@/utils/auth.utils";
import { Navbar } from "@/components/NavigationBar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  addBookmark,
  removeBookmark,
  setBookmarks,
} from "@/store/slices/bookmarkSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

function CompanyPage() {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser();
  const { user_role } = useSelector((state: RootState) => state.auth);
  const companyUtils = new CompanyUtils();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const companyId = router.query.companyId;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [companyInfo, setCompanyInfo] = useState<companyDetailResponse>();
  const [jobList, setJobList] = useState<JobPost[]>([]);
  const [reviewList, setReviewList] = useState<reviewResponse[]>([]);
  const [avgReview, setAvgReview] = useState<number>(0);

  const bookmarks = useSelector(
    (state: RootState) => state.bookmarks.bookmarks,
  );

  const calculateAverageRating = (reviews: reviewResponse[]) => {
    if (reviews.length === 0) return 0;
    const totalRatings = reviews.reduce(
      (acc, review) =>
        acc +
        review.careerPathRating +
        review.culturalRating +
        review.facilityRating +
        review.workLifeBalanceRating,
      0,
    );
    return Number((totalRatings / (reviews.length * 4)).toFixed(2));
  };

  const handleFetchingData = async () => {
    setIsLoading(true);
    try {
      const response = await companyUtils.getCompanyPageDetail(
        Number(companyId),
      );
      const companyDetail: companyDetailResponse = response.data;

      setCompanyInfo(companyDetail);
      setJobList(companyDetail.listJob);
      setReviewList(companyDetail.listReview);
      setAvgReview(calculateAverageRating(companyDetail.listReview));
    } catch (error) {
      console.error("Failed to fetch company data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) return;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/applyjob/bookmark`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const jobWishlist = response.data.bookmarks?.jobWishlist || [];
      dispatch(setBookmarks(jobWishlist));
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
    }
  };

  const handleToggleBookmark = async (jobPostId: number) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        toast.error("You need to be logged in to add bookmark");
        return;
      }
      if (user_role !== "jobhunter") {
        toast.error("Please login as Job Hunter to add bookmark");
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

  useEffect(() => {
    if (companyId) {
      handleFetchingData();
      fetchBookmarks();
    }
  }, [companyId]);

  return (
    <div className="max-w-screen-xl mx-auto">
      <Navbar pageRole="jobhunter" />

      {isLoading ? (
        <SectionSkeleton />
      ) : (
        <section className="w-full flex flex-col gap-4 md:flex-row md:gap-6 px-4 mt-4">
          <CompanyHighlight
            logo={companyInfo?.logo || ""}
            companyName={companyInfo?.companyName || ""}
            companyIndustry={companyInfo?.companyIndustry || ""}
            ratingScore={avgReview}
            ratingAmount={reviewList.length}
            companyId={Number(companyId)}
          />

          <Tabs
            className="w-full flex flex-col gap-4"
            defaultValue="companyInfo"
          >
            <TabsList className="w-full rounded-2xl bg-white py-4 px-4 h-fit justify-start gap-4">
              <TabsTrigger
                className="px-4 py-2 rounded-2xl border data-[state=active]:bg-sky-50 data-[state=active]:border-blue-600"
                value="companyInfo"
              >
                Company Information
              </TabsTrigger>
              <TabsTrigger
                className="px-4 py-2 rounded-2xl border data-[state=active]:bg-sky-50 data-[state=active]:border-blue-600"
                value="jobs"
              >
                Jobs
              </TabsTrigger>
              <TabsTrigger
                className="px-4 py-2 rounded-2xl border data-[state=active]:bg-sky-50 data-[state=active]:border-blue-600"
                value="review"
              >
                Review
              </TabsTrigger>
            </TabsList>

            <CompanyInfoTab
              value="companyInfo"
              data={companyInfo}
              totalJob={companyInfo?.listJob.length as number}
              lastPostJob={jobList[0]?.created_at as string}
            />
            <JobListTab
              value="jobs"
              data={jobList.map((job) => ({
                ...job,
                isBookmarked: bookmarks.some(
                  (bookmark) => bookmark.jobPostId === job.job_id,
                ),
              }))}
              companyName={companyInfo?.companyName || ""}
              companyLogo={companyInfo?.logo || ""}
              companyProvince={companyInfo?.companyProvince || ""}
              isLoading={isLoading}
              onAddBookmark={handleToggleBookmark}
              onRemoveBookmark={handleToggleBookmark}
            />

            <ReviewTab value="review" data={reviewList} isLoading={isLoading} />
          </Tabs>
        </section>
      )}

      <div className="mx-4 mt-20 mb-5">
        <FooterComponent pageRole={"jobhunter"} />
      </div>
    </div>
  );
}

export default CompanyPage;
