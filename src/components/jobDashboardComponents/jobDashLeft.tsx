import React from "react";
import Image from "next/image";
import ButtonComponent from "../ButtonComponent";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface Metrics {
	jobActiveCount: number;
	jobCompleteCount: number;
	totalApplicants: number;
}

function JobDashLeft({}) {
	const { isLoggedIn } = useSelector((state: RootState) => state.auth);
	const accessToken = Cookies.get("accessToken");
	const router = useRouter();
	console.log(router.pathname);
	const [metrics, setMetrics] = useState<Metrics | null>(null);

	useEffect(() => {
		async function fetchMetrics() {
			try {
				const response = await fetch(
					"http://localhost:8000/api/company/companydashjob",
					{
						headers: {
							Authorization: `Bearer ${accessToken}`, // Replace with actual token
						},
					}
				);
				const data = await response.json();
				setMetrics(data.metrics);
			} catch (error) {
				console.error("Error fetching metrics:", error);
			}
		}

		fetchMetrics();
	}, []);

	// const currentUrl = window.location.href;

	// const callbackPath = `/auth/login/jobhunter?callback=${currentUrl}`;

	function handleRedirect() {
		// if (isLoggedIn) {
		//   router.push(
		//     `/company/company-review?companyId=${companyId}&companynName=${companyName}&callback=${currentUrl}`,
		//   );
		// } else {
		//   router.push(callbackPath);
		// }
	}

	return (
		<div className="bg-white flex flex-col gap-6 w-full h-fit p-5 rounded-xl md:w-[250px] max-w-screen-xl">
			<div className={"flex flex-col gap-5 items-start"}>
				<div className={"flex flex-col gap-1"}>
					<h2 className="text-2xl font-bold">Dashboard</h2>
					<p className=" text-sm text-neutral-600 ">Manage all your job here</p>
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<Button variant={"primary"} onClick={handleRedirect}>
					Create New Job
				</Button>
			</div>

			<div className="flex flex-col gap-3">
				<div className="border-t-[1px] border-gray-200 w-full"></div>
			</div>

			<div className={"flex gap-3 items-start"}>
				<div className={"flex flex-col gap-3 w-full"}>
					<h2 className="text-2xl font-bold">Job Preview</h2>
					<div className="flex flex-row justify-between ">
						<div>
							<p className=" text-sm text-neutral-600 ">Job Active</p>
						</div>
						<div>
							<p className="text-sm text-neutral-600">
								{metrics ? metrics.jobActiveCount : "Loading..."}
							</p>
						</div>
					</div>
					<div className="flex flex-row justify-between">
						<div>
							<p className=" text-sm text-neutral-600 ">Job Complete</p>
						</div>
						<div>
							<p className="text-sm text-neutral-600">
								{metrics ? metrics.jobCompleteCount : "Loading..."}
							</p>
						</div>
					</div>
					<div className="flex flex-row justify-between">
						<div>
							<p className="text-sm text-neutral-600">Total Applicant</p>
						</div>
						<div>
							{" "}
							<p className="text-sm text-neutral-600">
								{metrics ? metrics.jobCompleteCount : "Loading..."}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default JobDashLeft;
