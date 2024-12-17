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
	| "ButtonSocial"


export interface ButtonProps {
	container?: string;
	type: ButtonType;
	onClick?: () => void;
	icon?: string;
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
		job_id : string
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
	logo: string | null;        // The company's logo URL (can be null if no logo is available)
	company_name: string;      // Name of the company
	company_city: string;      // City where the company is located
  }
  
  export interface JobListingSuggest {
	job_id: number;            // Unique job identifier
	job_title: string;         // Title of the job position
	salary_min: string;        // Minimum salary for the job
	salary_max: string;        // Maximum salary for the job
	job_experience_min: number; // Minimum required experience in years
	job_experience_max: number; // Maximum required experience in years
	salary_show: boolean;      // Boolean indicating if salary is displayed
	created_at: string;        // Job posting date (ISO 8601 format)
	job_type: string;          // Type of job (e.g., fulltime, freelance)
	job_space: string;         // Work setup (e.g., hybrid, remoteworking)
	company: CompanySuggest;          // The company offering the job (Company object)
  }
