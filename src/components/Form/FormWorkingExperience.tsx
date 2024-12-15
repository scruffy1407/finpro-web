import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import AsyncSelect from "react-select/async";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { WorkingExperience } from "@/models/profile.mode";

function FormWorkingExperience() {
  const [listCompany, setListCompany] = useState<[]>([]);
  const [formData, setFormData] = useState<WorkingExperience>({
    experience: "",
    companyId: undefined,
    workingExperienceId: undefined,
    companyName: "",
    jobHunterId: undefined,
    positionTitle: "",
  });

  function fetchCompanyData(keyword: string) {
    try {
    } catch (e) {}
  }
  function handleChange(e: any) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value as string,
    });
  }
  useState(() => {}, []);

  return (
    <form className="flex flex-col gap-5">
      <div>
        {/*FULL NAME*/}
        <Label htmlFor={`companyId`} className="block mb-2 text-neutral-950">
          Company Name
        </Label>
        <AsyncSelect
          name="companyId"
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
          value={formData.positionTitle}
          onChange={handleChange}
          type="text"
          placeholder="Ex : Senior Product Manager"
        />
      </div>

      {/*DESCRIPTION*/}
      <div>
        <Label htmlFor={`experience`} className="block mb-2 text-neutral-950">
          Your Experience or achievement on this job
        </Label>
        <Textarea
          value={formData.experience}
          onChange={handleChange}
          name={`experience`}
        />
      </div>
      <Button variant="primary" type="submit">
        Add New Experience
      </Button>
    </form>
  );
}

export default FormWorkingExperience;
