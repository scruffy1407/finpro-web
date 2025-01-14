import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  educationDegreeOptions,
  EducationDegreeType,
  EducationDegreeResult,
  EducationDegree,
} from "@/models/educationDegree";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  editEducationData,
  Education,
  handleInputEditChange,
  initEditEducation,
} from "@/store/slices/EducationSlice";
import Select, { SingleValue } from "react-select";
import LoadingLoader from "@/components/LoadingLoader";
import Cookies from "js-cookie";
import { closeModalAction } from "@/store/slices/ModalSlice";

function FormEditEducation({
  educationId,
  educationDate,
  education_degree,
  educationDescription,
  educationName,
  cumulativeGpa,
  jobHunterId,
}: Education) {
  const dispatch = useDispatch<AppDispatch>();
  const { editEducation, pendingState } = useSelector(
    (state: RootState) => state.education,
  );
  const [showGpa, setShowGpa] = useState<boolean>(true);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    dispatch(handleInputEditChange({ name, value }));
  }

  function handleSelected(
    newValue: SingleValue<{
      value: string | undefined;
      label: EducationDegreeResult;
    }>,
  ) {
    const name = "education_degree";
    const payload = {
      name: name,
      value: newValue?.value as EducationDegreeType | null, // Type assertion
    };
    dispatch(handleInputEditChange(payload));
  }

  useEffect(() => {
    const data: Education = {
      educationId: educationId,
      educationName: educationName,
      education_degree: education_degree as EducationDegreeType,
      cumulativeGpa: cumulativeGpa,
      educationDescription: educationDescription,
      educationDate: educationDate,
      jobHunterId: jobHunterId,
    };
    console.log("DATAAA", data);
    dispatch(initEditEducation(data));
  }, []);

  useEffect(() => {
    if (
      (editEducation.education_degree as EducationDegreeType) ===
        EducationDegree.lessThanHighSchool ||
      (editEducation.education_degree as EducationDegreeType) ===
        EducationDegree.highSchool ||
      (editEducation.education_degree as EducationDegreeType) ===
        EducationDegree.vocational
    ) {
      setShowGpa(false);
    } else {
      setShowGpa(true);
    }
  }, [editEducation.education_degree]);

  async function handleEditEducation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const accessToken = Cookies.get("accessToken");

    const updateData: {
      token: string;
      data: Education;
    } = {
      token: accessToken as string,
      data: editEducation,
    };
    await dispatch(editEducationData(updateData));
    dispatch(closeModalAction());
  }

  return (
    <form onSubmit={handleEditEducation} className="flex flex-col gap-5">
      <div>
        {/*SCHOOL*/}
        <Label
          htmlFor={`educationName`}
          className="block mb-2 text-neutral-950"
        >
          School
        </Label>
        <Input
          className="rounded-xl "
          name={`educationName`}
          type="text"
          placeholder="Ex : Universitas Indonesia"
          value={editEducation.educationName}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label
          htmlFor={`educationDate`}
          className="block mb-2 text-neutral-950"
        >
          Graduation Year
        </Label>
        <input
          name={"educationDate"}
          className={`h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300`}
          type="month"
          onChange={handleChange}
          value={editEducation.educationDate as string}
        />
      </div>

      <div>
        {/*DEGREE*/}
        <Label
          htmlFor={`education_degree`}
          className="block mb-2 text-neutral-950"
        >
          Degree
        </Label>
        <Select
          name={"education_degree"}
          onChange={handleSelected}
          options={educationDegreeOptions}
          defaultValue={{
            value: editEducation.education_degree?.toString(),
            label:
              EducationDegreeResult[
                editEducation.education_degree as EducationDegreeType
              ],
          }}
        />
      </div>

      {showGpa ? (
        <div>
          {/*GPA*/}
          <Label
            htmlFor={`cumulativeGpa`}
            className="block mb-2 text-neutral-950"
          >
            GPA
          </Label>
          <Input
            className="rounded-xl "
            name={`cumulativeGpa`}
            type="number"
            placeholder="Ex : 3.5"
            value={editEducation.cumulativeGpa}
            onChange={handleChange}
          />
        </div>
      ) : (
        ""
      )}

      <div>
        {/*GPA*/}
        <Label htmlFor={`email`} className="block mb-2 text-neutral-950">
          Detail about your education (achievement, learning or challenge)
        </Label>
        <Textarea
          onChange={handleChange}
          name={"educationDescription"}
          value={editEducation.educationDescription}
        />
      </div>

      <Button
        disabled={pendingState.actionDisable}
        variant="primary"
        type="submit"
      >
        {pendingState.actionLoading ? LoadingLoader() : " Save Change"}
      </Button>
    </form>
  );
}

export default FormEditEducation;
