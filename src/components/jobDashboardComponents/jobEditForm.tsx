import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { getCategories } from "@/pages/api/api";
import { RichTextEditor } from "./richTextEditor";
import axios from "axios";
import { number } from "zod";


interface UpdateJobFormProps {
	number_applicants: number;
	job_id: string | null;
	closeModal: () => void;
}

interface CategoriesRealForForm {
	category_id: number;
	category_name: string;
}

const JobEditForm: React.FC<UpdateJobFormProps> = ({
	number_applicants,
	job_id,
	closeModal, // Destructure closeModal from props
}) => {
	const [formData, setFormData] = useState({
		job_title: "",
		preSelectionTestId: 0,
		category_id: 0,
		category_name: "",
		selection_test_active: false,
		salary_show: true,
		salary_min: 0,
		salary_max: 0 || null,
		job_description: "",
		job_experience_min: 0,
		expired_date: "",
		status: true,
		job_type: "",
		job_space: "",
	});
	const accessToken = Cookies.get("accessToken");

	const [preSelectionTests, setPreSelectionTests] = useState<any[]>([]);
	const [category, setCategory] = useState<CategoriesRealForForm[]>([]);
	const [isSalaryMaxChecked, setIsSalaryMaxChecked] = useState(false); // state to track checkbox
	const [loading, setLoading] = useState(false); // Loading state

	const jobIdFetched = useRef<string | null>(null); // Ensure ref can handle null as well

	// console.log("This is Job Id dari EDIT FORM");
	// console.log(job_id);
	// console.log("Number of Applicants passed");
	// console.log(number_applicants);

	function formatExpiredDate(data: any) {
		if (!data) return ""; // Return empty string for invalid input
		const date = new Date(data);
		const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits for day
		const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
		const year = date.getFullYear();
		return `${year}-${month}-${day}`;
	}

	// Fetch pre-selection tests
	useEffect(() => {
		const fetchPreSelectionTests = async () => {
			const response = await fetch(
				"http://localhost:8000/api/company/viewpretest",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const data = await response.json();
			if (data.message === "Pre-selection tests fetched successfully") {
				setPreSelectionTests(data.data);
			}
		};
		fetchPreSelectionTests();
	}, [accessToken]);

	// Fetch categories
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await getCategories();
				setCategory(response.data);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};
		fetchCategories();
	}, []);

	// Fetch job details as soon as job_id is available
	useEffect(() => {
		if (!job_id || jobIdFetched.current === job_id) return; // Prevent re-fetch if already fetched

		const fetchJobDetail = async () => {
			try {
				setLoading(true); // Start loading

				const response = await axios.get(
					`http://localhost:8000/api/company/jobDetails/${job_id}`
				);

				const jobPostDetail = response.data.jobPostDetail;
				console.log(response);

				setFormData((prevFormData) => ({
					...prevFormData,

					job_title: jobPostDetail.job_title || "",
					job_type: jobPostDetail.job_type || "",
					job_space: jobPostDetail.job_space || "",
					category_id: jobPostDetail.categoryId,
					category_name: jobPostDetail.category.category_name,
					job_description: jobPostDetail.job_description || "",
					salary_max: jobPostDetail.salary_max || null,
					salary_min: jobPostDetail.salary_min || 0,
					job_experience_min: jobPostDetail.job_experience_min || 0,
					expired_date: formatExpiredDate(jobPostDetail.expired_date),
				}));

				setIsSalaryMaxChecked(jobPostDetail.salary_max);

				// Mark the job_id as fetched
				jobIdFetched.current = job_id;
			} catch (error) {
				console.error("Error fetching job details:", error);
			} finally {
				setLoading(false); // End loading
			}
		};

		fetchJobDetail();
	}, []); // Depend on both job_id and showForm

	console.log("DATA YANG MUNCUL untuk Form");
	console.log(formData);

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const target = e.target;

		if (target instanceof HTMLInputElement) {
			const { name, value, checked, type } = target;

			if (type === "checkbox") {
				setFormData((prev) => ({
					...prev,
					[name]: checked,
				}));
			} else {
				setFormData((prev) => ({
					...prev,
					[name]: value,
				}));
			}
		} else {
			setFormData((prev) => ({
				...prev,
				[target.name]: target.value,
			}));
		}
	};

	const handleDescriptionChange = (content: string) => {
		setFormData((prev) => ({
			...prev,
			job_description: content,
		}));
	};

	const handleCheckboxChange = () => {
		setIsSalaryMaxChecked(!isSalaryMaxChecked); // toggle the checkbox state
		if (!isSalaryMaxChecked) {
			setFormData({
				...formData,
				salary_max: null, // reset salary_max when unchecked
			});
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const transformedData = {
			...formData,
			preSelectionTestId: Number(formData.preSelectionTestId),
			categoryId: Number(formData.category_id),
			salary_min: Number(formData.salary_min),
			salary_max: formData.salary_max ? Number(formData.salary_max) : null, // Null if unchecked
			job_experience_min: Number(formData.job_experience_min),
			expired_date: new Date(formData.expired_date).toISOString(), // Convert to ISO format
		};

		console.log("Transformed Data Submitted:", transformedData);

		try {
			const response = await axios.put(
				`http://localhost:8000/api/company/job/${job_id}`,
				transformedData,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				alert("Job updated successfully!");
				closeModal()
			} else {
				console.error("Error:");
				alert("Failed to update job.");
			}
		} catch (error) {
			console.error("Error updating job:", error);
			alert("An error occurred while updating the job.");
		}
	};

	return (
		<div className="fixed inset-0 bg-gray-800 bg-opacity-20 flex justify-center items-center">
			<div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl transition-opacity duration-500 opacity-100">
				{loading ? (
					<div>Loading job details...</div>
				) : (
					<>
						<h2 className="text-2xl font-bold mb-4">Update Job</h2>

						<form onSubmit={handleSubmit} className="flex flex-col gap-4">
							{number_applicants > 0 ? (
								<>
									<p>
										Applicant detected, only allowed to change the Expired Date
									</p>
									<p>Expired Date</p>
									<input
										type="date"
										name="expired_date"
										value={formData.expired_date}
										onChange={handleInputChange}
										required
										className="p-2 border rounded"
									/>
									<Button type="submit">Update Job</Button>
									<Button variant="secondary" onClick={closeModal}>
										Cancel
									</Button>
								</>
							) : (
								<>
									{/* Job Title */}
									<p>Job Title</p>
									<input
										type="text"
										name="job_title"
										value={formData.job_title}
										onChange={handleInputChange}
										required
										className="p-2 border rounded w-full"
									/>

									{/* Job Type */}
									<p>Job Type</p>
									<select
										name="job_type"
										value={formData.job_type}
										onChange={handleInputChange}
										required
										className="p-2 border rounded"
									>
										<option value="">Select Job Type</option>
										<option value="fulltime">Full Time</option>
										<option value="freelance">Freelance</option>
										<option value="internship">Internship</option>
									</select>

									{/* Category */}
									<p>Category</p>
									<select
										name="category_id"
										value={formData.category_id || ""}
										onChange={handleInputChange}
										required
										className="p-2 border rounded"
									>
										<option value={0}>Select Category</option>
										{category.map((cat) => (
											<option key={cat.category_id} value={cat.category_id}>
												{cat.category_name}
											</option>
										))}
									</select>

									{/* Job Description */}
									<p>Job Description</p>
									<RichTextEditor
										onUpdate={handleDescriptionChange}
										defaultValue={formData.job_description || ""}
									/>

									{/* Salary Min */}
									<p>Salary Min</p>
									<input
										type="number"
										name="salary_min"
										value={formData.salary_min}
										onChange={handleInputChange}
										required
										className="p-2 border rounded"
									/>

									{/* Salary Max */}
									<label>
										<input
											type="checkbox"
											checked={isSalaryMaxChecked}
											onChange={handleCheckboxChange}
										/>
										Include Salary Max
									</label>

									{isSalaryMaxChecked && (
										<div>
											<p>Salary Max</p>
											<input
												type="number"
												name="salary_max"
												value={formData.salary_max ?? ""}
												onChange={handleInputChange}
												className="p-2 border rounded w-full"
											/>
										</div>
									)}

									{/* Show Salary */}
									<div className="flex gap-4 items-center">
										<label>
											<input
												type="checkbox"
												name="salary_show"
												checked={formData.salary_show}
												onChange={handleInputChange}
											/>
											Show Salary
										</label>
									</div>

									{/* Job Experience */}
									<p>Minimum job experience (yrs)</p>
									<input
										type="number"
										name="job_experience_min"
										value={formData.job_experience_min}
										onChange={handleInputChange}
										required
										className="p-2 border rounded"
									/>

									{/* Expired Date */}
									<p>Expired Date</p>
									<input
										type="date"
										name="expired_date"
										value={formData.expired_date}
										onChange={handleInputChange}
										required
										className="p-2 border rounded"
									/>

									{/* Buttons */}
									<div className="flex gap-4">
										<Button variant="secondary" onClick={closeModal}>
											Cancel
										</Button>
										<Button variant="primary" type="submit">
											Update Job
										</Button>
									</div>
								</>
							)}
						</form>
					</>
				)}
			</div>
		</div>
	);
};

export default JobEditForm;
