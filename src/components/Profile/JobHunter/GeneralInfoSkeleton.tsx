import React from "react";

const GeneralInfoSectionSkeleton = () => (
  <section className="p-4 rounded-2xl bg-white flex flex-col gap-6 md:p-6">
    <div className="flex flex-col gap-1">
      <h2 className="text-lg font-bold text-neutral-950 md:text-xl animate-pulse">
        <span className="w-24 h-4 bg-gray-300 rounded-full inline-block"></span>
      </h2>
      <p className="text-sm text-neutral-600 animate-pulse">
        <span className="w-48 h-3 bg-gray-300 rounded-full inline-block"></span>
      </p>
    </div>
    <form className="flex flex-col gap-5">
      <div>
        <label htmlFor="name" className="block mb-2 text-neutral-950">
          <span className="w-24 h-4 bg-gray-300 rounded-full inline-block animate-pulse"></span>
        </label>
        <div className="w-full h-10 bg-gray-300 rounded-md animate-pulse"></div>
      </div>

      <div>
        <label htmlFor="summary" className="block mb-2 text-neutral-950">
          <span className="w-24 h-4 bg-gray-300 rounded-full inline-block animate-pulse"></span>
        </label>
        <div className="w-full h-20 bg-gray-300 rounded-md animate-pulse"></div>
      </div>

      <div>
        <label htmlFor="expectedSalary" className="block mb-2 text-neutral-950">
          <span className="w-40 h-4 bg-gray-300 rounded-full inline-block animate-pulse"></span>
        </label>
        <p className="text-xs text-neutral-400 mb-2">
          <span className="w-48 h-3 bg-gray-300 rounded-full inline-block animate-pulse"></span>
        </p>
        <div className="w-full h-10 bg-gray-300 rounded-md animate-pulse"></div>
      </div>

      <div>
        <label htmlFor="gender" className="block mb-2 text-neutral-950">
          <span className="w-24 h-4 bg-gray-300 rounded-full inline-block animate-pulse"></span>
        </label>
        <div className="flex gap-4">
          <div className="w-20 h-8 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="w-20 h-8 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="w-20 h-8 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>

      <div>
        <label htmlFor="dob" className="block mb-2 text-neutral-950">
          <span className="w-24 h-4 bg-gray-300 rounded-full inline-block animate-pulse"></span>
        </label>
        <div className="w-full h-10 bg-gray-300 rounded-md animate-pulse"></div>
      </div>

      <div>
        <label htmlFor="email" className="block mb-2 text-neutral-950">
          <span className="w-40 h-4 bg-gray-300 rounded-full inline-block animate-pulse"></span>
        </label>
        <div className="flex flex-col md:flex-row md:w-full">
          <div className="w-1/2 h-10 bg-gray-300 rounded-md animate-pulse mr-2"></div>
          <div className="w-1/2 h-10 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>

      <div>
        <button
          className="w-[150px] bg-gray-300 text-white rounded-md px-4 py-4 disabled:opacity-50 animate-pulse"
          disabled
        >
          <span className="sr-only">Loading...</span>
        </button>
      </div>
    </form>
  </section>
);

export default GeneralInfoSectionSkeleton;
