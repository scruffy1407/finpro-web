import React from "react";
import Link from "next/link";

interface LinkProps {
	findJobs: string;
	skillAssessment: string;
	exploreCompanies: string;
}

function LinksComponents() {
	return (
		<div className="hidden md:flex justify-between gap-5">
			<Link className="hover:text-blue-500" href={""}>
				Find Jobs
			</Link>
			<Link className="hover:text-blue-500" href={""}>
				Skill Assessment
			</Link>
			<Link className="hover:text-blue-500" href={""}>
				Explore Companies
			</Link>
		</div>
	);
}

export default LinksComponents;
