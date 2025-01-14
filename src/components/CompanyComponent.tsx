import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface CompanyShortProps {
  companyId: string;
  logo: string;
  companyName: string;
  jobsOpen?: number;
  companyCity: string;
  companyProvince: string;
}

function CompanyComponent({
  companyId,
  logo,
  companyName,
  jobsOpen,
  companyProvince,
  companyCity,
}: CompanyShortProps) {
  return (
    <Link
      href={`/company/${companyId}`}
      className="bg-white w-full h-fit hover:shadow-lg rounded-xl"
    >
      <div className="p-5">
        <Image
          className="h-10 w-auto"
          src={logo}
          alt="pic"
          width={100}
          height={100}
        />
      </div>
      <div className="px-5">
        <h2 className="text-lg text-neutral-950">{companyName}</h2>
        <p className={"text-xs text-neutral-400"}>
          {companyCity}, {companyProvince}
        </p>
      </div>
      <div className="flex p-5">
        <p className="text-sm border rounded-xl py-1 px-2 bg-sky-950 text-white">
          {jobsOpen} Jobs Available{" "}
        </p>
      </div>
    </Link>
  );
}

export default CompanyComponent;
