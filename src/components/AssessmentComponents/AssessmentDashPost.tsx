import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import ConfirmDelete from "@/components/Modal/ConfirmDelete";
import Link from "next/link";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import LoadingLoader from "../LoadingLoader";

interface AssessmentProps {
  skill_assessment_id: number;
  skill_assessment_name: string;
  skill_badge: string;
  passing_grade: number;
  duration: number;
  _count: { skillAssessmentQuestion: number }; // Add _count if this is part of the response
}

function AssessmentDashPost() {
  const [assessmentTest, setAssessmentTests] = useState<AssessmentProps[]>([]);
  const [selectedTest, setSelectedTest] = useState<AssessmentProps | null>(
    null
  );
  const accessToken = Cookies.get("accessToken");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    testName: "",
    passingGrade: 50,
    duration: 30,
    skillBadge: null as File | null, // Add skillBadge with a type of File | null
  });
  const [fetchLoading, setFetchLoading] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const fetchAssessmentTest = async () => {
      setFetchLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dev/getassessmenttestdash`
        );
        const data = response.data; // The response should have data and pagination

        if (data.data) {
          setAssessmentTests(data.data); // Use data.data to access the tests
        }
      } catch (error) {
        console.error("Error fetching Assessment tests:", error);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchAssessmentTest();
  }, []);

  const handleEdit = (test: AssessmentProps) => {
    setSelectedTest(test);
    setEditFormData({
      testName: test.skill_assessment_name,
      passingGrade: test.passing_grade,
      duration: test.duration,
      skillBadge: null, // Set a default value for skillBadge
    });
    setEditFormOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]:
        name === "passingGrade" || name === "duration" ? Number(value) : value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTest) return;

    try {
      setLoading(true);
      // Create a FormData object
      const formData = new FormData();
      formData.append(
        "skill_assessment_id",
        selectedTest.skill_assessment_id.toString()
      ); // Add ID as text
      formData.append("skill_assessment_name", editFormData.testName); // Add name
      if (editFormData.skillBadge) {
        formData.append("image", editFormData.skillBadge); // Add file if it exists
      }
      formData.append("passing_grade", editFormData.passingGrade.toString()); // Add passing grade as string
      formData.append("duration", editFormData.duration.toString()); // Add duration as string

      // Send the request with FormData
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dev/update/assessmenttest`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data", // Ensure proper headers for file upload
          },
        }
      );

      if (response.data.message) {
        toast.success(response.data.message);

        // Update the state with the new data
        setAssessmentTests((prev) =>
          prev.map((test) =>
            test.skill_assessment_id === selectedTest.skill_assessment_id
              ? {
                  ...test,
                  skill_assessment_name: editFormData.testName,
                  passing_grade: editFormData.passingGrade,
                  duration: editFormData.duration,
                  skill_badge: editFormData.skillBadge
                    ? URL.createObjectURL(editFormData.skillBadge) // Update badge preview
                    : test.skill_badge, // Retain existing badge if no new file is uploaded
                }
              : test
          )
        );
        setLoading(false);
        setEditFormOpen(false); // Close the modal
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating test:", error);
      toast.error("Failed to update the test. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!selectedTest) return;

    try {
      setLoading(true);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dev/delete/assessmenttest/${selectedTest.skill_assessment_id}`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.data.message) {
        toast.success(response.data.message);
        setAssessmentTests((prev) =>
          prev.filter(
            (test) =>
              test.skill_assessment_id !== selectedTest.skill_assessment_id
          )
        );
        setDialogOpen(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error deleting test:", error);
      toast.error("Failed to delete the test. Please try again.");
    }
  };
  return fetchLoading ? (
    <div className="flex justify-center align-middle">
      <LoadingLoader />
    </div>
  ) : (
    <div className="space-y-4">
      {assessmentTest.length > 0 ? (
        assessmentTest.map((test) => (
          <div
            key={test.skill_assessment_id}
            className="flex justify-between border p-4 rounded-xl shadow bg-white hover:shadow-md"
          >
            {/* Display skill badge */}
            <div className="flex ">
              <div className="justify-center items-center">
                {" "}
                <Image
                  src={test.skill_badge}
                  alt={`${test.skill_assessment_name} Badge`}
                  width={80}
                  height={80}
                  className="rounded-full mb-4 mt-8"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold p-4">
                  {test.skill_assessment_name}
                </h3>
                <div className="flex flex-col gap-6 mx-4 mb-4">
                  <p className="text-sm">
                    <span className="font-medium">Passing Grade:</span>{" "}
                    {test.passing_grade}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Duration:</span>{" "}
                    {test.duration} minutes
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="p-2">
                    <DotsVerticalIcon className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  align="end"
                  side="bottom"
                  className="w-40 p-2 space-y-2"
                >
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleEdit(test)}
                  >
                    {loading ? <LoadingLoader /> : "Edit Test"}
                  </Button>

                  {/* Safely access skillAssessmentQuestion */}
                  {test._count?.skillAssessmentQuestion === 25 ? (
                    <Button variant="outline" className="w-full">
                      <Link
                        href={`/edit-questions-assessment/${test.skill_assessment_id}`}
                      >
                        Edit Questions
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full">
                      <Link
                        href={`/add-questions-asseessment/${test.skill_assessment_id}`}
                      >
                        Add Questions
                      </Link>
                    </Button>
                  )}

                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                      setSelectedTest(test);
                      setDialogOpen(true);
                    }}
                  >
                    {loading ? <LoadingLoader /> : "Delete Test"}
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ))
      ) : (
        <p>No Assessment tests available.</p>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog open={isDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <ConfirmDelete
              onDelete={() => {
                handleDelete();
              }}
              loadingState={loading}
              disableState={false}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditFormOpen} onOpenChange={setEditFormOpen}>
        <DialogContent>
          <DialogHeader>
            <h2 className="text-xl font-bold">Edit Assessment Test</h2>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="testName"
              >
                Test Name
              </label>
              <input
                id="testName"
                name="testName"
                type="text"
                className="w-full border rounded px-3 py-2"
                value={editFormData.testName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="skillBadge"
              >
                Skill Badge
              </label>
              <input
                id="skillBadge"
                name="skillBadge"
                type="file"
                className="w-full border rounded px-3 py-2"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const input = e.target;
                  const files = input.files; // Get files from the input element

                  if (!files || files.length === 0) {
                    toast.error("No file selected");
                    input.value = ""; // Clear the file input
                    return;
                  }

                  const file = files[0]; // Access the first file

                  // Check if file size exceeds 2 MB
                  if (file.size > 2 * 1024 * 1024) {
                    toast.error("File size should not exceed 2 MB");
                    input.value = ""; // Clear the file input
                  } else {
                    setEditFormData((prev) => ({
                      ...prev,
                      skillBadge: file,
                    }));
                  }
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="passingGrade"
              >
                Passing Grade
              </label>
              <input
                id="passingGrade"
                name="passingGrade"
                type="number"
                className="w-full border rounded px-3 py-2"
                min="50"
                max="100"
                value={editFormData.passingGrade}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="duration"
              >
                Duration
              </label>
              <select
                id="duration"
                name="duration"
                className="w-full border rounded px-3 py-2"
                value={editFormData.duration}
                onChange={handleInputChange}
                required
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditFormOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {loading ? <LoadingLoader /> : "Update"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AssessmentDashPost;
