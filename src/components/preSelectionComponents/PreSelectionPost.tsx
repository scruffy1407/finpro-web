import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import ConfirmDelete from "@/components/Modal/ConfirmDelete";
import Link from "next/link";
import LoadingLoader from "../LoadingLoader";
import { toast } from "sonner";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

interface PreSelectionTestProps {
  test_id: number;
  test_name: string;
  passing_grade: number;
  duration: number;
  _count: { testQuestions: number };
}

function PreSelectionPost() {
  const accessToken = Cookies.get("accessToken");
  const [preSelectionTest, setPreSelectionTests] = useState<
    PreSelectionTestProps[]
  >([]);
  const [selectedTest, setSelectedTest] =
    useState<PreSelectionTestProps | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    testName: "",
    passingGrade: 50,
    duration: 30,
  });
  const [loading, setLoading] = useState(false); // Add loading state]
  const [fetchLoading, setFetchLoading] = useState(false);

  const fetchPreSelectionTests = async () => {
    setFetchLoading(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/viewpretest`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (
        response.data.message === "Pre-selection tests fetched successfully"
      ) {
        setPreSelectionTests(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching pre-selection tests:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchPreSelectionTests();
  }, [accessToken]);

  const handleEdit = (test: PreSelectionTestProps) => {
    setSelectedTest(test);
    setEditFormData({
      testName: test.test_name,
      passingGrade: test.passing_grade,
      duration: test.duration,
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

    const body = {
      testName: editFormData.testName,
      passingGrade: editFormData.passingGrade,
      duration: editFormData.duration,
    };

    try {
      setLoading(true);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/updatepretest/${selectedTest.test_id}`,
        body,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.data.message) {
        toast.success(response.data.message);
        setPreSelectionTests((prev) =>
          prev.map((test) =>
            test.test_id === selectedTest.test_id
              ? { ...test, ...body, test_name: body.testName }
              : test
          )
        );
        setEditFormOpen(false);
      }
    } catch (error) {
      console.error("Error updating test:", error);
      toast.error("Failed to update the test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete logic (soft delete by updating the test status)
  const handleDelete = async () => {
    setLoading(true);
    if (!selectedTest) return;

    try {
      // Send PUT request to soft delete the test
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/softdeletepretest/${selectedTest.test_id}`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      toast.success(response.data?.message || "Test deleted successfully");

      if (response.data?.message) {
        setPreSelectionTests((prev) =>
          prev.filter((test) => test.test_id !== selectedTest.test_id)
        );
        setDialogOpen(false);
        setDialogOpen(false);
        setSelectedTest(null);
      } else {
        toast.error("Unexpected response structure.");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const message = error.response.data?.message || "An error occurred.";
          console.error("Error deleting test:", message);
          toast.error(message || "Failed to delete the test. Please try again.");
        } else {
          toast.error("Network error or no response from the server.");
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("Failed to delete the test. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return fetchLoading ? (
    <div className="flex justify-center align-middle">
      <LoadingLoader />
    </div>
  ) : (
    <div className="space-y-4">
      {preSelectionTest.length > 0 ? (
        preSelectionTest.map((test) => (
          <div
            key={test.test_id}
            className="flex justify-between border p-4 rounded-xl shadow bg-white hover:shadow-md"
          >
            <div>
              <h3 className="text-lg font-bold p-4">{test.test_name}</h3>
              <div className="flex flex-col gap-6 mx-4 mb-4">
                <p className="text-sm">
                  <span className="font-medium">Passing Grade:</span>{" "}
                  {test.passing_grade}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Duration:</span> {test.duration}{" "}
                  minutes
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Popover>
                {/* Three-dot Vertical Icon */}
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="p-2">
                    <DotsVerticalIcon className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>

                {/* Popover Content */}
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

                  {/* Conditional Edit/Add Questions Button */}
                  {test._count.testQuestions === 25 ? (
                    <Button variant="outline" className="w-full">
                      <Link href={`/edit-questions/${test.test_id}`}>
                        Edit Questions
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full">
                      <Link href={`/add-questions/${test.test_id}`}>
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
        <p>No Pre-selection tests available.</p>
      )}

      {/* Edit Form */}
      {isEditFormOpen && selectedTest && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Edit Test</h2>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <label htmlFor="testName" className="font-medium">
                Pre Selection Test Title
              </label>
              <input
                type="text"
                id="testName"
                name="testName"
                value={editFormData.testName}
                onChange={handleInputChange}
                className="border rounded-md p-2"
                required
              />

              <label htmlFor="passingGrade" className="font-medium">
                Passing Grade
              </label>
              <input
                type="number"
                id="passingGrade"
                name="passingGrade"
                min={0}
                max={100}
                value={editFormData.passingGrade}
                onChange={handleInputChange}
                className="border rounded-md p-2"
                required
              />

              <label htmlFor="duration" className="font-medium">
                Duration (in minutes)
              </label>
              <select
                id="duration"
                name="duration"
                value={editFormData.duration}
                onChange={handleInputChange}
                className="border rounded-md p-2"
                required
              >
                <option value={30}>30 Minutes</option>
                <option value={45}>45 Minutes</option>
                <option value={60}>60 Minutes</option>
              </select>

              <div className="flex justify-end mt-4">
                <Button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  {loading ? <LoadingLoader /> : "Update Test"}
                </Button>
                <Button
                  type="button"
                  onClick={() => setEditFormOpen(false)}
                  className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(isOpen) => setDialogOpen(isOpen)}
      >
        <DialogContent>
          <DialogHeader>
            <ConfirmDelete
              onDelete={handleDelete}
              loadingState={loading}
              disableState={false}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PreSelectionPost;
