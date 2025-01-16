import React from "react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import LoadingLoader from "../LoadingLoader";

interface CreatePreSelectionFormProps {
	showForm: boolean;
	setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const PreSelectionTestCreateForm: React.FC<CreatePreSelectionFormProps> = ({
	showForm,
	setShowForm,
}) => {
	const [formData, setFormData] = useState({
		test_name: "",
		passing_grade: 50,
		duration: 30,
	});
	const router = useRouter();

	const accessToken = Cookies.get("accessToken");

	const [loading, setLoading] = useState(false);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		// Convert the value to number if the name is passing_grade or duration
		setFormData((prev) => ({
			...prev,
			[name]:
				name === "passing_grade" || name === "duration" ? Number(value) : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // Prevent default form submission behavior

		try {
			setLoading(true);
			// Ensure accessToken is available
			if (!accessToken) {
				alert("Authorization token is missing. Please log in.");
				return;
			}

			// Prepare the request body
			const requestBody = {
				testName: formData.test_name,
				image: "", // Set the image field to an empty string
				passingGrade: formData.passing_grade, // Ensure this is a number
				duration: formData.duration, // Ensure this is a number
			};

			// Send the POST request
			await axios.post(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/createpretest`,
				requestBody,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`, // Include the access token
					},
				}
			);
			alert("Test created successfully!");
			// Optionally reset the form
			setFormData({
				test_name: "",
				passing_grade: 50,
				duration: 30,
			});
			router.reload();
			// Optionally close the form
			setShowForm(false);
		} catch (error) {
			console.error(
				"An error occurred while creating the pre-selection test:",
				error
			);
			alert("An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			{showForm && (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl">
						<h2 className="text-2xl font-bold mb-4">Create New Test</h2>
						<form onSubmit={handleSubmit} className="flex flex-col gap-4">
							{/* Test Name */}
							<label htmlFor="test_name" className="font-medium">
								Pre Selection Test Title
							</label>
							<input
								type="text"
								id="test_name"
								name="test_name"
								placeholder="Test Name"
								value={formData.test_name}
								onChange={handleInputChange}
								className="border rounded-md p-2"
								required
							/>

							{/* Passing Grade */}
							<label htmlFor="passing_grade" className="font-medium">
								Passing Grade
							</label>
							<input
								type="number"
								id="passing_grade"
								name="passing_grade"
								min={50}
								max={100}
								value={formData.passing_grade}
								onChange={handleInputChange}
								className="border rounded-md p-2"
								required
							/>

							{/* Duration */}
							<label htmlFor="duration" className="font-medium">
								Duration (in minutes)
							</label>
							<select
								id="duration"
								name="duration"
								value={formData.duration}
								onChange={handleInputChange}
								className="border rounded-md p-2"
								required
							>
								<option value={30}>30 Minutes</option>
								<option value={45}>45 Minutes</option>
								<option value={60}>60 Minutes</option>
							</select>

							{/* Submit Button */}
							<div className="flex justify-end mt-4">
								<Button
									type="submit"
									className="bg-blue-500 text-white px-4 py-2 rounded-md"
								>
									{loading ? <LoadingLoader /> : "Create Test"}
								</Button>
								<Button
									type="button"
									onClick={() => setShowForm(false)}
									className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md"
								>
									Cancel
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default PreSelectionTestCreateForm;