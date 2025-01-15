import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Scroll, CheckCircle } from "lucide-react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingLoader from "@/components/LoadingLoader";
import { AuthHandler } from "@/utils/auth.utils";


interface TestData {
  message: string;
  data: {
    test_id: number;
    test_name: string;
    duration: number;
    passing_grade: number;
  };
}

export default function ExecutionPretest() {
  //thom ganti
  const router = useRouter();
  const [testData, setTestData] = useState<TestData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const accessToken = Cookies.get("accessToken");
  const authHandler = new AuthHandler();
  const pagePermission = "jobhunter";
  authHandler.authorizeUser(pagePermission);

  const jobId = router.query.job_id ? String(router.query.job_id) : ""; // Extract job_id from the query string

  useEffect(() => {
    const fetchTestData = async () => {
      // Ensure that router.query.test_id is available before making the request
      if (!router.isReady || !router.query.test_id) {
        setError("Test ID is required");
        return;
      }

      // Extract testId directly from router.query (no query params involved)
      const testId = Array.isArray(router.query.test_id)
        ? router.query.test_id[0].trim()
        : String(router.query.test_id).trim();

      // Ensure the testId is valid before making the request
      if (!testId) {
        setError("Invalid test ID.");
        return;
      }

      try {
        const token = accessToken;

        // Use the testId directly in the URL path
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/viewpretestbyIdhead/${testId}`; // Correct format for URL
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token in the headers
          },
        });

        if (response.status === 200) {
          setTestData(response.data); // Set the test data if request is successful
          setError(null); // Clear any previous errors
        } else {
          setError(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          console.error("API error response:", error.response?.data); // Log the error response
          if (status === 400) {
            setError("Bad Request: Invalid test ID or missing parameters");
          } else {
            setError(`Error: ${error.response.statusText}`);
          }
        } else {
          setError("An unexpected error occurred");
        }
      }
    };

    // Ensure router is ready and we have the test_id before attempting to fetch data
    if (router.isReady && router.query.test_id) {
      fetchTestData();
    }
  }, [router.query.test_id, router.isReady, accessToken]);

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
    if (!jobId) {
      setError("Job ID is required");
      return;
    }

    try {
      const token = accessToken;
      setIsLoading(true);
      // Call the API to apply for the test
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobhunter/applytest/${jobId}`;
      const response = await axios.post(
        apiUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const { resultPreSelection, application } = response.data;

        // Extract jobHunterId and applicationId from the API response
        const applicationId = resultPreSelection.applicationId;

        // Redirect with query parameters
        router.push({
          pathname: `/executionPretestQuiz/${jobId}`,
          query: { applicationId },
        });
        setIsLoading(false);
      } else {
        setError(`Unexpected response status: ${response.status}`);
        setIsLoading(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        console.error("API error response:", error.response?.data); // Log the error response

        // Access the 'error' property directly from the API response
        const errorMessage =
          error.response?.data?.error || "An unknown error occurred";

        // Show the error message in the alert
        alert(errorMessage);
        setIsLoading(false);

        if (status === 400) {
          setError(
            "Bad Request: Invalid Skill Assessment ID or missing parameters. You may be accessing an invalid URL."
          );
          setIsLoading(false);
        } else {
          setError(`Error: ${error.response.statusText}`);
          setIsLoading(false);
        }
      } else {
        setError("An unexpected error occurred");
        setIsLoading(false);
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
            You will be joining: {testData?.data.test_name}
          </h2>
          <h2 className="text-xl font-semibold mb-4">
            Duration of This Test is: {testData?.data.duration} minutes.
          </h2>

          <h2 className="text-xl font-semibold mb-4">
            Passing grade of this test: {testData?.data.passing_grade}
          </h2>

          <div className="space-y-4">
            <RuleItem text="Read each question carefully before answering" />
            <RuleItem text="The test is timed and will auto-submit when time runs out" />
            <RuleItem text="Ensure you have a stable internet connection" />
            <RuleItem text="Do not refresh the page during the test" />
          </div>
        </div>

        <Button
          size="lg"
          className="w-full"
          variant={"primary"}
          onClick={handleStartTest}
          disabled={isLoading}
        >
          {isLoading ? <LoadingLoader /> : "I Understand, Start Test"}
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
