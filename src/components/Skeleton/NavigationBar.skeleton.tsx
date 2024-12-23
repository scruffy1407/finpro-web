import React from "react";

function NavigationBarSkeleton() {
  return (
    <div className={`max-w-screen-xl min-h-[80px] mx-auto mt-4`}>
      <div
        className={`bg-white flex justify-between rounded-xl py-5 px-4 pr-5`}
      >
        <div className="flex justify-between gap-9 items-center">
          <div
            className={"w-[120px] rounded-xl h-6 bg-gray-200 animate-pulse"}
          ></div>
          <div className={"flex gap-5"}>
            <div
              className={"w-[40px] rounded-xl h-5 bg-gray-200 animate-pulse"}
            ></div>
            <div
              className={"w-[40px] rounded-xl h-5 bg-gray-200 animate-pulse"}
            ></div>
            <div
              className={"w-[40px] rounded-xl h-5 bg-gray-200 animate-pulse"}
            ></div>
          </div>
        </div>
        <div
          className={
            "h-[40px] w-[150px] rounded-xl h-5 bg-gray-200 animate-pulse"
          }
        ></div>
      </div>
    </div>
  );
}

export default NavigationBarSkeleton;
