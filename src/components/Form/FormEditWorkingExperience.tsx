import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import AsyncSelect from "react-select/async";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { WorkingExperience } from "@/models/profile.mode";
import { ProfileHandler } from "@/utils/profile.utils";
import { SingleValue } from "react-select";
import LoadingLoader from "@/components/LoadingLoader";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { closeModalAction } from "@/store/slices/ModalSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { updateWorkingExp } from "@/store/slices/WorkingExpSlice";

function FormEditWorkingExperience({
  jobDescription,
  companyName,
  jobTitle,
  companyId,
  workingExperienceId,
  jobHunterId,
}: WorkingExperience) {
  const dispatch = useDispatch<AppDispatch>();
  const profileHandler = new ProfileHandler();
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(workingExperienceId);

  const [editForm, setEditForm] = useState<WorkingExperience>({
    workingExperienceId: workingExperienceId,
    jobHunterId: jobHunterId,
    jobDescription: jobDescription,
    companyId: companyId,
    companyName: companyName,
    jobTitle: jobTitle,
  });
  const options = (inputValue: string, callback: (options: []) => void) => {
    fetchCompanyData(inputValue)
      .then((data) => callback(data))
      .catch(() => callback([])); // Handle errors with an empty array
  };

  async function fetchCompanyData(keyword: string) {
    try {
      const response = await profileHandler.searchCompany(keyword);
      return response.data;
    } catch (e: unknown) {
      return []; // Handle errors with an empty array
    }
  }

  async function handleEditWork(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const accessToken = Cookies.get("accessToken");
    setIsDisable(true);
    setIsLoading(true);
    try {
      const response = await profileHandler.editWorkingExperience(
        accessToken as string,
        editForm,
      );
      if (response === 204) {
        toast.success("Successfully update your work experience");
        setIsDisable(true);
        setIsLoading(false);
        dispatch(updateWorkingExp(editForm));
        dispatch(closeModalAction());
      } else {
        toast.error("Failed to update your profile");
      }
    } catch (e) {
      toast.error("Something went wrong, please refresh your browser");
    }
  }

  function handleChange(e: any) {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value as string,
    });
  }

  function handleCompanyChange(
    selectedOption: SingleValue<{
      value: number | null;
      label: string | undefined;
    }> | null,
  ) {
    if (selectedOption) {
      setEditForm({
        ...editForm,
        companyId: selectedOption?.value as number,
        companyName: selectedOption?.label as string,
      });
    }
  }

  useEffect(() => {
    setIsDisable(
      editForm.jobDescription === "" ||
        editForm.jobTitle === "" ||
        editForm.companyId === null,
    );
  }, [editForm.jobDescription, editForm.jobTitle, editForm.companyId]);

  return (
    <form onSubmit={handleEditWork} className="flex flex-col gap-5">
      <div>
        {/*FULL NAME*/}
        <Label htmlFor={`companyId`} className="block mb-2 text-neutral-950">
          Company Name
        </Label>
        <AsyncSelect
          name="companyId"
          cacheOptions
          defaultOptions
          loadOptions={options}
          defaultValue={{
            value: editForm.companyId,
            label: editForm.companyName,
          }} // Set default value
          onChange={handleCompanyChange}
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
        <Label htmlFor={`jobTitle`} className="block mb-2 text-neutral-950">
          Position Title
        </Label>
        <Input
          className="rounded-xl "
          name={`jobTitle`}
          type="text"
          placeholder="Ex : Senior Product Manager"
          value={editForm.jobTitle}
          onChange={handleChange}
        />
      </div>

      {/*EXPERIENCE*/}
      <div>
        <Label
          htmlFor={`jobDescription`}
          className="block mb-2 text-neutral-950"
        >
          Your Experience or achievement on this job
        </Label>
        <Textarea
          onChange={handleChange}
          name={`jobDescription`}
          value={editForm.jobDescription}
        />
      </div>
      <Button disabled={isDisable} variant="primary" type="submit">
        {isLoading ? LoadingLoader() : "Save Changes"}
      </Button>
    </form>
  );
}

export default FormEditWorkingExperience;
