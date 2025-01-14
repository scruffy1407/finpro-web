import React, { useEffect, useState } from "react";
import HeroComponent from "@/components/HeroComponent";
import MarqueeComponent from "@/components/MarqueeComponent";
import HeadingComponent from "@/components/HeadingComponent";
import JobMappingComponent from "@/components/JobMappingComponent";
import CompanyMappingComponent from "@/components/CompanyMappingComponent";
import FooterComponent from "@/components/FooterComponent";
import { AuthHandler } from "@/utils/auth.utils";
import useRouter from "next/router";
import { Navbar } from "@/components/NavigationBar/Navbar";
import { Button } from "@/components/ui/button";
import VerifyBanner from "@/components/VerifyBanner";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Cookies from "js-cookie";
import NearestJobSection from "@/components/NearestJobSection";

function Home() {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser();
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter;
  const { isVerified, isLoggedIn } = useSelector(
    (state: RootState) => state.auth,
  );

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
        const location = {
          lat: position?.coords?.latitude,
          lng: position?.coords?.longitude,
        };

        Cookies.set("last_user_location", JSON.stringify(location), {
          expires: 3, // Expires in 3 days
        });

        setError(null);
      },
      (err) => {
        setError(err.message);
      },
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="overflow-hidden">
      <Navbar pageRole={"jobhunter"} />

      {isLoggedIn && !isVerified && <VerifyBanner />}

      <main
        className={`flex flex-col gap-16 px-4 max-w-screen-xl mx-auto ${!isVerified && isLoggedIn ? "mt-0" : "mt-5"}`}
      >
        <section className={"flex flex-col gap-10"}>
          <HeroComponent />

          <MarqueeComponent />
        </section>

        <section className={"w-full flex flex-col gap-5"}>
          <HeadingComponent
            heading="We found Jobs near you!"
            paragraph="Explore opportunities tailored to your location and discover the perfect match for your next career move"
            onClick={() => router.push("/jobs")}
          />
          <JobMappingComponent />
          <Button variant={"outline"} className={" w-full md:hidden"}>
            Explore More
          </Button>
        </section>

        <NearestJobSection hasLocation={location !== null} />

        <section className={"w-full flex flex-col gap-5"}>
          <HeadingComponent
            heading="This could be your next company"
            paragraph="Explore our partner companies and discover exciting job openings available for you right now."
            onClick={() => router.push("/company")}
          />
          <CompanyMappingComponent />
          <Button variant={"outline"} className={" w-full md:hidden"}>
            Explore More
          </Button>
        </section>

        <FooterComponent pageRole={"jobhunter"} />
      </main>
    </div>
  );
}

export default Home;
