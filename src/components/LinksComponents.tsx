import React from "react";
import Link from "next/link";

// Define the type for the props
interface LinksComponentsProps {
  navbarItems: { label: string; href: string }[]; // Array of navbar items with label and href
  textColor: string; // Text color for the links
}

function LinksComponents({ navbarItems, textColor }: LinksComponentsProps) {
  return (
    <div className="hidden md:flex justify-between gap-4">
      {navbarItems.map((item, index) => (
        <Link
          key={index}
          className={`hover:text-blue-500 text-sm ${textColor}`}
          href={item.href}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default LinksComponents;
