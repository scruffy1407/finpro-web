import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import AsyncSelect from "react-select/async";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { WorkingExperience } from "@/models/profile.mode";
import { ProfileHandler } from "@/utils/profile.utils";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import Cookies from "js-cookie";
import { SingleValue } from "react-select";
import LoadingLoader from "@/components/LoadingLoader";
import { closeModalAction } from "@/store/slices/ModalSlice";

function FormWorkingExperience() {
  const profileHandler = new ProfileHandler();
  const { innerId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(isDisable);

  const [formData, setFormData] = useState<WorkingExperience>({
    jobHunterId: innerId as number,
    jobDescription: "",
    companyId: null,
    jobTitle: "",
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

  async function handleSubmitWork(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const accessToken = Cookies.get("accessToken");
    setIsDisable(true);
    setIsLoading(true);

    try {
      const response = await profileHandler.createWorkingExperience(
        accessToken as string,
        formData,
      );
      console.log(response);
      if (response.status === 201) {
        toast.success("Successfully add new work experience");
        setIsDisable(true);
        setIsLoading(false);
        dispatch(closeModalAction());
      } else {
        toast.error(response.message);
      }
    } catch (e) {
      toast.error("Something went wrong, please refresh your browser");
    }
  }

  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value as string,
    });
  }

  function handleCompanyChange(
    selectedOption: SingleValue<{
      value: number | null;
      label: string;
    }> | null,
  ) {
    setFormData({
      ...formData,
      companyId: selectedOption?.value as number,
    });
  }

  useEffect(() => {
    setIsDisable(
      formData.jobDescription === "" ||
        formData.jobTitle === "" ||
        formData.companyId === null,
    );
  }, [formData.jobDescription, formData.jobTitle, formData.companyId]);
  console.log(formData);

  return (
    <form onSubmit={handleSubmitWork} className="flex flex-col gap-5">
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
          value={formData.jobTitle}
          onChange={handleChange}
          type="text"
          placeholder="Ex : Senior Product Manager"
        />
      </div>

      {/*DESCRIPTION*/}
      <div>
        <Label
          htmlFor={`jobDescription`}
          className="block mb-2 text-neutral-950"
        >
          Your Experience or achievement on this job
        </Label>
        <Textarea
          value={formData.jobDescription}
          onChange={handleChange}
          name={`jobDescription`}
        />
      </div>
      <Button disabled={isDisable} variant="primary" type="submit">
        {isLoading ? LoadingLoader() : "Add New Experience"}
      </Button>
    </form>
  );
}

export default FormWorkingExperience;
