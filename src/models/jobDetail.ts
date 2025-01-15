export interface JobPostDetail {
  job_id: number; // Unique identifier for the job post
  preSelectionTestId: number | null; // ID of the pre-selection test (nullable)
  companyId: number; // ID of the associated company
  categoryId: number; // ID of the job category
  selection_text_active: boolean; // Whether the selection test is active
  job_title: string; // Job title
  salary_show: boolean; // Whether the salary is displayed
  salary_min: string; // Minimum salary (as a string)
  salary_max: string; // Maximum salary (as a string)
  job_description: string; // Job description in HTML format
  job_experience_min: number; // Minimum years of experience required
  job_experience_max: number; // Maximum years of experience required (0 if not applicable)
  expired_date: string; // Expiration date of the job posting (ISO string)
  status: boolean; // Whether the job post is active
  deleted: boolean; // Whether the job post is deleted
  job_type: string; // Type of job (e.g., "fulltime")
  job_space: string; // Work mode (e.g., "hybrid")
  created_at: string; // Creation timestamp (ISO string)
  updated_at: string; // Last updated timestamp (ISO string)
  company: CompanyDetails; // Details of the associated company
  category: JobCategory; // Category of the job
  preSelectionTest: PreSelectionTest | null; // Pre-selection test details (nullable)
}

export interface CompanyDetails {
  company_id: number; // Unique identifier for the company
  company_name: string; // Name of the company
  company_description: string; // Description of the company
  logo: string | null; // Logo URL (nullable)
  company_city: string; // City where the company is located
  company_province: string; // Province where the company is located
  address_details: string; // Address details (if any)
  company_industry: string | null; // Industry type (nullable)
  company_size: string | null; // Company size (nullable)
  review: any[]; // Array of reviews (if any)
}

export interface JobCategory {
  category_name: string; // Name of the job category
}

export interface PreSelectionTest {
  // Define this based on your actual pre-selection test structure
  testId?: number;
  testName?: string;
}
