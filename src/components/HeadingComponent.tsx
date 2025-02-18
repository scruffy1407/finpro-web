import React from "react";
import { HeadingProps } from "@/utils/interface";
import { Button } from "@/components/ui/button";

function HeadingComponent({ heading, paragraph, onClick }: HeadingProps) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-neutral-900">{heading}</h2>
        <p className={`text-neutral-600 text-sm`}>{paragraph}</p>
      </div>
      <div className="hidden md:flex justify-center items-center">
        <Button variant={"outline"} size={"sm"} onClick={onClick}>
          Explore More
        </Button>
      </div>
    </div>
  );
}

export default HeadingComponent;
