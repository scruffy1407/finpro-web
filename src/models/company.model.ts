export interface JobPost {
  job_title: string;
  companyId?: number;
  preSelectionTestId?: number;
  catergoryId?: number;
  salary_show: boolean;
  salary_min: number;
  salary_max: number;
  job_description: string;
  job_experience_min: number;
  job_experience_max: number;
  expired_date: Date;
  status: boolean;
  job_type: "Full-Time" | "Freelance" | "Internship"; // Enum-like values
  job_space: "Remote Working" | "On Office" | "Hybrid"; // Enum-like values
}

export interface reviewResponse {
  reviewId?: number;
  companyId: number;
  companyName?: string;
  jobunterId: number;
  reviewTitle: string;
  reviewDescription: string;
  culturalRating: number;
  workLifeBalanceRating: number;
  facilityRating: number;
  careerPathRating: number;
}

export interface companyDetailResponse {
  companyId: number;
  email: string;
  logo: string;
  companyName: string;
  companyDescription: string;
  companyCity: string;
  companyProvince: string;
  addressDetail: string;
  companyIndustry: string;
  companySize: string;
  companyPhoneNumber: number;
  listJob: JobPost[];
  listReview: reviewResponse[];
}
