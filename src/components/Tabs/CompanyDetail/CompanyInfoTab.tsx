import React from "react";
import Image from "next/image";
import { TabsContent } from "@/components/ui/tabs";
import { TabsContentProps } from "@/models/page.model";
import { companyDetailResponse } from "@/models/company.model";

interface companyInfoProps extends TabsContentProps {
  data: companyDetailResponse | undefined;
  totalJob: number;
}

function CompanyInfoTab({ value, data, totalJob }: companyInfoProps) {
  console.log("INNER DATA", data);

  return (
    <TabsContent
      className={`flex flex-col gap-4 mt-0 data-[state=active]:flex data-[state=inactive]:hidden`}
      value={value}
    >
      <div className="bg-white rounded-2xl p-4 md:p-8 ">
        <div className={"flex flex-col gap-8"}>
          <h2 className="text-lg font-bold">Company Overview</h2>
          <div className="flex flex-col gap-8 flex-wrap md:flex-row md:gap-20 ">
            <div className="flex flex-row gap-4 md:flex-col md:gap-4">
              <Image
                src="/Briefcase.svg"
                alt="briefCase"
                width={24}
                height={24}
              />
              <div>
                <p className={`text-sm mb-1 text-neutral-400`}>Company Size</p>
                <p className="text-sm font-bold text-neutral-950">
                  {data?.companySize || "-"}
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-4 md:flex-col md:gap-4">
              <Image
                src="/Briefcase.svg"
                alt="briefCase"
                width={24}
                height={24}
              />
              <div>
                <p className={`text-sm mb-1 text-neutral-400`}>
                  Total Job Posted
                </p>
                <p className="text-sm font-bold text-neutral-950">
                  {totalJob} Job
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-4 md:flex-col md:gap-4">
              <Image
                src="/Briefcase.svg"
                alt="briefCase"
                width={24}
                height={24}
              />
              <div>
                <p className={`text-sm mb-1 text-neutral-400`}>Last Post Job</p>
                <p className="text-sm font-bold text-neutral-950">
                  20 Dec 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 bg-white rounded-2xl p-4 md:p-8">
        <div className={`flex flex-col gap-4`}>
          <h2 className="text-lg font-bold text-neutral-950">
            Company Description
          </h2>
          <p className="text-sm text-neutral-600">{data?.companyDescription}</p>
        </div>

        <div className={`flex flex-col gap-4`}>
          <h2 className="text-lg font-bold text-neutral-950 ">
            Address Detail
          </h2>
          <div className={`flex flex-col gap-1`}>
            <h4 className="text-sm text-neutral-950 font-bold">
              {data?.companyCity} , {data?.companyProvince}
            </h4>
            <p className="text-sm text-neutral-600">
              {data?.addressDetail ||
                "Detail of  the addrress is not provide by company"}
            </p>
          </div>
        </div>

        <div className={`flex flex-col gap-4`}>
          <h2 className="text-lg font-bold ">Contact Information</h2>

          <div className="flex items-center gap-2">
            <Image src="/Phone.svg" alt="Phone" width={24} height={24} />{" "}
            <p className={`text-sm text-neutral-600`}>
              {data?.companyPhoneNumber ||
                "Company didn't provide the phone number"}
            </p>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}

export default CompanyInfoTab;
