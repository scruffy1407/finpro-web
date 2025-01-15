import React, { useEffect, useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { TabsContentProps } from "@/models/page.model";
import { UserApplication } from "@/utils/userApplication.utils";
import Cookies from "js-cookie";
import ApplicationHistoryCard, {
  ApplicationHistoryCardProps,
} from "@/components/ApplicationHistoryCard";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import LoadingLoader from "@/components/LoadingLoader";
import ListSkeleton from "@/components/listSkeleton";
import ApplicationCardSkeleton from "@/components/Skeleton/ApplicationCard";

interface statusProps extends TabsContentProps {
  activeTab: string;
}

function StatusTab({ value }: statusProps) {
  const userApplication = new UserApplication();
  const token = Cookies.get("accessToken");
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(true);
  const [listApplicant, setListApplicant] = useState<
    ApplicationHistoryCardProps[]
  >([]);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  async function fetchInReviewApplicant(
    limit: number = 6,
    offset: number = 0,
    token: string,
  ) {
    const response = await userApplication.fetchUserApplication(
      limit,
      offset,
      token,
      value,
    );

    const mappedData: ApplicationHistoryCardProps[] = [];
    response.data.map(
      (application: {
        application_id: string;
        application_status: string;
        created_at: string | number | Date;
        jobPost: { job_space: string; job_title: string; job_type: string };
        resume: string;
        expected_salary: number;
      }) => {
        mappedData.push({
          applicationId: application.application_id,
          status: application.application_status,
          applyDate: format(application.created_at, "dd, MMM yyyy"),
          jobSpace: application.jobPost.job_space,
          jobTitle: application.jobPost.job_title,
          jobType: application.jobPost.job_type,
          resumeLink: application.resume,
          expectedSalary: application.expected_salary,
        });
      },
    );

    setLoadMore(response.data.length < 6);
    setListApplicant([...listApplicant, ...mappedData]);
    if (initialLoading) {
      setInitialLoading(false);
    }
  }
  async function handleLoadMore() {
    if (token) {
      setIsLoading(true);
      await fetchInReviewApplicant(6, listApplicant.length - 1, token);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      fetchInReviewApplicant(6, 0, token);
    }
  }, [isLoggedIn]);

  return initialLoading ? (
    <ListSkeleton
      ListItemComponent={ApplicationCardSkeleton}
      numberItem={2}
      className={`flex flex-col gap-4`}
    />
  ) : (
    <TabsContent
      className={`flex flex-col gap-4 mt-0 data-[state=active]:flex data-[state=inactive]:hidden`}
      value={value}
    >
      <div className="flex flex-col gap-4 ">
        {listApplicant.map((applicant, key: number) => (
          <ApplicationHistoryCard
            key={key}
            applicationId={applicant.applicationId}
            status={applicant.status}
            applyDate={applicant.applyDate}
            jobSpace={applicant.jobSpace}
            jobType={applicant.jobType}
            jobTitle={applicant.jobTitle}
            expectedSalary={applicant.expectedSalary}
            resumeLink={applicant.resumeLink}
          />
        ))}
      </div>
      {loadMore ? (
        <div className={"flex flex-row gap-4 items-center"}>
          <div className={"h-[1px] bg-zinc-200 w-full"}></div>
          <p className={"text-xs text-neutral-400 text-center w-[35%]"}>
            End of the list
          </p>
          <div className={"h-[1px] bg-zinc-200 w-full"}></div>
        </div>
      ) : (
        <Button
          onClick={handleLoadMore}
          variant={"outline"}
          className={"w-fit mx-auto"}
          size={"sm"}
          disabled={isLoading}
        >
          {isLoading ? LoadingLoader() : "Load More"}
        </Button>
      )}
    </TabsContent>
  );
}

export default StatusTab;
