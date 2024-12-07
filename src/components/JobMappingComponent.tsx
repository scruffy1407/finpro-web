import React from "react";
import JobPostComponent from "./JobPostComponent";
import { jobPosts } from "@/utils/datadummy"; // Adjust the path based on where your datadummy.ts is stored
import { JobPostProps } from "@/utils/interface";

const JobPostSection: React.FC = () => {
	return (
		<div className="max-w-screen-xl mx-auto overflow-x-auto flex gap-6 justify-start sm:justify-start snap-x sm:snap-none px-4 sm:px-0">
			{/* Map through dummyData and render JobPostComponent for each item */}
			{jobPosts.map((jobPost: JobPostProps, index: number) => (
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
						created_at={jobPost.created_at}
						salaryMin={jobPost.salaryMin}
						salaryMax={jobPost.salaryMax}
						salaryShow={jobPost.salaryShow}
					/>
				</div>
			))}
		</div>
	);
};

export default JobPostSection;
