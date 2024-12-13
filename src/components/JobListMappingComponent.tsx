import React from "react";
import JobPostComponent from "./JobPostComponent";
import { jobListPostDummy } from "@/utils/datadummy"; // Adjust the path based on where your datadummy.ts is stored
import { JobPostDummy, JobPostPropsReal } from "@/utils/interface";
import { useSelector } from "react-redux";
import { JobType } from "@/utils/interface";
import { RootState } from "@/store"; // Make sure to import RootState correctly
import Image from "next/image";

interface JobListMappingComponentProps {
	jobPosts: JobPostPropsReal[]; // Define prop for job posts
}

const JobListMappingComponent: React.FC<JobListMappingComponentProps> = ({
	jobPosts,
}) => {
	console.log("IS THIS AN ARRAY OR NOT");
	console.log(jobPosts);
	if (jobPosts.length === 0) {
		return (
			<div className="flex justify-center items-center">
				<Image
					src="/NoJobs.svg"
					alt="No jobs available"
					width={300}
					height={200}
				/>
			</div>
		);
	} else {
		return (
			<div className="max-w-screen-xl mx-auto overflow-x-auto flex gap-6 justify-start sm:justify-start snap-x sm:snap-none px-4 sm:px-0 md:overflow-hidden md:flex flex-wrap">
				{/* Map through the paginated data and render JobPostComponent for each job */}

				{jobPosts.map((jobListPostReal: JobPostPropsReal, index: number) => (
					<div
						key={index}
						className="flex-shrink-0 w-full sm:w-[410px] snap-start bg-white rounded-xl hover:shadow-lg"
					>
						<JobPostComponent
							logo={jobListPostReal.company.logo || "/burger.svg"}
							companyName={
								jobListPostReal.company.company_name || "something Wrong"
							}
							job_title={jobListPostReal.job_title}
							company_province={
								jobListPostReal.company.company_city || "something Wrong"
							}
							created_at={new Date(jobListPostReal.created_at)}
							salaryMin={jobListPostReal.salary_min}
							salaryMax={jobListPostReal.salary_max}
							salaryShow={jobListPostReal.salary_show}
							jobType={jobListPostReal.job_type}
							jobSpace={jobListPostReal.job_space}
							experienceMin={jobListPostReal.job_experience_min}
							experienceMax={jobListPostReal.job_experience_max}
						/>
					</div>
				))}
			</div>
		);
	}
};

export default JobListMappingComponent;

//Back Up
// import React from "react";
// import JobPostComponent from "./JobPostComponent";
// import { jobListPostDummy } from "@/utils/datadummy"; // Adjust the path based on where your datadummy.ts is stored
// import { JobPostDummy } from "@/utils/interface";
// import { JobType } from "@/utils/interface";

// const JobListMappingComponent: React.FC = () => {
// 	return (
// 		<div className="max-w-screen-xl mx-auto overflow-x-auto flex gap-6 justify-start sm:justify-start snap-x sm:snap-none px-4 sm:px-0 md:overflow-hidden md:flex flex-wrap">
// 			{/* Map through dummyData and render JobPostComponent for each item */}
// 			{jobListPostDummy.map((jobListPostDummy: JobPostDummy, index: number) => (
// 				<div
// 					key={index}
// 					className="flex-shrink-0 w-full sm:w-[410px] snap-start bg-white rounded-xl hover:shadow-lg"
// 				>
// 					<JobPostComponent
// 						logo={jobListPostDummy.company.logo}
// 						companyName={jobListPostDummy.company.companyName}
// 						job_title={jobListPostDummy.jobTitle}
// 						company_province={jobListPostDummy.company.companyProvince}
// 						jobType={jobListPostDummy.jobType as JobType[]}
// 						created_at={new Date(jobListPostDummy.createdAt)}
// 						salaryMin={jobListPostDummy.salaryMin}
// 						salaryMax={jobListPostDummy.salaryMax}
// 						salaryShow={jobListPostDummy.salaryShow}
// 					/>
// 				</div>
// 			))}
// 		</div>
// 	);
// };

// export default JobListMappingComponent;

//back-up two
// import React from "react";
// import JobPostComponent from "./JobPostComponent";
// import { jobListPostDummy } from "@/utils/datadummy"; // Adjust the path based on where your datadummy.ts is stored
// import { JobPostDummy } from "@/utils/interface";
// import { useSelector } from "react-redux";
// import { JobType } from "@/utils/interface";
// import { RootState } from "@/store"; // Make sure to import RootState correctly
// import Image from "next/image";

// const JobListMappingComponent: React.FC = () => {
// // Get pagination state from Redux
// const { currentPage, jobsPerPage } = useSelector(
// 	(state: RootState) => state.pagination
// );

// // Calculate the index of the first and last job to display
// const indexOfLastJob = currentPage * jobsPerPage;
// const indexOfFirstJob = indexOfLastJob - jobsPerPage;

// // Slice the jobListPostDummy array based on the current page and jobsPerPage
// // const currentJobs = 0
// const currentJobs = jobListPostDummy.slice(indexOfFirstJob, indexOfLastJob);

// 	if (currentJobs.length === 0) {
// 		return (
// 			<div className="flex justify-center items-center" >
// 				<Image
// 					src="/NoJobs.svg"
// 					alt="No jobs available"
// 					width={300}
// 					height={200}
// 				/>
// 			</div>
// 		);
// 	} else {
// 		return (
// 			<div className="max-w-screen-xl mx-auto overflow-x-auto flex gap-6 justify-start sm:justify-start snap-x sm:snap-none px-4 sm:px-0 md:overflow-hidden md:flex flex-wrap">
// 				{/* Map through the paginated data and render JobPostComponent for each job */}

// 				{currentJobs.map((jobListPostDummy: JobPostDummy, index: number) => (
// 					<div
// 						key={index}
// 						className="flex-shrink-0 w-full sm:w-[410px] snap-start bg-white rounded-xl hover:shadow-lg"
// 					>
// 						<JobPostComponent
// 							logo={jobListPostDummy.company.logo}
// 							companyName={jobListPostDummy.company.companyName}
// 							job_title={jobListPostDummy.jobTitle}
// 							company_province={jobListPostDummy.company.companyProvince}
// 							created_at={new Date(jobListPostDummy.createdAt)}
// 							salaryMin={jobListPostDummy.salaryMin}
// 							salaryMax={jobListPostDummy.salaryMax}
// 							salaryShow={jobListPostDummy.salaryShow}
// 							jobType={jobListPostDummy.jobType as JobType[]}
// 						/>
// 					</div>
// 				))}
// 			</div>
// 		);
// 	}
// };

// export default JobListMappingComponent;
