import { useState, useEffect } from "react";
import { QuizCard } from "@/components/PreSelectionTestExecuteComponents/QuizCard";
import { QuizProgress } from "@/components/PreSelectionTestExecuteComponents/QuizProgress";
import { QuizTimer } from "@/components/PreSelectionTestExecuteComponents/QuizTimer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { AuthHandler } from "@/utils/auth.utils";
import { toast as toasty } from "sonner";

type QuizState = {
  currentQuestionIndex: number;
  answers: { [key: string]: string };
  score: number;
  testId: number | null;
  jobHunterId: number;
  applicationId: number;
};

export interface Question {
  question_id: string;
  question: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  answer_4: string;
}

export default function Quiz() {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser();
  const [isTimerReady, setIsTimerReady] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const jobId = router.query.job_id;
  const jobHunterId = useSelector((state: RootState) => state.auth.innerId);
  const applicationId = Number(router.query.applicationId) || 0;
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    score: 0,
    testId: null,
    jobHunterId: 0,
    applicationId: 0,
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setDuration] = useState(0);
  const [, setHunterId] = useState<number | null>(null);
  const [, setAppId] = useState<number | null>(null);

  useEffect(() => {
    if (jobId && jobHunterId && applicationId) {
      setHunterId(Number(jobHunterId));
      setAppId(Number(applicationId));

      setQuizState((prev) => ({
        ...prev,
        jobHunterId: Number(jobHunterId),
        applicationId: Number(applicationId),
      }));
    }
  }, [jobHunterId, applicationId]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!jobId) {
        setError("Job ID is missing in the URL.");
        setLoading(false);
        return;
      }

      const token = Cookies.get("accessToken");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobhunter/getquestions/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.status === 200) {
          setQuestions(response.data.questions);
          setDuration(response.data.duration);
          setQuizState((prev) => {
            const updatedState = { ...prev, testId: response.data.testId };
            return updatedState;
          });
          setError(null);
        } else {
          setError(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(`API Error: ${error.response.statusText}`);
        } else {
          setError("An unexpected error occurred while fetching questions.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [jobId]);

  useEffect(() => {
    if (router.isReady) {
      const appId = Number(router.query.applicationId);
      if (appId) {
        setAppId(appId);
        setQuizState((prev) => ({
          ...prev,
          applicationId: appId,
        }));
      }
    }
  }, [router.isReady, router.query.applicationId]);

  useEffect(() => {}, [quizState.testId]);

  const currentQuestion = questions[quizState.currentQuestionIndex];

  const totalQuestions = questions.length;
  const isLastQuestion = quizState.currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = quizState.currentQuestionIndex === 0;
  const hasAnswered =
    currentQuestion && quizState.answers[currentQuestion.question_id];

  const handleAnswerSelect = (answer: string) => {
    setQuizState((prev) => {
      const updatedAnswers = {
        ...prev.answers,
        [currentQuestion.question_id]: answer,
      };

      Cookies.set("quizAnswers", JSON.stringify(updatedAnswers), {
        expires: 1,
      });

      return {
        ...prev,
        answers: updatedAnswers,
      };
    });
  };

  useEffect(() => {
    const savedAnswers = Cookies.get("quizAnswers");
    if (savedAnswers) {
      setQuizState((prev) => ({
        ...prev,
        answers: JSON.parse(savedAnswers),
      }));
    }
  }, []);

  const handleNext = () => {
    if (isLastQuestion) return;

    setQuizState((prev) => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));
  };

  const handlePrevious = () => {
    if (isFirstQuestion) return;

    setQuizState((prev) => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex - 1,
    }));
  };

  const handleTimeUp = () => {
    toast({
      title: "Time's Up!",
      description: "Your quiz has been automatically submitted.",
      variant: "destructive",
    });
    if (!isSubmitted) {
      handleSubmit();
      setIsSubmitted(true);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    const token = Cookies.get("accessToken");

    const formattedAnswers = questions.map((q) => ({
      question_id: q.question_id,
      chosen_answer: quizState.answers[q.question_id] || "",
    }));

    const submission = {
      testId: quizState.testId,
      jobHunterId: quizState.jobHunterId,
      applicationId: quizState.applicationId,
      answers: formattedAnswers,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobhunter/handlingtest`,
        submission,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        const result = response.data;
        if (result.completionStatus === "pass") {
          toasty.success("Congratulations! You've passed the test.");
        } else if (result.completionStatus === "failed") {
          toasty.error("Test Failed. Try again in the next due time.");
        } else {
          toasty.error("Unexpected completion status received.");
        }
      } else {
        toasty.error(`Unexpected response: ${response.status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toasty.error(error.response.data.message || "Failed to submit the quiz.");
      } else {
        toasty.error("An unexpected error occurred during submission.");
      }
    } finally {
      // Remove the saved answers cookies after submission
      Cookies.remove("quizAnswers");
      router.push(`/jobdetail/${jobId}`);
    }
  };

  const sendPeriodicUpdate = async () => {
    const token = Cookies.get("accessToken");

    if (
      !token ||
      !quizState.testId ||
      !quizState.jobHunterId ||
      !quizState.applicationId
    )
      return;

    const formattedAnswers = questions.map((q) => ({
      question_id: q.question_id,
      chosen_answer: quizState.answers[q.question_id] || "",
    }));

    const submission = {
      testId: quizState.testId,
      jobHunterId: quizState.jobHunterId,
      applicationId: quizState.applicationId,
      answers: formattedAnswers,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobhunter/updatescoreinterval`,
        submission,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("API Error:", error.response.statusText);
      } else {
        console.error(
          "An unexpected error occurred while sending periodic update.",
        );
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      sendPeriodicUpdate();
    }, 15 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    quizState.testId,
    quizState.jobHunterId,
    quizState.applicationId,
    quizState.answers,
  ]);
  if (!router.isReady || !quizState.applicationId) {
    return <div className="text-center">Loading...</div>;
  }

  if (loading) {
    return <div className="text-center">Loading questions...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
        <Card className="w-full max-w-2xl p-8 text-center animate-in fade-in zoom-in">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="text-3xl font-bold mb-4">Quiz Completed!</h1>
          <p className="text-xl mb-6">
            You answered {Object.keys(quizState.answers).length} questions
          </p>
          <Button onClick={() => router.push("/")}>Return to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="w-full max-w-2xl mb-4">
        <QuizTimer
          applicationId={quizState.applicationId}
          onTimeUp={() => {
            toast({
              title: "Time's Up!",
              description: "Your quiz has been automatically submitted.",
              variant: "destructive",
            });
            handleTimeUp();
          }}
          onTimerReady={setIsTimerReady}
        />
      </div>

      {isTimerReady && questions.length > 0 ? (
        <>
          <QuizProgress
            current={quizState.currentQuestionIndex}
            total={totalQuestions}
          />
          <QuizCard
            question={currentQuestion}
            selectedAnswer={
              quizState.answers[currentQuestion.question_id] || ""
            }
            onAnswerSelect={handleAnswerSelect}
          />

          <div className="mt-6 flex gap-4">
            <Button
              size="lg"
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstQuestion}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button
              size="lg"
              onClick={isLastQuestion ? handleSubmit : handleNext}
              disabled={!hasAnswered}
            >
              {isLastQuestion ? "Finish Quiz" : "Next Question"}
              {!isLastQuestion && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">Preparing your quiz...</div>
      )}
    </div>
  );
}
