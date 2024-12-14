import React from "react";
import { AuthHandler } from "@/utils/auth.utils";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountTab from "@/components/Tabs/AccountTab";
import NavbarComponent from "@/components/NavbarComponent";
import SecurityTab from "@/components/Tabs/SecurityTab";

function Index() {
  const authHandler = new AuthHandler();
  const dummyRole = "jobhunter";
  //authHandler.authorizeUser(dummyRole);

  return (
    <>
      <NavbarComponent
        findJobs={`a`}
        skillAssessment={`a`}
        exploreCompanies={`a`}
        loginJobHunter={`a`}
        loginCompanies={`a`}
      />
      <section className="p-4 ">
        <div
          className={`w-full flex flex-col gap-4 md:flex-row md:gap-6 md:max-w-screen-xl md:mx-auto`}
        >
          <div
            className={`p-4 flex flex-col gap-5 bg-white rounded-2xl md:h-fit md:p-6 md:max-w-64`}
          >
            <Image
              width={72}
              height={72}
              src={"/dummyProfile.png"}
              alt={"Image Profile"}
              className={`rounded-full`}
            />
            <div className={`flex flex-col gap-2 `}>
              <h1 className={`text-lg font-bold text-neutral-950`}>
                Farel Darari Deksano
              </h1>
              <p className={`text-sm text-neutral-600`}>
                fareldeksano000@gmail.com
              </p>
            </div>
          </div>
          <Tabs className={`w-full flex flex-col gap-4`} defaultValue="account">
            <TabsList
              className={`w-full rounded-2xl bg-white py-4 px-4 h-fit justify-start gap-4 `}
            >
              <TabsTrigger
                className={
                  "px-4 py-2 rounded-2xl border data-[state=active]:bg-sky-50 data-[state=active]:border-blue-600"
                }
                value="account"
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                className={
                  "px-4 py-2 rounded-2xl border data-[state=active]:bg-sky-50 data-[state=active]:border-blue-600"
                }
                value="security"
              >
                Security
              </TabsTrigger>
            </TabsList>
            <AccountTab value={"account"} />
            <SecurityTab value={"security"} />
          </Tabs>
        </div>
      </section>
    </>
  );
}

export default Index;
