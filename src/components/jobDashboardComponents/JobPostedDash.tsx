import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import ConfirmDelete from "@/components/Modal/ConfirmDelete";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { JobPostDash } from "@/utils/interface";
import { getJobPostDash } from "@/pages/api/api";
import SearchBarJobDash from "./searchBarJobDash";
import { deleteJobPostDash } from "@/pages/api/api";
import JobEditForm from "./jobEditForm";
import ModalContainer from "@/components/Modal/ModalContainer";
import { closeModalAction, openModalAction } from "@/store/slices/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

export interface JobPostDashRequest {
  accessToken: string; // For passing the token
  limit?: number; // For pagination
  page?: number; // For pagination
  jobTitle?: string; // For filtering job posts by title
  sortOrder?: string; // For sorting job posts
}

interface BackendError {
  error: string;
}
interface DeleteJobPostResponse {
  message: string;
}

function JobPostedDash() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [jobPosts, setJobPosts] = useState<JobPostDash[]>([]);
  const [offset, setOffset] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const token = Cookies.get("accessToken");

  const { isLoggedIn, pendingState } = useSelector(
    (state: RootState) => state.auth,
  );

  const { currentModalId, editId } = useSelector(
    (state: RootState) => state.modalController,
  );
  const handleCloseModal = () => {
    dispatch(closeModalAction());
  };
  const handleDelete = async (jobId: number) => {
    setLoadingState(true);
    try {
      const response = await deleteJobPostDash(jobId, token as string);
      if (response.success) {
        toast.success("Job deleted successfully.");
        setJobPosts((prevPosts) =>
          prevPosts.filter((post) => Number(post.job_id) !== jobId),
        );
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      // Debug: Log the error caught
      console.error("Error deleting job post:", error);

      if (axios.isAxiosError(error) && error.response?.data) {
        const backendError = error.response.data as BackendError;
        if (backendError.error) {
          alert(backendError.error);
          return;
        }
      }

      alert("Failed to delete the job post. Please try again later.");
    } finally {
      setLoadingState(false);
      setDialogOpen(false);
    }
  };

  async function fetchData(token: string) {
    try {
      const response = await getJobPostDash({
        accessToken: token,
        limit: 10,
        page: offset,
      });

      if (Array.isArray(response)) {
        setJobPosts(response);
        setHasMore(response.length === 10);
      }
    } catch (error) {
      console.error("Failed to fetch job posts:", error);
    }
    setLoadingState(false);
  }

  async function handleLoadMore() {
    if (!hasMore) {
      toast.error("Failed to fetch jobs, please refresh your browser");
      return;
    }
    try {
      const response = await getJobPostDash({
        accessToken: token as string,
        limit: 10,
        page: offset + 1,
      });

      if (Array.isArray(response)) {
        setJobPosts((prevPosts) => [...prevPosts, ...response]); // Keep previous posts and append new ones
        setHasMore(response.length === 10);
        setOffset((prevOffset) => prevOffset + 1);
      }
    } catch (error) {
      console.error("Failed to fetch job posts:", error);
    }
  }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy");
  };

  const formatSalary = (salary: number) => {
    return `${(salary / 1000000).toFixed(1)} jt`;
  };

  const handleSearch = async (searchParams: any) => {
    try {
      const { jobTitle, sortOrder } = searchParams;
      const response = await getJobPostDash({
        accessToken: token as string,
        limit: 10,
        page: 1,
        jobTitle,
        sortOrder,
      });

      setJobPosts(response);
      setOffset(1);
      setHasMore(response.length === 10);
    } catch (error) {
      console.error("Error fetching filtered job posts:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn && token !== undefined) {
      fetchData(token);
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className="space-y-4">
        <SearchBarJobDash onSearch={handleSearch} />
        {jobPosts.map(
          ({
            job_title,
            created_at,
            updated_at,
            salary_min,
            salary_max,
            salary_show,
            job_id,
            expired_date,
            number_applicants,
            selection_test_active,
            status,
          }) => (
            <>
              <ModalContainer
                isOpen={
                  currentModalId === "editJobForm" && editId === Number(job_id)
                }
                onClose={handleCloseModal}
                title={`Edit Working Experience`}
              >
                <JobEditForm
                  number_applicants={number_applicants}
                  job_id={String(editId)}
                  closeModal={handleCloseModal} // Pass handleCloseModal as a prop
                />
              </ModalContainer>
              <div key={job_id}>
                <div className="p-4 flex flex-col gap-6 bg-white w-full ">
                  <div className={`flex flex-col gap-3`}>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <span className="text-sm text-neutral-400 cursor-pointer hover:bg-zinc-50 py-1 px-2 ">
                          Created at {formatDate(created_at)}
                        </span>
                        <div className="text-neutral-400">|</div>
                        <span className="text-sm text-neutral-400 cursor-pointer hover:bg-zinc-50 py-1 px-2 ">
                          {/* If no updated_at, show "Not updated yet" */}
                          {updated_at
                            ? `Last updated at ${formatDate(updated_at)}`
                            : "Not updated yet"}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-5">
                        {" "}
                        {selection_test_active && (
                          <div className=" w-fit text-sm text-neutral-600 rounded-xl px-2 py-1 bg-neutral-100">
                            With Selection Test
                          </div>
                        )}
                        <div
                          className={`w-fit text-sm text-neutral-600 rounded-xl px-2 py-1 ${
                            new Date(expired_date) > new Date()
                              ? status
                                ? "bg-green-100"
                                : "bg-zinc-50"
                              : "bg-zinc-50"
                          }`}
                        >
                          {new Date(expired_date) > new Date()
                            ? status
                              ? "Open"
                              : "Paused"
                            : "Closed"}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            router.push(
                              `/dashboard/company/job-detail/${job_id}`,
                            )
                          }
                          variant="outline"
                        >
                          Detail
                        </Button>

                        <div>
                          <Button
                            variant="outline"
                            onClick={() =>
                              dispatch(
                                openModalAction("editJobForm", Number(job_id)),
                              )
                            }
                          >
                            Edit
                          </Button>

                          {/* Other components */}
                        </div>

                        <Popover>
                          {/* Three-dot Vertical Icon */}
                          <PopoverTrigger asChild>
                            <Button variant="ghost" className="p-2">
                              <DotsVerticalIcon className="h-5 w-5" />
                            </Button>
                          </PopoverTrigger>

                          {/* Popover Content with Delete Button */}
                          <PopoverContent
                            align="end"
                            side="bottom"
                            className="w-32 p-2"
                          >
                            <Button
                              variant="destructive"
                              className="w-full"
                              onClick={() => {
                                setSelectedJobId(Number(job_id)); // Set the selected job ID
                                setDialogOpen(true); // Open the dialog
                              }}
                            >
                              Delete
                            </Button>
                          </PopoverContent>
                        </Popover>

                        {/* Delete Confirmation Modal */}
                        <Dialog
                          open={isDialogOpen}
                          onOpenChange={(isOpen) => {
                            setDialogOpen(isOpen);
                            if (!isOpen) setSelectedJobId(null); // Reset selected job ID when dialog closes
                          }}
                        >
                          <DialogContent>
                            <DialogHeader>
                              <ConfirmDelete
                                onDelete={() => {
                                  if (selectedJobId !== null) {
                                    handleDelete(selectedJobId); // Pass the selected job ID
                                  }
                                }}
                                loadingState={loadingState}
                                disableState={loadingState}
                              />
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-bold">{job_title}</h2>
                    </div>
                  </div>
                  <div className="border-t-[1px] border-gray-200 w-full"></div>
                  <div className="flex justify-between items-center ">
                    <div className="flex gap-2 items-center">
                      <span className="text-sm text-neutral-400 cursor-pointer hover:bg-zinc-50 py-1 px-2 ">
                        Expire at {formatDate(expired_date)}
                      </span>
                      <div className="text-neutral-400">|</div>
                      <span className="text-sm text-neutral-400 cursor-pointer hover:bg-zinc-50 py-1 px-2 ">
                        {/* If no updated_at, show "Not updated yet" */}
                        {
                          number_applicants
                        } Applicants Applied
                      </span>
                    </div>

                    <p className="text-blue-500 font-semibold">
                      {salary_show ? (
                        `Rp${formatSalary(salary_min)} - Rp${formatSalary(salary_max)}`
                      ) : (
                        <span className="text-neutral-600">
                          Salary not disclosed
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ),
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              className="w-fit mt-4"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
export default JobPostedDash;
