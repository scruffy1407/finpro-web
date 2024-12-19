import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ButtonComponent from "./ButtonComponent";
import AsyncSelect from "react-select/async";
import { locationOptions } from "@/utils/datadummy";
import { LocationOption } from "@/utils/interface";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: "10px",
    padding: "1px", // Adjust the value for the border radius
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

function SearchBarCompanyListComponent() {
  return (
    <div className=" max-w-screen-xl mx-auto flex flex-col md:flex md:flex-row gap-5 items-center md:items-end mt-2">
      <div className="w-full md:w-[45%]">
        <Label className="font-semibold text-neutral-950" htmlFor="position">
          Search :{" "}
        </Label>
        <Input
          className="rounded-xl "
          id="position"
          type="text"
          placeholder="Ex : Web Developer"
        />
      </div>
      <div className="w-full md:w-[45%] rounded-xl">
        <Label className="font-semibold text-neutral-950" htmlFor="location">
          All Location :{" "}
        </Label>
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={promiseLocationOptions}
          placeholder="Search Location"
          styles={customStyles} // Apply custom styles here
        />
      </div>
      <div className="hidden md:w-[10%] md:block">
        <ButtonComponent type="ButtonSearch" />
      </div>
      <div className="block w-full md:hidden md:w-[15%] mt-0">
        <ButtonComponent type="ButtonFilledCustom" container="search" />
      </div>
    </div>
  );
}

export default SearchBarCompanyListComponent;
