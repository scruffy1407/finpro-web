import React from "react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import ButtonComponent from "./ButtonComponent";
import { JobPostProps } from "@/utils/interface";
import Link from "next/link";

function JobPostComponent({
  logo,
  companyName,
  job_title,
  company_province,
  jobType,
  created_at,
  salaryMin,
  salaryMax,
  salaryShow,
}: JobPostProps) {
  const timeAgo = formatDistanceToNow(new Date(created_at), {
    addSuffix: true,
  });
  const formatSalary = (salary: number) => {
    return `${(salary / 1000000).toFixed(1)} jt`; // Format to 1 decimal place
  };

  return (
    <Link href={""} className="bg-white w-[410] h-fit ">
      <div className="p-4 flex flex-col gap-6">
        <div className={`flex flex-col gap-3`}>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Image src={logo} alt="Pic" width={50} height={50} />
              <p className="text-sm underline text-neutral-400 cursor-pointer">
                {companyName}
              </p>
            </div>
            <ButtonComponent type="ButtonBookmark" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl">{job_title}</h2>
            <p className="text-base text-neutral-600">{company_province}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {jobType.map((type, index) => (
              <span
                key={index}
                className="text-sm  rounded-xl px-2 py-1 bg-neutral-100"
              >
                <p>{type}</p>
              </span>
            ))}
          </div>
        </div>
        <div className="border-t-2 border-gray-200 w-full"></div>
        <div className="flex justify-between items-center ">
          <p className="text-sm text-neutral-400">{timeAgo}</p>
          <p className="text-sky-600 font-semibold">
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
