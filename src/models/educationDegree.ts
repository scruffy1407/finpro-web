enum EducationDegree {
  Lessthanhighschool = "lessthanhighschool",
  Highschool = "highschool",
  Vocational = "vocational",
  Associatedegree = "associatedegree",
  Bachelordegree = "bachelordegree",
  Masterdegree = "masterdegree",
  Doctoratedegree = "doctoratedegree",
}

// Optional: Create an interface for better type safety
interface EducationDegreeOption {
  value: EducationDegree;
  label: string;
}

const educationDegreeOptions: EducationDegreeOption[] = [
  { value: EducationDegree.Lessthanhighschool, label: "Less than High School" },
  { value: EducationDegree.Highschool, label: "High School" },
  { value: EducationDegree.Vocational, label: "Vocational" },
  { value: EducationDegree.Associatedegree, label: "Associate Degree" },
  { value: EducationDegree.Bachelordegree, label: "Bachelor Degree" },
  { value: EducationDegree.Masterdegree, label: "Master Degree" },
  { value: EducationDegree.Doctoratedegree, label: "Doctorate Degree" },
];

export { EducationDegree, educationDegreeOptions, EducationDegreeOption };
