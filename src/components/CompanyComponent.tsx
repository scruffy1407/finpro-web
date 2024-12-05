import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CompanyShortProps {
	logo: string;
	companyName: string;
	jobsOpen: number;
}

function CompanyComponent({ logo, companyName, jobsOpen }: CompanyShortProps) {
	return (
		<Link href={""} className="bg-white w-[302px] h-fit hover:shadow-lg">
			<div className="p-5">
				<Image
					className="h-4 w-auto"
					src={logo}
					alt="pic"
					width={30}
					height={30}
				/>
			</div>
			<div className="px-5">
				<h2 className="text-l">{companyName}</h2>
			</div>
			<div className="flex p-5">
				<p className="text-sm border rounded-xl py-1 px-2 bg-sky-950 text-white">
					{jobsOpen} Jobs Open{" "}
				</p>
			</div>
		</Link>
	);
}

export default CompanyComponent;
