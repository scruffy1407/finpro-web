import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import AsyncSelect from "react-select/async";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ProfileHandler } from "@/utils/profile.utils";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import Cookies from "js-cookie";
import { SingleValue } from "react-select";
import LoadingLoader from "@/components/LoadingLoader";
import { closeModalAction } from "@/store/slices/ModalSlice";
import {
  addNewWorkingExperience,
  setDisable,
  WorkingExperience,
} from "@/store/slices/WorkingExpSlice";

function FormWorkingExperience() {
  const profileHandler = new ProfileHandler();
  const { innerId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { pendingState } = useSelector(
    (state: RootState) => state.workExperience,
  );

  const [formData, setFormData] = useState<WorkingExperience>({
    jobHunterId: innerId as number,
    jobDescription: "",
    companyId: null,
    jobTitle: "",
    companyName: "",
    startDate: null,
    endDate: null,
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
    await dispatch(
      addNewWorkingExperience({
        token: accessToken as string,
        formData: formData,
      }),
    );
    dispatch(closeModalAction());
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
    dispatch(
      setDisable(
        formData.jobDescription === "" ||
          formData.jobTitle === "" ||
          formData.companyId === null,
      ),
    );
  }, [formData.jobDescription, formData.jobTitle, formData.companyId]);

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

      <Button
        disabled={pendingState.actionDisable}
        variant="primary"
        type="submit"
      >
        {pendingState.actionLoading ? LoadingLoader() : "Add New Experience"}
      </Button>
    </form>
  );
}

export default FormWorkingExperience;
