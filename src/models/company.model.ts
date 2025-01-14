export interface JobPost {
  job_id: number;
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
  created_at?: Date;
  isBookmarked: boolean;
  job_type: "Full-Time" | "Freelance" | "Internship";
  job_space: "Remote Working" | "On Office" | "Hybrid";
}

export interface reviewResponse {
  reviewId?: number;
  workExperienceId: number;
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

export interface ApplyJob {
  jobHunterId: number;
  resume: File | null;
  expected_salary: string | number;
  jobId: number;
}
