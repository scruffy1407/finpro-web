import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Scroll, CheckCircle } from "lucide-react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthHandler } from "@/utils/auth.utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { toast } from "sonner";

interface SkillAssessmentData {
  message: string;
  data: {
    skillAssessmentId: number;
    skill_assessment_name: string;
    passing_grade: number;
    duration: number;
  };
}

export default function ExecutionAssessmentTest() {
  const authHandler = new AuthHandler();
  const pagePermission = "jobhunter";
  authHandler.authorizeUser(pagePermission);
  const router = useRouter();
  const [skillAssessmentData, setSkillAssessmentData] =
    useState<SkillAssessmentData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const accessToken = Cookies.get("accessToken");
  const { isLoggedIn, subscriptionId, isVerified, user_role } = useSelector(
    (state: RootState) => state.auth,
  );

  const skillAssessmentId = router.query.skillAssessmentId
    ? String(router.query.skillAssessmentId)
    : "";

  useEffect(() => {
    const fetchSkillAssessmentData = async () => {
      // Ensure the skillAssessmentId is available before making the request
      if (!router.isReady || !router.query.skillAssessmentId) {
        setError("Skill Assessment ID is required");
        return;
      }

      // Extract skillAssessmentId directly from router.query
      const skillAssessmentId = Array.isArray(router.query.skillAssessmentId)
        ? router.query.skillAssessmentId[0].trim()
        : String(router.query.skillAssessmentId).trim();

      // Ensure the skillAssessmentId is valid before making the request
      if (!skillAssessmentId) {
        setError("Invalid Skill Assessment ID.");
        return;
      }

      try {
        const token = accessToken;

        // Call the new API using the skillAssessmentId
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobhunter/getskillassessmentbyid/${skillAssessmentId}`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token in the headers
          },
        });

        if (response.status === 200) {
          setSkillAssessmentData(response.data); // Set the skill assessment data if request is successful
          setError(null); // Clear any previous errors
        } else {
          setError(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          console.error("API error response:", error.response?.data);
          if (status === 400) {
            setError(
              "Bad Request: Invalid Skill Assessment ID or missing parameters You may accessing into invalid URL ",
            );
          } else {
            setError(`Error: ${error.response.statusText}`);
          }
        } else {
          setError("An unexpected error occurred");
        }
      }
    };

    // Ensure router is ready and we have the skillAssessmentId before attempting to fetch data
    if (router.isReady && router.query.skillAssessmentId) {
      fetchSkillAssessmentData();
    }
  }, [router.query.skillAssessmentId, router.isReady, accessToken]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
        <Card className="w-full max-w-2xl p-8 animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-xl text-red-600">{error}</h2>
        </Card>
      </div>
    );
  }
  const handleStartTest = async () => {
    if (!isLoggedIn) {
      toast.error("Please Login to participate in test");
      return;
    }
    if (user_role !== "jobhunter") {
      toast.error("Only Job Hunter can participate to the test ");
    }
    if (!isVerified) {
      toast.error("Please verify your email before joining the test");
      return;
    }
    if (subscriptionId === 1) {
      toast.error(
        "Only user with standard or professional plan can participate in test",
      );
    }

    try {
      const token = accessToken;
      // Call the new API to join the assessment
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dev/joinassessment/${skillAssessmentId}`;
      const response = await axios.post(
        apiUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        // Redirect to the quiz page after successful API call
        router.push(`/executionAssessmentTestQuiz/${skillAssessmentId}`);
      } else {
        setError(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        console.error("API error response:", error.response?.data);
        const apiMessage = error.response.data.message; // Extract the message from the response

        if (status === 400) {
          setError(
            `Bad Request: Invalid Skill Assessment ID or missing parameters. ${apiMessage}`,
          );
        } else {
          setError(`Error: ${error.response.statusText}`);
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <Card className="w-full max-w-2xl p-8 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center gap-3 mb-6">
          <Scroll className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Test Rules</h1>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            You will be joining:{" "}
            {skillAssessmentData?.data.skill_assessment_name}
          </h2>
          <h2 className="text-xl font-semibold mb-4">
            Duration of This Test is: {skillAssessmentData?.data.duration}{" "}
            minutes.
          </h2>

          <h2 className="text-xl font-semibold mb-4">
            Passing grade of this test:{" "}
            {skillAssessmentData?.data.passing_grade}
          </h2>

          <div className="space-y-4">
            <RuleItem text="Read each question carefully before answering" />
            <RuleItem text="The test is timed and will auto-submit when time runs out" />
            <RuleItem text="Ensure you have a stable internet connection" />
            <RuleItem text="Do not refresh the page during the test" />
          </div>
        </div>

        <Button size="lg" className="w-full" onClick={handleStartTest}>
          I Understand, Start Test
        </Button>
      </Card>
    </div>
  );
}

function RuleItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
      <p className="text-lg">{text}</p>
    </div>
  );
}