import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import ModalContainer from "@/components/Modal/ModalContainer";
import { closeModalAction, openModalAction } from "@/store/slices/ModalSlice";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import VerifyEmailModal from "@/components/Modal/VerifyEmailModal";
import ForbiddenCompanyAction from "@/components/Modal/ForbiddenCompanyAction";

export interface AssessmentCardProps {
  assessmentName: string;
  badge: string;
  passingGrade: number;
  duration: number;
  skillAssessmentId: string;
  skillAssessmentIdUnq: string
  takeTest?: () => void;
}

interface CompletionData {
  skillAssessmentId: number;
  completionStatus: string; // You can adjust this type based on the possible statuses
  completionDate: string; // Assuming completionDate is in ISO format
  endDate: string; // endDate is in ISO format
}

function Asessmentcard({
  assessmentName,
  passingGrade,
  duration,
  badge,
  skillAssessmentId,
  skillAssessmentIdUnq,
}: AssessmentCardProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [callBackPath] = useState<string>("");
  const jobHunterId = useSelector((state: RootState) => state.auth.innerId);
  const userRole = useSelector((state: RootState) => state.auth.user_role);

  const [completionStatus, setCompletionStatus] = useState<string | null>(null); // State to track completion status
  const [canTakeTest, setCanTakeTest] = useState<boolean>(true); // State to control button visibility
  const [timeLeft, setTimeLeft] = useState<string | null>(null); // State for remaining time
  const { isLoggedIn, subscriptionId, isVerified } = useSelector(
    (state: RootState) => state.auth,
  );
  const { currentModalId, editId } = useSelector(
    (state: RootState) => state.modalController,
  );
  const token = Cookies.get("accessToken");

  // Fetching the completion status based on jobHunterId with Bearer token
  useEffect(() => {
    const fetchCompletionData = async () => {
      if (isLoggedIn && token) {
        try {
          const response = await axios.get<{ data: CompletionData[] }>(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dev/getcompletionByJobHunterId/${jobHunterId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          // Check if the response data is valid and an array
          const completedAssessments = response.data.data;
          if (Array.isArray(completedAssessments)) {
            // Sort the completed assessments by endDate (latest first)
            const sortedAssessments = completedAssessments.sort((a, b) => {
              const dateA = new Date(a.endDate);
              const dateB = new Date(b.endDate);
              return dateB.getTime() - dateA.getTime(); // Descending order (latest first)
            });

            // Find the most recent assessment attempt
            const latestAssessment = sortedAssessments.find(
              (completion: CompletionData) =>
                completion.skillAssessmentId === Number(skillAssessmentId),
            );

            if (latestAssessment) {
              setCompletionStatus(latestAssessment.completionStatus); // Set the completion status
              // If the status is "failed", check the 7-day cooldown based on endDate
              if (latestAssessment.completionStatus === "failed") {
                const currentDate = new Date();
                const endDate = new Date(latestAssessment.endDate);
                const daysPassed =
                  (currentDate.getTime() - endDate.getTime()) /
                  (1000 * 3600 * 24);

                // If less than 7 days passed, calculate the remaining time
                if (daysPassed < 7) {
                  const remainingTime = new Date(
                    endDate.getTime() + 7 * 24 * 60 * 60 * 1000,
                  );
                  const timeDifference =
                    remainingTime.getTime() - currentDate.getTime();
                  const daysLeft = Math.floor(
                    timeDifference / (1000 * 3600 * 24),
                  );
                  const hoursLeft = Math.floor(
                    (timeDifference % (1000 * 3600 * 24)) / (1000 * 3600),
                  );
                  const minutesLeft = Math.floor(
                    (timeDifference % (1000 * 3600)) / (1000 * 60),
                  );
                  const secondsLeft = Math.floor(
                    (timeDifference % (1000 * 60)) / 1000,
                  );

                  setTimeLeft(
                    `${daysLeft}d ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`,
                  );
                  setCanTakeTest(false); // Disable the test button
                } else {
                  setCanTakeTest(true); // Enable the button if 7 days passed
                }
              }
            }
          } else {
            console.error("The response data is not in the expected format.");
          }
        } catch (error) {
          console.error("Error fetching completion data:", error);
        }
      }
    };
    if (userRole === "jobhunter") {
      fetchCompletionData();
    }
  }, [isLoggedIn, jobHunterId, skillAssessmentId, token]);

  const handleNavigate = () => {
    if (!isLoggedIn) {
      dispatch(openModalAction("needToLoginModal", Number(skillAssessmentId)));
      return;
    }
    if (userRole !== "jobhunter") {
      dispatch(
        openModalAction("forbiddenCompanyAction", Number(skillAssessmentId)),
      );
      return;
    }
    if (!isVerified) {
      dispatch(openModalAction("needToVerifyModal", Number(skillAssessmentId)));
      return;
    }
    if (subscriptionId === 1) {
      dispatch(
        openModalAction("subscribePackageModal", Number(skillAssessmentId)),
      );
      return;
    }
    if (completionStatus === "pass") {
      // Redirect to the certificates page if passed
      router.push("/profile/user/certificates");
    } else {
      // Proceed to the assessment test if not completed or failed
      if (skillAssessmentId) {
        router.push(`/executionAssessmentTest/${skillAssessmentIdUnq}`);
      } else {
        console.error("Skill Assessment ID is undefined");
      }
    }
  };
  const handleCloseModal = () => {
    dispatch(closeModalAction());
  };

  function handleRedirect() {
    dispatch(closeModalAction());
    router.push(`/auth/login/jobhunter?callback=${callBackPath}`);
  }

  return (
    <>
      <ModalContainer
        isOpen={
          currentModalId === "forbiddenCompanyAction" &&
          editId === Number(skillAssessmentId)
        }
        onClose={handleCloseModal}
      >
        <ForbiddenCompanyAction />
      </ModalContainer>
      <ModalContainer
        isOpen={
          currentModalId === "needToVerifyModal" &&
          editId === Number(skillAssessmentId)
        }
        onClose={handleCloseModal}
      >
        <VerifyEmailModal />
      </ModalContainer>
      <ModalContainer
        isOpen={
          currentModalId === "needToLoginModal" &&
          editId === Number(skillAssessmentId)
        }
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
        isOpen={
          currentModalId === "subscribePackageModal" &&
          editId === Number(skillAssessmentId)
        }
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
      <div
        className={
          "p-4 flex flex-col justify-between gap-4 items-center bg-white rounded-2xl sm:flex-row w-full"
        }
      >
        <div className={"w-full flex gap-4 items-center"}>
          <Image
            src={badge}
            alt={`assessmentName-badge`}
            width={200}
            height={200}
            className={"w-20 rounded-xl"}
          />
          <div className={"flex flex-col gap-2"}>
            <h3 className={"text-lg font-bold text-neutral-950"}>
              {assessmentName}
            </h3>
            <div className={"flex flex-col gap-2"}>
              <p className={"text-xs text-neutral-600"}>
                Duration Assessment: {duration} Minutes
              </p>
              <p className={"text-xs text-neutral-600"}>
                Passing Grade: {passingGrade}
              </p>
            </div>
          </div>
        </div>

        {/* Conditionally render the button */}
        {completionStatus === "ongoing" ? (
          <Button
            onClick={() => {
              // Logic to continue the test, e.g., navigating to the test in progress
              if (skillAssessmentIdUnq) {
                router.push(
                  `/executionAssessmentTestQuiz/${skillAssessmentIdUnq}`,
                );
              } else {
                console.error("Skill Assessment ID is undefined");
              }
            }}
            className={"w-full sm:w-fit"}
            variant={"outline"}
            size={"sm"}
          >
            Continue Test
          </Button>
        ) : completionStatus !== "failed" || canTakeTest ? (
          <Button
            onClick={handleNavigate} // Handle navigation here
            className={"w-full sm:w-fit"}
            variant={"outline"}
            size={"sm"}
          >
            {completionStatus === "pass" ? "Download Certificate" : "Take Test"}
          </Button>
        ) : (
          // Show the remaining cooldown time
          <p className="text-xs text-red-600">
            You can retake this test in {timeLeft}.
          </p>
        )}
      </div>
    </>
  );
}

export default Asessmentcard;