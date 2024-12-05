export interface LoginAuth {
  email: string;
  password: string;
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
