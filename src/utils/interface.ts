export interface JobPostDash {
	job_title: string;
	created_at: string;
	updated_at: string;
	salary_min: number;
	salary_max: number;
	salary_show: boolean;
	job_id: string;
	companyId: number;
	expired_date: string;
	number_applicants: number;
	selection_test_active: boolean;
	status: boolean;
}

export interface NavProps {
  findJobs: string;
  skillAssessment: string;
  exploreCompanies: string;
  loginJobHunter: string;
  loginCompanies: string;
  onClick?: () => void;
}

type ButtonType =
  | "ButtonBorder"
  | "ButtonText"
  | "ButtonSearch"
  | "ButtonBookmark"
  | "ButtonFilled"
  | "ButtonFilledCustom"
  | "ButtonTextCustom"
  | "ButtonBorderCustom"
  | "ButtonSocial";

export interface ButtonProps {
	container?: string;
	type: ButtonType;
	onClick?: () => void;
	onClickBookmark?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	isFullWidth?: boolean;
	isDisabled?: boolean;
	isSubmit?: boolean;
	isLoading?: boolean;
	icon?: string;
	isBookmarked?: boolean;
}

export interface HeroProps {
  header1: string;
  heroDetail: string;
}

export interface HeadingProps {
  heading: string;
  paragraph: string;
  onClick?: () => void;
}
export interface LocationOption {
  label: string;
  value: number;
}
export interface LocationOptionReal {
  label: string;
  value: string;
  type: "province" | "city";
  provinceId?: string;
}

export type JobType =
  | "Full-Time"
  | "Part-Time"
  | "1-3 Years Experience"
  | "Fresh Graduate"
  | "Remote Working";

export interface JobPostProps {
  logo: string;
  companyName: string;
  job_title: string;
  company_province: string;
  company_city: string;
  jobType: string;
  created_at: Date;
  salaryMin: number;
  salaryMax: number;
  salaryShow?: boolean;
  jobSpace?: string;
  experienceMin?: number;
  experienceMax?: number;
  job_id: number;
  companyId: number;
}

// export interface JobPostPropsReal {
// 	job_id: number;
// 	job_title: string;
// 	companyName?: string;
// 	company_province?: string;
// 	logo?: string;
// 	jobType: string[]; // Adjust as needed
// 	created_at: string; // Keep this as string since API sends it in ISO string format
// 	salaryMin: number;
// 	salaryMax: number;
// 	salaryShow?: boolean; // Optional
//   }

//baru
export interface CompanyReal {
  company_name: string;
  company_city: string;
  logo: string | null;
}

//baru
export interface JobPostPropsReal {
  companyId: number;
  job_id: number;
  job_title: string;
  salary_min: number;
  salary_max: number;
  created_at: string;
  job_space: string;
  job_type: string;
  salary_show: boolean;
  job_experience_min: number;
  job_experience_max: number;
  company: CompanyReal;
}

export interface ProfilePropsDummy {
  photo: string;
  name: string;
}

export interface CompanyShortPropsDummy {
  logo: string;
  companyName: string;
  jobsOpen: number;
}

interface CompanySuggest {
  logo: string | null; // The company's logo URL (can be null if no logo is available)
  company_name: string; // Name of the company
  company_city: string; // City where the company is located
}

export interface JobListingSuggest {
  companyId: number;
  job_id: number; // Unique job identifier
  job_title: string; // Title of the job position
  salary_min: string; // Minimum salary for the job
  salary_max: string; // Maximum salary for the job
  job_experience_min: number; // Minimum required experience in years
  job_experience_max: number; // Maximum required experience in years
  salary_show: boolean; // Boolean indicating if salary is displayed
  created_at: string; // Job posting date (ISO 8601 format)
  job_type: string; // Type of job (e.g., fulltime, freelance)
  job_space: string; // Work setup (e.g., hybrid, remoteworking)
  company: CompanySuggest; // The company offering the job (Company object)
}
