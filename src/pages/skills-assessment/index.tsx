import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/NavigationBar/Navbar";
import { Button } from "@/components/ui/button";
import Asessmentcard, {
	AssessmentCardProps,
} from "@/components/Asessmentcard/Asessmentcard";
import { AuthHandler } from "@/utils/auth.utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import ModalContainer from "@/components/Modal/ModalContainer";
import { closeModalAction, openModalAction } from "@/store/slices/ModalSlice";
import { useRouter } from "next/router";
import { SkillAssessmentUtils } from "@/utils/skillAssessment.utils";
import LoadingLoader from "@/components/LoadingLoader";
import Image from "next/image";
import axios from "axios";
import VerifyBanner from "@/components/VerifyBanner";
import FooterComponent from "@/components/FooterComponent";

// DUMMY

function Index() {
	const router = useRouter();
	const authHandler = new AuthHandler();
	authHandler.authorizeUser();
	const dispatch = useDispatch<AppDispatch>();
	const skillAsessmentUtils = new SkillAssessmentUtils();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [assessmentData, setAssessmentData] = useState<AssessmentCardProps[]>(
		[]
	);
	const [hasMore, setHasMore] = useState<boolean>(true); // For pagination
	const [error, setError] = useState<string | null>(null);
	const [callBackPath, setcallBackPath] = useState<string>("");
	const { isLoggedIn, subscriptionId, isVerified } = useSelector(
		(state: RootState) => state.auth
	);
	const [offset, setOffset] = useState(0);
	const limit = 6; // Set your pagination limit here
	const { currentModalId } = useSelector(
		(state: RootState) => state.modalController
	);
	const handleCloseModal = () => {
		dispatch(closeModalAction());
	};

	async function handleClick() {
		if (!isLoggedIn) {
			dispatch(openModalAction("needToLoginModal"));
			return;
		}
		if (subscriptionId === 1) {
			dispatch(openModalAction("subscribePackageModal"));
			return;
		}
	}

	const fetchAssessmentData = async (reset = false) => {
		try {
			setIsLoading(true);
			const response = await axios.get(
				`http://localhost:8000/api/dev/getassessmenttest`,
				{
					params: {
						offset: reset ? 0 : offset,
						limit: limit,
					},
				}
			);

			if (response.status === 200) {
				const data = response.data;

				const newAssessments = data.data.map((item: any) => ({
					assessmentName: item.skill_assessment_name,
					badge: item.skill_badge,
					passingGrade: item.passing_grade,
					duration: item.duration,
					skillAssessmentId: item.skill_assessment_id, // Ensure that this ID is included
				}));

				setAssessmentData((prev) =>
					reset ? newAssessments : [...prev, ...newAssessments]
				);
				setHasMore(data.pagination.hasMore);
				if (reset)
					setOffset(limit); // Reset offset when re-fetching
				else setOffset((prevOffset) => prevOffset + limit);
			} else {
				throw new Error(response.data.message || "Failed to fetch assessments");
			}
		} catch (error) {
			const err =
				axios.isAxiosError(error) && error.response?.data?.message
					? error.response.data.message
					: (error as Error).message;
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchAssessmentData(true);
	}, []);

	const handleLoadMore = () => {
		if (!hasMore || isLoading) return;
		fetchAssessmentData();
	};

	function handleRedirect() {
		dispatch(closeModalAction());
		router.push(`/auth/login/jobhunter?callback=${callBackPath}`);
	}

	useEffect(() => {
		if (router.isReady) {
			// Use asPath for full path (including query), or pathname for the route
			setcallBackPath(router.asPath);
		}
	}, [router.isReady, router.asPath]);

	return (
		<>
			<ModalContainer
				isOpen={currentModalId === "needToLoginModal"}
				onClose={handleCloseModal}
			>
				<div className={"flex flex-col gap-6"}>
					<div className={"flex flex-col gap-2 text-center"}>
						<h2 className="text-2xl font-bold text-neutral-950">
							Login to Access Skill Assessments
						</h2>
						<p className={`text-neutral-600 text-sm`}>
							{` Please login to your account to access our skill assessments and unlock your career potential.`}
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
			<ModalContainer
				isOpen={currentModalId === "subscribePackageModal"}
				onClose={handleCloseModal}
			>
				<div className={"flex flex-col gap-6 items-center"}>
					<Image
						src={"/subsPackage.svg"}
						width={200}
						height={200}
						className={"w-48"}
						alt={"Subscribe Package"}
					/>
					<div className={"flex flex-col gap-2 text-center"}>
						<h2 className="text-2xl font-bold text-neutral-950">
							Ready to Test Your Skills?
						</h2>
						<p className={`text-neutral-600 text-sm`}>
							{`To access our exciting skill assessments and earn valuable certifications, you'll need to subscribe to one of our plans.Get started today and unlock your full potential!`}
						</p>
					</div>
					<div className={"flex gap-4"}>
						<Button
							className={`w-full`}
							variant={"primary"}
							onClick={() => {
								dispatch(closeModalAction());
								router.push("/subscription");
							}}
						>
							Subscribe Now
						</Button>
					</div>
				</div>
			</ModalContainer>

			{/*MAIN*/}
			<main className={"px-4 "}>
				<Navbar pageRole={"jobhunter"} />
				{isLoggedIn && !isVerified && <VerifyBanner />}
				<section className={"w-full mt-10"}>
					<div
						className={
							" w-full mx-auto  text-center rounded-2xl bg-cover object-center"
						}
					>
						<div
							className={
								" flex flex-col gap-4 items-center max-w-[560px] mx-auto"
							}
						>
							<h1 className={"text-xl md:text-3xl font-bold text-neutral-950"}>
								Take Skill Assessments, Earn Badges, and Land the Dream Jobs.
							</h1>
							<p className={"text-sm text-neutral-600"}>
								Elevate your career with our engaging skill assessments and earn
								badges that impress recruiters
							</p>
						</div>
					</div>
				</section>
				<section
					className={
						" max-w-screen-md mx-auto mt-10 flex flex-col gap-4 items-center"
					}
				>
					<div
						className={"flex flex-col gap-5 w-full justify-center items-center"}
					>
						{isLoading
							? LoadingLoader()
							: assessmentData.map((data: AssessmentCardProps, i: number) => {
									return (
										<Asessmentcard
											key={i}
											assessmentName={data.assessmentName}
											passingGrade={data.passingGrade}
											duration={data.duration}
											badge={data.badge}
											skillAssessmentId={data.skillAssessmentId}
											takeTest={handleClick}
										/>
									);
								})}
					</div>
          <div className="mb-6" >
					{hasMore && assessmentData.length >= limit && (
						<Button variant="outline" onClick={handleLoadMore}>
							{isLoading ? "Loading..." : "Load More"}
						</Button>
					)}
          </div>

				</section>
			</main>
            <FooterComponent />
		</>
	);
}

export default Index;
