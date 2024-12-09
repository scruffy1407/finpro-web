import React from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonComponent from "../ButtonComponent";
import HeadingComponent from "../HeadingComponent";
import { AlertTriangle } from "lucide-react";

interface CompanyHighlight {
	logo: string;
	companyName: string;
	companyIndustry: string;
	ratingScore: string;
	ratingAmount: string;
}

function CompanyHighlight({
	logo,
	companyName,
	companyIndustry,
	ratingScore,
	ratingAmount,
}: CompanyHighlight) {
	return (
		<div className="bg-white w-[335px] h-fit p-5 hover:shadow-lg rounded-xl ">
			<div className="px-5 pb-5 ">
				<Image
					className="h-4 w-auto"
					src={logo}
					alt="pic"
					width={100}
					height={100}
				/>
			</div>
			<div className="px-5">
				<h2 className="text-2xl font-bold">{companyName}</h2>
			</div>
			<div className="flex px-5 pt-3 pb-6">
				<p className="font-normal text-neutral-600 ">{companyIndustry}</p>
			</div>
			<div className="flex gap-2 items-center">
				<Image src="/star.svg" alt="Star" width={30} height={30} />
				<p>{ratingScore}</p>
				<p>({ratingAmount} review)</p>
			</div>

			<div className="flex flex-col gap-3 mt-6">
				<p>Have you ever work here?</p>
				<ButtonComponent
					type="ButtonFilledCustom"
					container="Login to give review"
				/>
			</div>
		</div>
	);
}

export default CompanyHighlight;
