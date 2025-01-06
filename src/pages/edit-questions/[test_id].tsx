import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface Question {
	question_id: number; // Include the question_id field
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

	// Fetch test details and questions
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
				// Set the test name and questions
				setTestName(response.data.data.test_name);
				setQuestions(response.data.data.testQuestions); // Set the existing questions
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
		field: keyof Question, // Use keyof Question here
		value: string
	) => {
		// Create a copy of the questions to avoid mutating the state directly
		const updatedQuestions = [...questions];
		// Update the specific question's field
		updatedQuestions[index] = {
			...updatedQuestions[index], // Copy the existing question
			[field]: value, // Update only the field that was changed
		};
		setQuestions(updatedQuestions); // Update the state
	};

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const updatedQuestions = questions.map((question) => ({
			preSelectionTestId: test_id, // Use the preSelectionTestId as per API requirements
			questionId: question.question_id, // Correct question ID from the response
			question: question.question,
			answer_1: question.answer_1,
			answer_2: question.answer_2,
			answer_3: question.answer_3,
			answer_4: question.answer_4,
			correct_answer: question.correct_answer,
		}));

		// Log the updated questions to verify the structure
		console.log("Updated request body:", updatedQuestions);

		try {
			// Send the request to update each question using the API
			await axios.post("http://localhost:8000/api/company/updatetest", {
				questions: updatedQuestions, // Send questions directly
			});
			alert("Test questions updated successfully!");
		} catch (error) {
			console.error("Error updating questions:", error);
			alert("Failed to update questions.");
		}
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

						{/* Dropdown for correct answer */}
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
						className="bg-green-500 text-white px-4 py-2 rounded-md"
					>
						Update Questions
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditQuestions;
