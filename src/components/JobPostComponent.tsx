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
}: JobPostProps) {
	const timeAgo = formatDistanceToNow(new Date(created_at), {
		addSuffix: true,
	});
	const formatSalary = (salary: number) => {
		return `${(salary / 1000000).toFixed(1)} jt`; // Format to 1 decimal place
	};

	return (
		<Link
			href={""}
			className="bg-white w-[410] h-fit "
		>
			<div className="p-5">
				<div className="flex gap-3">
					<Image src={logo} alt="Pic" width={50} height={50} />
					<div className="flex w-full justify-between items-center">
						<h1 className="text-lg underline text-neutral-400">
							{companyName}
						</h1>
						<div>
							<ButtonComponent type="ButtonBookmark" />
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<h2 className="text-xl">{job_title}</h2>
					<p className="text-base text-neutral-600">{company_province}</p>
				</div>
				<div className="flex flex-wrap gap-3 mt-3">
					{jobType.map((type, index) => (
						<span
							key={index}
							className="text-sm border rounded-xl p-1 bg-neutral-200"
						>
							<p>{type}</p>
						</span>
					))}
				</div>
				<div className="border-t-2 border-gray-200 w-full mt-6"></div>
				<div className="flex justify-between mt-3 ">
					<p className="text-neutral-400">{timeAgo}</p>
					<p className="text-sky-600 font-semibold">
						{formatSalary(salaryMin)} - {formatSalary(salaryMax)}
					</p>
				</div>
			</div>
		</Link>
	);
}

export default JobPostComponent;
