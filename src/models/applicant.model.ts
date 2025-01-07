export type JobStatus = "onreview" | "accepted" | "rejected" | "interview";

export enum JobApplicationStatus {
  Failed = "failed",
  OnReview = "onreview",
  Accepted = "accepted",
  Interview = "interview",
  Rejected = "rejected",
  OnTest = "ontest",
  WaitingSubmission = "waitingSubmission",
}

export interface Applicant {
  id: string;
  name: string;
  expectedSalary: number;
  resumeLink: string;
  applyDate: string;
  status: JobStatus;
}
export interface JobApplication {
  applicationId: string;
  applicationStatus: JobApplicationStatus;
  createdAt: Date;
  resume: string; // Assuming resume is stored as a string (could be a URL or base64)
  jobHunterId: string;
}
