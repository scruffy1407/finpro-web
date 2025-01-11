import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { logoutUser } from "@/store/slices/authSlice";

function ForbiddenCompanyAction() {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  return (
    <div className={`flex flex-col items-center justify-center gap-5`}>
      <div className={"flex flex-col gap-2 justify-center items-center"}>
        <h3 className={"text-lg font-bold text-neutral-950"}>
          This action isn’t available for company accounts
        </h3>
        <p className={"text-sm text-neutral-600"}>
          Please log in as a Job Hunter to proceed with this action.
        </p>
      </div>
      <div className={"flex flex-col md:flex-row md:items-top gap-5"}>
        <Button
          variant={"primary"}
          onClick={() => router.push("/dashboard/company")}
          className={" w-full"}
        >
          Return to Dashboard
        </Button>
        <div className={"w-full"}>
          <Button
            variant={"outline"}
            onClick={() => {
              dispatch(logoutUser());
              router.push("/auth/login/jobhunter");
            }}
            className={"mb-2 w-full"}
          >
            Log in as Job Hunter
          </Button>
          <p className={"text-xs text-neutral-400 text-center"}>
            This will log you out of your current account.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForbiddenCompanyAction;
