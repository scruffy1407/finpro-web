import React from "react";

const JobPostComponentSkeleton = () => {
  return (
    <div className="bg-white w-full h-fit bg-white rounded-xl hover:shadow-lg">
      <div className="p-4 flex flex-col gap-6">
        <div className={`flex flex-col gap-5`}>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
              <div className="w-20 h-4 bg-gray-200 animate-pulse" />
            </div>
            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-32 h-4 bg-gray-200 animate-pulse" />
            <div className="w-20 h-3 bg-gray-200 animate-pulse" />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="w-20 h-3 bg-gray-200 rounded-xl animate-pulse" />
            <div className="w-20 h-3 bg-gray-200 rounded-xl animate-pulse" />
            <div className="w-32 h-3 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
        <div className="border-t-2 border-gray-200 w-full"></div>
        <div className="flex justify-between items-center ">
          <div className="w-20 h-3 bg-gray-200 animate-pulse" />
          <div className="w-32 h-3 bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default JobPostComponentSkeleton;
