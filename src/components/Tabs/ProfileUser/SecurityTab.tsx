import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import { TabsContentProps } from "@/models/page.model";
import SecuritySection from "@/components/Profile/SecuritySection";

function SecurityTab({ value }: TabsContentProps) {
  return (
    <TabsContent
      className={
        "w-full mt-0 data-[state=active]:inline-block data-[state=inactive]:hidden"
      }
      value={value}
    >
      <SecuritySection />
    </TabsContent>
  );
}

export default SecurityTab;
