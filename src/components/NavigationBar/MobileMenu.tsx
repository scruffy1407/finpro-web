import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, LogOut, TrendingUp, Sparkles, Crown } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  dropDownItemConfig,
  MobileNavigation,
  UserRole,
} from "@/components/NavigationBar/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { logoutUser } from "@/store/slices/authSlice";
import { useRouter } from "next/router";

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  pageRole: UserRole;
}

export function MobileMenu({ isOpen, onOpenChange }: MobileMenuProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const userRole = useSelector((state: RootState) => state.auth.user_role);
  const userName = useSelector((state: RootState) => state.auth.name);
  const userPhoto = useSelector((state: RootState) => state.auth.photo);
  const subsId = useSelector((state: RootState) => state.auth.subscriptionId);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleLogout = async () => {
    dispatch(logoutUser());
    window.location.href = "/";
  };

  const mobileNavigation =
    MobileNavigation[(userRole as UserRole) || "jobhunter"];

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
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-neutral-950 border-neutral-100 hover:text-neutral-600 hover:bg-white/10"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className={"z-index-[99]"}>
        <SheetHeader></SheetHeader>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="mt-6 space-y-4">
            {isLoggedIn ? (
              <div className="border rounded-2xl p-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={userPhoto || "/dummyProfile.png"}
                      alt={userName}
                    />
                  </Avatar>
                  <div className={"flex flex-col gap-2"}>
                    <p className="text-sm font-medium">{userName}</p>
                    {userRole === "jobhunter" ? subsPlan() : null}
                  </div>
                </div>
                {userRole === "jobhunter" ? (
                  subsId === 1 ? (
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
                    </>
                  ) : null
                ) : null}
              </div>
            ) : null}
            {mobileNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => onOpenChange(false)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              );
            })}
            {isLoggedIn ? (
              <div className="border-t pt-4 space-y-4">
                {dropDownItem.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => onOpenChange(false)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Link>
                  );
                })}
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full justify-start text-sm font-medium text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            ) : (
              <div className={"flex flex-col gap-4"}>
                <Button
                  onClick={() => router.push("/auth/login/jobhunter")}
                  className={"w-full"}
                  variant={"outline"}
                  size={"lg"}
                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push("/auth/register/jobhunter")}
                  className={"w-full"}
                  variant={"ghost"}
                  size={"lg"}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
