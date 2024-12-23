export type JobStatus = 'onreview' | 'accepted' | 'rejected';

export interface Applicant {
  id: string;
  name: string;
  expectedSalary: number;
  resumeLink: string;
  applyDate: string;
  status: JobStatus;
}