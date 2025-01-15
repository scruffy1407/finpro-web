import React from "react";
import { HeadingProps } from "@/utils/interface";

function HeadingRelatedComponent({ heading, paragraph }: HeadingProps) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-neutral-900">{heading}</h2>
        <p className={"text-sm text-neutral-600"}>{paragraph}</p>
      </div>
    </div>
  );
}

export default HeadingRelatedComponent;
