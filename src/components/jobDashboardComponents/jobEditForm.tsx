import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { getCategories } from "@/pages/api/api";
import { RichTextEditor } from "./richTextEditor";
import axios from "axios";

interface UpdateJobFormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  job_id: string | null;
}

interface CategoriesRealForForm {
  category_id: number;
  category_name: string;
}

const JobEditForm: React.FC<UpdateJobFormProps> = ({
  showForm,
  setShowForm,
  job_id,
}) => {
  const [formData, setFormData] = useState({
    job_title: "",
    preSelectionTestId: 0,
    categoryId: 0,
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

        setFormData((prevFormData) => ({
          ...prevFormData,
          job_title: jobPostDetail.job_title || "",
          job_type: jobPostDetail.job_type || "",
          job_space: jobPostDetail.job_space || "",
          job_description: jobPostDetail.job_description || "",
          salary_max: jobPostDetail.salary_max || null,
          salary_min: jobPostDetail.salary_min || 0,
          job_experience_min: jobPostDetail.job_experience_min || 0,
          expired_date: jobPostDetail.expired_date || "",
        }));

        // Mark the job_id as fetched
        jobIdFetched.current = job_id;
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false); // End loading
      }
    };


      fetchJobDetail();
    
  }, [job_id, showForm]); // Depend on both job_id and showForm

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
      categoryId: Number(formData.categoryId),
      salary_min: Number(formData.salary_min),
      salary_max: formData.salary_max ? Number(formData.salary_max) : null, // Null if unchecked
      job_experience_min: Number(formData.job_experience_min),
      expired_date: new Date(formData.expired_date).toISOString(), // Convert to ISO format
    };

    console.log("Transformed Data Submitted:", transformedData);

    try {
      const response = await fetch(
        `http://localhost:8000/api/company/job/${job_id}`,
        {
          method: "PUT", // Update instead of creating
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(transformedData),
        }
      );

      if (response.ok) {
        alert("Job updated successfully!");
        setShowForm(false); // Close the form on success
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Failed to update job.");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      alert("An error occurred while updating the job.");
    }
  };

  return (
    <>
      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-20 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl transition-opacity duration-500 opacity-100">
            {loading ? (
              <div>Loading job details...</div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Update Job</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Form Fields */}
                  <p>Job Title</p>
                  <input
                    type="text"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full"
                  />

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

                  <p>Category</p>
                  <select
                    name="categoryId"
                    value={formData.categoryId || ""}
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded"
                  >
                    <option value="">Select Category</option>
                    {category.map((cat) => (
                      <option key={cat.category_id} value={cat.category_id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>

                  <p>Job Description</p>
                  <RichTextEditor onUpdate={handleDescriptionChange} />

                  <p>Salary Min</p>
                  <input
                    type="number"
                    name="salary_min"
                    value={formData.salary_min}
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded"
                  />

                  {/* Optional Salary Max */}
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

                  <p>Minimum job experience (yrs)</p>
                  <input
                    type="number"
                    name="job_experience_min"
                    value={formData.job_experience_min}
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded"
                  />

                  <p>Expired Date</p>
                  <input
                    type="date"
                    name="expired_date"
                    value={formData.expired_date}
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded"
                  />

                  <div className="flex gap-4">
                    <Button
                      variant="secondary"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Update Job</Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default JobEditForm;
