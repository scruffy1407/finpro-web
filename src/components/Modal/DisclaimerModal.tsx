import React from "react";
import { Button } from "@/components/ui/button";

import DisclamerProfile from "@/components/DisclamerProfile";
import useRouter from "next/router";
import { closeModalAction } from "@/store/slices/ModalSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

function DisclaimerModal() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter;
  function handleNavigate() {
    sessionStorage.setItem("hasSeenDisclaimer", "true");
    dispatch(closeModalAction());
    router.push("/");
  }

  return (
    <div className={`flex flex-col items-center justify-center gap-5`}>
      <div className={"flex flex-col gap-2 justify-center items-center"}>
        {/*<p className={"text-sm text-center text-neutral-600 font-bold"}>*/}
        {/*  Hello!*/}
        {/*</p>*/}
        <h1 className={"text-xl text-center font-bold text-neutral-950"}>
          We’re excited to introduce our project, Pathways!
        </h1>
        <p className={"text-sm text-center text-neutral-600"}>
          Just a quick reminder: Everything you see on our website is for
          project purposes only. Any payments or applications you submit will
          not be processed.
        </p>
      </div>
      <div className={"w-full bg-sky-50  p-4 rounded-2xl"}>
        <h3 className={"text-sm font-bold mb-6 text-center"}>
          Meet the team behind this project
        </h3>

        <div className={"flex flex-wrap gap-8 justify-center"}>
          <DisclamerProfile
            name={"Rizky Andiarto"}
            linkedIn={"https://www.linkedin.com/in/andiartori/"}
            github={"https://github.com/andiartori"}
            image={"/rizkyProfile.jpeg"}
          />
          <DisclamerProfile
            name={"Farel Darari Deksano"}
            linkedIn={"https://www.linkedin.com/in/fareldeksano/"}
            github={"https://github.com/digiT000"}
            image={"/farelProfile.jpeg"}
          />
          <DisclamerProfile
            name={"Thomas Pratama"}
            linkedIn={"https://www.linkedin.com/in/thomas-pratama/"}
            github={"https://github.com/scruffy1407"}
            image={"/thomasProfile.jpeg"}
          />
        </div>
      </div>
      <Button
        onClick={handleNavigate}
        variant={"primary"}
        className={" w-full"}
      >
        Explore Pathways
      </Button>
    </div>
  );
}

export default DisclaimerModal;
