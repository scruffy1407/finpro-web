import React from "react";

const BadgeSkeleton = () => {
  return (
    <div className="rounded-2xl bg-white flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="p-4 flex flex-col items-center bg-gray-100 rounded-2xl animate-pulse"
          >
            <div className="w-16 h-16 rounded-full bg-gray-200 mb-2" />
            <div className="w-24 h-4 bg-gray-200 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeSkeleton;
