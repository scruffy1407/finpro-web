import React from "react";
import NavbarComponent from "@/components/NavbarComponent";
import HeroCompanyListComponent from "@/components/HeroCompanyListComponent";
import CompanyListMappingComponent from "@/components/CompanyListMappingComponent";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"; // Shadcn UI pagination
import FooterComponent from "@/components/FooterComponent";
import { setCurrentPage } from "@/store/slices/companyPaginationSlice";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

const CompanyPage: React.FC = () => {
	const { currentPage, totalPages } = useSelector(
		(state: RootState) => state.companyPagination
	);
	const dispatch = useDispatch();

	// Handle page change
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			dispatch(setCurrentPage(page));
		}
	};

	return (
		<div className="mt-5 mx-4">
			<div className="flex flex-col w-full">
				<div>
					<NavbarComponent
						findJobs="Find Jobs"
						skillAssessment="Skill Assessment"
						exploreCompanies="Explore Companies"
						loginJobHunter="Login"
						loginCompanies="Login as Recruiter"
					/>
				</div>

				<div>
					<HeroCompanyListComponent />
				</div>
				<div className="w-full mt-5 mb-10">
					<CompanyListMappingComponent />
				</div>

				<Pagination>
					<PaginationContent>
						<PaginationPrevious
							onClick={() => handlePageChange(currentPage - 1)}
							className={
								currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
							}
						>
							Previous
						</PaginationPrevious>

						{/* Page numbers */}
						{[...Array(totalPages)].map((_, index) => (
							<PaginationItem key={index}>
								<PaginationLink
									onClick={() => handlePageChange(index + 1)}
									isActive={currentPage === index + 1}
								>
									{index + 1}
								</PaginationLink>
							</PaginationItem> 
						))}

						<PaginationNext
							onClick={() => handlePageChange(currentPage + 1)}
							className={
								currentPage === totalPages
									? "opacity-50 cursor-not-allowed"
									: ""
							}
						>
							Next
						</PaginationNext>
					</PaginationContent>
				</Pagination>
				<div className="mx-4 mt-20 mb-5">
					<FooterComponent
						findJobs="Find Jobs"
						skillAssessment="Skill Assessment"
						exploreCompanies="Explore Companies"
					/>
				</div>
			</div>
		</div>
	);
};

export default CompanyPage;

// import React from "react";
// import NavbarComponent from "@/components/NavbarComponent";
// import HeroJobListPageComponent from "@/components/HeroJobListPageComponent";
// import SelectionJobsComponents from "@/components/SelectionJobsComponents";
// import JobListMappingComponent from "@/components/JobListMappingComponent";
// import {
// 	Pagination,
// 	PaginationContent,
// 	PaginationEllipsis,
// 	PaginationItem,
// 	PaginationLink,
// 	PaginationNext,
// 	PaginationPrevious,
// } from "@/components/ui/pagination";
// import FooterComponent from "@/components/FooterComponent";

// function jobpost() {
// 	return (
// 		<div className="mt-5 mx-4">
// 			<div className="flex flex-col w-full">
// 				<div>
// 					<NavbarComponent
// 						findJobs="Find Jobs"
// 						skillAssessment="Skill Assessment"
// 						exploreCompanies="Explore Companies"
// 						loginJobHunter="Login"
// 						loginCompanies="Login as Recruiter"
// 					/>
// 				</div>

// 				<div className="w-full">
// 					<HeroJobListPageComponent />
// 				</div>

// 				<div className="w-full mt-4">
// 					<SelectionJobsComponents />
// 				</div>

// 				<div className="w-full mt-5 mb-10">
// 					<JobListMappingComponent />
// 				</div>

// 				<div className="mt-5">
// 					<Pagination>
// 						<PaginationContent>
// 							<PaginationItem>
// 								<PaginationPrevious href="#" />
// 							</PaginationItem>
// 							<PaginationItem>
// 								<PaginationLink href="#">1</PaginationLink>
// 							</PaginationItem>
// 							<PaginationItem>
// 								<PaginationEllipsis />
// 							</PaginationItem>
// 							<PaginationItem>
// 								<PaginationNext href="#" />
// 							</PaginationItem>
// 						</PaginationContent>
// 					</Pagination>
// 				</div>
// 			</div>

// 			<div className="mx-4 mt-20 mb-5">
// 				<FooterComponent
// 					findJobs="Find Jobs"
// 					skillAssessment="Skill Assessment"
// 					exploreCompanies="Explore Companies"
// 				/>
// 			</div>
// 		</div>
// 	);
// }

// export default jobpost;
