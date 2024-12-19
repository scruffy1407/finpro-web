import React from "react";
import Link from "next/link";

function LinksComponents() {
  return (
    <div className="hidden md:flex justify-between gap-5">
      <Link className="hover:text-blue-500" href="/jobs" as="/jobs">
        Find Jobs
      </Link>
      <Link className="hover:text-blue-500" href={""}>
        Skill Assessment
      </Link>
      <Link className="hover:text-blue-500" href="/company" as="/company">
        Explore Companies
      </Link>
    </div>
  );
}

export default LinksComponents;
