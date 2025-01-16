import {
  Briefcase,
  Brain,
  Building2,
  Users,
  FileText,
  FileUser,
  FileBadge,
  UserRound,
  Building,
  BookmarkCheck,
  ListCheck,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export type UserRole = "company" | "jobhunter" | "developer" | "default";

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export interface UserProfile {
  name: string;
  email: string;
  plan: string;
  views: string;
  imageUrl: string;
  role: UserRole;
}

interface ThemeConfig {
  logo: string;
  bgColor: string;
  textColor: string;
  hoverColor: string;
}

export const themeConfig: Record<UserRole, ThemeConfig> = {
  jobhunter: {
    logo: "/logo/MainLogo.svg",
    bgColor: "bg-white",
    textColor: "text-neutral-600",
    hoverColor: "text-blue-500",
  },
  company: {
    logo: "/logo/CompanyLogo.svg",
    bgColor: "bg-sky-950",
    textColor: "text-white",
    hoverColor: "text-sky-500",
  },
  developer: {
    logo: "/logo/MainLogo.svg",
    bgColor: "bg-white",
    textColor: "text-neutral-600",
    hoverColor: "text-blue-500",
  },
  default: {
    logo: "/logo/MainLogo.svg",
    bgColor: "bg-white",
    textColor: "text-neutral-600",
    hoverColor: "text-blue-500",
  },
};

export const navItemConfig: Record<UserRole, NavigationItem[]> = {
  jobhunter: [
    { name: "Find Jobs", href: "/jobs", icon: Briefcase },
    { name: "Skill Assessment", href: "/skills-assessment", icon: Brain },
    { name: "Explore Companies", href: "/company", icon: Building2 },
  ],
  company: [
    { name: "Job List", href: "/dashboard/company", icon: FileText },
    { name: "Test Template", href: "/preSelectionDashboard", icon: Users },
  ],
  developer: [
    {
      name: "Dashboard Analytics",
      href: "/developer/analytics",
      icon: FileText,
    },
    {
      name: "Manage Assessment",
      href: "/assessmentTestDashboard",
      icon: ListCheck,
    },
    { name: "User List", href: "/developer/manage-user", icon: Users },
  ],
  default: [
    { name: "Find Jobs", href: "/jobs", icon: Briefcase },
    { name: "Skill Assessment", href: "/skills-assessment", icon: Brain },
    { name: "Explore Companies", href: "/company", icon: Building2 },
  ],
};

export const dropDownItemConfig: Record<UserRole, NavigationItem[]> = {
  jobhunter: [
    { name: "My Profile", href: "/profile/user", icon: UserRound },
    {
      name: "Application History",
      href: "/profile/application-history",
      icon: FileUser,
    },
    {
      name: "My Certificate",
      href: "/profile/user/certificates",
      icon: FileBadge,
    },
    { name: "Saved Jobs", href: "/jobs/bookmarks", icon: BookmarkCheck },
    {
      name: "My Transaction",
      href: "/profile/manage-subscription",
      icon: FileBadge,
    },
  ],
  company: [
    { name: "Company Profile", href: "/profile/company", icon: Building },
  ],
  developer: [{ name: "", href: "", icon: Building }],
  default: [
    { name: "My Profile", href: "/profile/user", icon: UserRound },
    {
      name: "Application History",
      href: "/profile/application-history",
      icon: FileUser,
    },
    {
      name: "My Certificate",
      href: "/profile/user/certificates",
      icon: FileBadge,
    },
    { name: "Saved Jobs", href: "/jobs/bookmarks", icon: BookmarkCheck },
  ],
};

export const MobileNavigation: Record<UserRole, NavigationItem[]> = {
  jobhunter: [
    { name: "Find Jobs", href: "/jobs", icon: Briefcase },
    { name: "Skill Assessment", href: "/skills-assessment", icon: Brain },
    { name: "Explore Companies", href: "/company", icon: Building2 },
  ],
  company: [
    { name: "Job List", href: "/dashboard/company", icon: FileText },
    { name: "Test Template", href: "/preSelectionDashboard", icon: Users },
  ],
  developer: [
    {
      name: "Dashboard Analytics",
      href: "/developer/analytics",
      icon: FileText,
    },
    {
      name: "Manage Assessment",
      href: "/assessmentTestDashboard",
      icon: ListCheck,
    },
    { name: "User List", href: "/developer/manage-user", icon: Users },
  ],
  default: [
    { name: "Find Jobs", href: "/jobs", icon: Briefcase },
    { name: "Skill Assessment", href: "/skills-assessment", icon: Brain },
    { name: "Explore Companies", href: "/company", icon: Building2 },
  ],
};