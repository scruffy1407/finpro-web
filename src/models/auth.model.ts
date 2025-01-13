import { EducationDegreeType } from "@/models/educationDegree";

export enum UserRole {
  JOBHUNTER = "jobhunter",
  COMPANY = "company",
  DEVELOPER = "developer",
}

export interface LoginAuth {
  email: string;
  password: string;
  user_role: string;
  callback?: string;
}

export interface RegisterAuth {
  name: string;
  email: string;
  password: string;
  role_type?: "company" | "jobhunter";
}
export interface userProfile {
  name: string;
}

export interface WorkForm {
  workingHistoryId?: number;
  companyId?: number;
  companyName: string;
  position: string;
  description: string;
}
export interface EducationForm {
  educationId?: number;
  schoolName: string;
  degree: EducationDegreeType;
  gpa: number;
  description: string;
  educationDate: string;
  jobHunter: number;
}

export interface JobHunterGeneralInfoData {
  jobHunterId: string | number;
  name: string;
  dob: string | null | Date; // date only when to hit an api
  gender: "male" | "female" | "other" | undefined;
  locationCity: string | null;
  locationProvince: string | null;
  cityId: undefined | number;
  provinceId: undefined | number;
  expectedSalary: string | number | null;
  summary: string;
}

export interface JobHunterGeneralInfo {
  jobHunterId: string | number;
  name: string;
  dob: string | null | Date; // date only when to hit an api
  gender: "male" | "female" | "other" | undefined;
  locationCity: string | null;
  locationProvince: string | null;
  cityId: undefined | number;
  provinceId: undefined | number;
  expectedSalary: string | number | null;
  summary: string;
}

export interface CompanyGeneralInfo {
  companyId: string | number;
  company_name: string;
  phone_number: string;
  company_description: string;
  address_details: string;
  company_city: string | null;
  company_province: string | null;
  company_industry: CompanyIndustry | string;
  company_size: CompanySize | string;
  cityId: undefined | number;
  provinceId: undefined | number;
}

export enum CompanyIndustry {
  InformationTechnologyAndServices = "informationtechnologyandservices",
  FinanceAndBanking = "financeandbanking",
  BusinessAndHR = "businessandhr",
  HospitalAndHealthcare = "hospitalandhealthcare",
  ConstructionAndRealEstate = "constructionandrealestate",
  RetailLogisticsAndConsumerGoods = "retaillogisticandconsumergoods",
  EducationAndResearch = "educationandresearch",
  ManufacturingAndEngineering = "manufacturingandengineering",
  MediaAndEntertainment = "mediaandentertainment",
  GovernmentAndNonProfit = "governmentandnonprofit",
  Others = "others",
}

export enum CompanySize {
  Small = "small",
  SmallMedium = "smallmedium",
  Medium = "medium",
  Large = "large",
  Enterprise = "enterprise",
}

export interface ProvinceItem {
  province_id: number;
  name: string;
}
export interface CityItem {
  city_id: number;
  name: string;
  provinceId: number;
}

export interface locationList {
  value: number;
  label: string;
}
export interface UpdateImage {
  id: number; // Can be job hunter ID or Company ID
  image: File;
}
