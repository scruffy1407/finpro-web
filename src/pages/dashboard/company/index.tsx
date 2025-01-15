import React from "react";
import JobDashLeft from "@/components/jobDashboardComponents/jobDashLeft";
import { AuthHandler } from "@/utils/auth.utils";

import JobPostedDash from "@/components/jobDashboardComponents/JobPostedDash";
import FooterComponent from "@/components/FooterComponent";
import { Navbar } from "@/components/NavigationBar/Navbar";
import Header from "@/components/Header";

function JobDashBoard() {
  const authHandler = new AuthHandler();
  const pagePermission = "company";
  authHandler.authorizeUser(pagePermission);

  return (
    <>
      <Header>
        <title>Explore Company</title>
        <meta name="description" content={`Explore 1000+ Companies`} />
      </Header>
      <div className=" max-w-screen-xl mx-auto overflow-hidden">
        <Navbar pageRole={"company"} />

        <div className="mt-10">
          <div className="flex">
            <div>
              <JobDashLeft />
            </div>
            <div className="w-full ml-6">
              <div className="mt-4">
                <JobPostedDash />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <FooterComponent pageRole={"company"} />
        </div>
      </div>
    </>
  );
}

export default JobDashBoard;
