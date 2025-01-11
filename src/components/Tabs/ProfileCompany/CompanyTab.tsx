import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import CompanyGeneralInfoSection from "@/components/Profile/Company/CompanyGeneralInfoSection";
import { TabsContentProps } from "@/models/page.model";

function AccountTab({ value }: TabsContentProps) {
  return (
    <TabsContent
      className={`flex flex-col gap-4 mt-0 data-[state=active]:flex data-[state=inactive]:hidden`}
      value={value}
    >
      <CompanyGeneralInfoSection />
    </TabsContent>
  );
}

export default AccountTab;
