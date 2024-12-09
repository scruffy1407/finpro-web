import React from "react";
import Link from "next/link";

function LinksComponents() {
  return (
    <div className="hidden md:flex justify-between gap-5">
      <Link className="hover:text-blue-500" href="/jobs/[jobs]" as="/jobs/1">
        Find Jobs
      </Link>
      <Link className="hover:text-blue-500" href={""}>
        Skill Assessment
      </Link>
      <Link
        className="hover:text-blue-500"
        href="/companies/[companies]"
        as="/companies/1"
      >
        Explore Companies
      </Link>
    </div>
  );
}

export default LinksComponents;
