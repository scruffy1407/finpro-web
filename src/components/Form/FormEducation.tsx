import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Select, { SingleValue } from "react-select";

import {
  educationDegreeOptions,
  EducationDegreeOption,
  EducationDegreeType,
  EducationDegree,
} from "@/models/educationDegree";
import {
  addNewEducation,
  handleNewInputChange,
} from "@/store/slices/EducationSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import LoadingLoader from "@/components/LoadingLoader";
import Cookies from "js-cookie";
import { closeModalAction } from "@/store/slices/ModalSlice";

function FormEducation() {
  const dispatch = useDispatch<AppDispatch>();
  const { innerId } = useSelector((state: RootState) => state.auth);
  const { pendingState, newEducation } = useSelector(
    (state: RootState) => state.education,
  );
  const accessToken = Cookies.get("accessToken");
  const [showGpa, setShowGpa] = useState<boolean>(true);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    dispatch(handleNewInputChange({ name, value }));
  }

  function handleSelected(
    selectedOption: SingleValue<EducationDegreeOption> | null,
  ) {
    const { value } = selectedOption as EducationDegreeOption;
    const name = "education_degree";
    dispatch(handleNewInputChange({ name, value }));
  }

  async function handleSubmitData(e: any) {
    e.preventDefault();
    await dispatch(
      addNewEducation({
        token: accessToken as string,
        data: {
          jobHunterId: innerId,
          educationName: newEducation?.educationName as string,
          educationDescription: newEducation?.educationDescription as string,
          education_degree: newEducation?.education_degree,
          educationDate: new Date(newEducation?.educationDate as string),
          cumulativeGpa: newEducation?.cumulativeGpa as number,
        },
      }),
    );
    dispatch(closeModalAction());
  }

  useEffect(() => {
    if (
      (newEducation.education_degree as EducationDegreeType) ===
        EducationDegree.lessThanHighSchool ||
      (newEducation.education_degree as EducationDegreeType) ===
        EducationDegree.highSchool ||
      (newEducation.education_degree as EducationDegreeType) ===
        EducationDegree.vocational
    ) {
      setShowGpa(false);
    } else {
      setShowGpa(true);
    }
  }, [newEducation.education_degree]);

  return (
    <form onSubmit={handleSubmitData} className="flex flex-col gap-5">
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
          value={newEducation?.educationName as string}
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
          value={newEducation?.educationDate as string}
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
            onChange={handleChange}
            value={newEducation?.cumulativeGpa || ""}
            placeholder="Ex : 3.5"
          />
        </div>
      ) : (
        ""
      )}

      <div>
        {/*GPA*/}
        <Label
          htmlFor={`educationDescription`}
          className="block mb-2 text-neutral-950"
        >
          Detail about your education (achievement, learning or challenge)
        </Label>
        <Textarea
          value={newEducation?.educationDescription || ""}
          onChange={handleChange}
          name={"educationDescription"}
        />
      </div>

      <Button
        disabled={pendingState.actionDisable}
        variant="primary"
        type="submit"
      >
        {pendingState.actionLoading ? LoadingLoader() : " Add New Education"}
      </Button>
    </form>
  );
}

export default FormEducation;
