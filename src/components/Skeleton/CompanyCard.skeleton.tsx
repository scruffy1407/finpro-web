import React from "react";

function CompanyCardSkeleton() {
  return (
    <div
      className={"h-194 w-full bg-white rounded-2xl p-5 flex flex-col gap-5"}
    >
      <div className={"rounded-xl w-10 h-10 bg-gray-200 animate-pulse"}></div>
      <div className={"flex flex-col gap-2"}>
        <div className={"rounded-xl h-6 w-40 bg-gray-200 animate-pulse"}></div>
        <div className={"rounded-xl h-4 w-32 bg-gray-200 animate-pulse"}></div>
      </div>
      <div className={"rounded-xl w-20 h-7 bg-gray-200 animate-pulse"}></div>
    </div>
  );
}

export default CompanyCardSkeleton;
