import React from "react";
import NavbarComponent from "@/components/NavbarComponent";
import { AuthHandler } from "@/utils/auth.utils";
import PreSelectionDashLeft from "@/components/preSelectionComponents/PreSelectionDashLeft";
import FooterComponent from "@/components/FooterComponent";
import PreSelectionPost from "@/components/preSelectionComponents/PreSelectionPost";

function AssessmentDashboard() {
	const authHandler = new AuthHandler();
	// authHandler.authorizeUser();

	return (
		<div className="max-w-screen-xl mx-auto overflow-hidden">
			<NavbarComponent
				findJobs="Find Jobs"
				skillAssessment="Skill Assessment"
				exploreCompanies="Explore Companies"
				loginJobHunter="Login"
				loginCompanies="Login as Recruiter"
			/>

			<div className="mt-10">
				<div className="flex w-auto ">
					<div>
						<PreSelectionDashLeft />
					</div>
					<div className="w-full ml-6">
						<div className="mt-4">
							<PreSelectionPost />
						</div>
					</div>
				</div>
			</div>

			<div className="mt-20">
				<FooterComponent />
			</div>
		</div>
	);
}

export default AssessmentDashboard;
