import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { getCategories } from "@/pages/api/api";
import { RichTextEditor } from "./richTextEditor";
import LoadingLoader from "../LoadingLoader";

interface CreateJobFormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}
interface CategoriesRealForForm {
  category_id: number;
  category_name: string;
}

const CreateJobForm: React.FC<CreateJobFormProps> = ({
  showForm,
  setShowForm,
}) => {
  const [formData, setFormData] = useState({
    job_title: "",
    preSelectionTestId: null,
    categoryId: 0,
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
  const [isExperienceMaxChecked, setIsExperienceMaxChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPreSelectionTests = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/viewpretestforselection`,
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
  useEffect(() => {}, [category]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement) {
      const { name, value, checked, type } = target;

      if (type === "number" && Number(value) < 0) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.categoryId === 0) {
      alert("Please select a category.");
      return;
    }

    if (
      formData.salary_max !== null &&
      Number(formData.salary_max) < Number(formData.salary_min)
    ) {
      alert("Salary Max should be greater than Salary Min.");
      return;
    }

    if (
      formData.job_experience_max !== null &&
      formData.job_experience_max < formData.job_experience_min
    ) {
      alert("Job Experience Max should be greater than Job Experience Min.");
      return;
    }

    const transformedData = {
      ...formData,
      preSelectionTestId: formData.preSelectionTestId
        ? Number(formData.preSelectionTestId)
        : null,
      categoryId: Number(formData.categoryId),
      salary_min: Number(formData.salary_min),
      salary_max: formData.salary_max ? Number(formData.salary_max) : null,
      job_experience_min: Number(formData.job_experience_min),
      job_experience_max: formData.job_experience_max
        ? Number(formData.job_experience_max)
        : null,
      expired_date: new Date(formData.expired_date).toISOString(),
    };

    if (new Date(formData.expired_date) < new Date()) {
      alert("Expired date cannot be in the past.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/job`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(transformedData),
        }
      );

      if (response.ok) {
        alert("Job created successfully!");
        setShowForm(false);
        setLoading(false);
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Failed to create job.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating job:", error);
      alert("An error occurred while creating the job.");
      setLoading(false);
    }
  };

  return (
    <>
      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl  max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Create New Job</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <p>Job Title</p>
              <input
                type="text"
                name="job_title"
                placeholder="Job Title"
                value={formData.job_title}
                onChange={handleInputChange}
                required
                className="p-2 border rounded"
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
                <option value="freelance">Free Lance</option>
                <option value="internship">Internship</option>
              </select>
              <p>Job Space</p>
              <select
                name="job_space"
                value={formData.job_space}
                onChange={handleInputChange}
                required
                className="p-2 border rounded"
              >
                <option value="">Select Job Space</option>
                <option value="remoteworking">Remote Working</option>
                <option value="onoffice">On Office</option>
                <option value="hybrid">Hybrid</option>
              </select>
              <label>
                <input
                  type="checkbox"
                  name="selection_test_active"
                  checked={formData.selection_test_active}
                  onChange={handleInputChange}
                />
                Selection Test Active
              </label>

              {formData.selection_test_active && (
                <>
                  <p> Select Pre Selection Test </p>
                  <select
                    name="preSelectionTestId"
                    value={formData.preSelectionTestId ?? ""}
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded"
                  >
                    <option value="">Select Pre-Selection Test</option>
                    {preSelectionTests.map((test) => (
                      <option key={test.test_id} value={test.test_id}>
                        {test.test_name}
                      </option>
                    ))}
                  </select>
                </>
              )}

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
                placeholder="Salary Minimum"
                value={formData.salary_min}
                onChange={handleInputChange}
                required
                className="p-2 border rounded"
              />

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
                    placeholder="Salary Maximum"
                    value={formData.salary_max ?? ""} // Render as an empty string if null
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
              <p>Minimum of job experience (yrs)</p>
              <input
                type="number"
                name="job_experience_min"
                placeholder="Minimum Experience (Years)"
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
                    setIsExperienceMaxChecked(!isExperienceMaxChecked);
                    if (!isExperienceMaxChecked) {
                      setFormData((prev) => ({
                        ...prev,
                        job_experience_max: null,
                      }));
                    }
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
              <p>Expired date</p>
              <input
                type="date"
                name="expired_date"
                value={formData.expired_date}
                onChange={handleInputChange}
                required
                className="p-2 border rounded"
              />

              <div className="flex gap-4">
                <Button variant="secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {loading ? <LoadingLoader /> : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateJobForm;
