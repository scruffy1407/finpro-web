import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";

interface Question {
	questionId: number; // Updated to match the API's field naming
	question: string;
	answer_1: string;
	answer_2: string;
	answer_3: string;
	answer_4: string;
	correct_answer: string;
}

const EditQuestions = () => {
	const router = useRouter();
	const accessToken = Cookies.get("accessToken");

	const { test_id } = router.query; // Get test_id from the URL
	const [testName, setTestName] = useState<string>(""); // Store test name
	const [questions, setQuestions] = useState<Question[]>([]); // Initialize with an empty array

	useEffect(() => {
		const fetchTestDetails = async () => {
			if (!test_id) return; // Wait until test_id is available
			try {
				// Fetch the test data
				const response = await axios.get(
					`http://localhost:8000/api/company/viewtestbyPretestId/${test_id}`,
					{
						headers: { Authorization: `Bearer ${accessToken}` },
					}
				);

				// Log the entire response data for debugging
				console.log("Fetched test details:", response.data);

				// Ensure question_id is correctly assigned
				const questionsWithId = response.data.data.testQuestions.map(
					(q: {
						question_id: number;
						question: string;
						answer_1: string;
						answer_2: string;
						answer_3: string;
						answer_4: string;
						correct_answer: string;
					}) => ({
						...q,
						questionId: q.question_id, // Explicitly assign questionId from question_id
					})
				);

				// Set the test name and questions with correct questionId
				setTestName(response.data.data.test_name);
				setQuestions(questionsWithId); // Set the questions with the correct IDs
			} catch (error) {
				console.error("Error fetching test details:", error);
				alert("Failed to fetch test details.");
			}
		};
		fetchTestDetails();
	}, [test_id, accessToken]);

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

		const updatedQuestions = {
			questions: questions.map((question) => ({
				questionId: question.questionId,
				question: question.question,
				answer_1: question.answer_1,
				answer_2: question.answer_2,
				answer_3: question.answer_3,
				answer_4: question.answer_4,
				correct_answer: question.correct_answer,
			})),
		};

		console.log("Updated request body:", updatedQuestions);

		try {
			console.log(`http://localhost:8000/api/company/updatetest/${test_id}`);

			// Send the request to update the test questions
			const response = await axios.put(
				`http://localhost:8000/api/company/updatetest/${test_id}`,
				updatedQuestions,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json", // Explicitly set Content-Type
					},
				}
			);

			// Check for a success response
			console.log("API Response:", response.data); // Check the full response data

			if (response.status === 200) {
				alert("Test questions updated successfully!");
				router.push("/preSelectionDashboard"); // Navigate back to the homepage or another page
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
		router.push("/preSelectionDashboard"); // Navigate back to the homepage or another page
	};

	return (
		<div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-md">
			<h1 className="text-2xl font-bold mb-6">Edit Questions Form</h1>
			<h1 className="text-xl mb-6">
				Pre-selection Test Title: {testName || "Loading..."}
			</h1>
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
						className="bg-green-500 text-white px-4 py-2 rounded-xl"
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
