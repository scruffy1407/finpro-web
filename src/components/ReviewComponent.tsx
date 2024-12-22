import React from "react";
import Image from "next/image";
import { calculateAverageRating } from "@/utils/jobs.utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ReviewComponentProps {
  reviewTitle: string;
  reviewDescription: string;
  totalYear: number;
  careerPathRating: number;
  culturalRating: number;
  facilictyRating: number;
  workBalanceRating: number;
}

function ReviewComponent({
  reviewTitle,
  reviewDescription,
  totalYear,
  careerPathRating,
  workBalanceRating,
  facilictyRating,
  culturalRating,
}: ReviewComponentProps) {
  const totalRating =
    careerPathRating + workBalanceRating + facilictyRating + culturalRating;
  const averageRating = totalRating / 4;

  return (
    <div className={"w-full p-5 bg-white rounded-xl flex flex-col gap-4"}>
      <div className={"flex items-center justify-between"}>
        <div className={"flex flex-col gap-2"}>
          <h3 className={"font-bold text-neutral-950"}>{reviewTitle}</h3>
          <p className={"text-xs text-neutral-400"}>
            Work {totalYear} year in this company
          </p>
        </div>
        <Popover>
          <PopoverTrigger>
            <button
              className={`flex items-center gap-1 p-1 px-2 border border-zinc-100 rounded-2xl hover:bg-zinc-50`}
            >
              <Image
                width={50}
                height={50}
                alt={"rating-star"}
                src={"/star.svg"}
                className={"w-5"}
              />
              <span className={"text-xs font-bold text-neutral-600"}>
                {averageRating}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            className={
              "w-64 flex flex-col gap-4 rounded-2xl border-none shadow-2xl"
            }
          >
            <h5 className={"text-sm font-bold text-neutral-950"}>
              Rating Breakdown
            </h5>
            <div className={"flex justify-between items-center"}>
              <p className={"text-xs text-neutral-600"}>Career Path</p>
              <div className={"flex gap-2"}>
                <span className={"text-xs font-bold text-neutral-600"}>
                  {careerPathRating}
                </span>
                <Image
                  width={50}
                  height={50}
                  alt={"rating-star"}
                  src={"/star.svg"}
                  className={"w-4"}
                />
              </div>
            </div>
            <div className={"flex justify-between items-center"}>
              <p className={"text-xs  text-neutral-600"}>Work Life Balance</p>
              <div className={"flex gap-2"}>
                <span className={"text-xs font-bold text-neutral-600"}>
                  {workBalanceRating}
                </span>
                <Image
                  width={50}
                  height={50}
                  alt={"rating-star"}
                  src={"/star.svg"}
                  className={"w-4"}
                />
              </div>
            </div>
            <div className={"flex justify-between items-center"}>
              <p className={"text-xs text-neutral-600"}>Work Facilities</p>
              <div className={"flex gap-2"}>
                <span className={"text-xs font-bold text-neutral-600"}>
                  {facilictyRating}
                </span>
                <Image
                  width={50}
                  height={50}
                  alt={"rating-star"}
                  src={"/star.svg"}
                  className={"w-4"}
                />
              </div>
            </div>
            <div className={"flex justify-between items-center"}>
              <p className={"text-xs  text-neutral-600"}>Cultural Rating</p>
              <div className={"flex gap-2"}>
                <span className={"text-xs font-bold text-neutral-600"}>
                  {culturalRating}
                </span>
                <Image
                  width={50}
                  height={50}
                  alt={"rating-star"}
                  src={"/star.svg"}
                  className={"w-4"}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <p className="text-sm text-neutral-600">{reviewDescription}</p>
    </div>
  );
}

export default ReviewComponent;
