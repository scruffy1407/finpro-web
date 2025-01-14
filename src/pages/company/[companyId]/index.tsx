import React, { useEffect, useState } from "react";
import NavbarComponent from "@/components/NavbarComponent";
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

function CompanyPage() {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser();
  const companyUtils = new CompanyUtils();

  const router = useRouter();
  const companyId = router.query.companyId;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [companyInfo, setCompanyInfo] = useState<companyDetailResponse>();
  const [jobList, setJobList] = useState<JobPost[]>([]);
  const [reviewList, setReviewList] = useState<reviewResponse[]>([]);
  const [avgReview, setAvgReview] = useState<number>(0);

  const calculateAverageRating = (reviews: reviewResponse[]) => {
    // Extract the ratings for each review
    const totalReviews = reviews.length;
    if (totalReviews === 0) return 0; // If no reviews, return 0
    const sum = reviews.reduce((acc, review) => {
      return (
        acc +
        review.careerPathRating +
        review.culturalRating +
        review.facilityRating +
        review.workLifeBalanceRating
      );
    }, 0);

    // Return the average rating
    return Number((sum / (totalReviews * 4)).toFixed(2)); // 4 ratings per review
  };
  async function handleFetchingData() {
    setIsLoading(true);
    try {
      const response = await companyUtils.getCompanyPageDetail(
        Number(companyId),
      );

      const companyDetail: companyDetailResponse = response.data;

      // SET COMPANY INFO
      setCompanyInfo(companyDetail);
      setJobList(companyDetail.listJob);
      setReviewList(companyDetail.listReview);
      setAvgReview(calculateAverageRating(companyDetail.listReview));
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (companyId) {
      handleFetchingData();
    }
  }, [router.query]);

  return (
    <div className="max-w-screen-xl mx-auto">
      <Navbar pageRole={"jobhunter"} />

      {isLoading ? (
        <SectionSkeleton />
      ) : (
        <section className="w-full flex flex-col gap-4 md:flex-row md:gap-6 md:max-w-screen-xl md:mx-auto px-4 mt-4">
          <CompanyHighlight
            logo={companyInfo?.logo as string}
            companyName={companyInfo?.companyName as string}
            companyIndustry={companyInfo?.companyIndustry as string}
            ratingScore={avgReview}
            ratingAmount={companyInfo?.listReview.length as number}
            companyId={Number(companyId)}
          />

          <Tabs
            className={`w-full flex flex-col gap-4`}
            defaultValue="companyInfo"
          >
            <TabsList
              className={`w-full rounded-2xl bg-white py-4 px-4 h-fit justify-start gap-4 `}
            >
              <TabsTrigger
                className={
                  "px-4 py-2 rounded-2xl border data-[state=active]:bg-sky-50 data-[state=active]:border-blue-600"
                }
                value="companyInfo"
              >
                Company Information
              </TabsTrigger>
              <TabsTrigger
                className={
                  "px-4 py-2 rounded-2xl border data-[state=active]:bg-sky-50 data-[state=active]:border-blue-600"
                }
                value="jobs"
              >
                Jobs
              </TabsTrigger>
              <TabsTrigger
                className={
                  "px-4 py-2 rounded-2xl border data-[state=active]:bg-sky-50 data-[state=active]:border-blue-600"
                }
                value="review"
              >
                Review
              </TabsTrigger>
            </TabsList>
            <CompanyInfoTab
              value={`companyInfo`}
              data={companyInfo}
              totalJob={companyInfo?.listJob.length as number}
              lastPostJob={jobList[0]?.created_at as string}
            />
            <JobListTab
              value={"jobs"}
              data={jobList}
              companyName={companyInfo?.companyName as string}
              companyLogo={companyInfo?.logo as string}
              companyProvince={companyInfo?.companyProvince as string}
              isLoading={isLoading}
            />
            <ReviewTab
              value={"review"}
              data={reviewList}
              isLoading={isLoading}
            />
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
