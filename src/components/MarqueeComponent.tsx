import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

function MarqueeComponent() {
  return (
    <div className="w-full flex flex-col gap-4 md:flex md:flex-row">
      <p className="text-sm text-neutral-600 text-center md:text-left md:w-1/5">
        Employed by Companies Worldwide
      </p>

      <div className="w-full ">
        <Marquee
          speed={50}
          gradient={true}
          gradientColor="rgba(240, 249, 255, 1)" // Use RGBA for gradient color
          loop={0}
          pauseOnHover={false}
        >
          <div className="flex space-x-12 justify-center items-center">
            <div>
              <Image
                src="/company/Spotify.svg"
                alt="Spotify"
                width={80}
                height={24}
              />
            </div>
            <div>
              <Image
                src="/company/Google.svg"
                alt="Spotify"
                width={80}
                height={24}
              />
            </div>
            <div>
              <Image
                src="/company/Twitch.svg"
                alt="Spotify"
                width={80}
                height={24}
              />
            </div>
            <div>
              <Image
                src="/company/Netflix.svg"
                alt="Spotify"
                width={80}
                height={24}
              />
            </div>
            <div>
              <Image
                src="/company/Apple.svg"
                alt="Spotify"
                width={24}
                height={24}
              />
            </div>
            <div>
              <Image
                src="/company/Adobe.svg"
                alt="Spotify"
                width={80}
                height={24}
              />
            </div>
            <div>
              <Image
                src="/company/Amazon.svg"
                alt="Spotify"
                width={80}
                height={24}
              />
            </div>
            <div>
              <Image
                src="/company/Uber.svg"
                alt="Spotify"
                width={80}
                height={24}
              />
            </div>
            <div>
              <Image
                src="/company/Oracle.svg"
                alt="Spotify"
                width={80}
                height={24}
              />
            </div>
          </div>
        </Marquee>
      </div>
    </div>
  );
}

export default MarqueeComponent;
