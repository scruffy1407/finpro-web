import React from "react";

const CompanyInfoTabSkeleton = () => (
  <div className="bg-white rounded-lg h-48 animate-pulse" />
);

const JobListTabSkeleton = () => (
  <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="bg-gray-200 rounded-lg h-24 animate-pulse" />
    ))}
  </div>
);

const ReviewTabSkeleton = () => (
  <div className="bg-white rounded-lg h-48 animate-pulse" />
);

const CompanyHighlightSkeleton = () => (
  <div className="bg-white h-[200px] rounded-lg h-24 flex flex-col gap-4 p-4 md:w-[335px]">
    <div className="w-10 h-10 rounded-full bg-gray-300 mr-4 animate-pulse" />
    <div>
      <div className="w-24 h-4 bg-gray-300 mb-2 animate-pulse" />
      <div className="w-16 h-3 bg-gray-300 animate-pulse" />
    </div>
  </div>
);

const TabsSkeleton = () => (
  <div className="w-full flex flex-col gap-4">
    <div
      className={`w-full flex gap-4 rounded-2xl bg-white py-4 px-4 h-fit justify-start gap-4 `}
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="px-4 py-2 rounded-2xl border data-[state=active]:bg-sky-50 data-[state=active]:border-blue-600 w-24 h-8 bg-gray-200 animate-pulse"
        />
      ))}
    </div>
    <CompanyInfoTabSkeleton />
    <JobListTabSkeleton />
    <ReviewTabSkeleton />
  </div>
);

const SectionSkeleton = () => (
  <section className="w-full flex flex-col gap-4 md:flex-row md:gap-6 md:max-w-screen-xl md:mx-auto px-4 mt-4">
    <CompanyHighlightSkeleton />
    <TabsSkeleton />
  </section>
);

export default SectionSkeleton;
