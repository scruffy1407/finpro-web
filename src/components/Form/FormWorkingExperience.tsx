import React from "react";
import { Label } from "@/components/ui/label";
import AsyncSelect from "react-select/async";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function FormWorkingExperience() {
  return (
    <form className="flex flex-col gap-5">
      <div>
        {/*FULL NAME*/}
        <Label htmlFor={`email`} className="block mb-2 text-neutral-950">
          Company Name
        </Label>
        <AsyncSelect
          cacheOptions
          theme={(theme) => {
            return {
              ...theme,
              borderRadius: 12,
              colors: {
                ...theme.colors,
                primary25: "#f8f7f7",
                primary: "black",
              },
            };
          }}
        />
      </div>

      <div>
        {/*FULL NAME*/}
        <Label
          htmlFor={`positionTitle`}
          className="block mb-2 text-neutral-950"
        >
          Position Title
        </Label>
        <Input
          className="rounded-xl "
          name={`positionTitle`}
          type="text"
          placeholder="Ex : Senior Product Manager"
        />
      </div>

      {/*DESCRIPTION*/}
      <div>
        <Label htmlFor={`description`} className="block mb-2 text-neutral-950">
          Your Experience or achievement on this job
        </Label>
        <Textarea />
      </div>
      <Button variant="primary" type="submit">
        Add New Experience
      </Button>
    </form>
  );
}

export default FormWorkingExperience;
