import React, { useEffect, useRef, useState } from "react";
import { CompanyUtils } from "@/utils/company.utils";
import Cookies from "js-cookie";
import LoadingLoader from "@/components/LoadingLoader";
import Image from "next/image";
import { calculateAge } from "@/utils/formater.utils";
import { WorkingExperience } from "@/store/slices/WorkingExpSlice";
import WorkingHistoryProfileItem from "@/components/Profile/JobHunter/WorkingHistoryProfileItem";
import { Education } from "@/store/slices/EducationSlice";
import EducationProfileItem from "@/components/Profile/JobHunter/EducationProfileItem";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { format } from "date-fns";

interface ProfileDetailData {
  name: string;
  dob: string;
  gender: string;
  email: string;
  photo: string;
  locationCity: string;
  locationProvince: string;
  summary: string | null;
  workingHistoryList: WorkingExperience[];
  education: Education[];
}

interface ProfileDetailProps {
  applicantId: number;
}

function ProfileDetail({ applicantId }: ProfileDetailProps) {
  const companyUtils = new CompanyUtils();
  const token = Cookies.get("accessToken");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialRender = useRef<boolean>(true);

  const [detailUser, setDetailUser] = useState<ProfileDetailData>({
    name: "",
    dob: "",
    email: "",
    gender: "",
    locationCity: "",
    locationProvince: "",
    photo: "",
    summary: "",
    workingHistoryList: [],
    education: [],
  });
  async function fetchDetailApplicant() {
    setIsLoading(true);
    const response = await companyUtils.getApplicantDetail(
      applicantId,
      token as string,
    );
    if (response.success) {
      console.log("RESPONSE", response.data.data);
      const detailUser = response?.data?.data;

      const setList: WorkingExperience[] = detailUser?.workExperience.map(
        (workExp: {
          company_name: string;
          start_date: string;
          end_date: string;
          job_title: string;
          job_description: string;
        }) => ({
          companyName: workExp.company_name,
          startDate: workExp.start_date,
          endDate: workExp.end_date,
          jobTitle: workExp.job_title,
          jobDescription: workExp.job_description,
        }),
      );
      const setEducationList: Education[] = detailUser?.education.map(
        (edu: {
          education_name: string;
          education_degree: string;
          graduation_date: string;
          cumulative_gpa: number;
        }) => ({
          educationName: edu.education_name,
          education_degree: edu.education_degree,
          educationDate: edu.graduation_date,
          cumulativeGpa: edu.cumulative_gpa,
        }),
      );
      setDetailUser({
        name: detailUser?.name,
        dob: detailUser?.dob,
        gender: detailUser?.gender,
        email: detailUser?.email,
        photo: detailUser?.photo,
        locationCity: detailUser?.location_city || "",
        locationProvince: detailUser?.location_province || "",
        summary: detailUser?.summary,
        workingHistoryList: setList,
        education: setEducationList,
      });
      setIsLoading(false);
    } else {
      console.log(response);
      setIsLoading(false);
    }
  }
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  console.log("DETAIL", detailUser);

  useEffect(() => {
    if (!initialRender.current) {
      fetchDetailApplicant();
    }
    initialRender.current = false;
  }, []);

  const handleSeeMoreClick = () => {
    setIsSummaryExpanded(!isSummaryExpanded);
  };

  return isLoading ? (
    <div className={"w-full h-10 flex items-center justify-center"}>
      <LoadingLoader />
    </div>
  ) : (
    <section className={"flex flex-col gap-5"}>
      <div className={"flex gap-4 items-center p-4 bg-neutral-50 rounded-xl"}>
        <Image
          src={detailUser.photo}
          alt={`photo-${detailUser.name}`}
          width={"125"}
          height={"125"}
          className={"w-20 h-20 object-cover rounded-full"}
        />
        <div>
          <h3 className={"text-lg font-bold text-neutral-950"}>
            {detailUser.name}
          </h3>
          <p className={"text-sm text-neutral-600 mb-2"}>{detailUser.email}</p>
        </div>
      </div>
      <div className={"flex gap-2 flex-wrap"}>
        <div
          className={
            "px-2 py-1 text-sm text-neutral-600 bg-neutral-50 rounded-full"
          }
        >
          {detailUser.gender}
        </div>
        <div
          className={
            "px-4 py-1 text-sm text-neutral-600 bg-neutral-50 rounded-full"
          }
        >
          {calculateAge(detailUser.dob)} y.o
        </div>
        <div
          className={
            "px-4 py-1 text-sm text-neutral-600 bg-neutral-50 rounded-full"
          }
        >
          {detailUser.locationCity}, {detailUser.locationProvince}
        </div>
      </div>
      <div className={"flex flex-col gap-2"}>
        <h4 className={"font-bold text-neutral-950"}>Profile Summary</h4>
        <p
          className={`text-sm text-neutral-600 ${
            isSummaryExpanded ? "line-clamp-none" : `line-clamp-3`
          }`}
        >
          {detailUser.summary || "User not provide profile summary"}
        </p>
        {detailUser.summary && (
          <button
            className={`text-sm text-neutral-600 hover:underline ${
              isSummaryExpanded ? "hidden" : ""
            }`}
            onClick={handleSeeMoreClick}
          >
            See More
          </button>
        )}
        {detailUser.summary && (
          <button
            className={`text-sm text-neutral-600 hover:underline ${
              !isSummaryExpanded ? "hidden" : ""
            }`}
            onClick={handleSeeMoreClick}
          >
            See Less
          </button>
        )}
      </div>
      <div className={"h-[1px] w-full bg-gray-200"}></div>
      <div className={"flex flex-col gap-2 w-full"}>
        <h4 className={"font-bold text-neutral-950"}>Last 3 Education</h4>
        <div className={"w-full"}>
          <ScrollArea className="w-96 whitespace-nowrap overflow-x-auto">
            {/* Added overflow-x-auto */}
            <div className="flex w-max gap-3">
              {/* Changed to flex-row and flex-wrap */}
              {detailUser?.education.map((item, key: number) => {
                return (
                  <EducationProfileItem
                    degree={item.education_degree as string}
                    key={key}
                    gpa={item.cumulativeGpa}
                    graduatedDate={format(
                      new Date(item.educationDate),
                      "MMM yyyy",
                    )}
                    school={item.educationName}
                  />
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
      <div className={"h-[1px] w-full bg-gray-200"}></div>
      <div className={"flex flex-col gap-2"}>
        <h4 className={"font-bold text-neutral-950"}>Working History</h4>

        {detailUser?.workingHistoryList.map((item, key: number) => {
          return (
            <WorkingHistoryProfileItem
              key={key}
              description={item.jobDescription}
              jobTitle={item.jobTitle}
              endDate={item.endDate}
              startDate={item.startDate}
              company={item.companyName}
            />
          );
        })}
      </div>
    </section>
  );
}

export default ProfileDetail;
