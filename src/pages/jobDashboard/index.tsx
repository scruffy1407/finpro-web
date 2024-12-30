import React from "react";
import NavbarComponent from "@/components/NavbarComponent";
import JobDashLeft from "@/components/jobDashboardComponents/jobDashLeft";
import { AuthHandler } from "@/utils/auth.utils";
import useRouter from "next/router";
import SearchBarJobDash from "@/components/jobDashboardComponents/searchBarJobDash";
import JobPostedDash from "@/components/jobDashboardComponents/JobPostedDash";
import FooterComponent from "@/components/FooterComponent";

function JobDashBoard() {
	const authHandler = new AuthHandler();
	authHandler.authorizeUser();
	const router = useRouter;



	return (
		<div className=" max-w-screen-xl mx-auto overflow-hidden">
			<NavbarComponent
				findJobs="Find Jobs"
				skillAssessment="Skill Assessment"
				exploreCompanies="Explore Companies"
				loginJobHunter="Login"
				loginCompanies="Login as Recruiter"
			/>

			<div className="mt-10">
				<div className="flex">
					<div>
						<JobDashLeft />
					</div>
					<div className="w-full ml-6">
						<div className="mt-4" >
							<JobPostedDash />
						</div>
					</div>
				</div>
			</div>

            <div className="mt-20" >
                <FooterComponent/>
            </div>
		</div>
	);
}

export default JobDashBoard;
