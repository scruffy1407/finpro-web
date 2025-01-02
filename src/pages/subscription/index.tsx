import React from "react";
import { PageHeader } from "@/components/Subscription/Header/PageHeader";
import { PricingSection } from "@/components/Subscription/Pricing/PricingSection";
import { SupportSection } from "@/components/Subscription/Support/SupportSection";
import NavbarComponent from "@/components/NavbarComponent";
import FooterComponent from "@/components/FooterComponent";
import { AuthHandler } from "@/utils/auth.utils";
import ModalContainer from "@/components/Modal/ModalContainer";
import { closeModalAction } from "@/store/slices/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { Navbar } from "@/components/NavigationBar/Navbar";

function Index() {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser();
  const router = useRouter();
  const callbackPath = `/auth/login/jobhunter?callback=${router.pathname}`;
  const dispatch = useDispatch<AppDispatch>();
  const { currentModalId } = useSelector(
    (state: RootState) => state.modalController,
  );

  function handleRedirect() {
    router.push(callbackPath);
  }
  const handleCloseModal = () => {
    dispatch(closeModalAction());
  };

  return (
    <main>
      <ModalContainer
        isOpen={currentModalId === "needToLoginModal"}
        onClose={handleCloseModal}
      >
        <div className={"flex flex-col gap-6"}>
          <div className={"flex flex-col gap-2 text-center"}>
            <h2 className="text-2xl font-bold text-neutral-950">
              Unlock Your Career Potential
            </h2>
            <p className={`text-neutral-600 text-sm`}>
              {`Don't miss out on your next big opportunity. Login now to explore
              10K+ jobs from 200+ top companies. Your dream career is just a
              click away.`}
            </p>
          </div>
          <div className={"flex gap-4"}>
            <Button
              className={`w-full`}
              variant={"outline"}
              onClick={() => router.push("/auth/register/jobhunter")}
            >
              Register
            </Button>
            <Button
              className={`w-full`}
              variant={"primary"}
              onClick={handleRedirect}
            >
              Login
            </Button>
          </div>
        </div>
      </ModalContainer>
      <Navbar />

      <div className="mx-auto max-w-screen-xl mt-5 mb-10">
        <div className={`bg-white w-full p-10 rounded-2xl`}>
          <PageHeader />
          <PricingSection />
          <SupportSection />
        </div>
      </div>
      <FooterComponent />
    </main>
  );
}

export default Index;
