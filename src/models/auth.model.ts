import { EducationDegree } from "@/models/educationDegree";

export interface LoginAuth {
  email: string;
  password: string;
  user_role: string;
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
  degree: EducationDegree;
  gpa: number;
  description: string;
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
