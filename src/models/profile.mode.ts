export interface WorkingExperience {
  workingExperienceId?: number | undefined;
  jobHunterId: number;
  companyId: number | null;
  jobTitle: string;
  jobDescription: string;
  companyName?: string;
}
