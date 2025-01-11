"use client";

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

type QuizState = {
	currentQuestionIndex: number;
	answers: { [key: string]: string }; // or { [key: number]: string } if question IDs are numbers
	score: number;
	testId: number | null;
	jobHunterId: number;
	applicationId: number;
};

export interface Question {
	question_id: string; // Or 'number' if IDs are numbers
	question: string;
	answer_1: string;
	answer_2: string;
	answer_3: string;
	answer_4: string;
}

export default function Quiz() {
	const [isTimerReady, setIsTimerReady] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { toast } = useToast();
	const router = useRouter();
	const jobId = router.query.job_id; // Extract `job_id` from the URL

	console.log("AM i geeting this jobHunterId ?");

	const jobHunterId = Number(router.query.jobHunterId) || 0; // Extract `jobHunterId` from query
	console.log(jobHunterId);
	console.log("Am i getting this applicaitonId ?");
	const applicationId = Number(router.query.applicationId) || 0; // Extract `applicationId` from query
	console.log(applicationId);
	console.log("Am i getting this Test_id?");

	console.log(jobId);

	const [quizState, setQuizState] = useState<QuizState>({
		currentQuestionIndex: 0,
		answers: {}, // Initially empty, but will have { questionId: chosenAnswer }
		score: 0,
		testId: null,
		jobHunterId: 0, // Temporary value, will be updated later
		applicationId: 0, // Temporary value, will be updated later
	});
	const [questions, setQuestions] = useState<Question[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [duration, setDuration] = useState(0); // New state for duration
	const [hunterId, setHunterId] = useState<number | null>(null);
	const [appId, setAppId] = useState<number | null>(null);

	// Check for query parameters and update state
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
					`http://localhost:8000/api/jobhunter/getquestions/${jobId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				console.log("API Response:", response.data); // Log the raw API response

				if (response.status === 200) {
					setQuestions(response.data.questions); // Assuming the API returns an array of questions
					setDuration(response.data.duration); // Update duration from API response
					setQuizState((prev) => {
						const updatedState = { ...prev, testId: response.data.testId };
						console.log("Updated State:", updatedState); // Log the updated state
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
		console.log("Updated testId:", quizState.testId);
	}, [quizState.testId]);

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

			// Store updated answers in cookies
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
			setIsSubmitted(true); // Set isSubmitted to true to prevent further submissions
		}
	};

	const handleSubmit = async () => {
		if (isSubmitted) return; // Prevent further submission if already submitted
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
				"http://localhost:8000/api/jobhunter/handlingtest",
				submission,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200 || response.status === 201) {
				const result = response.data;
				if (result.completionStatus === "pass") {
					alert("Congratulations! You've passed the test.");
				} else if (result.completionStatus === "failed") {
					alert("Test Failed. Try again in the next due time.");
				} else {
					alert("Unexpected completion status received.");
				}
			} else {
				alert(`Unexpected response: ${response.status}`);
			}
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				alert(error.response.data.message || "Failed to submit the quiz.");
			} else {
				alert("An unexpected error occurred during submission.");
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
			const response = await axios.post(
				"http://localhost:8000/api/jobhunter/updatescoreinterval",
				submission,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			// You can log or process the response here if needed
			console.log("Periodic Update Response:", response.data);
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				console.error("API Error:", error.response.statusText);
			} else {
				console.error(
					"An unexpected error occurred while sending periodic update."
				);
			}
		}
	};

	useEffect(() => {
		const intervalId = setInterval(
			() => {
				sendPeriodicUpdate();
			},
			1 * 60 * 1000
		); 

		// Cleanup interval when the component unmounts or quiz is finished
		return () => {
			clearInterval(intervalId);
		};
	}, [
		quizState.testId,
		quizState.jobHunterId,
		quizState.applicationId,
		quizState.answers,
	]);

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
