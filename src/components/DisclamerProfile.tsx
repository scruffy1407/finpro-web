import React from "react";
import Image from "next/image";
import Link from "next/link";

interface DisclaimerPropfileProps {
  name: string;
  linkedIn: string;
  github: string;
  image: string;
}

function DisclamerProfile({
  github,
  linkedIn,
  image = "/dummyProfile.png",
  name,
}: DisclaimerPropfileProps) {
  return (
    <div className={"flex gap-4 items-center"}>
      <Image
        src={image}
        alt={"dummy"}
        width={300}
        height={300}
        className={"w-16 h-16 object-cover rounded-full"}
      />
      <div>
        <h3 className={"font-bold text-sm mb-2"}>{name}</h3>
        <div className={"flex gap-1 flex-wrap"}>
          <Link
            className={
              "px-2 py-1 border border-blue-500 rounded-full text-xs hover:bg-blue-100 transition-300 ease-in-out"
            }
            href={linkedIn}
          >
            Linkedin
          </Link>
          <Link
            className={
              "px-2 py-1 border border-blue-500 rounded-full text-xs hover:bg-blue-100 transition-300 ease-in-out"
            }
            href={github}
          >
            Github
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DisclamerProfile;
