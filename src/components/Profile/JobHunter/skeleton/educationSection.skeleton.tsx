import React from "react";

function EducationSectionSkeleton() {
  return (
    <section className="p-4 rounded-2xl bg-white flex flex-col gap-6 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold text-neutral-950 md:text-xl animate-pulse">
            <span className="w-24 h-4 bg-gray-300 rounded-full inline-block"></span>
          </h2>
          <p className="text-sm text-neutral-600 animate-pulse">
            <span className="w-48 h-3 bg-gray-300 rounded-full inline-block"></span>
          </p>
          <p className="text-sm text-neutral-600 animate-pulse">
            <span className="w-56 h-3 bg-gray-300 rounded-full inline-block"></span>
          </p>
        </div>
        <div className="w-[150px] h-10 rounded-2xl"></div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="border border-neutral-200 rounded-xl p-4 flex flex-col gap-4 animate-pulse"
          >
            <div className="flex gap-2 item-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-bold text-neutral-950">
                  <span className="w-24 h-4 bg-gray-300 rounded-full inline-block"></span>
                </h3>
                <div className="flex gap-3 item-center">
                  <p className="text-xs text-neutral-600">
                    <span className="w-20 h-3 bg-gray-300 rounded-full inline-block"></span>
                  </p>
                  <div className="w-[1px] h-full border border-neutral-200"></div>
                  <p className="text-xs text-neutral-600">
                    <span className="w-10 h-3 bg-gray-300 rounded-full inline-block"></span>
                  </p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
            </div>
            <p className="line-clamp-3 text-sm text-neutral-600 h-10 bg-gray-300 rounded animate-pulse"></p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EducationSectionSkeleton;
