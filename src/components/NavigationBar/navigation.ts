import {
  Briefcase,
  Brain,
  Building2,
  Users,
  FileText,
  MessageSquare,
  FileUser,
  FileBadge,
  UserRound,
  Building,
  BookmarkCheck,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export type UserRole = "company" | "jobhunter" | "developer";

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
};

export const navItemConfig: Record<UserRole, NavigationItem[]> = {
  jobhunter: [
    { name: "Find Jobs", href: "/jobs", icon: Briefcase },
    { name: "Skill Assessment", href: "/skills-assessment", icon: Brain },
    { name: "Explore Companies", href: "/company", icon: Building2 },
  ],
  company: [
    { name: "Job List", href: "/post-job", icon: FileText },
    { name: "Test Template", href: "/candidates", icon: Users },
  ],
  developer: [
    { name: "Dashboard", href: "/post-job", icon: FileText },
    { name: "Manage Assessment", href: "/candidates", icon: Users },
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
    { name: "My Certificate", href: "/profile/certificate", icon: FileBadge },
    { name: "Saved Jobs", href: "/jobs/bookmarks", icon: BookmarkCheck },
  ],
  company: [
    { name: "Company Profile", href: "/company-profile", icon: Building },
  ],
  developer: [{ name: "", href: "", icon: Building }],
};

export const MobileNavigation: Record<UserRole, NavigationItem[]> = {
  jobhunter: [
    { name: "Find Jobs", href: "/jobs", icon: Briefcase },
    { name: "Skill Assessment", href: "/skills-assessment", icon: Brain },
    { name: "Explore Companies", href: "/companies", icon: Building2 },
  ],
  company: [
    { name: "Find Jobs", href: "/jobs", icon: Briefcase },
    { name: "Skill Assessment", href: "/assessment", icon: Brain },
    { name: "Explore Companies", href: "/companies", icon: Building2 },
    { name: "Post a Job", href: "/post-job", icon: FileText },
    { name: "Candidates", href: "/candidates", icon: Users },
    { name: "Company Profile", href: "/company-profile", icon: Building },
    { name: "Messages", href: "/messages", icon: MessageSquare },
  ],
  developer: [
    { name: "Find Jobs", href: "/jobs", icon: Briefcase },
    { name: "Skill Assessment", href: "/skills-assessment", icon: Brain },
    { name: "Explore Companies", href: "/companies", icon: Building2 },
  ],
};
