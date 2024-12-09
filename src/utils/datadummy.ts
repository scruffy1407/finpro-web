import { JobPostProps } from "./interface";
import { ProfilePropsDummy } from "./interface";
import { CompanyShortPropsDummy } from "./interface";
import { LocationOption } from "./interface";
import { CompanyPostDummy, JobPostDummy } from "./interface";

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
    salaryShow: true,
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
    salaryShow: false,
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
    salaryShow: true,
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

export const jobListPostDummy: JobPostDummy[] = [
  {
    preSelectionTestId: 8,
    company: {
      companyName: "SmartRetail Solutions",
      companyDescription: "Leading retail technology provider.",
      logo: "",
      companyCity: "Los Angeles",
      companyProvince: "California",
      addressDetails: "987 Retail Rd",
      companyIndustry: "Retail",
      companySize: "100 employees",
      review: ["Innovative solutions", "Fast-growing", "Dynamic environment"],
    },
    categoryId: 82,
    selectionTextActive: false,
    jobTitle: "Retail Analyst",
    salaryShow: false,
    salaryMin: 7000000,
    salaryMax: 7500000,
    jobDescription: "Analyze retail trends and sales data.",
    jobExperienceMin: 2,
    jobExperienceMax: 4,
    expiredDate: "2025-12-06T14:30:00Z",
    status: false,
    jobType: ["full-time"],
    jobSpace: ["on-site"],
    createdAt: "2024-12-06T14:30:00Z",
    updatedAt: "2024-12-07T14:30:00Z",
    jobId: "6",
  },
  {
    preSelectionTestId: 9,
    company: {
      companyName: "EcoTech Industries",
      companyDescription: "Sustainability-focused tech solutions.",
      logo: "",
      companyCity: "Denver",
      companyProvince: "Colorado",
      addressDetails: "123 Green St",
      companyIndustry: "Technology",
      companySize: "250 employees",
      review: [
        "Eco-conscious culture",
        "Friendly environment",
        "Opportunities to grow",
      ],
    },
    categoryId: 82,
    selectionTextActive: true,
    jobTitle: "Environmental Analyst",
    salaryShow: true,
    salaryMin: 7500000,
    salaryMax: 8000000,
    jobDescription: "Conduct research on sustainable practices and solutions.",
    jobExperienceMin: 3,
    jobExperienceMax: 5,
    expiredDate: "2025-12-20T14:30:00Z",
    status: true,
    jobType: ["full-time"],
    jobSpace: ["hybrid"],
    createdAt: "2024-12-10T14:30:00Z",
    updatedAt: "2024-12-11T14:30:00Z",
    jobId: "7",
  },
  {
    preSelectionTestId: 10,
    company: {
      companyName: "Urban Solutions",
      companyDescription: "Innovative solutions for smart cities.",
      logo: "",
      companyCity: "Chicago",
      companyProvince: "Illinois",
      addressDetails: "456 Smart Ave",
      companyIndustry: "Urban Planning",
      companySize: "200 employees",
      review: [
        "Innovative work culture",
        "Collaborative environment",
        "Challenging projects",
      ],
    },
    categoryId: 82,
    selectionTextActive: false,
    jobTitle: "Urban Planner",
    salaryShow: true,
    salaryMin: 8500000,
    salaryMax: 9000000,
    jobDescription: "Design and plan sustainable urban spaces.",
    jobExperienceMin: 4,
    jobExperienceMax: 6,
    expiredDate: "2025-12-15T14:30:00Z",
    status: true,
    jobType: ["full-time"],
    jobSpace: ["on-site"],
    createdAt: "2024-12-08T14:30:00Z",
    updatedAt: "2024-12-09T14:30:00Z",
    jobId: "8",
  },
  {
    preSelectionTestId: 11,
    company: {
      companyName: "HealthTech Innovations",
      companyDescription: "Leading healthcare technology solutions provider.",
      logo: "",
      companyCity: "Austin",
      companyProvince: "Texas",
      addressDetails: "789 MedTech Blvd",
      companyIndustry: "Healthcare",
      companySize: "500 employees",
      review: [
        "Dynamic workplace",
        "Great team collaboration",
        "Innovative products",
      ],
    },
    categoryId: 82,
    selectionTextActive: false,
    jobTitle: "Data Scientist",
    salaryShow: true,
    salaryMin: 9500000,
    salaryMax: 10000000,
    jobDescription: "Analyze healthcare data to derive actionable insights.",
    jobExperienceMin: 3,
    jobExperienceMax: 5,
    expiredDate: "2025-12-30T14:30:00Z",
    status: true,
    jobType: ["full-time"],
    jobSpace: ["remote-working"],
    createdAt: "2024-12-12T14:30:00Z",
    updatedAt: "2024-12-13T14:30:00Z",
    jobId: "9",
  },
  {
    preSelectionTestId: 12,
    company: {
      companyName: "FinTech Solutions",
      companyDescription: "Innovative financial services platform.",
      logo: "",
      companyCity: "New York",
      companyProvince: "New York",
      addressDetails: "101 Finance St",
      companyIndustry: "Finance",
      companySize: "1000 employees",
      review: [
        "Competitive salary",
        "Supportive leadership",
        "Great tech stack",
      ],
    },
    categoryId: 82,
    selectionTextActive: true,
    jobTitle: "Financial Analyst",
    salaryShow: true,
    salaryMin: 7000000,
    salaryMax: 7500000,
    jobDescription: "Evaluate financial data and trends.",
    jobExperienceMin: 2,
    jobExperienceMax: 4,
    expiredDate: "2025-12-25T14:30:00Z",
    status: true,
    jobType: ["full-time"],
    jobSpace: ["on-site"],
    createdAt: "2024-12-14T14:30:00Z",
    updatedAt: "2024-12-15T14:30:00Z",
    jobId: "10",
  },
  {
    preSelectionTestId: 13,
    company: {
      companyName: "AI Innovations",
      companyDescription: "Pioneers in Artificial Intelligence research.",
      logo: "",
      companyCity: "Seattle",
      companyProvince: "Washington",
      addressDetails: "234 AI Research Blvd",
      companyIndustry: "Technology",
      companySize: "300 employees",
      review: [
        "Cutting-edge research",
        "Collaborative team",
        "Innovation-driven",
      ],
    },
    categoryId: 82,
    selectionTextActive: false,
    jobTitle: "AI Researcher",
    salaryShow: true,
    salaryMin: 11000000,
    salaryMax: 12000000,
    jobDescription: "Conduct research on AI models and algorithms.",
    jobExperienceMin: 5,
    jobExperienceMax: 7,
    expiredDate: "2025-12-10T14:30:00Z",
    status: true,
    jobType: ["full-time"],
    jobSpace: ["hybrid"],
    createdAt: "2024-12-16T14:30:00Z",
    updatedAt: "2024-12-17T14:30:00Z",
    jobId: "11",
  },
  {
    preSelectionTestId: 14,
    company: {
      companyName: "SmartComm Solutions",
      companyDescription:
        "Transforming communication with cutting-edge technology.",
      logo: "",
      companyCity: "San Jose",
      companyProvince: "California",
      addressDetails: "123 Communication Rd",
      companyIndustry: "Telecommunications",
      companySize: "800 employees",
      review: [
        "Great team spirit",
        "High impact work",
        "Opportunities for learning",
      ],
    },
    categoryId: 82,
    selectionTextActive: true,
    jobTitle: "Network Engineer",
    salaryShow: false,
    salaryMin: 8500000,
    salaryMax: 9000000,
    jobDescription: "Design and maintain communication networks.",
    jobExperienceMin: 3,
    jobExperienceMax: 5,
    expiredDate: "2025-12-05T14:30:00Z",
    status: true,
    jobType: ["full-time"],
    jobSpace: ["on-site"],
    createdAt: "2024-12-18T14:30:00Z",
    updatedAt: "2024-12-19T14:30:00Z",
    jobId: "12",
  },
  {
    preSelectionTestId: 13,
    company: {
      companyName: "CloudServices Corp",
      companyDescription: "Leading cloud services provider worldwide.",
      logo: "",
      companyCity: "Seattle",
      companyProvince: "Washington",
      addressDetails: "101 Cloud Rd",
      companyIndustry: "Cloud Computing",
      companySize: "1000 employees",
      review: ["Flexible work schedule", "Great benefits", "Global reach"],
    },
    categoryId: 94,
    selectionTextActive: false,
    jobTitle: "Cloud Solutions Architect",
    salaryShow: true,
    salaryMin: 12000000,
    salaryMax: 13000000,
    jobDescription: "Design and implement cloud infrastructure solutions.",
    jobExperienceMin: 5,
    jobExperienceMax: 8,
    expiredDate: "2025-12-25T14:30:00Z",
    status: false,
    jobType: ["full-time"],
    jobSpace: ["remote-working"],
    createdAt: "2024-12-06T14:30:00Z",
    updatedAt: "2024-12-07T14:30:00Z",
    jobId: "11",
  },
  {
    preSelectionTestId: 12,
    company: {
      companyName: "AutoTech Innovations",
      companyDescription:
        "Leading provider of autonomous vehicle technologies.",
      logo: "",
      companyCity: "Detroit",
      companyProvince: "Michigan",
      addressDetails: "123 Auto St",
      companyIndustry: "Automotive Technology",
      companySize: "400 employees",
      review: ["Innovative", "Fast-paced", "Cutting-edge projects"],
    },
    categoryId: 91,
    selectionTextActive: true,
    jobTitle: "Autonomous Vehicle Engineer",
    salaryShow: false,
    salaryMin: 10000000,
    salaryMax: 11000000,
    jobDescription: "Develop software for autonomous driving systems.",
    jobExperienceMin: 4,
    jobExperienceMax: 7,
    expiredDate: "2025-12-15T14:30:00Z",
    status: true,
    jobType: ["full-time"],
    jobSpace: ["on-site"],
    createdAt: "2024-12-06T14:30:00Z",
    updatedAt: "2024-12-07T14:30:00Z",
    jobId: "10",
  },
  {
    preSelectionTestId: 11,
    company: {
      companyName: "HealthTech Solutions",
      companyDescription: "Innovating healthcare through technology.",
      logo: "",
      companyCity: "Chicago",
      companyProvince: "Illinois",
      addressDetails: "456 Wellness Dr",
      companyIndustry: "Health Technology",
      companySize: "200 employees",
      review: [
        "Meaningful work",
        "Health-focused environment",
        "Work-life balance",
      ],
    },
    categoryId: 88,
    selectionTextActive: false,
    jobTitle: "Healthcare IT Specialist",
    salaryShow: true,
    salaryMin: 8500000,
    salaryMax: 9000000,
    jobDescription: "Manage IT systems for healthcare institutions.",
    jobExperienceMin: 3,
    jobExperienceMax: 5,
    expiredDate: "2025-12-10T14:30:00Z",
    status: false,
    jobType: ["full-time"],
    jobSpace: ["on-site"],
    createdAt: "2024-12-06T14:30:00Z",
    updatedAt: "2024-12-07T14:30:00Z",
    jobId: "9",
  },
  {
    preSelectionTestId: 10,
    company: {
      companyName: "GlobalTech Solutions",
      companyDescription: "Providing cutting-edge software solutions globally.",
      logo: "",
      companyCity: "New York",
      companyProvince: "New York",
      addressDetails: "789 Tech Ave",
      companyIndustry: "Software",
      companySize: "500 employees",
      review: ["Innovative", "Growth opportunities", "Collaborative team"],
    },
    categoryId: 85,
    selectionTextActive: true,
    jobTitle: "Software Developer",
    salaryShow: true,
    salaryMin: 9500000,
    salaryMax: 10500000,
    jobDescription: "Design, develop, and maintain software applications.",
    jobExperienceMin: 2,
    jobExperienceMax: 5,
    expiredDate: "2025-12-20T14:30:00Z",
    status: true,
    jobType: ["full-time"],
    jobSpace: ["remote-working"],
    createdAt: "2024-12-06T14:30:00Z",
    updatedAt: "2024-12-07T14:30:00Z",
    jobId: "8",
  },
  {
    preSelectionTestId: 9,
    company: {
      companyName: "EcoTech Industries",
      companyDescription: "Sustainability-focused tech solutions.",
      logo: "",
      companyCity: "Denver",
      companyProvince: "Colorado",
      addressDetails: "123 Green St",
      companyIndustry: "Technology",
      companySize: "250 employees",
      review: [
        "Eco-conscious culture",
        "Friendly environment",
        "Opportunities for growth",
      ],
    },
    categoryId: 83,
    selectionTextActive: false,
    jobTitle: "Environmental Data Analyst",
    salaryShow: false,
    salaryMin: 8000000,
    salaryMax: 8500000,
    jobDescription:
      "Collect and analyze environmental data for sustainability projects.",
    jobExperienceMin: 3,
    jobExperienceMax: 5,
    expiredDate: "2025-12-30T14:30:00Z",
    status: false,
    jobType: ["full-time"],
    jobSpace: ["hybrid"],
    createdAt: "2024-12-06T14:30:00Z",
    updatedAt: "2024-12-07T14:30:00Z",
    jobId: "7",
  },
  {
    preSelectionTestId: 10,
    company: {
      companyName: "CyberSecure Solutions",
      companyDescription: "Global leader in cybersecurity and IT solutions.",
      logo: "",
      companyCity: "Austin",
      companyProvince: "Texas",
      addressDetails: "500 Cyber Pkwy",
      companyIndustry: "Cybersecurity",
      companySize: "500 employees",
      review: [
        "Innovative technologies",
        "Great team spirit",
        "Career advancement opportunities",
      ],
    },
    categoryId: 85,
    selectionTextActive: true,
    jobTitle: "Cybersecurity Analyst",
    salaryShow: true,
    salaryMin: 8500000,
    salaryMax: 9500000,
    jobDescription: "Monitor and protect systems from cyber threats.",
    jobExperienceMin: 3,
    jobExperienceMax: 5,
    expiredDate: "2025-12-20T14:30:00Z",
    status: true,
    jobType: ["full-time"],
    jobSpace: ["hybrid"],
    createdAt: "2024-12-06T14:30:00Z",
    updatedAt: "2024-12-07T14:30:00Z",
    jobId: "7",
  },
  {
    preSelectionTestId: 11,
    company: {
      companyName: "HealthTech Innovations",
      companyDescription: "Pioneering new technologies in healthcare.",
      logo: "",
      companyCity: "Chicago",
      companyProvince: "Illinois",
      addressDetails: "400 Wellness Ave",
      companyIndustry: "HealthTech",
      companySize: "200 employees",
      review: [
        "Collaborative work environment",
        "Impactful work",
        "Innovative products",
      ],
    },
    categoryId: 88,
    selectionTextActive: false,
    jobTitle: "Healthcare IT Specialist",
    salaryShow: false,
    salaryMin: 7500000,
    salaryMax: 8000000,
    jobDescription: "Support healthcare systems with innovative IT solutions.",
    jobExperienceMin: 2,
    jobExperienceMax: 4,
    expiredDate: "2025-11-30T14:30:00Z",
    status: true,
    jobType: ["full-time"],
    jobSpace: ["on-site"],
    createdAt: "2024-12-06T14:30:00Z",
    updatedAt: "2024-12-07T14:30:00Z",
    jobId: "8",
  },
  {
    preSelectionTestId: 12,
    company: {
      companyName: "DataStream Analytics",
      companyDescription:
        "Data-driven solutions for businesses across industries.",
      logo: "",
      companyCity: "New York",
      companyProvince: "New York",
      addressDetails: "150 Data Blvd",
      companyIndustry: "Analytics",
      companySize: "300 employees",
      review: ["Diverse team", "Challenging projects", "Great mentorship"],
    },
    categoryId: 90,
    selectionTextActive: true,
    jobTitle: "Data Scientist",
    salaryShow: true,
    salaryMin: 9500000,
    salaryMax: 11000000,
    jobDescription:
      "Analyze data to provide business insights and drive decisions.",
    jobExperienceMin: 3,
    jobExperienceMax: 6,
    expiredDate: "2025-12-25T14:30:00Z",
    status: true,
    jobType: ["full-time"],
    jobSpace: ["remote-working"],
    createdAt: "2024-12-06T14:30:00Z",
    updatedAt: "2024-12-07T14:30:00Z",
    jobId: "9",
  },
  {
    preSelectionTestId: 99,
    company: {
      companyName: "PG Shinra",
      companyDescription: "Leading retail technology provider.",
      logo: "",
      companyCity: "Los Angeles",
      companyProvince: "California",
      addressDetails: "987 Retail Rd",
      companyIndustry: "Retail",
      companySize: "100 employees",
      review: ["Innovative solutions", "Fast-growing", "Dynamic environment"],
    },
    categoryId: 82,
    selectionTextActive: false,
    jobTitle: "Retail Analyst",
    salaryShow: false,
    salaryMin: 7000000,
    salaryMax: 7500000,
    jobDescription: "Analyze retail trends and sales data.",
    jobExperienceMin: 2,
    jobExperienceMax: 4,
    expiredDate: "2025-12-06T14:30:00Z",
    status: false,
    jobType: ["full-time"],
    jobSpace: ["on-site"],
    createdAt: "2024-12-06T14:30:00Z",
    updatedAt: "2024-12-07T14:30:00Z",
    jobId: "6",
  },
  {
    preSelectionTestId: 98,
    company: {
      companyName: "PG Pertamono",
      companyDescription: "Leading retail technology provider.",
      logo: "",
      companyCity: "Los Angeles",
      companyProvince: "California",
      addressDetails: "987 Retail Rd",
      companyIndustry: "Retail",
      companySize: "100 employees",
      review: ["Innovative solutions", "Fast-growing", "Dynamic environment"],
    },
    categoryId: 82,
    selectionTextActive: false,
    jobTitle: "Retail Analyst",
    salaryShow: false,
    salaryMin: 7000000,
    salaryMax: 7500000,
    jobDescription: "Analyze retail trends and sales data.",
    jobExperienceMin: 2,
    jobExperienceMax: 4,
    expiredDate: "2025-12-06T14:30:00Z",
    status: false,
    jobType: ["full-time"],
    jobSpace: ["on-site"],
    createdAt: "2024-12-06T14:30:00Z",
    updatedAt: "2024-12-07T14:30:00Z",
    jobId: "6",
  },
  {
    preSelectionTestId: 97,
    company: {
      companyName: "PG Pertamono",
      companyDescription: "Leading retail technology provider.",
      logo: "",
      companyCity: "Los Angeles",
      companyProvince: "California",
      addressDetails: "987 Retail Rd",
      companyIndustry: "Retail",
      companySize: "100 employees",
      review: ["Innovative solutions", "Fast-growing", "Dynamic environment"],
    },
    categoryId: 82,
    selectionTextActive: false,
    jobTitle: "Retail Analyst",
    salaryShow: false,
    salaryMin: 7000000,
    salaryMax: 7500000,
    jobDescription: "Analyze retail trends and sales data.",
    jobExperienceMin: 2,
    jobExperienceMax: 4,
    expiredDate: "2025-12-06T14:30:00Z",
    status: false,
    jobType: ["full-time"],
    jobSpace: ["on-site"],
    createdAt: "2024-12-06T14:30:00Z",
    updatedAt: "2024-12-07T14:30:00Z",
    jobId: "6",
  },
  {
    preSelectionTestId: 96,
    company: {
      companyName: "PG Pertaloro",
      companyDescription: "Leading retail technology provider.",
      logo: "",
      companyCity: "Los Angeles",
      companyProvince: "California",
      addressDetails: "987 Retail Rd",
      companyIndustry: "Retail",
      companySize: "100 employees",
      review: ["Innovative solutions", "Fast-growing", "Dynamic environment"],
    },
    categoryId: 82,
    selectionTextActive: false,
    jobTitle: "Retail Analyst",
    salaryShow: false,
    salaryMin: 7000000,
    salaryMax: 7500000,
    jobDescription: "Analyze retail trends and sales data.",
    jobExperienceMin: 2,
    jobExperienceMax: 4,
    expiredDate: "2025-12-06T14:30:00Z",
    status: false,
    jobType: ["full-time"],
    jobSpace: ["on-site"],
    createdAt: "2024-12-06T14:30:00Z",
    updatedAt: "2024-12-07T14:30:00Z",
    jobId: "6",
  },
  {
    preSelectionTestId: 95,
    company: {
      companyName: "PG Pertatatata",
      companyDescription: "Leading retail technology provider.",
      logo: "",
      companyCity: "Los Angeles",
      companyProvince: "California",
      addressDetails: "987 Retail Rd",
      companyIndustry: "Retail",
      companySize: "100 employees",
      review: ["Innovative solutions", "Fast-growing", "Dynamic environment"],
    },
    categoryId: 82,
    selectionTextActive: false,
    jobTitle: "Retail Analyst",
    salaryShow: false,
    salaryMin: 7000000,
    salaryMax: 7500000,
    jobDescription: "Analyze retail trends and sales data.",
    jobExperienceMin: 2,
    jobExperienceMax: 4,
    expiredDate: "2025-12-06T14:30:00Z",
    status: false,
    jobType: ["full-time"],
    jobSpace: ["on-site"],
    createdAt: "2024-12-06T14:30:00Z",
    updatedAt: "2024-12-07T14:30:00Z",
    jobId: "6",
  },
];

export const CompanyListPostDummy: CompanyPostDummy[] = [
  {
    companyId: 1,
    companyName: "SmartRetail Solutions",
    companyDescription: "Leading retail technology provider.",
    logo: "",
    companyCity: "Los Angeles",
    companyProvince: "California",
    addressDetails: "987 Retail Rd",
    companyIndustry: "Retail",
    companySize: "100 employees",
    review: ["Innovative solutions", "Fast-growing", "Dynamic environment"],
  },
  {
    companyId: 2,
    companyName: "EcoTech Industries",
    companyDescription: "Sustainability-focused tech solutions.",
    logo: "",
    companyCity: "Denver",
    companyProvince: "Colorado",
    addressDetails: "123 Green St",
    companyIndustry: "Technology",
    companySize: "250 employees",
    review: [
      "Eco-conscious culture",
      "Friendly environment",
      "Opportunities to grow",
    ],
  },
  {
    companyId: 3,
    companyName: "Urban Solutions",
    companyDescription: "Innovative solutions for smart cities.",
    logo: "",
    companyCity: "Chicago",
    companyProvince: "Illinois",
    addressDetails: "456 Smart Ave",
    companyIndustry: "Urban Planning",
    companySize: "200 employees",
    review: [
      "Innovative work culture",
      "Collaborative environment",
      "Challenging projects",
    ],
  },
  {
    companyId: 11,

    companyName: "HealthTech Innovations",
    companyDescription: "Leading healthcare technology solutions provider.",
    logo: "",
    companyCity: "Austin",
    companyProvince: "Texas",
    addressDetails: "789 MedTech Blvd",
    companyIndustry: "Healthcare",
    companySize: "500 employees",
    review: [
      "Dynamic workplace",
      "Great team collaboration",
      "Innovative products",
    ],
  },

  {
    companyId: 12,

    companyName: "FinTech Solutions",
    companyDescription: "Innovative financial services platform.",
    logo: "",
    companyCity: "New York",
    companyProvince: "New York",
    addressDetails: "101 Finance St",
    companyIndustry: "Finance",
    companySize: "1000 employees",
    review: ["Competitive salary", "Supportive leadership", "Great tech stack"],
  },

  {
    companyId: 13,

    companyName: "AI Innovations",
    companyDescription: "Pioneers in Artificial Intelligence research.",
    logo: "",
    companyCity: "Seattle",
    companyProvince: "Washington",
    addressDetails: "234 AI Research Blvd",
    companyIndustry: "Technology",
    companySize: "300 employees",
    review: [
      "Cutting-edge research",
      "Collaborative team",
      "Innovation-driven",
    ],
  },

  {
    companyId: 14,

    companyName: "SmartComm Solutions",
    companyDescription:
      "Transforming communication with cutting-edge technology.",
    logo: "",
    companyCity: "San Jose",
    companyProvince: "California",
    addressDetails: "123 Communication Rd",
    companyIndustry: "Telecommunications",
    companySize: "800 employees",
    review: [
      "Great team spirit",
      "High impact work",
      "Opportunities for learning",
    ],
  },

  {
    companyId: 13,

    companyName: "CloudServices Corp",
    companyDescription: "Leading cloud services provider worldwide.",
    logo: "",
    companyCity: "Seattle",
    companyProvince: "Washington",
    addressDetails: "101 Cloud Rd",
    companyIndustry: "Cloud Computing",
    companySize: "1000 employees",
    review: ["Flexible work schedule", "Great benefits", "Global reach"],
  },

  {
    companyId: 12,

    companyName: "AutoTech Innovations",
    companyDescription: "Leading provider of autonomous vehicle technologies.",
    logo: "",
    companyCity: "Detroit",
    companyProvince: "Michigan",
    addressDetails: "123 Auto St",
    companyIndustry: "Automotive Technology",
    companySize: "400 employees",
    review: ["Innovative", "Fast-paced", "Cutting-edge projects"],
  },

  {
    companyId: 11,

    companyName: "HealthTech Solutions",
    companyDescription: "Innovating healthcare through technology.",
    logo: "",
    companyCity: "Chicago",
    companyProvince: "Illinois",
    addressDetails: "456 Wellness Dr",
    companyIndustry: "Health Technology",
    companySize: "200 employees",
    review: [
      "Meaningful work",
      "Health-focused environment",
      "Work-life balance",
    ],
  },

  {
    companyId: 10,

    companyName: "GlobalTech Solutions",
    companyDescription: "Providing cutting-edge software solutions globally.",
    logo: "",
    companyCity: "New York",
    companyProvince: "New York",
    addressDetails: "789 Tech Ave",
    companyIndustry: "Software",
    companySize: "500 employees",
    review: ["Innovative", "Growth opportunities", "Collaborative team"],
  },

  {
    companyId: 9,

    companyName: "EcoTech Industries",
    companyDescription: "Sustainability-focused tech solutions.",
    logo: "",
    companyCity: "Denver",
    companyProvince: "Colorado",
    addressDetails: "123 Green St",
    companyIndustry: "Technology",
    companySize: "250 employees",
    review: [
      "Eco-conscious culture",
      "Friendly environment",
      "Opportunities for growth",
    ],
  },

  {
    companyId: 10,

    companyName: "CyberSecure Solutions",
    companyDescription: "Global leader in cybersecurity and IT solutions.",
    logo: "",
    companyCity: "Austin",
    companyProvince: "Texas",
    addressDetails: "500 Cyber Pkwy",
    companyIndustry: "Cybersecurity",
    companySize: "500 employees",
    review: [
      "Innovative technologies",
      "Great team spirit",
      "Career advancement opportunities",
    ],
  },

  {
    companyId: 11,

    companyName: "HealthTech Innovations",
    companyDescription: "Pioneering new technologies in healthcare.",
    logo: "",
    companyCity: "Chicago",
    companyProvince: "Illinois",
    addressDetails: "400 Wellness Ave",
    companyIndustry: "HealthTech",
    companySize: "200 employees",
    review: [
      "Collaborative work environment",
      "Impactful work",
      "Innovative products",
    ],
  },

  {
    companyId: 12,

    companyName: "DataStream Analytics",
    companyDescription:
      "Data-driven solutions for businesses across industries.",
    logo: "",
    companyCity: "New York",
    companyProvince: "New York",
    addressDetails: "150 Data Blvd",
    companyIndustry: "Analytics",
    companySize: "300 employees",
    review: ["Diverse team", "Challenging projects", "Great mentorship"],
  },

  {
    companyId: 99,

    companyName: "PG Shinra",
    companyDescription: "Leading retail technology provider.",
    logo: "",
    companyCity: "Los Angeles",
    companyProvince: "California",
    addressDetails: "987 Retail Rd",
    companyIndustry: "Retail",
    companySize: "100 employees",
    review: ["Innovative solutions", "Fast-growing", "Dynamic environment"],
  },

  {
    companyId: 98,

    companyName: "PG Pertamono",
    companyDescription: "Leading retail technology provider.",
    logo: "",
    companyCity: "Los Angeles",
    companyProvince: "California",
    addressDetails: "987 Retail Rd",
    companyIndustry: "Retail",
    companySize: "100 employees",
    review: ["Innovative solutions", "Fast-growing", "Dynamic environment"],
  },

  {
    companyId: 97,

    companyName: "PG Pertamono",
    companyDescription: "Leading retail technology provider.",
    logo: "",
    companyCity: "Los Angeles",
    companyProvince: "California",
    addressDetails: "987 Retail Rd",
    companyIndustry: "Retail",
    companySize: "100 employees",
    review: ["Innovative solutions", "Fast-growing", "Dynamic environment"],
  },

  {
    companyId: 96,

    companyName: "PG Pertaloro",
    companyDescription: "Leading retail technology provider.",
    logo: "",
    companyCity: "Los Angeles",
    companyProvince: "California",
    addressDetails: "987 Retail Rd",
    companyIndustry: "Retail",
    companySize: "100 employees",
    review: ["Innovative solutions", "Fast-growing", "Dynamic environment"],
  },

  {
    companyId: 95,

    companyName: "PG Pertatatata",
    companyDescription: "Leading retail technology provider.",
    logo: "",
    companyCity: "Los Angeles",
    companyProvince: "California",
    addressDetails: "987 Retail Rd",
    companyIndustry: "Retail",
    companySize: "100 employees",
    review: ["Innovative solutions", "Fast-growing", "Dynamic environment"],
  },
];
