import React from "react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import ButtonComponent from "./ButtonComponent";
import { JobPostProps } from "@/utils/interface";
import Link from "next/link";
import { useRouter } from "next/router";

function JobPostComponent({
  logo,
  companyName,
  job_title,
  company_province,
  jobType,
  jobSpace,
  created_at,
  salaryMin,
  salaryMax,
  salaryShow,
  experienceMin,
  experienceMax,
  job_id,
  companyId,
}: JobPostProps) {
  const router = useRouter();
  const timeAgo = formatDistanceToNow(new Date(created_at), {
    addSuffix: true,
  });
  const formatSalary = (salary: number) => {
    return `${(salary / 1000000).toFixed(1)} jt`; // Format to 1 decimal place
  };

  const handleCompanyClick = (event: any) => {
    event.stopPropagation(); // Prevent event bubbling

    router.push(`/company/${companyId}`);
  };

  return (
    <Link
      href={`/jobdetail/${job_id}`}
      className="bg-white w-full h-fit bg-white rounded-xl hover:shadow-lg"
      prefetch={false}
    >
      <div className="p-4 flex flex-col gap-6">
        <div className={`flex flex-col gap-5`}>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Image
                src={logo}
                alt="Pic"
                width={50}
                height={50}
                className={"w-6"}
              />
              <span
                className="text-sm underline text-neutral-400 cursor-pointer hover:bg-zinc-50 py-1 px-2 "
                onClick={handleCompanyClick}
              >
                {companyName}
              </span>
            </div>
            <ButtonComponent type="ButtonBookmark" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold">{job_title}</h2>
            <p className="text-sm text-neutral-600">{company_province}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className=" w-fit text-sm text-neutral-600 rounded-xl px-2 py-1 bg-neutral-100">
              {jobType}
            </div>
            <div className=" w-fit text-sm text-neutral-600 rounded-xl px-2 py-1 bg-neutral-100">
              {jobSpace}
            </div>
            <div className="w-fit text-sm text-neutral-600 rounded-xl px-2 py-1 bg-neutral-100">
              <p>
                {experienceMax
                  ? `${experienceMin} - ${experienceMax} yrs Experience`
                  : `Min ${experienceMin} yrs Experience`}
              </p>
            </div>
          </div>
        </div>
        <div className="border-t-[1px] border-gray-200 w-full"></div>
        <div className="flex justify-between items-center ">
          <p className="text-xs text-neutral-400">{timeAgo}</p>
          <p className="text-blue-500 font-semibold">
            {salaryShow ? (
              `Rp${formatSalary(salaryMin)} - Rp${formatSalary(salaryMax)}`
            ) : (
              <span className="text-neutral-600">Salary not disclosed</span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default JobPostComponent;
