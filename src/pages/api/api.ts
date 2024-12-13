import axios, { InternalAxiosRequestConfig } from "axios";

const baseURL = "http://localhost:8000";

const api = axios.create({
	baseURL,
});

import { job } from "@/utils/axiosInterface";

interface GetJobPosts {
	page: number;
	limit: number;
	job_title?: string;
	categoryId?: number;
	jobType?: string;
	jobSpace?: string;
	dateRange?: string;
	sortorder?: String;
}

export async function getJobNewLp() {
	const response = await job.get("jobNewLp");
	return response.data;
}

export async function getJobPost(
	currentPage: number,
	searchQuery: {
		jobTitle?: string;
		categoryId?: string;
		jobType?: string;
		dateRange?: string;
		sortOrder?: string;
	}
) {
	const { jobTitle, categoryId, jobType, dateRange, sortOrder } = searchQuery;

	// Build the query string
	let queryString = `jobPosts?page=${currentPage}&limit=15`;

	if (jobTitle) {
		queryString += `&job_title=${jobTitle}`;
	}

	if (categoryId) {
		queryString += `&categoryId=${categoryId}`;
	}

	if (jobType) {
		queryString += `&jobType=${jobType}`;
	}

	if (dateRange) {
		queryString += `&dateRange=${dateRange}`;
	}

	if (sortOrder) {
		queryString += `&sortOrder=${sortOrder}`;
	}

	try {
		const response = await job.get(queryString); // Make the API request
		return response; // Return the data part of the response
	} catch (error) {
		console.error("Error fetching job posts:", error);
		throw error;
	}
}

export async function getCategories() {
	const response = await job.get("categories");
	return response.data;
}

export default api;

//backup lastest
// export async function getJobPost(
// 	currentPage: number,
// 	searchQuery: { jobTitle?: string; categoryId?: string }
// ) {
// 	const { jobTitle, categoryId } = searchQuery;

// 	const response = await job.get(
// 		`jobPosts?page=${currentPage}&limit=15${
// 			jobTitle ? `&job_title=${jobTitle}` : ""
// 		}${
//       categoryId ? `&categoryId=${categoryId}` : ""}`
// 	);
// 	console.log("THIS IS AFTER HIT API");
// 	console.log(response);
// 	return response.data.data;
// }

// }
