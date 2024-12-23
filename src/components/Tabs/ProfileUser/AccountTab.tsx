import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import GeneralInfoSection from "@/components/Profile/JobHunter/GeneralInfoSection";
import WorkingHistorySection from "@/components/Profile/JobHunter/WorkingHistorySection";
import EducationSection from "@/components/Profile/JobHunter/EducationSection";
import { TabsContentProps } from "@/models/page.model";

function AccountTab({ value }: TabsContentProps) {
  return (
    <TabsContent
      className={`flex flex-col gap-4 mt-0 data-[state=active]:flex data-[state=inactive]:hidden`}
      value={value}
    >
      <GeneralInfoSection />
      <WorkingHistorySection />
      <EducationSection />
    </TabsContent>
  );
}

export default AccountTab;
