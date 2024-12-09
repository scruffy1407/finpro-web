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

export interface ButtonProps {
	container?: string;
	type: ButtonType;
	onClick?: () => void;
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
	jobType: JobType[]; // This will accept an array of the predefined JobType values
	created_at: Date;
	salaryMin: number;
	salaryMax: number;
	salaryShow ?: boolean;
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
  
  