import React from "react";
import Image from "next/image";
import SearchBarComponent from "./SearchBarComponent";

export default function HeroComponent() {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto bg-white mt-5 rounded-xl px-4 md:px-0">
        <div className="flex justify-between">
          <div className="flex flex-col md:pl-8 py-6 gap-6 md:gap-11 w-full lg:w-[60%]">
            <h1 className="font-bold text-2xl md:text-4xl">
              Begin Your Search for Dream Career Here
            </h1>
            <p>
              Search your path to success with ease—explore endless
              opportunities, discover the perfect job for your skills and
              passions, and take the first step toward building the career of
              your dreams.
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
