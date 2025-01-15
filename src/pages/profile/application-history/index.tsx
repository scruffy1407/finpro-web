import React, { useState } from "react";
import { Navbar } from "@/components/NavigationBar/Navbar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusTab from "@/components/Tabs/ApplicationHistory/InReviewApplication";
import { JobApplicationStatus } from "@/models/applicant.model";
import { Info } from "lucide-react";
import { AuthHandler } from "@/utils/auth.utils";

function Index() {
  const authHandler = new AuthHandler();
  const pagePermission = "jobhunter";
  authHandler.authorizeUser(pagePermission);
  const [activeTab, setActiveTab] = useState<string>(
    JobApplicationStatus.OnReview,
  );

  return (
    <main>
      <Navbar pageRole={"jobhunter"} />
      <section className={"max-w-screen-md mx-auto mt-10 px-4"}>
        <div className={"flex flex-col gap-3"}>
          <h1 className={"text-3xl text-neutral-950 font-bold"}>
            Your Application History
          </h1>
          <p className={"text-sm text-gray-600"}>
            Track the progress of every application, from initial review to
            acceptance. Never miss an update.
          </p>
        </div>
      </section>
      <section className={"max-w-screen-md mx-auto mt-10 px-4 mb-10"}>
        <Tabs
          className={`w-full flex flex-col gap-4`}
          defaultValue={JobApplicationStatus.OnReview}
          value={activeTab}
          onValueChange={setActiveTab} // Set active tab when changed
        >
          <TabsList
            className={`justify-start w-full rounded-2xl bg-white py-4 px-4 h-fit overflow-x-auto scrollbar-hide `}
          >
            <div className="flex gap-4">
              <TabsTrigger
                className={
                  "px-4 py-2 rounded-2xl border data-[state=active]:bg-sky-50 data-[state=active]:border-blue-600 space-x-4"
                }
                value={JobApplicationStatus.OnReview}
              >
                In Review
              </TabsTrigger>
              <TabsTrigger
                className={
                  "px-4 py-2 rounded-2xl border data-[state=active]:bg-sky-50 data-[state=active]:border-blue-600 space-x-4"
                }
                value={JobApplicationStatus.Interview}
              >
                Process Interview
              </TabsTrigger>
              <TabsTrigger
                className={
                  "px-4 py-2 rounded-2xl border data-[state=active]:bg-sky-50 data-[state=active]:border-blue-600 space-x-4"
                }
                value={JobApplicationStatus.Accepted}
              >
                Accepted
              </TabsTrigger>
              <TabsTrigger
                className={
                  "px-4 py-2 rounded-2xl border data-[state=active]:bg-sky-50 data-[state=active]:border-blue-600 space-x-4"
                }
                value={JobApplicationStatus.Rejected}
              >
                Rejected
              </TabsTrigger>
            </div>
          </TabsList>
          <div
            className={
              "bg-blue-100 text-sm text-neutral-600 px-4 py-2 rounded-2xl flex items-center gap-3"
            }
          >
            <Info className={"w-5 h-5"} />
            Please check your email regularly for updates on your application.
          </div>
          {/* Conditionally render the StatusTab component based on activeTab */}
          {activeTab === JobApplicationStatus.OnReview && (
            <StatusTab
              activeTab={activeTab}
              value={JobApplicationStatus.OnReview}
            />
          )}
          {activeTab === JobApplicationStatus.Interview && (
            <StatusTab
              activeTab={activeTab}
              value={JobApplicationStatus.Interview}
            />
          )}
          {activeTab === JobApplicationStatus.Accepted && (
            <StatusTab
              activeTab={activeTab}
              value={JobApplicationStatus.Accepted}
            />
          )}
          {activeTab === JobApplicationStatus.Rejected && (
            <StatusTab
              activeTab={activeTab}
              value={JobApplicationStatus.Rejected}
            />
          )}

          {/*<StatusTab*/}
          {/*  activeTab={activeTab}*/}
          {/*  value={JobApplicationStatus.OnReview}*/}
          {/*/>*/}
          {/*<StatusTab*/}
          {/*  activeTab={activeTab}*/}
          {/*  value={JobApplicationStatus.Interview}*/}
          {/*/>*/}
          {/*<StatusTab*/}
          {/*  activeTab={activeTab}*/}
          {/*  value={JobApplicationStatus.Accepted}*/}
          {/*/>*/}

          {/*<TabsContent></TabsContent>*/}
        </Tabs>
      </section>
    </main>
  );
}

export default Index;
