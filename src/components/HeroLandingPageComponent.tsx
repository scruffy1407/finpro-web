import React from "react";
import Image from "next/image";
import SearchBarComponent from "./SearchBarComponent";

export default function HeroComponent() {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto bg-white mt-5 rounded-xl px-4 lg:px-0">
        <div className="flex justify-between">
          <div className="flex flex-col py-6 gap-6  w-[100%] lg:w-[60%] lg:pl-8 md:gap-11 lg:py-16 ">
            <h1 className="font-bold text-2xl md:text-4xl">
              Begin Your Search for Dream Career Here
            </h1>
            <p className="text-neutral-600">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente
              earum libero ea dolorum quos accusamus expedita id eos deleniti
              facere
            </p>
            <div>
              <SearchBarComponent />
            </div>
          </div>

          <div className="hidden lg:flex w-[40%]">
            <Image
              src="HeroImage.svg"
              alt="Picture Hero"
              width={408}
              height={335}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
