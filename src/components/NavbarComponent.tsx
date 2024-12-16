import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "@/store";
import { login, logout } from "@/store/slices/authSlice";
import { toggleMobileMenu } from "@/store/slices/mobileMenuSlice";
import { NavProps } from "@/utils/interface";
import Image from "next/image";
import LinksComponents from "./LinksComponents";
import Cookies from "js-cookie";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import ButtonComponent from "./ButtonComponent";

function NavbarComponent({ loginJobHunter, loginCompanies }: NavProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const userRole = useSelector((state: RootState) => state.login.user_role);
  const userName = useSelector((state: RootState) => state.login.name);
  const userPhoto = useSelector((state: RootState) => state.login.photo);

  console.log("Navbar Debugging Info:");
  console.log("isLoggedIn:", isLoggedIn);
  console.log("userRole:", userRole);
  console.log("userName:", userName);
  console.log("userPhoto:", userPhoto);

  const roleConfig = {
    jobhunter: {
      logo: "/logo/MainLogo.svg",
      bgColor: "bg-white",
      textColor: "text-neutral-900",
      profileRoute: "/user",
      navbarItems: [
        { label: "Find Jobs", href: "" },
        { label: "Skill Assessments", href: "" },
        { label: "Explore Companies", href: "" },
      ],
      dropdownItems: [
        { label: "My Profile", href: "" },
        { label: "Log Out", action: () => handleLogout() },
        { label: "Find Jobs", href: "" },
        { label: "Skill Assessments", href: "" },
        { label: "Explore Companies", href: "" },
      ],
    },
    company: {
      logo: "/logo/CompanyLogo.svg",
      bgColor: "bg-sky-950",
      textColor: "text-white",
      profileRoute: "/company",
      navbarItems: [
        { label: "Dashboard", href: "" },
        { label: "Test Template", href: "" },
      ],
      dropdownItems: [
        { label: "My Company", href: "" },
        { label: "Log Out", action: () => handleLogout() },
        { label: "Dashboard", href: "" },
        { label: "Test Templates", href: "" },
      ],
    },
    default: {
      logo: "/logo/MainLogo.svg",
      bgColor: "bg-white",
      textColor: "text-neutral-900",
      profileRoute: "/user",
      navbarItems: [
        { label: "Find Jobs", href: "" },
        { label: "Skill Assessments", href: "" },
        { label: "Explore Companies", href: "" },
      ],
      dropdownItems: [],
    },
  };

  const { logo, bgColor, textColor, profileRoute, dropdownItems } =
    roleConfig[userRole || "default"];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    dispatch(logout());
    router.push("/").then(() => {
      window.location.reload();
    });
  };

  return (
    <div className={`max-w-screen-xl mx-auto`}>
      <div
        className={`${bgColor} flex justify-between border rounded-xl py-5 px-4 pr-5`}
      >
        <div className="flex justify-between gap-9 items-center">
          <div className="flex">
            <Image src={logo} alt="Pathway Logo" width={121} height={24} />
          </div>
          <LinksComponents
            navbarItems={roleConfig[userRole || "default"].navbarItems}
            textColor={textColor}
          />
        </div>

        {/* Conditional rendering based on isLoggedIn state */}
        {!isLoggedIn ? (
          <div className="hidden sm:flex sm:justify-center items-center gap-3 ">
            <ButtonComponent
              container={loginJobHunter}
              type="ButtonBorder"
              onClick={() => router.push("/auth/login/jobhunter")}
            />
            <ButtonComponent
              container={loginCompanies}
              type="ButtonText"
              onClick={() => router.push("/auth/login/company")}
            />
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="hidden sm:flex justify-center items-center gap-3">
                <div>
                  <Image
                    className="border rounded-full"
                    src={userPhoto || "/loginAsset/nophoto.svg"}
                    alt={"Photo"}
                    width={35}
                    height={35}
                  />
                </div>
                <div>
                  <p className={`text-base ${textColor}`}>
                    {userName || "User"}
                  </p>
                </div>
                <div>
                  <Image
                    src={"/dropLine.svg"}
                    alt={"Photo"}
                    width={30}
                    height={30}
                  />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {dropdownItems.map((item, index) => (
                <DropdownMenuItem key={index} className="text-base">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`hover:text-blue-500 text-base text-black`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={item.action}
                      className={`hover:text-blue-500 text-black`}
                    >
                      {item.label}
                    </button>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Mobile burger icon */}
        {/* Not Logged In */}
        {!isLoggedIn ? (
          <div
            className="sm:hidden flex items-center"
            onClick={() => dispatch(toggleMobileMenu())}
          >
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src="/burger.svg"
                  alt="Burger Icon"
                  width={30}
                  height={30}
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <div className="p-1">
                  <ButtonComponent
                    container={loginJobHunter}
                    type="ButtonBorder"
                    onClick={() => dispatch(login())}
                  />
                </div>

                <div className="p-2">
                  <ButtonComponent
                    container={loginCompanies}
                    type="ButtonText"
                    onClick={() => dispatch(login())}
                  />
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <Link className="hover:text-blue-500" href={""}>
                    Find Jobs
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className="hover:text-blue-500" href={""}>
                    Skill Assessment
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className="hover:text-blue-500" href={""}>
                    Explore Companies
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          // Authenticated Login
          <div
            className="sm:hidden flex items-center"
            onClick={() => dispatch(toggleMobileMenu())}
          >
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src="/burger.svg"
                  alt="Burger Icon"
                  width={30}
                  height={30}
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuSeparator />

                {dropdownItems.map((item, index) => (
                  <DropdownMenuItem key={index} className="text-base">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={`hover:text-blue-500 text-base text-black`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        onClick={item.action}
                        className={`hover:text-blue-500 text-black`}
                      >
                        {item.label}
                      </button>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavbarComponent;
