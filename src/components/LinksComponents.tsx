import React from "react";
import Link from "next/link";

interface LinkItem {
  label: string;
  href: string;
}

interface LinksComponentsProps {
  navbarItems: LinkItem[];
  textColor: string;
}

function LinksComponents({ navbarItems = [], textColor }: LinksComponentsProps) {
  return (
    <div className="hidden md:flex justify-between gap-5">
      {navbarItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`hover:text-blue-500 ${textColor}`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default LinksComponents;
