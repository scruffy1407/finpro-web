import { useState } from "react";
import { testConfig } from "@/components/PreSelectionTestExecuteComponents/datadumdum/testConfig";
import { QuizCardAssess } from "@/components/assessmentTestExecuteComponents/QuizCardAssess";
import { QuizProgresAssess } from "@/components/assessmentTestExecuteComponents/QuizProgressAsseess";
import { QuizTimerAssess } from "@/components/assessmentTestExecuteComponents/QuizTimerAssess";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { AuthHandler } from "@/utils/auth.utils";
import { toast as toasty } from "sonner"

type QuizState = {
  currentQuestionIndex: number;
  answers: { [key: string]: string };
  score: number;
  skillAssessmentId: number | null;
  skillAssessmentIdUnq : number | null;
  jobHunterId: number;
};
export interface QuestionAssess {
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

  const jobHunterId = useSelector((state: RootState) => state.auth.innerId);

  const [, setIsTimerReady] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast();
  const router = useRouter();
  const skillAssessmentIdUnq = router.query.skillAssessmentIdUnq;

  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    score: 0,
    jobHunterId: jobHunterId || 0,
    skillAssessmentId: testConfig.data.preSelectionTest.test_id,
    skillAssessmentIdUnq : testConfig.data.preSelectionTest.test_id_unique
  });
  const [questions, setQuestions] = useState<QuestionAssess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setDuration] = useState(0);
  const [, setSkillAssessIdUnq] = useState<number | null>(null);
  const [, setSkillAssessId] = useState<number | null>(null);
  const [, setHunterId] = useState<number | null>(null);

  useEffect(() => {
    if (jobHunterId && skillAssessmentIdUnq) {
      setQuizState((prev) => ({
        ...prev,
        jobHunterId,
        skillAssessmentIdUnq: Number(skillAssessmentIdUnq),
      }));
      setIsLoading(false);
    }
  }, [jobHunterId, skillAssessmentIdUnq]);

  useEffect(() => {
    if (skillAssessmentIdUnq) {
      setHunterId(Number(jobHunterId));
      setSkillAssessIdUnq(Number(skillAssessmentIdUnq));

      setQuizState((prev) => ({
        ...prev,
        jobHunterId: Number(jobHunterId),
        skillAssessmentId: Number(skillAssessmentIdUnq),
      }));
    }
  }, [skillAssessmentIdUnq]);

  useEffect(() => {
    const fetchAssessmentQuestions = async () => {
      if (!skillAssessmentIdUnq) {
        setError("Skill Assessment ID is missing in the URL.");
        setLoading(false);
        return;
      }

      const token = Cookies.get("accessToken");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dev/getassessmentquest/${skillAssessmentIdUnq}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          setQuestions(response.data.questions);
          setDuration(response.data.duration);
          setSkillAssessId(quizState.skillAssessmentId)
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
          setError(
            "An unexpected error occurred while fetching assessment questions.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAssessmentQuestions();
  }, [skillAssessmentIdUnq]);

  const currentQuestion = questions[quizState.currentQuestionIndex] || {};

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

    const formattedAnswers = questions.map((q) => {
      const questionId = q.question_id;
      const chosenAnswer = quizState.answers[questionId] || "";

      return {
        skill_assessment_question_id: questionId,
        chosen_answer: chosenAnswer,
      };
    });

    const submission = {
      skillAssessmentId: quizState.skillAssessmentId,
      jobHunterId: quizState.jobHunterId,
      answers: formattedAnswers,
    };

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dev/updateassessmentanswer`,
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

        const completionStatus = result?.data?.completionStatus;

        if (completionStatus === "pass") {
          toasty.success("Congratulations! You've passed the assessment.");
        } else if (completionStatus === "failed") {
          toasty.error("Assessment Failed. Try again in the next due time.");
        } else {
          toasty.error("Unexpected completion status. Please try again.");
        }
        router.push("/skills-assessment");
      } else {
        toasty.error(`Unexpected response: ${response.status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toasty.error(
          error.response.data.message || "Failed to submit the assessment.",
        );
      } else {
        toasty.error("An unexpected error occurred during submission.");
      }
    } finally {
      Cookies.remove("quizAnswers");
      router.push("/skills-assessment");
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading user data...</div>;
  }

  if (loading) {
    return <div className="text-center">Loading questions...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!questions.length) {
    return <div className="text-center">No questions available.</div>;
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
        <QuizTimerAssess
          skillAssessmentIdUnq={Number(skillAssessmentIdUnq)}
          onTimeUp={() => {
            toast({
              title: "Time's Up!",
              description: "Your quiz has been automaticalsjuly submitted.",
              variant: "destructive",
            });
            handleTimeUp();
          }}
          onTimerReady={setIsTimerReady}
        />
      </div>
      <QuizProgresAssess
        current={quizState.currentQuestionIndex}
        total={totalQuestions}
      />
      <QuizCardAssess
        question={currentQuestion}
        selectedAnswer={quizState.answers[currentQuestion.question_id]}
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
    </div>
  );
}