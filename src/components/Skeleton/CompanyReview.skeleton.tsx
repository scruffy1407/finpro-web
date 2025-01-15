import React from "react";

function CompanyReviewSkeleton() {
  return (
    <section className={"w-full p-4"}>
      <div className="max-w-screen-sm min-h-[350px] mx-auto p-8 bg-white rounded-2xl flex flex-col gap-8 animate-pulse">
        <div className={"flex flex-col gap-2"}>
          <div
            className={"h-8 w-[350px] rounded-2xl bg-gray-200 animate-pulse"}
          ></div>

          <div
            className={"h-4 w-[150px] rounded-2xl bg-gray-200 animate-pulse"}
          ></div>
        </div>
        <div className={`flex flex-col gap-8`}>
          <div className={"flex flex-col gap-6 p-4 rounded-2xl bg-zinc-50"}>
            <div className={"flex flex-col gap-2"}>
              <div
                className={
                  "h-6 w-[300px] rounded-2xl bg-gray-200 animate-pulse"
                }
              ></div>

              <div
                className={
                  "h-4 w-[100px] rounded-2xl bg-gray-200 animate-pulse mb-4"
                }
              ></div>
              <div className={"flex gap-8"}>
                <div
                  className={
                    "h-8 w-[100px] rounded-2xl bg-gray-200 animate-pulse"
                  }
                ></div>
                <div
                  className={
                    "h-8 w-[100px] rounded-2xl bg-gray-200 animate-pulse"
                  }
                ></div>
                <div
                  className={
                    "h-8 w-[100px] rounded-2xl bg-gray-200 animate-pulse"
                  }
                ></div>
              </div>
            </div>
            <div
              className={"h-10 w-[100px] rounded-2xl bg-gray-200 animate-pulse"}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompanyReviewSkeleton;
