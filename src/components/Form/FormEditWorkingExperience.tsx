import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import AsyncSelect from "react-select/async";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { WorkForm } from "@/models/auth.model";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function FormEditWorkingExperience({
  description,
  companyName,
  position,
  companyId,
  workingHistoryId,
}: WorkForm) {
  const { currentModalId } = useSelector(
    (state: RootState) => state.modalController,
  );

  console.log(currentModalId);

  const [editForm, setEditForm] = useState<WorkForm>({
    position: position,
    description: description,
    companyName: companyName,
    companyId: companyId,
  });

  return (
    <form className="flex flex-col gap-5">
      <div>
        {/*FULL NAME*/}
        <Label htmlFor={`email`} className="block mb-2 text-neutral-950">
          Company Name
        </Label>
        <AsyncSelect
          cacheOptions
          defaultInputValue={editForm.companyName}
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
          value={editForm.position}
        />
      </div>

      {/*EXPERIENCE*/}
      <div>
        <Label htmlFor={`description`} className="block mb-2 text-neutral-950">
          Your Experience or achievement on this job
        </Label>
        <Textarea value={editForm.description} />
      </div>
      <Button variant="primary" type="submit">
        Save changes
      </Button>
    </form>
  );
}

export default FormEditWorkingExperience;
