import React from "react";
import Image from "next/image";
import Link from "next/link";
import LinksComponents from "./LinksComponent";

interface FooterProps {
  findJobs: string;
  skillAssessment: string;
  exploreCompanies: string;
}

function FooterComponent({
	findJobs,
	skillAssessment,
	exploreCompanies,
}: FooterProps) {
	// Define the navbar items (links)
	const navbarItems = [
		{ label: "Find Jobs", href: findJobs },
		{ label: "Skill Assessment", href: skillAssessment },
		{ label: "Explore Companies", href: exploreCompanies },
	];

	const textColor = "text-white"; // You can modify this or pass dynamically if needed

	return (
		<div className="max-w-screen-xl mx-auto bg-sky-950 border rounded-xl mb-16">
			<div className="">
				<div className="md:flex justify-between p-6">
					<div className="flex justify-center md:justify-start">
						<Image
							src="/footer/logoFooter.svg"
							alt="LogoIpsum"
							width={121}
							height={24}
						/>
					</div>
					<div className="hidden md:flex p-3 gap-6">
						<Image
							src="/footer/logoInsta.png"
							alt="LogoIpsum"
							width={20}
							height={20}
						/>
						<Image
							src="/footer/logoLinkedIn.png"
							alt="LogoIpsum"
							width={20}
							height={20}
						/>
						<Image
							src="/footer/logoMail.png"
							alt="LogoIpsum"
							width={20}
							height={20}
						/>
					</div>
				</div>

        <div className="flex text-center md:text-left w-full md:w-[50%]">
          <p className="text-white px-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
            repudiandae amet iusto. Perferendis voluptatem, debitis dolor rerum,
          </p>
        </div>

				<div className="flex justify-center items-center mt-6 p-3 gap-6 md:hidden ">
					<Image
						src="/footer/logoInsta.png"
						alt="LogoIpsum"
						width={30}
						height={30}
					/>
					<Image
						src="/footer/logoLinkedIn.png"
						alt="LogoIpsum"
						width={30}
						height={30}
					/>
					<Image
						src="/footer/logoMail.png"
						alt="LogoIpsum"
						width={30}
						height={30}
					/>
				</div>
			</div>
			<div className=" flex gap-3 md:p-8 mt-12 justify-center md:justify-between">
				<div className="text-white">
					<LinksComponents navbarItems={navbarItems} textColor={textColor} />
				</div>

        <div className="mb-4 md:mb-0">
          <p className="text-white text-sm">
            &copy; 2024 Bantu Cari Kerja Indonesia.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FooterComponent;
