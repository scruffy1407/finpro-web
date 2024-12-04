import React, { useState } from "react";
import { NavProps } from "@/utils/interface";
import Image from "next/image";
import LinksComponents from "./LinksComponents";
import { profileDummy } from "@/utils/datadummy";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import ButtonComponent from "./ButtonComponent";

function NavbarComponent({ loginJobHunter, loginCompanies }: NavProps) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
	};

	const handleMobileMenuToggle = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<div className="max-w-screen-xl mx-auto">
			<div className="bg-white flex justify-between border rounded-xl mt-5 py-5 px-4">
				<div className="flex justify-between gap-9 items-center">
					<div className="flex">
						<Image
							src="/logoIpsum.svg"
							alt="LogoIpsum"
							width={121}
							height={24}
						/>
					</div>

					<LinksComponents />
				</div>

				{/* Conditional rendering based on isLoggedIn state */}
				{!isLoggedIn ? (
					<div className="hidden sm:flex sm:justify-center items-center gap-4 ">
						<ButtonComponent
							container={loginJobHunter}
							type="ButtonBorder"
							onClick={handleLogin}
						/>
						<ButtonComponent
							container={loginCompanies}
							type="ButtonText"
							onClick={handleLogin}
						/>
					</div>
				) : (
					<DropdownMenu>
						<DropdownMenuTrigger>
							<div className="flex justify-center items-center gap-3">
								<div>
									<Image
										className="border rounded-full"
										src={profileDummy.photo}
										alt={"Photo"}
										width={40}
										height={40}
									/>
								</div>
								<div>
									<p className="text-base">{profileDummy.name}</p>
								</div>
								<div>
									<Image
										src={"/dropLine.svg"}
										alt={"Photo"}
										width={30}
										height={30}
									/>
								</div>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<Link href={"/afae"} className="text-base">
									My Profile
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<button onClick={handleLogout} className="text-base">
									Log Out
								</button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}

				{/* Mobile burger icon */}
				{!isLoggedIn ? (
					<div
						className="sm:hidden flex items-center"
						onClick={handleMobileMenuToggle}
					>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Image
									src="/burger.svg"
									alt="Burger Icon"
									width={30}
									height={30}
								/>
							</DropdownMenuTrigger>

							<DropdownMenuContent>
								<div className="p-2">
									<ButtonComponent
										container={loginJobHunter}
										type="ButtonBorder"
										onClick={handleLogin}
									/>
								</div>

								<ButtonComponent
									container={loginCompanies}
									type="ButtonText"
									onClick={handleLogin}
								/>
								<DropdownMenuSeparator />

								<DropdownMenuItem>
									<Link className="hover:text-blue-500" href={""}>
										Find Jobs
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link className="hover:text-blue-500" href={""}>
										Skill Assessment
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link className="hover:text-blue-500" href={""}>
										Explore Companies
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				) : (
					<div className="hidden" onClick={handleMobileMenuToggle}>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Image
									src="/burger.svg"
									alt="Burger Icon"
									width={30}
									height={30}
								/>
							</DropdownMenuTrigger>

							<DropdownMenuContent>
								<div className="p-2">
									<ButtonComponent
										container={loginJobHunter}
										type="ButtonBorder"
										onClick={handleLogin}
									/>
								</div>

								<ButtonComponent
									container={loginCompanies}
									type="ButtonText"
									onClick={handleLogin}
								/>
								<DropdownMenuSeparator />

								<DropdownMenuItem>
									<Link className="hover:text-blue-500" href={""}>
										Find Jobs
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link className="hover:text-blue-500" href={""}>
										Skill Assessment
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link className="hover:text-blue-500" href={""}>
										Explore Companies
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)}
			</div>
		</div>
	);
}

export default NavbarComponent;
