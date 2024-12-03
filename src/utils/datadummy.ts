import { ProfilerProps } from "react";
import { JobPostProps } from "./interface";
import { ProfilePropsDummy } from "./interface";
import { CompanyShortPropsDummy } from "./interface";
import { LocationOption } from "./interface";

export const locationOptions: LocationOption[] = [
	{ label: "Jakarta", value: "jakarta" },
	{ label: "Banten", value: "banten" },
	{ label: "Bandung", value: "bandung" },
];

export const profileDummy: ProfilePropsDummy = {
	photo: "/Sephiroth.jpeg",
	name: "Sephiroth",
};

// Dummy data for job posts
export const jobPosts: JobPostProps[] = [
	{
		logo: "/companies/Netflix.svg",
		companyName: "Tech Innovators",
		job_title: "Software Engineer",
		company_province: "Jakarta",
		jobType: ["Full-Time", "1-3 Years Experience", "Part-Time"],
		created_at: new Date("2024-11-15T09:30:00Z"),
		salaryMin: 5000000,
		salaryMax: 7000000,
	},

	{
		logo: "/companies/Twitch.svg",
		companyName: "Twitch",
		job_title: "Graphic Designer",
		company_province: "Bali",
		jobType: ["Part-Time", "Fresh Graduate"],
		created_at: new Date("2024-11-20T14:00:00Z"),
		salaryMin: 3000000,
		salaryMax: 4000000,
	},
	{
		logo: "/companies/Oracle.svg",
		companyName: "Remote Solutions",
		job_title: "Product Manager",
		company_province: "Surabaya",
		jobType: ["Remote Working", "Full-Time", "1-3 Years Experience"],
		created_at: new Date("2024-11-25T08:00:00Z"),
		salaryMin: 8000000,
		salaryMax: 12000000,
	},
];

export const dummyCompanies: CompanyShortPropsDummy[] = [
	{
		logo: "/companies/Twitch.svg", // Replace with actual image paths
		companyName: "TechCorp",
		jobsOpen: 5,
	},
	{
		logo: "/companies/Google.svg",
		companyName: "DesignHub",
		jobsOpen: 3,
	},
	{
		logo: "/companies/Netflix.svg",
		companyName: "NextGen Solutions",
		jobsOpen: 8,
	},
	{
		logo: "/companies/Spotify.svg",
		companyName: "DataWorks",
		jobsOpen: 12,
	},
	{
		logo: "/companies/Uber.svg",
		companyName: "DevStudio",
		jobsOpen: 7,
	},
	{
		logo: "/companies/Uber.svg",
		companyName: "Creative Minds",
		jobsOpen: 4,
	},
	{
		logo: "/companies/pertanian.png",
		companyName: "InnoTech",
		jobsOpen: 9,
	},
	{
		logo: "/path/to/Uber.svg",
		companyName: "Global Innovations",
		jobsOpen: 15,
	},
];
