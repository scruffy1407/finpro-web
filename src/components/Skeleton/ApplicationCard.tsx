import React from "react";

function ApplicationCardSkeleton() {
  return (
    <div
      className={
        "bg-white h-[132px] rounded-2xl w-full p-5 flex flex-col gap-5"
      }
    >
      <div className={"flex items-center justify-between"}>
        <div className={"flex flex-col gap-2"}>
          <div
            className={"w-[210px] h-7 rounded-xl bg-gray-200 animate-pulse"}
          ></div>
          <div
            className={"w-[150px] h-4 rounded-xl bg-gray-200 animate-pulse"}
          ></div>
        </div>
        <div
          className={`w-[100px] h-7 rounded-2xl bg-gray-200 animate-pulse`}
        ></div>
      </div>
      <div className={"flex gap-4 items-center"}>
        <div
          className={"h-4 w-[50px] rounded-xl bg-gray-200 animate-pulse"}
        ></div>
        <div
          className={"h-4 w-[72px] rounded-xl bg-gray-200 animate-pulse"}
        ></div>
        <div
          className={"h-4 w-[120px] rounded-xl bg-gray-200 animate-pulse"}
        ></div>
      </div>
    </div>
  );
}

export default ApplicationCardSkeleton;
