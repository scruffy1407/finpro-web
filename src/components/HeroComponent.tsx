import React from "react";
import { HeroProps } from "@/utils/interface";
import Image from "next/image";
import SearchBarComponent from "./SearchBarComponent";

export default function HeroComponent() {
	return (
		<div>
			<div className="max-w-screen-xl mx-auto bg-white mt-5 rounded-xl">
				<div className="flex justify-between">
					<div className="flex flex-col p-4 md:pl-8 py-10 gap-6 md:gap-11 w-[100%] md:w-[60%] ">
						<h1 className="font-bold text-2xl md:text-4xl">
							Begin Your Search for Dream Career Here
						</h1>
						<p className="">
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente
							earum libero ea dolorum quos accusamus expedita id eos deleniti
							facere
						</p>
						<div>
							<SearchBarComponent />
						</div>
					</div>

					<div className="hidden md:flex w-[40%]">
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
