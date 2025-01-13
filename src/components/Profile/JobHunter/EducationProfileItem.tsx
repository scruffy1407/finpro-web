import React from "react";
interface Props {
  graduatedDate: string;
  school: string;
  degree: string;
  gpa: number;
}

function EducationProfileItem({ gpa, degree, graduatedDate, school }: Props) {
  return (
    <div
      className={
        "max-w-[300px] p-3 border border-neutral-200 rounded-2xl shrink-0"
      }
    >
      <h6 className={"text-sm font-bold text-neutral-950 mb-1"}>{school}</h6>
      <p className={"text-xs text-neutral-600 mb-1"}>
        {degree} | GPA : {gpa}
      </p>
      <p className={"text-xs text-neutral-600"}>
        Graduated at : {graduatedDate}
      </p>
    </div>
  );
}

export default EducationProfileItem;
