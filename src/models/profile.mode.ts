export interface WorkingExperience {
  workingExperienceId?: number | undefined;
  jobHunterId: number | null;
  companyId: number | null;
  jobTitle: string;
  jobDescription: string;
  companyName?: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
}
