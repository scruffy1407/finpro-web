export type EducationDegreeType =
  | "lessthanhighschool"
  | "highschool"
  | "vocational"
  | "associatedegree"
  | "bachelordegree"
  | "masterdegree"
  | "doctoratedegree";

export enum EducationDegree {
  lessThanHighSchool = "lessthanhighschool",
  highSchool = "highschool",
  vocational = "vocational",
  associateDegree = "associatedegree",
  bachelorDegree = "bachelordegree",
  masterDegree = "masterdegree",
  doctorateDegree = "doctoratedegree",
}

export enum EducationDegreeResult {
  lessthanhighschool = "Less than High School",
  highschool = "High School",
  vocational = "Vocational",
  associatedegree = "Associate Degree",
  bachelordegree = "Bachelor Degree",
  masterdegree = "Master Degree",
  doctoratedegree = "Doctorate Degree",
}

// Optional: Create an interface for better type safety
export interface EducationDegreeOption {
  value: EducationDegree;
  label: EducationDegreeResult;
}

export const educationDegreeOptions: EducationDegreeOption[] = [
  {
    value: EducationDegree.lessThanHighSchool,
    label: EducationDegreeResult.lessthanhighschool,
  },
  {
    value: EducationDegree.highSchool,
    label: EducationDegreeResult.highschool,
  },
  {
    value: EducationDegree.vocational,
    label: EducationDegreeResult.vocational,
  },
  {
    value: EducationDegree.associateDegree,
    label: EducationDegreeResult.associatedegree,
  },
  {
    value: EducationDegree.bachelorDegree,
    label: EducationDegreeResult.bachelordegree,
  },
  {
    value: EducationDegree.masterDegree,
    label: EducationDegreeResult.masterdegree,
  },
  {
    value: EducationDegree.doctorateDegree,
    label: EducationDegreeResult.doctoratedegree,
  },
];
