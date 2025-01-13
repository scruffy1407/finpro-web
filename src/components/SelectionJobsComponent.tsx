import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/store/slices/searchQuerySlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/store";

function SelectionJobsComponents() {
  const dispatch = useDispatch();
  const { jobType, dateRange, sortOrder } = useSelector(
    (state: RootState) => state.searchQuery,
  );

  // Local state initialized only once based on Redux values.
  const [localJobType, setLocalJobType] = useState(jobType || "all");
  const [localDateRange, setLocalDateRange] = useState(dateRange || "all");
  const [localSortOrder, setLocalSortOrder] = useState(sortOrder || "newest");

  // Sync local state with Redux state only once on initial render
  useEffect(() => {
    // Initialize local state based on Redux state only once
    setLocalJobType(jobType || "all");
    setLocalDateRange(dateRange || "all");
    setLocalSortOrder(sortOrder || "newest");
  }, []);

  // Update Redux when jobType, dateRange, or sortOrder changes
  const handleJobTypeChange = (value: string) => {
    setLocalJobType(value);
    dispatchUpdate(value, localDateRange, localSortOrder); // Update Redux state
  };

  const handleDateRangeChange = (value: string) => {
    setLocalDateRange(value);
    dispatchUpdate(localJobType, value, localSortOrder); // Update Redux state
  };

  const handleSortOrderChange = (value: string) => {
    setLocalSortOrder(value);
    dispatchUpdate(localJobType, localDateRange, value); // Update Redux state
  };

  // Dispatch updates to Redux
  const dispatchUpdate = (
    jobType: string,
    dateRange: string,
    sortOrder: string,
  ) => {
    dispatch(setSearchQuery({ jobType, dateRange, sortOrder }));
  };

  return (
    <div className=" overflow-x-auto snap-x sm:snap-none flex justify-between gap-10">
      <div className=" flex flex-col-reverse flex-shrink-0 items-center gap-6 snap-start md:flex-row">
        <div>
          <p className="text-neutral-500 text-sm">We found 500+ Jobs</p>
        </div>
        <div className={"flex flex-shrink-0 gap-3"}>
          <div>
            <Select value={localJobType} onValueChange={handleJobTypeChange}>
              <SelectTrigger className="w-full md:w-[138px] rounded-xl">
                <div className="text-slate-500">
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Job Type</SelectItem>
                <SelectItem value="fulltime">Full Time</SelectItem>
                <SelectItem value="freelance">FreeLance</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              value={localDateRange}
              onValueChange={handleDateRangeChange}
            >
              <SelectTrigger className="w-full md:w-[150px] rounded-xl">
                <div className="text-slate-500">
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Range</SelectItem>
                <SelectItem value="last7days">7 Days Ago</SelectItem>
                <SelectItem value="thisMonth">1 Month Ago</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className={"text-sm"}>Sorted by</span>

        <div>
          <Select value={localSortOrder} onValueChange={handleSortOrderChange}>
            <SelectTrigger className="w-full md:w-[124px] rounded-xl">
              <div className="text-slate-500">
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">A-Z</SelectItem>
              <SelectItem value="desc">Z-A</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default SelectionJobsComponents;
