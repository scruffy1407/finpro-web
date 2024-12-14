import React from "react";
import { Label } from "@/components/ui/label";
import AsyncSelect from "react-select/async";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  educationDegreeOptions,
  EducationDegreeOption,
} from "@/models/educationDegree";

function FormEducation() {
  return (
    <form className="flex flex-col gap-5">
      <div>
        {/*SCHOOL*/}
        <Label htmlFor={`school`} className="block mb-2 text-neutral-950">
          School
        </Label>
        <Input
          className="rounded-xl "
          name={`school`}
          type="text"
          placeholder="Ex : Universitas Indonesia"
        />
      </div>

      <div>
        {/*DEGREE*/}
        <Label htmlFor={`degreen`} className="block mb-2 text-neutral-950">
          Degree
        </Label>
        <Select>
          <SelectTrigger className=" w-full md:w-full rounded-xl">
            <div className="text-neutral-950 placeholder:text-neutral-600">
              <SelectValue placeholder="Select Degree" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {educationDegreeOptions.map(
              (degree: EducationDegreeOption, id: number) => {
                return (
                  <SelectItem key={id} value={degree.value}>
                    {degree.label}
                  </SelectItem>
                );
              },
            )}
          </SelectContent>
        </Select>
      </div>

      <div>
        {/*GPA*/}
        <Label htmlFor={`gpa`} className="block mb-2 text-neutral-950">
          GPA
        </Label>
        <Input
          className="rounded-xl "
          name={`gpa`}
          type="number"
          placeholder="Ex : 3.5"
        />
      </div>

      <div>
        {/*GPA*/}
        <Label htmlFor={`email`} className="block mb-2 text-neutral-950">
          Detail about your education (achievement, learning or challenge)
        </Label>
        <Textarea />
      </div>

      <Button variant="primary" type="submit">
        Add New Education
      </Button>
    </form>
  );
}

export default FormEducation;
