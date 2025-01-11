import React from "react";
import HeroComponent from "@/components/HeroComponent";
import MarqueeComponent from "@/components/MarqueeComponent";
import HeadingComponent from "@/components/HeadingComponent";
import JobMappingComponent from "@/components/JobMappingComponent";
import ButtonComponent from "@/components/ButtonComponent";
import CompanyMappingComponent from "@/components/CompanyMappingComponent";
import FooterComponent from "@/components/FooterComponent";
import { AuthHandler } from "@/utils/auth.utils";
import useRouter from "next/router";
import { Navbar } from "@/components/NavigationBar/Navbar";
import { Button } from "@/components/ui/button";

function Home() {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser();
  const router = useRouter;

  return (
    <div className="overflow-hidden">
      <Navbar pageRole={"jobhunter"} />

      <div className="mx-4 md:w-auto">
        <HeroComponent />
      </div>
      <MarqueeComponent />

      <section className="mx-4 mt-20 px-4">
        <HeadingComponent
          heading="We found Jobs near you!"
          paragraph="Explore opportunities tailored to your location and discover the perfect match for your next career move"
          onClick={() => router.push("/jobs")}
        />
        <JobMappingComponent />
        {/* NOTE THAT THIS BUTTON PART IS CONDITIONAL ONLY AND ONLY SHOWS ON MOBILE VIEW! */}
        <Button variant={"outline"} className={"mt-6 w-full md:hidden"}>
          Explore More
        </Button>
      </section>

      <section className=" mx-4 mt-20 px-4 ">
        <HeadingComponent
          heading="This could be your next company"
          paragraph="Explore our partner companies and discover the exciting job openings available right now."
          onClick={() => router.push("/company")}
        />
        <CompanyMappingComponent />
        {/* NOTE THAT THIS BUTTON PART IS CONDITIONAL ONLY AND ONLY SHOWS ON MOBILE VIEW! */}
        <Button variant={"outline"} className={"mt-6 w-full md:hidden"}>
          Explore More
        </Button>
      </section>

      <FooterComponent pageRole={"jobhunter"} />
    </div>
  );
}

export default Home;
