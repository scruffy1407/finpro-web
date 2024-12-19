import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";

function FooterComponent() {
  const userRole = useSelector((state: RootState) => state.login.user_role);

  const roleConfig = {
    jobhunter: {
      logo: "/logo/MainLogoWhite.svg",
      navbarItems: [
        { label: "Find Jobs", href: "" },
        { label: "Skill Assessments", href: "" },
        { label: "Explore Companies", href: "" },
      ],
    },
    company: {
      logo: "/logo/CompanyLogo.svg",
      navbarItems: [
        { label: "Dashboard", href: "" },
        { label: "Test Templates", href: "" },
      ],
    },
    default: {
      logo: "/logo/MainLogoWhite.svg",
      navbarItems: [
        { label: "Find Jobs", href: "" },
        { label: "Skill Assessments", href: "" },
        { label: "Explore Companies", href: "" },
      ],
    },
  };

  const { logo, navbarItems } = roleConfig[userRole || "default"];

  return (
    <div className="max-w-screen-xl mx-auto bg-sky-950 border rounded-xl mb-16">
      <div className="">
        <div className="md:flex justify-between p-6">
          {/* Logo Section */}
          <div className="flex justify-center md:justify-start">
            <Image src={logo} alt="Footer Logo" width={150} height={28} />
          </div>

          {/* Social Media Icons for Desktop */}
          <div className="hidden md:flex p-3 gap-6">
            <Image
              src="/footer/logoInsta.png"
              alt="Instagram Logo"
              width={20}
              height={20}
            />
            <Image
              src="/footer/logoLinkedIn.png"
              alt="LinkedIn Logo"
              width={20}
              height={20}
            />
            <Image
              src="/footer/logoMail.png"
              alt="Mail Logo"
              width={20}
              height={20}
            />
          </div>
        </div>

        {/* Description Section */}
        <div className="flex text-center md:text-left w-full md:w-[50%]">
          <p className="text-white text-sm px-6">
            At Pathway, we&apos;re dedicated to connecting you with the right
            opportunities. Whether you&apos;re looking to hire top talent or
            take the next step in your career, we&apos;re here to help you
            bridge the gap. Explore, connect, and grow with us.
          </p>
        </div>

        {/* Social Media Icons for Mobile */}
        <div className="flex justify-center items-center mt-6 p-3 gap-6 md:hidden">
          <Image
            src="/footer/logoInsta.png"
            alt="Instagram Logo"
            width={30}
            height={30}
          />
          <Image
            src="/footer/logoLinkedIn.png"
            alt="LinkedIn Logo"
            width={30}
            height={30}
          />
          <Image
            src="/footer/logoMail.png"
            alt="Mail Logo"
            width={30}
            height={30}
          />
        </div>
      </div>

      {/* Navbar Links for Mobile */}
      <div className="flex flex-col md:hidden text-white text-sm text-center py-8 gap-3">
        {navbarItems.map((item, index) => (
          <Link key={index} href={item.href} className="hover:text-blue-400">
            {item.label}
          </Link>
        ))}
        <div>
          <p className="pt-8 text-sm">&copy; 2024 Pathway Limited</p>
        </div>
      </div>

      {/* Navbar Links and Copyright Section */}
      <div className="hidden md:flex justify-between items-center py-8 text-white p-6">
        {/* Navbar Links */}
        <div className="flex gap-6">
          {navbarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="hover:text-blue-400 transition duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Copyright Text */}
        <div>
          <p className="text-base">&copy; 2024 Pathway Limited</p>
        </div>
      </div>
    </div>
  );
}

export default FooterComponent;
