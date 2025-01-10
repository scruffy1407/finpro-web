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
import Cookies from "js-cookie";
import { logout } from "@/store/slices/authSlice_tes";
import { useRouter } from "next/router";
import ActionButton from "@/components/NavigationBar/ActionButton";
import ProfileSkeleton from "@/components/NavigationBar/ProfileSkeleton";

export function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const userRole = useSelector((state: RootState) => state.auth.user_role);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const pendingState = useSelector(
    (state: RootState) => state.auth.pendingState,
  );

  console.log("USER ROLE", userRole);

  const theme = themeConfig[(userRole as UserRole) || "jobhunter"];
  const navigation = navItemConfig[(userRole as UserRole) || "jobhunter"];
  // const Logo = (userRole as UserRole) === "jobhunter" ? "/logo" : Building2;
  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    await dispatch(logout());
    router.push("/").then(() => {
      window.location.reload();
    });
  };

  return (
    <nav>
      <div
        className={`max-w-screen-xl mx-auto mt-4 rounded-xl py-5 px-4 pr-5 ${theme.bgColor}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src={theme.logo}
                  alt="Pathway Logo"
                  width={121}
                  height={24}
                />
              </Link>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:ml-12 md:flex md:items-center md:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center text-sm font-medium text-muted-foreground hover:${theme.hoverColor} transition-colors ${theme.textColor}`}
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
            <MobileMenu isOpen={isOpen} onOpenChange={setIsOpen} />
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
}
