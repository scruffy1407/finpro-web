import React, { useEffect, useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
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
import CreateJobForm from "./jobCreateForm";

import axios, { AxiosError } from "axios";

interface BackendError {
	error: string;
}
interface DeleteJobPostResponse {
	message: string; 
}

function JobPostedDash() {
	const router = useRouter();
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [loadingState, setLoadingState] = useState(false);
	const [jobPosts, setJobPosts] = useState<JobPostDash[]>([]);
	const [offset, setOffset] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [selectedJobId, setSelectedJobId] = useState<number | null>(null); 
	const [selectedJobIdEdit, setSelectedJobIdEdit] = useState<string | null>(
		null
	); 

	const [showEditForm, setShowEditForm] = useState(false);

	const handleDelete = async (jobId: number) => {
		setLoadingState(true);
		try {
			const response: DeleteJobPostResponse = await deleteJobPostDash(jobId);
			if (response?.message) {
				alert(response.message); 
			} else {
				alert("Job post deleted successfully.");
			}

			setJobPosts((prevPosts) =>
				prevPosts.filter((post) => Number(post.job_id) !== jobId)
			);
		} catch (error) {
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

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getJobPostDash({
					limit: 10,
					page: offset, 
				});
				console.log(response);

				if (Array.isArray(response)) {
					setJobPosts((prevPosts) => [...prevPosts, ...response]);
					setHasMore(response.length === 10); 
				}
			} catch (error) {
				console.error("Failed to fetch job posts:", error);
			}
			setLoadingState(false);
		};

		fetchData();
	}, [offset]); 

	//debugging purposed
	useEffect(() => {
		console.log("Current fetched data:", jobPosts);
	}, [jobPosts]);

	// Helper function to format date
	const formatDate = (dateString: string) => {
		return format(new Date(dateString), "dd MMM yyyy"); 
	};

	const formatSalary = (salary: number) => {
		return `${(salary / 1000000).toFixed(1)} jt`; 
	};

	const handleLoadMore = () => {
		if (hasMore) {
			setOffset((prevOffset) => prevOffset + 1); 
		}
	};

	const handleSearch = async (searchParams: any) => {
		try {
			const { jobTitle, sortOrder } = searchParams;
			const response = await getJobPostDash({
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


	const handleEdit = (jobId: string) => {
		if (selectedJobIdEdit === jobId) {

			setShowEditForm(!showEditForm);
		} else {

			setSelectedJobIdEdit(jobId);
			setShowEditForm(true);
		}
	};

	return (
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
					companyId,
					expired_date,
					number_applicants,
					selection_test_active,
					status,
				}) => (
					<div
						key={job_id}
						// href={`/jobdetail/${job_id}`}
						// className="bg-white w-full h-fit rounded-xl hover:shadow-lg flex "
						// prefetch={false}
					>
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
											onClick={() => router.push(`/jobdetail/${job_id}`)}
											variant="outline"
										>
											Detail
										</Button>

										<div
											className={`space-y-4 ${showEditForm ? "opacity-50" : ""}`}
										>
											<Button
												variant="outline"
												onClick={() => handleEdit(job_id)}
											>
												Edit
											</Button>

											<JobEditForm
												job_id={selectedJobIdEdit}
												showForm={showEditForm}
												setShowForm={setShowEditForm}
											/>
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
				)
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
	);
}

export default JobPostedDash;
