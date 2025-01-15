import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import Router from "next/router";
import LoadingLoader from "../LoadingLoader";

// Define form data type
interface FormData {
	skill_assessment_name: string;
	skill_badge: File | null;
	passing_grade: number;
	duration: number;
}

interface CreateAssessmentTestFormProps {
	showForm: boolean;
	setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAssessmentTestForm: React.FC<CreateAssessmentTestFormProps> = ({
	showForm,
	setShowForm,
}) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false); // Add loading state
	const [formData, setFormData] = useState<FormData>({
		skill_assessment_name: "",
		skill_badge: null,
		passing_grade: 75,
		duration: 30,
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: name === "passing_grade" ? Number(value) : value,
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		setFormData((prev) => ({
			...prev,
			skill_badge: file,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const form = new FormData();
		form.append("skill_assessment_name", formData.skill_assessment_name);
		if (formData.skill_badge) form.append("image", formData.skill_badge); // Key updated to 'image'
		form.append("passing_grade", formData.passing_grade.toString());
		form.append("duration", formData.duration.toString());
		try {
			setLoading(true);
			const accessToken = Cookies.get("accessToken");
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dev/createassessment`,
				form,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			// Check if the message in the response indicates success
			if (
				response.data.message &&
				response.data.message === "Assessment test created successfully!"
			) {
				alert("Assessment test created");
				window.location.reload();
				setShowForm(false);
			} else {
				console.error("Failed to create assessment test", response.data);
			}
		} catch (error) {
			console.error("Error creating assessment test:", error);
		} finally {
			setLoading(true);
		}
	};

	return (
		<div>
			{showForm && (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl">
						<h2 className="text-2xl font-bold mb-4">Create Assessment Test</h2>
						<form onSubmit={handleSubmit} className="flex flex-col gap-4">
							{/* Assessment Name */}
							<label htmlFor="skill_assessment_name" className="font-medium">
								Skill Assessment Name
							</label>
							<input
								type="text"
								id="skill_assessment_name"
								name="skill_assessment_name"
								placeholder="Skill Assessment Name"
								value={formData.skill_assessment_name}
								onChange={handleInputChange}
								className="border rounded-md p-2"
								required
							/>

							{/* Skill Badge (File Input) */}
							<label htmlFor="skill_badge" className="font-medium">
								Skill Badge
							</label>
							<input
								type="file"
								id="image"
								name="image" // Updated to match the server's expected key
								onChange={handleFileChange}
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
									{loading ? <LoadingLoader /> : "Create Assessment Test"}
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

export default CreateAssessmentTestForm;
