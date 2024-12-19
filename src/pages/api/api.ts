import axios, { InternalAxiosRequestConfig } from "axios";
import { job } from "@/utils/axiosInterface";
import { location } from "@/utils/axiosInterface";

const baseURL = "http://localhost:8000";

const api = axios.create({
	baseURL,
});

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
		companyCity?: string;
	}
) {
	const { jobTitle, categoryId, jobType, dateRange, sortOrder, companyCity } =
		searchQuery;

	// Build the query string
	let queryString = `jobPosts?page=${currentPage}&limit=15`;

	if (jobTitle) {
		queryString += `&job_title=${jobTitle}`;
	}

	if (categoryId) {
		queryString += `&categoryId=${categoryId}`;
	}

	// Ensure empty string is passed instead of "all" for jobType
	if (jobType !== undefined && jobType !== "all") {
		queryString += `&jobType=${jobType}`;
	}

	// Ensure empty string is passed instead of "all" for dateRange
	if (dateRange !== undefined && dateRange !== "all") {
		queryString += `&dateRange=${dateRange}`;
	}

	if (sortOrder) {
		queryString += `&sortOrder=${sortOrder}`;
	}

	if (companyCity) {
		// Add companyCity to the query string if provided
		queryString += `&companyCity=${encodeURIComponent(companyCity)}`;
	}

	console.log("THIS IS QUERRY STRING ");
	console.log(queryString);
	try {
		const response = await job.get(queryString); // Make the API request
		return response; // Return the data part of the response
	} catch (error) {
		console.error("Error fetching job posts:", error);
		throw error;
	}
}

export const getProvince = async () => {
	const response = await location.get("/get-province");
	return response;
};

export const getCityByProvince = async (provinceId: number) => {
	const response = await location.get(`/get-city/${provinceId}`);
	return response;
};

export const searchLocation = async () => {
	const response = await location.get("search-location");
	return response;
};

export async function getCategories() {
	const response = await job.get("categories");
	return response.data;
}

export default api;

// backup lastest
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
