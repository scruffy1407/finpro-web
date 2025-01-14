import React from "react";
import NavbarComponent from "@/components/NavbarComponent";
import { AuthHandler } from "@/utils/auth.utils";
import AssessmentDashLeft from "@/components/AssessmentComponents/AssessmentDashLeft";
import FooterComponent from "@/components/FooterComponent";
// import PreSelectionPost from "@/components/preSelectionComponents/PreSelectionPost";
import AssessmentDashPost from "@/components/AssessmentComponents/AssessmentDashPost";
import { Navbar } from "@/components/NavigationBar/Navbar";
function AssessmentDashboard() {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser();

  return (
    <div className="max-w-screen-xl mx-auto overflow-hidden">
      <Navbar pageRole={"developer"} />

      <div className="mt-10">
        <div className="flex w-auto ">
          <div>
            <AssessmentDashLeft />
          </div>
          <div className="w-full ml-6">
            <div className="mt-4">
              <AssessmentDashPost />
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
