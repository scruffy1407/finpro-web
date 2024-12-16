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
	jobType: JobType[]; // This will accept an array of the predefined JobType values
	created_at: Date;
	salaryMin: number;
	salaryMax: number;
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
