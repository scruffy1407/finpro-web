import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";

interface Question {
	questionId: number;
	question: string;
	answer_1: string;
	answer_2: string;
	answer_3: string;
	answer_4: string;
	correct_answer: string;
}

const EditQuestions = () => {
	const router = useRouter();
	const accessToken =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2MSwicm9sZV90eXBlIjoiZGV2ZWxvcGVyIiwidmVyaWZpZWQiOmZhbHNlLCJpYXQiOjE3MzYyNjEyOTgsImV4cCI6MTczNjI2NDg5OH0.9JFhpXrDl7r_0Pf2wien9gwNccDjgcRUJenY3Tgzgi4";

	const { skill_assessment_id } = router.query; // Get skill_assessment_id from the URL
	const [testName, setTestName] = useState<string>(""); // Store test name
	const [questions, setQuestions] = useState<Question[]>([]); // Initialize with an empty array

	useEffect(() => {
		const fetchTestDetails = async () => {
			if (!skill_assessment_id) return; // Wait until skill_assessment_id is available
			try {
				// Fetch the test data
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dev/getassessquestbyId/${skill_assessment_id}`,
					{
						headers: { Authorization: `Bearer ${accessToken}` },
					}
				);
				// Ensure the response contains 'assessmentTest' and 'questions'
				const questions = response.data.assessmentTest?.questions;

				if (Array.isArray(questions)) {
					const questionsWithId = questions.map(
						(q: {
							skill_assessment_question_id: number;
							question: string;
							answer_1: string;
							answer_2: string;
							answer_3: string;
							answer_4: string;
							correct_answer: string;
						}) => ({
							questionId: q.skill_assessment_question_id, // Assign 'questionId' from 'skill_assessment_question_id'
							question: q.question,
							answer_1: q.answer_1,
							answer_2: q.answer_2,
							answer_3: q.answer_3,
							answer_4: q.answer_4,
							correct_answer: q.correct_answer,
						})
					);

					setTestName(response.data.assessmentTest.test_name); // Set the test name
					setQuestions(questionsWithId); // Set the questions with the correct IDs
				} else {
					console.error(
						"Questions data is missing or not an array:",
						questions
					);
					alert("Failed to load questions. Invalid response format.");
				}
			} catch (error) {
				console.error("Error fetching test details:", error);
				alert("Failed to fetch test details.");
			}
		};
		fetchTestDetails();
	}, [skill_assessment_id, accessToken]);

	// Handle input change for each question
	const handleInputChange = (
		index: number,
		field: keyof Question,
		value: string
	) => {
		const updatedQuestions = [...questions];
		updatedQuestions[index] = {
			...updatedQuestions[index],
			[field]: value,
		};
		setQuestions(updatedQuestions);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Convert skillAssessmentId to a number
		const updatedSkillAssessmentId = Number(skill_assessment_id);

		const updatedQuestions = questions.map((question) => ({
			questionId: question.questionId,
			question: question.question,
			answer_1: question.answer_1,
			answer_2: question.answer_2,
			answer_3: question.answer_3,
			answer_4: question.answer_4,
			correct_answer: question.correct_answer,
		}));

		try {
			// Send the request to update the test questions
			const response = await axios.put(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dev/editquest`,
				{
					skillAssessmentId: updatedSkillAssessmentId, // Pass number here
					questions: updatedQuestions,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);
			if (response.status === 200) {
				alert("Test questions updated successfully!");
				router.push("/assessmentTestDashboard");
			} else {
				alert(`Error: ${response.data.error || "Unknown error occurred"}`);
			}
		} catch (error) {
			console.error("Error updating questions:", error);
			alert("Failed to update questions.");
		}
	};

	const handleCancel = () => {
		// Navigate to the assessment test dashboard
		router.push("/assessmentTestDashboard");
	};

	return (
		<div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-md">
			<h1 className="text-2xl font-bold mb-6">Edit Questions Form</h1>
			<h1 className="text-xl mb-6">Assessment Test</h1>
			<form onSubmit={handleSubmit} className="space-y-6">
				{questions.map((question, index) => (
					<div key={index} className="space-y-4">
						<h2 className="text-lg font-semibold">Question {index + 1}</h2>
						<input
							type="text"
							placeholder="Question"
							value={question.question}
							onChange={(e) =>
								handleInputChange(index, "question", e.target.value)
							}
							className="w-full border p-2 rounded"
							required
						/>
						{[1, 2, 3, 4].map((i) => (
							<input
								key={i}
								type="text"
								placeholder={`Answer ${i}`}
								value={question[`answer_${i}` as keyof Question]} // Dynamically access answer fields
								onChange={(e) =>
									handleInputChange(
										index,
										`answer_${i}` as keyof Question,
										e.target.value
									)
								}
								className="w-full border p-2 rounded"
								required
							/>
						))}
						<select
							value={question.correct_answer}
							onChange={(e) =>
								handleInputChange(index, "correct_answer", e.target.value)
							}
							className="w-full border p-2 rounded"
							required
						>
							<option value="">Select Correct Answer</option>
							<option value={question.answer_1}>Answer 1</option>
							<option value={question.answer_2}>Answer 2</option>
							<option value={question.answer_3}>Answer 3</option>
							<option value={question.answer_4}>Answer 4</option>
						</select>
					</div>
				))}
				<div className="flex gap-4">
					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 rounded-xl"
					>
						Update Questions
					</button>
					<Button variant="outline" onClick={handleCancel}>
						Cancel Edit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default EditQuestions;
