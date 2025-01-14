import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { DeveloperUtils } from "@/utils/developer.utls";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { AuthHandler } from "@/utils/auth.utils";
import { Navbar } from "@/components/NavigationBar/Navbar";
import { formatNumber } from "@/utils/formater.utils";
import Image from "next/image";
import { UserTable } from "@/components/Table/ListUser.table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  resetPaginationState,
  setCurrentPage,
} from "@/store/slices/companySearchSlice";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import FooterComponent from "@/components/FooterComponent";

interface JobHunterSubscription {
  jobHunterSubscriptionId: number;
  subscriptionId: number;
  subscriptionActive: boolean;
  subscriptionStartDate: string; // ISO date string
  subscriptionEndDate: string; // ISO date string
}

export interface JobHunter {
  name: string;
  email: string;
  gender: "male" | "female" | null; // Assuming gender can also be null
  photo: string | null;
  jobHunterSubscription: JobHunterSubscription;
}

function Index() {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser("developer");
  const developerUtils = new DeveloperUtils();
  const dispatch = useDispatch();
  const token = Cookies.get("accessToken");
  const [isLoading, setIsLoading] = useState(false);
  const [subsIdSelected, setSubsIdSelected] = useState<string>("");
  const [userList, setUserList] = useState<JobHunter[]>([]);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { pagination } = useSelector(
    (state: RootState) => state.manageUserQuery,
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  async function fetchUsers(currentPage: number = 1, subsId: string = "") {
    if (!isLoggedIn) {
      console.log("not logged in");
      toast.error("Please login to your developer account");
      return;
    }
    if (!token) {
      console.log("tokeeen");
      toast.error(
        "Please refresh your browser and try again or try to re-login",
      );
    }

    setIsLoading(true);

    try {
      const response = await developerUtils.getUsers(
        token as string,
        subsId == "0" ? "" : subsId,
        currentPage,
      );

      console.log(response);
      const userList: JobHunter[] = [];
      response?.data?.listUser.map((user: any) => {
        userList.push({
          email: user.email,
          gender: user.gender,
          name: user.name,
          photo: user.photo,
          jobHunterSubscription: {
            jobHunterSubscriptionId:
              user.jobHunterSubscription.job_hunter_subscription_id,
            subscriptionActive: user.jobHunterSubscription.subscription_active,
            subscriptionId: user.jobHunterSubscription.subscriptionId,
            subscriptionEndDate:
              user.jobHunterSubscription.subscription_end_date,
            subscriptionStartDate:
              user.jobHunterSubscription.subscription_start_date,
          },
        });
      });
      setUserList(userList);
      setIsLoading(false);
    } catch (e) {
      toast.error(
        "Error happen on our side, please refresh your browser or try to re-login",
      );
    }
  }

  useEffect(() => {
    console.log("hit use effect");
    fetchUsers(pagination.currentPage || 1);
  }, [pagination.currentPage, isLoggedIn]);
  console.log("DATA", userList);

  return (
    <>
      <Navbar pageRole={"developer"} />
      <main className={"px-4 max-w-screen-xl mx-auto"}>
        <section className={"mt-5 p-6 bg-white rounded-2xl"}>
          <h1 className={"font-bold text-2xl mb-3"}>User Management</h1>
          <p className={"text-sm text-neutral-600 mb-10"}>
            View all user that register in Pathway Platform
          </p>
          <div className={"flex gap-3 mb-3"}>
            <Select
              value={subsIdSelected}
              onValueChange={async (value) => {
                setSubsIdSelected(value);
                await fetchUsers(1, value);
                dispatch(resetPaginationState());
              }}
            >
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue placeholder="All Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">All Plan</SelectItem>
                <SelectItem value="1">Free Plan</SelectItem>
                <SelectItem value="2">Standard Plan</SelectItem>
                <SelectItem value="3">Professional Plan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div></div>
          <UserTable listUser={userList} />
          {isLoading ? null : (
            <Pagination className={"mt-5"}>
              <PaginationContent>
                <PaginationPrevious
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  className={
                    pagination.currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }
                >
                  Previous
                </PaginationPrevious>

                {/* Page numbers */}
                {[...Array(pagination.totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => handlePageChange(index + 1)}
                      isActive={pagination.currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationNext
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  className={
                    pagination.currentPage === pagination.totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }
                >
                  Next
                </PaginationNext>
              </PaginationContent>
            </Pagination>
          )}
        </section>
        <FooterComponent pageRole={"developer"} />
      </main>
    </>
  );
}

export default Index;
