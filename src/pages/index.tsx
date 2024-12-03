import React from "react";
import NavbarComponent from "@/components/NavbarComponent";
import HeroComponent from "@/components/HeroComponent";
import MarqueeComponent from "@/components/MarqueeComponent";
import HeadingComponent from "@/components/HeadingComponent";
import JobMappingComponent from "@/components/JobMappingComponent";
import ButtonComponent from "@/components/ButtonComponent";
import CompanyMappingComponent from "@/components/CompanyMappingComponent";
import FooterComponent from "@/components/FooterComponent";

function Home() {
	return (
		<div>
			<div className="mx-4 md:m-0 w-auto">
				<NavbarComponent
					findJobs="Find Jobs"
					skillAssessment="Skill Assessment"
					exploreCompanies="Explore Companies"
					loginJobHunter="Login"
					loginCompanies="Login as Recruiter"
				/>
			</div>

			<div className="mx-4 md:w-auto">
				<HeroComponent />
			</div>
			<div className="w-full">
				<MarqueeComponent />
			</div>

			<div className=" mx-4 ">
				<HeadingComponent
					heading="We found Jobs that nears you"
					paragraph="Check job that we found"
				/>
			</div>

			<div className="ml-4 md:ml-0 mt-6">
				<JobMappingComponent />
			</div>

			{/* NOTE THAT THIS BUTTON PART IS CONDITIONAL ONLY AND ONLY SHOWS ON MOBILE VIEW! */}
			<div className="flex mt-5 items-center justify-center md:hidden ">
				<ButtonComponent type="ButtonBorder" container="Explore More" />
			</div>

			<div className=" mx-4 ">
				<HeadingComponent
					heading="It might be your next company"
					paragraph="Check out our companies & What are the jobs that currently open"
				/>
			</div>

			<div className=" ml-4 md:ml-0 w-full mt-14">
				<CompanyMappingComponent />
			</div>

			{/* NOTE THAT THIS BUTTON PART IS CONDITIONAL ONLY AND ONLY SHOWS ON MOBILE VIEW! */}
			<div className="flex mt-5 items-center justify-center md:hidden ">
				<ButtonComponent type="ButtonBorder" container="Explore More" />
			</div>

			<div className=" mx-4 w-auto mt-14">
				<FooterComponent
					findJobs="Find Jobs"
					skillAssessment="Skill Assessment"
					exploreCompanies="Explore Companies"
				/>
			</div>
		</div>
	);
}

export default Home;
