import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Activity, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  dropDownItemConfig,
  navItemConfig,
  UserRole,
} from "@/components/NavigationBar/navigation";
import { Sparkles, Crown, TrendingUp } from "lucide-react";

interface ProfileProps {
  logout: () => void;
}

export function ProfileMenu({ logout }: ProfileProps) {
  const router = useRouter();
  const userRole = useSelector((state: RootState) => state.auth.user_role);
  const userName = useSelector((state: RootState) => state.auth.name);
  const userPhoto = useSelector((state: RootState) => state.auth.photo);
  const userEmail = useSelector((state: RootState) => state.auth.email);
  const subsId = useSelector((state: RootState) => state.auth.subscriptionId);

  const dropDownItem =
    dropDownItemConfig[(userRole as UserRole) || "jobhunter"];

  const subsPlan = () => {
    if (!subsId || subsId === 1) {
      return (
        <div className={"flex items-center "}>
          <TrendingUp className="h-4 w-4 mr-2 text-neutral-600" />
          <p className="text-xs text-muted-foreground font-bold text-neutral-600">
            Basic Plan
          </p>
        </div>
      );
    } else if (subsId === 2) {
      return (
        <div className={"flex items-center "}>
          <Sparkles className="h-4 w-4 mr-2 text-orange-600" />
          <p className="text-xs text-muted-foreground font-bold text-orange-600">
            Standard Plan
          </p>
        </div>
      );
    } else if (subsId === 3) {
      return (
        <div className={"flex items-center "}>
          <Crown className="h-4 w-4 mr-2 text-orange-600" />
          <p className="text-xs text-muted-foreground font-bold text-orange-600">
            Professional Plan
          </p>
        </div>
      );
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:flex md:flex-col md:gap-1 md:items-end">
        <p className="text-sm font-medium max-w-[160px] line-clamp-1">
          {userName}
        </p>
        {subsPlan()}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar>
              <AvatarImage
                src={userPhoto || "/dummyProfile.png"}
                alt={userName}
              />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 rounded-2xl p-2" align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium max-w-[160px] line-clamp-1">
                {userName}
              </p>
              <p className="text-xs text-neutral-600 text-muted-foreground">
                {userEmail}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {subsId === 1 ? (
            <>
              <div className="p-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{subsPlan()}</p>
                  <Button
                    onClick={() => router.push("/subscription")}
                    variant="outline"
                    size="sm"
                  >
                    Upgrade
                  </Button>
                </div>
              </div>
              <DropdownMenuSeparator />
            </>
          ) : null}

          {dropDownItem.map((item, i: number) => {
            const Icon = item.icon;
            return (
              <DropdownMenuItem
                key={i}
                className={"cursor-pointer"}
                onClick={() => {
                  router.push(item.href);
                }}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.name}
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={logout}
            className="text-red-600 cursor-pointer"
          >
            <LogOut className=" mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
