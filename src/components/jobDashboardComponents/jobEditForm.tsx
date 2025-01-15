import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { getCategories } from "@/pages/api/api";
import { RichTextEditor } from "./richTextEditor";
import axios from "axios";

interface UpdateJobFormProps {
  number_applicants: number;
  job_id: string | null;
  closeModal: () => void;
}

interface CategoriesRealForForm {
  category_id: number;
  category_name: string;
}

interface FormData {
  job_title: string;
  preSelectionTestId: string | null;
  category_id: number;
  category_name: string;
  selection_test_active: boolean;
  salary_show: boolean;
  salary_min: number;
  salary_max: number | null;
  job_description: string;
  job_experience_min: number;
  job_experience_max: number | null;
  expired_date: string;
  status: boolean;
  job_type: string;
  job_space: string;
}

const JobEditForm: React.FC<UpdateJobFormProps> = ({
  number_applicants,
  job_id,
  closeModal,
}) => {
  const [formData, setFormData] = useState<FormData>({
    job_title: "",
    preSelectionTestId: null,
    category_id: 0,
    category_name: "",
    selection_test_active: false,
    salary_show: true,
    salary_min: 0,
    salary_max: 0 || null,
    job_description: "",
    job_experience_min: 0,
    job_experience_max: null,
    expired_date: "",
    status: true,
    job_type: "",
    job_space: "",
  });
  const accessToken = Cookies.get("accessToken");

  const [preSelectionTests, setPreSelectionTests] = useState<any[]>([]);
  const [category, setCategory] = useState<CategoriesRealForForm[]>([]);
  const [isSalaryMaxChecked, setIsSalaryMaxChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isExperienceMaxChecked, setIsExperienceMaxChecked] =
    useState<boolean>(false);

  const jobIdFetched = useRef<string | null>(null);

  function formatExpiredDate(data: any) {
    if (!data) return "";
    const date = new Date(data);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const fetchPreSelectionTests = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/viewpretest`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const data = await response.json();
      if (data.message === "Pre-selection tests fetched successfully") {
        setPreSelectionTests(data.data);
      }
    };
    fetchPreSelectionTests();
  }, [accessToken]);

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

  useEffect(() => {
    if (!job_id || jobIdFetched.current === job_id) return;

    const fetchJobDetail = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/jobDetails/${job_id}`,
        );
        const jobPostDetail = response.data.jobPostDetail;
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
          job_experience_max: jobPostDetail.job_experience_max || null,
          expired_date: formatExpiredDate(jobPostDetail.expired_date),
          preSelectionTestId: jobPostDetail.preSelectionTestId || null,
          selection_test_active: jobPostDetail.selection_text_active || false,
        }));

        setIsSalaryMaxChecked(jobPostDetail.salary_max);
        setIsExperienceMaxChecked(!!jobPostDetail.job_experience_max);

        jobIdFetched.current = job_id;
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, []);
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement) {
      const { name, value, checked, type } = target;

      if (type === "number" && value && Number(value) < 0) {
        return;
      }

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
    setIsSalaryMaxChecked(!isSalaryMaxChecked);
    if (!isSalaryMaxChecked) {
      setFormData({
        ...formData,
        salary_max: null,
      });
    }
  };

  const handlePreSelectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      selection_test_active: e.target.checked,
    }));
    if (!e.target.checked) {
      setFormData((prev) => ({
        ...prev,
        preSelectionTestId: null,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.category_id === 0) {
      alert("Please select a category.");
      return;
    }

    if (
      formData.salary_max !== null &&
      formData.salary_max < formData.salary_min
    ) {
      alert("Salary Max must be greater than Salary Min.");
      return;
    }

    if (
      formData.job_experience_max !== null &&
      formData.job_experience_max < formData.job_experience_min
    ) {
      alert("Job Experience Max must be greater than Job Experience Min.");
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(formData.expired_date);
    if (selectedDate <= currentDate) {
      alert("Expired Date must be in the future.");
      return;
    }

    const transformedData = {
      ...formData,
      preSelectionTestId: formData.preSelectionTestId
        ? Number(formData.preSelectionTestId)
        : null,
      categoryId: Number(formData.category_id),
      salary_min: Number(formData.salary_min),
      salary_max: formData.salary_max ? Number(formData.salary_max) : null,
      job_experience_min: Number(formData.job_experience_min),
      job_experience_max: Number(formData.job_experience_max),
      expired_date: new Date(formData.expired_date).toISOString(),
      selection_test_active: formData.selection_test_active,
    };
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/job/${job_id}`,
        transformedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.status === 200) {
        alert("Job updated successfully!");
        closeModal();
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
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl transition-opacity duration-500 opacity-100 max-h-[90vh] overflow-y-auto">
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
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="selection_test_active"
                        checked={formData.selection_test_active}
                        onChange={handlePreSelectionChange}
                      />
                      Enable Pre-Selection Test
                    </label>

                    {formData.selection_test_active && (
                      <div>
                        <p>Pre-Selection Test ID</p>
                        <select
                          name="preSelectionTestId"
                          value={formData.preSelectionTestId || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              preSelectionTestId: e.target.value,
                            }))
                          }
                          required
                          className="p-2 border rounded"
                        >
                          <option value="">Select Test</option>
                          {preSelectionTests.map((test) => (
                            <option key={test.test_id} value={test.test_id}>
                              {test.test_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

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

                  <label>
                    <input
                      type="checkbox"
                      checked={isExperienceMaxChecked}
                      onChange={() => {
                        const newCheckedState = !isExperienceMaxChecked;
                        setIsExperienceMaxChecked(newCheckedState);
                        setFormData((prev) => ({
                          ...prev,
                          job_experience_max: newCheckedState
                            ? prev.job_experience_max
                            : null, // Set to null when unchecked
                        }));
                      }}
                    />
                    Put Experience Max (yrs)
                  </label>

                  {isExperienceMaxChecked && (
                    <div>
                      <p>Maximum of job experience (yrs)</p>
                      <input
                        type="number"
                        name="job_experience_max"
                        placeholder="Maximum Experience (Years)"
                        value={formData.job_experience_max ?? ""}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                      />
                    </div>
                  )}

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
