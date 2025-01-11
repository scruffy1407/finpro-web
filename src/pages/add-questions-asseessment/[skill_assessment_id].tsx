import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";

const AddQuestions = () => {
	const router = useRouter();
	const accessToken =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2MSwicm9sZV90eXBlIjoiZGV2ZWxvcGVyIiwidmVyaWZpZWQiOmZhbHNlLCJpYXQiOjE3MzYyNTczNzQsImV4cCI6MTczNjI2MDk3NH0.8xD8y_hoO6RycJmWjpgMKkdVnubcaduITQyLJB259kc";
	const { skill_assessment_id } = router.query; // Get test_id from the URL
	const [testName, setTestName] = useState<string>(""); // Store test name
	const [questions, setQuestions] = useState([
		{
			question: "",
			answer_1: "",
			answer_2: "",
			answer_3: "",
			answer_4: "",
			correct_answer: "",
		},
	]);

	// Fetch test details
	// useEffect(() => {
	// 	const fetchTestDetails = async () => {
	// 		if (!test_id) return; // Wait until test_id is available
	// 		try {
	// 			const response = await axios.get(
	// 				`http://localhost:8000/api/company/viewpretestbyId/${test_id}`, // Use the new API to get test name
	// 				{
	// 					headers: { Authorization: `Bearer ${accessToken}` },
	// 				}
	// 			);
	// 			console.log("Fetched test details:", response);
	// 			setTestName(response.data.data.test_name); // Assume test_name is part of the response
	// 		} catch (error) {
	// 			console.error("Error fetching test details:", error);
	// 			alert("Failed to fetch test details.");
	// 		}
	// 	};
	// 	fetchTestDetails();
	// }, [test_id, accessToken]);

	const handleInputChange = (
		index: number,
		field: keyof (typeof questions)[0],
		value: string
	) => {
		const updatedQuestions = [...questions];
		updatedQuestions[index][field] = value;
		setQuestions(updatedQuestions);
	};

	const handleAddQuestion = () => {
		if (questions.length < 25) {
			setQuestions([
				...questions,
				{
					question: "",
					answer_1: "",
					answer_2: "",
					answer_3: "",
					answer_4: "",
					correct_answer: "",
				},
			]);
		} else {
			alert("You cannot add more than 25 questions.");
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (questions.length !== 25) {
			alert("You must have exactly 25 questions.");
			return;
		}

		try {
			const response = await axios.post(
				`http://localhost:8000/api/dev/createquest/${skill_assessment_id}`,
				{ questions },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			if (response.data.message) {
				alert(response.data.message);
				router.push("/assessmentTestDashboard");
			}
		} catch (error: any) {
			console.error(
				"Error submitting questions:",
				error.response?.data || error.message
			);
			alert(
				`Failed to submit questions: ${error.response?.data?.message || error.message}`
			);
		}
	};

	const getOrdinalSuffix = (n: number) => {
		const suffixes = ["th", "st", "nd", "rd"];
		const value = n % 100;
		return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
	};

	const handleCancel = () => {
		// Navigate to the assessment test dashboard
		router.push("/assessmentTestDashboard");
	};

	return (
		<div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-md">
			<h1 className="text-2xl font-bold mb-6">Questions Form</h1>
			<h1 className="text-xl mb-6">Assessment - Test Questions list</h1>
			<form onSubmit={handleSubmit} className="space-y-6">
				{questions.map((question, index) => (
					<div key={index} className="space-y-4">
						<h2 className="text-lg font-semibold">
							Question {index + 1} of 25
						</h2>
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
								value={question[`answer_${i}` as `answer_${1 | 2 | 3 | 4}`]}
								onChange={(e) =>
									handleInputChange(
										index,
										`answer_${i}` as `answer_${1 | 2 | 3 | 4}`,
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
				<div className="flex gap-4 justify-between ">
					{questions.length < 25 && (
						<button
							type="button"
							onClick={handleAddQuestion}
							className="bg-blue-500 text-white px-4 py-2 rounded-xl"
						>
							Add {questions.length + 1}
							{getOrdinalSuffix(questions.length + 1)} Question
						</button>
					)}
					<button
						type="submit"
						className="bg-green-500 text-white px-4 py-2 rounded-xl"
					>
						Submit Questions
					</button>
					<Button variant="outline" onClick={handleCancel}>
						Cancel Creationg
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddQuestions;
