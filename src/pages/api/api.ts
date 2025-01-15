import axios from "axios";
import { job } from "@/utils/axiosInterface";
import { location } from "@/utils/axiosInterface";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL,
});

export async function getJobNewLp() {
  const response = await job.get("jobNewLp");
  return response.data;
}

export async function getNearestJob(lat: number, lang: number) {
  const queryString = `?lat=${lat}&lang${lang}`;
  const response = await job.get(`nearest-job${queryString}`);
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
  },
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

export async function getJobPostDash({
  accessToken,
  limit = 10,
  page = 1,
  jobTitle = "",
  sortOrder = "",
}: {
  accessToken: string;
  limit?: number;
  page?: number;
  jobTitle?: string;
  sortOrder?: string;
}) {
  // Build the query string
  let queryString = `companydashjob?page=${page}&limit=${limit}`;

  if (jobTitle) {
    queryString += `&job_title=${jobTitle}`;
  }

  if (sortOrder) {
    queryString += `&sortOrder=${sortOrder}`;
  }
  if (!sortOrder) {
    queryString += `&sortOrder=desfc`;
  }

  // Add the Authorization header
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await job.get(queryString, config); // Make the API request
    return response.data.data; // Return the data part of the response
  } catch (error) {
    console.error("Error fetching job posts:", error);
    throw error;
  }
}

export async function deleteJobPostDash(job_Id: number, accessToken: string) {
  try {
    // Perform the DELETE request
    const response = await job.put(
      `/delete/job/${job_Id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include your token
        },
        validateStatus: (status) => status < 500,
      },
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, message: response?.data?.error };
    }
  } catch (error) {
    // Handle errors, e.g., log or throw the error
    console.error("Error deleting job post:", error);
    throw error; // Rethrow the error to be caught by the calling function
  }
}

export default api;
