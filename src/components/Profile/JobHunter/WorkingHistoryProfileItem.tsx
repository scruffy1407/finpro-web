import React, { useState } from "react";
import { format } from "date-fns";

interface Props {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

function WorkingHistoryProfileItem({
  jobTitle,
  endDate,
  startDate,
  company,
  description,
}: Props) {
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const formattedStartDate = format(new Date(startDate), "MMM, dd yyyy");
  const formattedEndDate = endDate
    ? format(new Date(endDate as string), "MMM, dd yyyy")
    : null;

  const formattedDateRange = `${formattedStartDate} - ${formattedEndDate ? formattedEndDate : "Present"}`;

  const handleSeeMoreClick = () => {
    setIsSummaryExpanded(!isSummaryExpanded);
  };
  return (
    <div className={"p-3 border border-neutral-200 rounded-2xl"}>
      <p className={"text-xs text-neutral-600 mb-1"}>Work at {company} as</p>
      <div className={"flex gap-1 items-center mb-2"}>
        <h6 className={"text-sm font-bold text-neutral-950 "}>{jobTitle}</h6>
        <p className={"text-xs text-neutral-600"}>{formattedDateRange}</p>
      </div>
      <p
        className={`text-xs text-neutral-600 ${
          isSummaryExpanded ? "line-clamp-none" : `line-clamp-2`
        }`}
      >
        {description || "User not provide detail working experience"}
      </p>
      {description && (
        <button
          className={`text-xs text-neutral-600 hover:underline ${
            isSummaryExpanded ? "hidden" : ""
          }`}
          onClick={handleSeeMoreClick}
        >
          See More
        </button>
      )}
      {description && (
        <button
          className={`text-xs text-neutral-600 hover:underline ${
            !isSummaryExpanded ? "hidden" : ""
          }`}
          onClick={handleSeeMoreClick}
        >
          See Less
        </button>
      )}{" "}
    </div>
  );
}

export default WorkingHistoryProfileItem;
