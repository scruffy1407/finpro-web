import React from "react";
import Image from "next/image";

interface EmptyResultStateProps {
  image: string;
  title: string;
  description: string;
}

function EmptyResultState({
  description,
  image,
  title,
}: EmptyResultStateProps) {
  return (
    <section
      className={"flex flex-col gap-6 items-center justify-center w-full"}
    >
      <Image
        src={image}
        alt={`${title}-image`}
        width={250}
        height={250}
        className={"w-[200px] object-cover object-center"}
      />
      <div className={"flex flex-col gap-4 max-w-2xl mx-auto"}>
        <h2 className={"text-xl font-bold text-neutral-950 text-center"}>
          {title}
        </h2>
        <p className={"text-neutral-600 text-center"}>{description}</p>
      </div>
    </section>
  );
}

export default EmptyResultState;
