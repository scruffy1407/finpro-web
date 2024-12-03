import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

function MarqueeComponent() {
	return (
		<div className="max-w-screen-xl mx-auto mt-10">
			<div className="w-full flex flex-col md:flex md:flex-row">
				<div className="w-full flex justify-center mb-6 md:mb-0 md:w-[30%]">
					<p className="text-sm text-neutral-600">
						Employed by Companies Worldwide
					</p>
				</div>
				<div className="width">
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
									src="/companies/Spotify.svg"
									alt="Spotify"
									width={80}
									height={24}
								/>
							</div>
							<div>
								<Image
									src="/companies/Google.svg"
									alt="Spotify"
									width={80}
									height={24}
								/>
							</div>
							<div>
								<Image
									src="/companies/Twitch.svg"
									alt="Spotify"
									width={80}
									height={24}
								/>
							</div>
							<div>
								<Image
									src="/companies/Netflix.svg"
									alt="Spotify"
									width={80}
									height={24}
								/>
							</div>
							<div>
								<Image
									src="/companies/Apple.svg"
									alt="Spotify"
									width={24}
									height={24}
								/>
							</div>
							<div>
								<Image
									src="/companies/Adobe.svg"
									alt="Spotify"
									width={80}
									height={24}
								/>
							</div>
							<div>
								<Image
									src="/companies/Amazon.svg"
									alt="Spotify"
									width={80}
									height={24}
								/>
							</div>
							<div>
								<Image
									src="/companies/Uber.svg"
									alt="Spotify"
									width={80}
									height={24}
								/>
							</div>
							<div>
								<Image
									src="/companies/Oracle.svg"
									alt="Spotify"
									width={80}
									height={24}
								/>
							</div>
						</div>
					</Marquee>
				</div>
			</div>
		</div>
	);
}

export default MarqueeComponent;
