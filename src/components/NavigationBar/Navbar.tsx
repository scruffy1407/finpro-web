import React, { useState } from "react";
import { ProfileMenu } from "./ProfileMenu";
import { MobileMenu } from "./MobileMenu";
import {
  navItemConfig,
  themeConfig,
  UserRole,
} from "@/components/NavigationBar/navigation";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { useRouter } from "next/router";
import ActionButton from "@/components/NavigationBar/ActionButton";
import ProfileSkeleton from "@/components/NavigationBar/ProfileSkeleton";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/store/slices/authSlice";

export function Navbar({ pageRole }: { pageRole: UserRole }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const userRole = useSelector((state: RootState) => state.auth.user_role);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const pendingState = useSelector(
    (state: RootState) => state.auth.pendingState,
  );

  const navigationUpdate = navItemConfig[pageRole];
  const themeUpdate = themeConfig[pageRole];

  const handleLogout = async () => {
    dispatch(logoutUser());
    window.location.href = "/";
  };

  function renderNavbar() {
    switch (pageRole) {
      case "jobhunter":
        return (
          <nav className={"max-w-screen-xl mx-auto px-4"}>
            <div
              className={`mt-4 rounded-xl py-5 px-4 pr-5 ${themeUpdate.bgColor}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link href="/">
                      <Image
                        src={themeUpdate.logo}
                        alt="Pathway Logo"
                        width={121}
                        height={24}
                      />
                    </Link>
                  </div>
                  {/* Desktop Menu */}
                  <div className="hidden md:ml-12 md:flex md:items-center md:space-x-8">
                    {navigationUpdate.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center text-sm font-medium text-muted-foreground hover:${themeUpdate.hoverColor} transition-colors ${themeUpdate.textColor}`}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Menu */}
                <div className="flex md:hidden">
                  <MobileMenu
                    pageRole={pageRole}
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                  />
                </div>

                {/* Desktop Profile Menu */}

                <div className="hidden md:flex md:items-center">
                  {pendingState.dataLoading ? (
                    <ProfileSkeleton />
                  ) : isLoggedIn ? (
                    userRole === "company" ? (
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        onClick={() => router.push("/dashboard/company")}
                      >
                        Go to dashboard company
                      </Button>
                    ) : (
                      <ProfileMenu logout={handleLogout} />
                    )
                  ) : (
                    <ActionButton />
                  )}
                </div>
              </div>
            </div>
          </nav>
        );
      case "company":
        return (
          <nav className={"px-4"}>
            <div
              className={`max-w-screen-xl mx-auto mt-4 rounded-xl py-5 px-4 pr-5 ${themeUpdate.bgColor}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link href="/">
                      <Image
                        src={themeUpdate.logo}
                        alt="Pathway Logo"
                        width={121}
                        height={24}
                      />
                    </Link>
                  </div>
                  {/* Desktop Menu */}
                  <div className="hidden md:ml-12 md:flex md:items-center md:space-x-8">
                    {navigationUpdate.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center text-sm font-medium text-muted-foreground hover:${themeUpdate.hoverColor} transition-colors ${themeUpdate.textColor}`}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Menu */}
                <div className="flex md:hidden">
                  <MobileMenu
                    pageRole={pageRole}
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                  />
                </div>

                {/* Desktop Profile Menu */}

                <div className="hidden md:flex md:items-center">
                  {pendingState.dataLoading ? (
                    <ProfileSkeleton />
                  ) : isLoggedIn ? (
                    <ProfileMenu logout={handleLogout} />
                  ) : (
                    <ActionButton />
                  )}
                </div>
              </div>
            </div>
          </nav>
        );
      case "developer":
        return (
          <nav className={"max-w-screen-xl mx-auto px-4"}>
            <div
              className={`mt-4 rounded-xl py-5 px-4 pr-5 ${themeUpdate.bgColor}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link href="/">
                      <Image
                        src={themeUpdate.logo}
                        alt="Pathway Logo"
                        width={121}
                        height={24}
                      />
                    </Link>
                  </div>
                  {/* Desktop Menu */}
                  <div className="hidden md:ml-12 md:flex md:items-center md:space-x-8">
                    {navigationUpdate.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center text-sm font-medium text-muted-foreground hover:${themeUpdate.hoverColor} transition-colors ${themeUpdate.textColor}`}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Menu */}
                <div className="flex md:hidden">
                  <MobileMenu
                    pageRole={pageRole}
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                  />
                </div>

                {/* Desktop Profile Menu */}

                <div className="hidden md:flex md:items-center">
                  {pendingState.dataLoading ? (
                    <ProfileSkeleton />
                  ) : isLoggedIn ? (
                    userRole === "company" ? (
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        onClick={() => router.push("/dashboard/company")}
                      >
                        Go to dashboard company
                      </Button>
                    ) : (
                      <ProfileMenu logout={handleLogout} />
                    )
                  ) : (
                    <ActionButton />
                  )}
                </div>
              </div>
            </div>
          </nav>
        );
    }
  }

  return <>{renderNavbar()}</>;
}
