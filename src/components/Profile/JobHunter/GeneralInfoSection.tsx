import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AsyncSelect from "react-select/async";
import ButtonComponent from "@/components/ButtonComponent";
import { LocationOption } from "@/utils/interface";
import { locationOptions } from "@/utils/datadummy";

// DUMMY ACTION
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

function GeneralInfoSection() {
  return (
    <section className="p-4 rounded-2xl bg-white flex flex-col gap-6 md:p-6">
      <div className={`flex flex-col gap-1`}>
        <h2 className="text-lg font-bold text-neutral-950 md:text-xl">
          General Information
        </h2>
        <p className={`text-sm text-neutral-600`}>
          Providing complete personal information helps recruiters get to know
          you better.
        </p>
      </div>
      <form className="flex flex-col gap-5">
        <div>
          {/*FULL NAME*/}
          <Label htmlFor={`email`} className="block mb-2 text-neutral-950">
            Full Name
          </Label>
          <Input
            className="rounded-xl "
            name={`name`}
            type="text"
            placeholder="Enter your name"
          />
        </div>

        {/*JOB HUNTER DESCRIPTION*/}
        <div>
          <Label htmlFor={`email`} className="block mb-2 text-neutral-950">
            Tell us about yourself
          </Label>
          <Textarea
            className="rounded-xl "
            placeholder={"Type your description here"}
          />
        </div>

        {/*GENDER*/}
        <div>
          <Label htmlFor={`email`} className="block mb-2 text-neutral-950">
            Gender
          </Label>
          <RadioGroup className={`flex gap-4`} defaultValue="male">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label className="text-neutral-950" htmlFor="male">
                Male
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label className="text-neutral-950" htmlFor="female">
                Female
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="others" id="others" />
              <Label className="text-neutral-950" htmlFor="others">
                Others
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/*DATE OF BIRTH*/}
        <div>
          <Label htmlFor={`email`} className="block mb-2 text-neutral-950">
            Date of Birth
          </Label>
          <input
            className={`h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300`}
            type="date"
          />
        </div>
        <div>
          <div>
            <Label htmlFor={`email`} className="block mb-2 text-neutral-950">
              Where do you currently live?
            </Label>
            <div
              className={`flex flex-col item-center gap-2 md:flex-row md:w-full`}
            >
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={promiseLocationOptions}
                className={`rounded-2xl md:w-full `}
                placeholder="Select Province"
              />
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={promiseLocationOptions}
                className={`md:w-full`}
                placeholder="Select City"
              />
            </div>
          </div>
        </div>
        <ButtonComponent
          type={`ButtonFilled`}
          isFullWidth={false}
          container={`Save Change`}
        />
      </form>
    </section>
  );
}

export default GeneralInfoSection;
