import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

function ActionButton() {
  const router = useRouter();
  return (
    <div className="hidden md:flex md:items-center md:gap-3">
      <Button
        onClick={() => router.push("/auth/login/jobhunter")}
        variant={"outline"}
        size={"sm"}
      >
        Login
      </Button>
      <Button
        onClick={() => router.push("auth/register/company")}
        variant={"ghost"}
        size={"sm"}
      >
        Register
      </Button>
    </div>
  );
}

export default ActionButton;
