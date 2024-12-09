import React from "react";
import Image from "next/image";

function CompanyPageContent() {
	return (
		<div className="mt-4 ml-4">
			<div className="bg-white rounded-xl ">
				<div>
					<p className="text-lg font-bold ml-8 pt-8 pb-8">Company Overview</p>
					<div className="flex gap-5 ml-8 pb-8">
						<div className="w-[144px] h-[82px] bg-white">
							<Image
								className="mb-4"
								src="/Briefcase.svg"
								alt="briefCase"
								width={24}
								height={24}
							/>
							<p>Company Size</p>
							<p className="font-bold">Enterprice</p>
						</div>
						<div className="w-[144px] h-[82px] bg-white">
							<Image
								className="mb-4"
								src="/Briefcase.svg"
								alt="briefCase"
								width={24}
								height={24}
							/>
							<p>Company Size</p>
							<p className="font-bold">Enterprice</p>
						</div>
						<div className="w-[144px] h-[82px] bg-white">
							<Image
								className="mb-4"
								src="/Briefcase.svg"
								alt="briefCase"
								width={24}
								height={24}
							/>
							<p>Company Size</p>
							<p className="font-bold">Enterprice</p>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-white mt-4 rounded-xl">
				<div className="p-8">
					<h1 className="text-lg font-bold ">Company Description</h1>
					<p className="py-4">Company Description Here</p>
					<h1 className="text-lg font-bold ">Address Detail</h1>
					<p className="py-4">Company City , Company Province</p>
					<p className="pb-4">Address Detail</p>
					<h1 className="text-lg font-bold ">Contact Information</h1>

					<div className="flex items-center">
						<Image
							className="pt-4"
							src="/Phone.svg"
							alt="Phone"
							width={24}
							height={24}
						/>{" "}
						<p>Phone Number Here</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CompanyPageContent;
