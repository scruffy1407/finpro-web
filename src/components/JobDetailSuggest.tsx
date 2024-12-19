import React from "react";
import JobPostComponent from "./JobPostComponent";
import { JobPostProps } from "@/utils/interface";
import { useState, useEffect } from "react";
import axios from "axios";
import { JobListingSuggest } from "@/utils/interface";

import {
	mapJobType,
	mapJobSpace,
	mapCompanySize,
	mapCompanyIndustry,
} from "../utils/enumMapping";

interface JobDetailSuggestProps {
	job_id: string;
}

const JobDetailSuggest: React.FC<JobDetailSuggestProps> = ({ job_id }) => {
	const [jobData, setJobData] = useState<any | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		// Debug log: Ensure we see job_id when the component is rendered
		console.log("Job ID in JobDetailSuggest:", job_id);

		if (!job_id) {
			console.log("Job ID is not available yet. Skipping API call.");
			return; // Skip API call if job_id is undefined
		}

		const fetchJobDetail = async () => {
			setLoading(true);
			try {
				const response = await axios.get(
					`http://localhost:8000/api/company/jobDetails/${job_id}`
				);
				console.log(
					"Fetched job data JOB SUGEESTIONS:",
					response.data.relatedJobPosts
				); // Log the response to see the data
				setJobData(response.data.relatedJobPosts);
			} catch (err) {
				console.error("Error fetching job Suggest:", err);
				setError("Failed to fetch job Suggest.");
			} finally {
				setLoading(false);
			}
		};

		fetchJobDetail();
	}, [job_id]); // This effect runs only when `job_id` changes

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	if (!jobData) return <div>No job details found.</div>;

	return (
		<div className="max-w-screen-xl mx-auto overflow-x-auto flex gap-6 justify-start sm:justify-start snap-x sm:snap-none px-4 sm:px-0">
			{/* Map through dummyData and render JobPostComponent for each item */}
			{jobData.map((jobPost: JobListingSuggest, index: number) => (
				<div
					key={index}
					className="flex-shrink-0 w-full sm:w-[410px] snap-start bg-white rounded-xl hover:shadow-lg"
				>
					<JobPostComponent
						logo={jobPost.company.logo || "/default-logo-url"} // Fallback for null logo
						companyName={jobPost.company.company_name}
						job_title={jobPost.job_title}
						company_province={jobPost.company.company_city}
						jobType={mapJobType(jobPost.job_type)}
						created_at={new Date(jobPost.created_at)} // Ensure it's a Date object
						salaryMin={parseInt(jobPost.salary_min)} // Convert to number
						salaryMax={parseInt(jobPost.salary_max)} // Convert to number
						salaryShow={jobPost.salary_show}
						experienceMin={jobPost.job_experience_min}
						experienceMax={jobPost.job_experience_max}
						jobSpace={mapJobSpace(jobPost.job_space)}
						job_id={String(jobPost.job_id)}
					/>
				</div>
			))}
		</div>
	);
};

export default JobDetailSuggest;
