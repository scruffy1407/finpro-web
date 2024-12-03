import React from "react";
import ButtonComponent from "./ButtonComponent";
import { HeadingProps } from "@/utils/interface";

function HeadingComponent({ heading, paragraph }: HeadingProps) {
	return (
		<div className="max-w-screen-xl mx-auto mt-10">
			<div className="flex justify-between">
				<div className="flex flex-col gap-5">
					<div>
						<h2 className="text-2xl font-semibold text-neutral-900">
							{heading}
						</h2>
					</div>
					<div>
						<p>{paragraph}</p>
					</div>
				</div>

				<div className="hidden md:flex justify-center items-center">
					<ButtonComponent container="Explore More" type="ButtonBorder" />
				</div>
			</div>
		</div>
	);
}

export default HeadingComponent;
