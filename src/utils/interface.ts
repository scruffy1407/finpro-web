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
	| "ButtonBorderCustom";

export interface ButtonProps {
	container?: string;
	type: ButtonType;
	onClick?: () => void;
	isFullWidth?: boolean;
	isDisabled?: boolean;
	isSubmit?: boolean;
	isLoading?: boolean;
}

export interface HeroProps {
	header1: string;
	heroDetail: string;
}

export interface HeadingProps {
	heading: string;
	paragraph: string;
}
export interface LocationOption {
	label: string;
	value: string;
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
	jobType: string; // This will accept an array of the predefined JobType values
	created_at: Date;
	salaryMin: number;
	salaryMax: number;
	salaryShow?: boolean;
	jobSpace ?: string;
	experienceMin ?: number;
	experienceMax ?: number;
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

export interface CompanyDummy {
	companyName: string;
	companyDescription: string;
	logo: string;
	companyCity: string;
	companyProvince: string;
	addressDetails: string;
	companyIndustry: string;
	companySize: string;
	review: string[];
}

export interface JobPostDummy {
	preSelectionTestId: number;
	company: CompanyDummy;
	categoryId: number;
	selectionTextActive: boolean;
	jobTitle: string;
	salaryShow: boolean;
	salaryMin: number;
	salaryMax: number;
	jobDescription: string;
	jobExperienceMin: number;
	jobExperienceMax: number;
	expiredDate: string;
	status: boolean;
	jobType: string[];
	jobSpace: string[];
	createdAt: string;
	updatedAt: string;
	jobId: string;
}

export interface CompanyPostDummy {
	companyId: number;
	companyName: string;
	companyDescription: string;
	logo: string;
	companyCity: string;
	companyProvince: string;
	addressDetails: string;
	companyIndustry: string;
	companySize: string;
	review: string[];
}
