import React from "react";
import NavbarComponent from "@/components/NavbarComponent";
import { AuthHandler } from "@/utils/auth.utils";
import PreSelectionDashLeft from "@/components/preSelectionComponents/PreSelectionDashLeft";
import FooterComponent from "@/components/FooterComponent";
import PreSelectionPost from "@/components/preSelectionComponents/PreSelectionPost";
import { Navbar } from "@/components/NavigationBar/Navbar";

function AssessmentDashboard() {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser("company");

  return (
    <div className="max-w-screen-xl mx-auto overflow-hidden">
      <Navbar pageRole={"company"} />

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
        <FooterComponent pageRole={"company"} />
      </div>
    </div>
  );
}

export default AssessmentDashboard;
