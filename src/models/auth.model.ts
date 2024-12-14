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
