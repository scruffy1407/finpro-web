import React from "react";
import { Button } from "@/components/ui/button";

function SecuritySection() {
  return (
    <>
      <section className="p-4 rounded-2xl bg-white flex flex-col gap-6 md:p-6">
        <div className={`flex flex-col gap-5`}>
          <div className={`flex flex-col gap-1`}>
            <h2 className="text-lg font-bold text-neutral-950 md:text-xl">
              Change Password
            </h2>
            <p className={`text-sm text-neutral-600`}>
              {`If you change your password, you will need to log in again.`}
            </p>
          </div>
          <Button className={"w-fit"} variant={"primary"} size={"default"}>
            Request Change
          </Button>
        </div>
      </section>
    </>
  );
}

export default SecuritySection;
