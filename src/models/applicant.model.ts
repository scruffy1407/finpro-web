export type JobStatus = "onreview" | "accepted" | "rejected" | "interview";

export enum JobApplicationStatus {
	Failed = "failed",
	OnReview = "onreview",
	Accepted = "accepted",
	Interview = "interview",
	Rejected = "rejected",
	OnTest = "onTest",
	WaitingSubmission = "waitingSubmission",
}

export interface Applicant {
  id: string;
  name: string;
  expectedSalary: number;
  resumeLink: string;
  applyDate: string;
  status: JobStatus;
  interviewStatus?: string;
  interviewDate?: string;
  interviewDescription?: string;
  interviewUrl?: string;
  interviewTimeStart?: string;
  interviewTimeEnd?: string;
  interviewId: number;
}
export interface JobApplication {
	applicationId: string;
	applicationStatus: JobApplicationStatus;
	createdAt: Date;
	resume: string; // Assuming resume is stored as a string (could be a URL or base64)
	jobHunterId: string;
	endDate?: string; // From resultPreSelection
	completionStatus?: "pass" | "failed"; // From resultPreSelection
	jobId ?: number
}
