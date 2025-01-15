import React from "react";
import Image from "next/image";
import ButtonComponent from "../ButtonComponent";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useRouter } from "next/router";
import VerifyEmailModal from "@/components/Modal/VerifyEmailModal";
import ModalContainer from "@/components/Modal/ModalContainer";
import { closeModalAction, openModalAction } from "@/store/slices/ModalSlice";

interface CompanyHighlight {
  logo: string;
  companyName: string;
  companyIndustry: string;
  ratingScore: number;
  ratingAmount: number;
  companyId: number;
}

function CompanyHighlight({
  logo,
  companyName,
  companyIndustry,
  ratingScore,
  ratingAmount,
  companyId,
}: CompanyHighlight) {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, isVerified } = useSelector(
    (state: RootState) => state.auth,
  );
  const router = useRouter();
  const currentUrl = window.location.href;

  const callbackPath = `/auth/login/jobhunter?callback=${currentUrl}`;
  const { currentModalId } = useSelector(
    (state: RootState) => state.modalController,
  );
  const handleCloseModal = () => {
    dispatch(closeModalAction());
  };

  function handleRedirect() {
    if (isLoggedIn) {
      if (!isVerified) {
        dispatch(openModalAction("needToVerifyModal"));
        return;
      }
      router.push(
        `/company/company-review?companyId=${companyId}&companynName=${companyName}&callback=${currentUrl}`,
      );
    } else {
      router.push(callbackPath);
    }
  }

  return (
    <>
      <ModalContainer
        isOpen={currentModalId === "needToVerifyModal"}
        onClose={handleCloseModal}
      >
        <VerifyEmailModal />
      </ModalContainer>
      <div className="bg-white flex flex-col gap-6 w-full h-fit p-5 rounded-xl md:w-[335px]">
        <div className={"flex flex-col gap-5 items-start"}>
          <Image
            className="h-12 w-12"
            src={logo}
            alt="pic"
            width={200}
            height={200}
          />
          <div className={"flex flex-col gap-1"}>
            <h2 className="text-2xl font-bold">{companyName}</h2>
            <p className=" text-sm text-neutral-600 ">{companyIndustry}</p>
          </div>
        </div>

        <div className="flex gap-1 items-center">
          <Image
            src="/star.svg"
            alt="Star"
            width={30}
            height={30}
            className={"w-6"}
          />
          <p className={"text-neutral-950 text-sm"}>{ratingScore}</p>
          <a className={"text-neutral-950 text-sm cursor-pointer underline"}>
            ({ratingAmount} review)
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <p className={"text-neutral-600 text-sm"}>Have you ever work here?</p>
          {isLoggedIn ? (
            <Button variant={"primary"} onClick={handleRedirect}>
              Review Company
            </Button>
          ) : (
            <Button variant={"primary"} onClick={handleRedirect}>
              Login to give review
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default CompanyHighlight;
