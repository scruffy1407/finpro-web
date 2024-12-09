import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ButtonComponent from "./ButtonComponent";
import AsyncSelect from "react-select/async";
import { locationOptions } from "@/utils/datadummy";
import { LocationOption } from "@/utils/interface";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: "12px",
    padding: "1px", // Adjust the value for the border radius
    borderColor: "rgb(228 228 261)",
  }),
};
// data.ts

const filterLocations = (inputValue: string) => {
  return locationOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase()),
  );
};

const promiseLocationOptions = (inputValue: string) =>
  new Promise<LocationOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterLocations(inputValue));
    }, 1000);
  });

function SearchBarComponent() {
  return (
    <div className="flex flex-col md:flex md:flex-row gap-5 items-center md:items-end mt-2">
      <div className="w-full md:w-[35%]">
        <Label className="font-semibold text-neutral-950" htmlFor="position">
          Position :{" "}
        </Label>
        <Input
          className="rounded-xl text-sm text-neutral-950"
          id="position"
          type="text"
          placeholder="Ex : Web Developer"
        />
      </div>
      <div className="w-full md:w-[30%]">
        <Label className="font-semibold text-neutral-950" htmlFor="position">
          Job Category :{" "}
        </Label>
        <Select>
          <SelectTrigger className=" w-full rounded-xl">
            <SelectValue
              className={`text-sm text-neutral-950`}
              placeholder="Select Job Category"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={`text-sm`} value="light">
              Digital Marketing
            </SelectItem>
            <SelectItem className={`text-sm`} value="dark">
              Web Developer
            </SelectItem>
            <SelectItem className={`text-sm`} value="system">
              Back-End Developer
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-[35%] rounded-xl">
        <Label className="font-semibold text-neutral-950" htmlFor="location">
          Location :{" "}
        </Label>
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={promiseLocationOptions}
          placeholder="Search Location"
          styles={customStyles} // Apply custom styles here
          className={`border-zinc-200 rounded-xl text-sm placeholder:text-sm relative z-50`}
        />
      </div>
      <div className="hidden md:w-[15%] md:block">
        <ButtonComponent type="ButtonSearch" />
      </div>
      <div className="block w-full md:hidden md:w-[15%] mt-0">
        <ButtonComponent type="ButtonFilledCustom" container="search" />
      </div>
    </div>
  );
}

export default SearchBarComponent;
