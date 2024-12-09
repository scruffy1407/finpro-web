import React from "react";
import NavbarComponent from "@/components/NavbarComponent";
import FooterComponent from "@/components/FooterComponent";
import CompanyHighlight from "@/components/CompanyPageComponents/CompanyHighlight";
import CompanyPageTabs from "@/components/CompanyPageComponents/CompanyPageTabs";
import CompanyPageContent from "@/components/CompanyPageComponents/CompanyPageContent";

function companyPage() {
	return (
		<div className="max-w-screen-xl mx-auto">
			<div className="mt-5">
				<NavbarComponent
					findJobs="Find Jobs"
					skillAssessment="Skill Assessment"
					exploreCompanies="Explore Companies"
					loginJobHunter="Login"
					loginCompanies="Login as Recruiter"
				/>
			</div>

			<div className="flex">
				<div className="mt-8">
					<CompanyHighlight
						logo="/companies/Adobe.svg"
						companyName="Adobe"
						companyIndustry="retail"
						ratingScore="4"
						ratingAmount="3"
					/>
				</div>

				<div className="w-full">
					<div className="">
						<CompanyPageTabs />
					</div>
					<div className="max-w-screen-xl">
						{" "}
						<CompanyPageContent />{" "}
					</div>
				</div>
			</div>
            <div className="mx-4 mt-20 mb-5">
					<FooterComponent
						findJobs="Find Jobs"
						skillAssessment="Skill Assessment"
						exploreCompanies="Explore Companies"
					/>
				</div>
		</div>
	);
}

export default companyPage;
