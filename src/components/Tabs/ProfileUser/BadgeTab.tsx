import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import { TabsContentProps } from "@/models/page.model";
import BadgeSection from "@/components/Profile/BadgeSection";

function BadgeTab({ value }: TabsContentProps) {
  return (
    <TabsContent
      className={`flex flex-col gap-4 mt-0 data-[state=active]:flex data-[state=inactive]:hidden`}
      value={value}
    >
      <BadgeSection />
    </TabsContent>
  );
}

export default BadgeTab;
