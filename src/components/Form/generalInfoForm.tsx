import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Select, { SingleValue } from "react-select";
import { Button } from "@/components/ui/button";
import LoadingLoader from "@/components/LoadingLoader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  handleGetcity,
  handleProvinceChange,
  handleCityChange,
  handleUpdateInputChange,
  updateUserGeneralInfo,
} from "@/store/slices/generalInfo";
import { JobHunterGeneralInfoData, locationList } from "@/models/auth.model";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { updateName } from "@/store/slices/authSlice";
import { closeModalAction, openModalAction } from "@/store/slices/ModalSlice";
import { useRouter } from "next/router";

interface SelectionTestActiveProps {
  selection_test_active: boolean;
  test_id?: number;
  job_id: number;
}

function GeneralInfoForm({
  selection_test_active,
  test_id,
  job_id,
}: SelectionTestActiveProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { innerId } = useSelector((state: RootState) => state.auth);
  const {
    name,
    expectedSalary,
    gender,
    dob,
    listProvince,
    listCity,
    provinceId,
    cityId,
    pendingState,
    summary,
    locationCity,
    locationProvince,
  } = useSelector((state: RootState) => state.generalInfo);

  const handleFormProvinceChange = (
    selectedOption: SingleValue<locationList> | null,
  ) => {
    dispatch(handleProvinceChange(selectedOption));
  };

  function handleGenderChange(value: "male" | "female" | "other") {
    dispatch(handleUpdateInputChange({ name: "gender", value }));
  }

  const handleFormCityChange = (
    selectedOption: SingleValue<locationList> | null,
  ) => {
    dispatch(handleCityChange(selectedOption));
  };
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    dispatch(handleUpdateInputChange({ name, value }));
  }

  async function handleSubmitData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = Cookies.get("accessToken");
    if (
      name === "" ||
      dob === null ||
      dob === undefined ||
      dob === "" ||
      expectedSalary === null ||
      expectedSalary === undefined ||
      expectedSalary === 0 ||
      cityId === undefined ||
      provinceId === undefined ||
      gender === undefined
    ) {
      toast.error("Please fill all out all the field to continue apply");
      return;
    }
    const updateData: JobHunterGeneralInfoData = {
      dob,
      cityId,
      expectedSalary,
      gender,
      name,
      jobHunterId: innerId as number,
      provinceId,
      summary,
      locationProvince,
      locationCity,
    };
    await dispatch(
      updateUserGeneralInfo({
        token: token as string,
        generalInfo: updateData,
      }),
    )
      .unwrap()
      .finally(() => {
        dispatch(updateName(name));
        dispatch(closeModalAction());
        if (selection_test_active) {
          router.push(`/executionPretest/${test_id}?job_id=${job_id}`);
        } else {
          dispatch(openModalAction("applyJobModal"));
        }
      });
  }

  useEffect(() => {
    if (provinceId) {
      dispatch(handleGetcity(provinceId));
    }
  }, [dispatch, provinceId]);

  return (
    <>
      <form onSubmit={handleSubmitData} className="flex flex-col gap-5">
        <div>
          {/*FULL NAME*/}
          <Label
            aria-required
            htmlFor={`name`}
            className="block mb-2 text-neutral-950"
          >
            Full Name <span className={"text-red-500"}>*</span>
          </Label>
          <Input
            className="rounded-xl "
            name={`name`}
            onChange={handleChange}
            value={name}
            type="text"
            placeholder="Enter your name"
          />
        </div>

        <div>
          {/*FULL NAME*/}
          <Label
            aria-required
            htmlFor={`expectedSalary`}
            className="block mb-2 text-neutral-950"
          >
            Your Expected salary for a job (In Rupiah){" "}
            <span className={"text-red-500"}>*</span>
          </Label>
          <p className={`text-xs text-neutral-400 mb-2`}>
            Expected salary help recruiter to understand what your expectation
            in current state
          </p>
          <Input
            className="rounded-xl "
            name={`expectedSalary`}
            onChange={handleChange}
            value={expectedSalary as number}
            type="number"
            placeholder="Ex 5000000"
          />
        </div>

        {/*GENDER*/}
        <div>
          <Label htmlFor={`email`} className="block mb-2 text-neutral-950">
            Gender <span className={"text-red-500"}>*</span>
          </Label>
          <RadioGroup
            name={"gender"}
            className={`flex gap-4`}
            defaultValue={gender}
            onValueChange={(value: "male" | "female" | "other") =>
              handleGenderChange(value)
            }
            value={gender}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem radioGroup={"gender"} value="male" id="male" />
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
              <RadioGroupItem value="other" id="other" />
              <Label className="text-neutral-950" htmlFor="others">
                Other
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/*DATE OF BIRTH*/}
        <div>
          <Label htmlFor={`dob`} className="block mb-2 text-neutral-950">
            Date of Birth <span className={"text-red-500"}>*</span>
          </Label>
          <input
            name={"dob"}
            className={`h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300`}
            type="date"
            onChange={handleChange}
            value={dob as string}
          />
        </div>
        <div>
          <div>
            <Label htmlFor={`email`} className="block mb-2 text-neutral-950">
              Where do you currently live?{" "}
              <span className={"text-red-500"}>*</span>
            </Label>
            <div
              className={`flex flex-col item-center gap-2 md:flex-row md:w-full`}
            >
              <Select
                // noOptionsMessage={noOptionsMessage}
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
                value={
                  provinceId
                    ? listProvince.find((option) => option.value === provinceId)
                    : null
                } // Set default selected province from formGeneralInfo
                className={"w-full"}
                onChange={handleFormProvinceChange}
                options={listProvince}
              />
              <Select
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
                defaultValue={
                  cityId
                    ? listCity.find(
                        (option) => option.value === (cityId as number),
                      )
                    : null
                }
                value={
                  cityId
                    ? listCity.find((option) => option.value === cityId)
                    : null
                } // Set default selected city from formGeneralInfo
                className={"w-full"}
                onChange={handleFormCityChange}
                options={listCity}
              />
            </div>
          </div>
        </div>
        <Button
          type={"submit"}
          disabled={pendingState.actionDisable}
          variant={"primary"}
          size={"default"}
          className={"w-fit"}
        >
          {pendingState.actionLoading ? LoadingLoader() : "Save Change"}
        </Button>
      </form>
    </>
  );
}

export default GeneralInfoForm;
